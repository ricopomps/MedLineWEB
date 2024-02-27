import Queue from "@/components/Queue";
import * as QueuesApi from "@/network/api/queue";
import { NotFoundError } from "@/network/http-errors";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Container, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import mediline from "../../../../public//images/medline_transparente.svg";

interface QueuePageProps {
  params: { code: string };
}

const getQueue = async (code: string) => {
  try {
    return await QueuesApi.getQueue(code);
  } catch (error) {
    if (error instanceof NotFoundError) {
      notFound();
    } else {
      throw error;
    }
  }
};

export async function generateMetadata({
  params: { code },
}: QueuePageProps): Promise<Metadata> {
  const queue = await getQueue(code);

  return {
    title: `Fila - ${queue.code}`,
  };
}

export default async function QueuePage({ params: { code } }: QueuePageProps) {
  const queue = await getQueue(code);

  return (
    <Container
      component="main"
      style={{
        backgroundColor: "#f0f0f0",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Link href="/home">
          <IconButton
            aria-label="back"
            size="large"
            style={{ fontFamily: "Inter", color: "black" }}
          >
            <ArrowBackIcon /> voltar
          </IconButton>
        </Link>
      </div>
      <Image src={mediline} alt="mediline" width={450} height={140} />
      <Box marginBottom={8} marginTop={10}>
        <Typography variant="h4" style={{ fontFamily: "inter" }}>
          <strong>Código da fila:</strong> {queue.code}
        </Typography>
      </Box>

      <Queue queueId={queue._id} queueCode={queue.code} />
    </Container>
  );
}
