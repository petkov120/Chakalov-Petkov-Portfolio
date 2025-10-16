import svgPaths from "./svg-23jrtcn751";
import imgChatGptImageJul122025014208Am1 from "figma:asset/3f8ca804325f91b64a84f45b771e2522e94460ec.png";

function Frame2060() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[13px] items-start justify-start leading-[0] p-0 right-[47.4px] top-7 w-[300px]">
      <div className="font-['Arial:Bold',_sans-serif] not-italic relative shrink-0 text-[#140202] text-[32px] tracking-[-1.28px] w-full">
        <p className="block leading-[normal]">{`Chakalov `}</p>
      </div>
      <div className="font-['Arial:Bold',_sans-serif] not-italic relative shrink-0 text-[#150c0c] text-[32px] tracking-[-1.28px] w-full">
        <p className="block leading-[normal]">Petkov Richard</p>
      </div>
      <div className="font-['Lora:Medium',_sans-serif] font-medium relative shrink-0 text-[#150c0c] text-[24px] tracking-[-0.48px] w-full">
        <p className="block leading-[normal]">Software Product Designer</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[#ffffff] h-[89.842px] overflow-clip relative rounded-[0.308px] shadow-[-0.12px_0.41px_1.253px_0px_rgba(0,0,0,0.2)] w-[74.699px]">
      <div
        className="absolute bg-[39.53%_0%] bg-no-repeat bg-size-[120.03%_100%] h-[77.545px] translate-x-[-50%] translate-y-[-50%] w-[64.604px]"
        data-name="ChatGPT Image Jul 12, 2025, 01_42_08 AM 1"
        style={{
          top: "calc(50% + 0.005px)",
          left: "calc(50% - 0.167px)",
          backgroundImage: `url('${imgChatGptImageJul122025014208Am1}')`,
        }}
      />
    </div>
  );
}

function Frame2062() {
  return (
    <div className="box-border content-stretch flex items-start justify-start overflow-clip p-0 relative shrink-0 w-full">
      <Frame2060 />
      <div className="absolute flex h-[104.629px] items-center justify-center right-0 top-0 w-[93.388px]">
        <div className="flex-none rotate-[346.669deg]">
          <Frame2 />
        </div>
      </div>
    </div>
  );
}

function Frame2063() {
  return (
    <div className="box-border content-stretch flex flex-col gap-0 items-start justify-start p-0 relative shrink-0 w-full">
      <div className="font-['IBM_Plex_Mono:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#150c0c] text-[13px] tracking-[0.39px] w-full">
        <p className="block leading-[normal]">Petkov.Chakalov</p>
      </div>
      <Frame2062 />
    </div>
  );
}

function Work() {
  return (
    <div className="relative shrink-0 size-[19.385px]" data-name="work">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="work">
          <path
            d={svgPaths.p3556ad00}
            id="Vector"
            stroke="var(--stroke-0, white)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.21154"
          />
          <path
            d={svgPaths.p1dc4bd80}
            id="Vector_2"
            stroke="var(--stroke-0, white)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.21154"
          />
          <path
            d={svgPaths.p3a812300}
            id="Vector_3"
            stroke="var(--stroke-0, white)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.21154"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame367() {
  return (
    <div className="bg-[#2c1810] box-border content-stretch flex gap-[6.058px] items-center justify-center px-[27.26px] py-[15.144px] relative rounded-[127.212px] shrink-0 w-[327px]">
      <Work />
      <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16.962px] text-nowrap tracking-[-0.3392px]">
        <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">Available for work</p>
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-[#f7f6f3] relative size-full" data-name="Frame">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-6 items-start justify-start pb-[26.712px] pl-[42px] pr-[22.598px] pt-[42px] relative size-full">
          <Frame2063 />
          <div className="font-['IBM_Plex_Sans_Condensed:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#7c736a] text-[16px] tracking-[-0.16px] w-[327px]">
            <p className="adjustLetterSpacing block leading-[31px]">
              With 3+ years in product design and UI development, I partner with teams to craft heartfelt solutions in
              education, health tech, customer experience, and business growth.
            </p>
          </div>
          <Frame367 />
        </div>
      </div>
    </div>
  );
}