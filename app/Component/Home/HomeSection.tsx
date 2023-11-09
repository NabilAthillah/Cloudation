import ExtendHero from "./ExtendHero";
import FirstHero from "./FirstHero";
import SecondHero from "./SecondHero";
import ThirdHero from "./ThirdHero";

export default function HomeSection(){
    return(
        <div className="pt-28 flex flex-col gap-2 mb-10">
            <FirstHero />
            <SecondHero />
            <ExtendHero />
            <ThirdHero />
        </div>
    )
}