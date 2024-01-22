import User from "@/components/User";
import * as UsersApi from "@/network/api/user";
import { NotFoundError } from "@/network/http-errors";
import { Container } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import mediline from "../../../../public/mediline.svg";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
interface UserPageProps {
  params: { userId: string };
}

const getUser = cache(async (userId: string) => {
  try {
    return await UsersApi.getUser(userId);
  } catch (error) {
    if (error instanceof NotFoundError) {
      notFound();
    } else {
      throw error;
    }
  }
});

export async function generateMetadata({
  params: { userId },
}: UserPageProps): Promise<Metadata> {
  const user = await getUser(userId);

  return {
    title: `Usuário - ${user.name}`,
    //   description: user.summary,
    //   openGraph: {
    //     images: [{ url: user.featuredImageUrl }],
    //   },
  };
}

export default async function UserPage({ params: { userId } }: UserPageProps) {
  const user = await getUser(userId);

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
      <User user={user} />
    </Container>
  );
}
