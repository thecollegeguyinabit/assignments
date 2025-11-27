import { Badge } from "./ui/badge";
import { 
    Card, 
    CardHeader,
    CardTitle,
    CardContent 
} from "./ui/card";

export default function GameList({ platform, title, score, genre, editorChoice }) {
  return (
    <>
      <Card className=" w-[250px] md:max-lg:w-[280px] lg:w-[280px] bg-[#f1f2f1] h-auto gap-0 hover:cursor-pointer hover:shadow-2xl/30 hover:shadow-neutral-900/70 hover:-translate-y-2 ease-in-out delay-75">
        <CardHeader className="h-auto mb-3 ">
          {
            editorChoice === "Y" &&
          <Badge className="mb-2">Editor Choice</Badge>
          }
          <CardTitle className="text-center text-wrap text-base/5">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col ">
            <div className="flex items-baseline gap-2">
              <h1 className="font-bold text-lg text-gray-700">Platform</h1>
              <h1 className="font-normal text-sm md:text-base text-gray-500">{platform}</h1>
            </div>
            <div className="flex items-baseline gap-2">
              <h1 className="font-bold text-lg text-gray-700">Score</h1>
              <h1 className="font-normal text-sm md:text-base text-gray-500">{score}</h1>
            </div>
            <div className="col-span-2 ">
              {genre === "" ? null : (
                <div className="flex gap-2 items-baseline">
                  <h1 className="font-bold text-lg text-gray-700">Genre</h1>
                  <h1 className="font-normal text-sm md:text-base text-gray-500">{genre} </h1>
                </div>
              )}
            </div>
            {/* <div className="mt-3 place-self-center">
              {editorChoice === "Y" && (
                <span className="px-2 py-1 rounded-full text-sm font-medium bg-neutral-700 text-white">
                    #Editor Choice
              </span>)}
            </div> */}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
