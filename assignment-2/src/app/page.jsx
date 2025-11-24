import GameComponent from "@/components/GameComponent";


export default async function Home() {
  const response =  await fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json");
  const games =  (await response.json()).slice(1);
   return (
    <>
      <GameComponent games={games} />
    </>
  );
}
