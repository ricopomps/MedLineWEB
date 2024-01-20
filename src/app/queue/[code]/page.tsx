import Queue from "@/components/Queue";
import * as QueuesApi from "@/network/api/queue";
import { NotFoundError } from "@/network/http-errors";
import { Container, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import mediline from "../../../../public/mediline.svg";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
interface QueuePageProps {
  params: { code: string };
}

const getQueue = cache(async (code: string) => {
  try {
    return await QueuesApi.getQueue(code);
  } catch (error) {
    if (error instanceof NotFoundError) {
      notFound();
    } else {
      throw error;
    }
  }
});

// const getQueue = (code: string) =>
//   unstable_cache(
//     async function (code: string) {
//       try {
//         return await QueuesApi.getQueue(code);
//       } catch (error) {
//         if (error instanceof NotFoundError) {
//           notFound();
//         } else {
//           throw error;
//         }
//       }
//     },
//     [code],
//     { tags: [code] }
//   )(code);

export async function generateMetadata({
  params: { code },
}: QueuePageProps): Promise<Metadata> {
  const queue = await getQueue(code);

  return {
    title: `Fila - ${queue.code}`,
    //   description: queue.summary,
    //   openGraph: {
    //     images: [{ url: queue.featuredImageUrl }],
    //   },
  };
}

// export async function generateStaticParams() {
//   const codes = await QueuesApi.getAllQueuesCodes();
//   return codes.map((code) => ({ code }));
// }

export default async function QueuePage({ params: { code } }: QueuePageProps) {
  const queue = await getQueue(code);

  return (
    <Container
      component="main"
      style={{
        backgroundColor: "#FFF7D3",
        height: "100vh",
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
          <IconButton aria-label="back" size="large">
            voltar
            {/* <ArrowBackIcon /> */}
          </IconButton>
        </Link>
      </div>
      <Image src={mediline} alt="mediline" width={500} height={300}></Image>
      <Typography>Código da fila: {queue.code}</Typography>
      <Queue queue={queue} />
    </Container>
  );
}
