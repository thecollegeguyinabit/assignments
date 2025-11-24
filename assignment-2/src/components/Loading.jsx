import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function Loading(){
    return(
        <Card className="w-[250px] flex flex-col"> 
            <Skeleton className="h-2 w-[200px]" />
            <Skeleton className="h-2 w-[150px]" />
            <Skeleton className="h-2 w-[100px]" />
        </Card>
    );
}