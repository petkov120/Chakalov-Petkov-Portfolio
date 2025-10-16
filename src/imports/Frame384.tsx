import imgChatGptImageJul122025014208Am1 from "figma:asset/3f8ca804325f91b64a84f45b771e2522e94460ec.png";
import imgChatGptImageJul122025011140Am2 from "figma:asset/4774270e396720874460c4f8aeecbc8d19672f4e.png";

function Frame2() {
  return (
    <div className="bg-[#ffffff] h-[397.218px] overflow-clip relative rounded-[1.36px] shadow-[-0.533px_1.814px_5.539px_0px_rgba(0,0,0,0.2)] w-[330.264px]">
      <div
        className="absolute bg-[39.53%_0%] bg-no-repeat bg-size-[120.03%_100%] h-[342.849px] translate-x-[-50%] translate-y-[-50%] w-[285.633px]"
        data-name="ChatGPT Image Jul 12, 2025, 01_42_08 AM 1"
        style={{
          top: "calc(50% + 0.022px)",
          left: "calc(50% - 0.737px)",
          backgroundImage: `url('${imgChatGptImageJul122025014208Am1}')`,
        }}
      />
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[#ffffff] h-[380.756px] overflow-clip relative rounded-[1.192px] shadow-[-0.52px_1.772px_5.412px_0px_rgba(0,0,0,0.2)] w-[316.83px]">
      <div
        className="absolute bg-no-repeat bg-size-[123.5%_100%] bg-top-left h-[352.759px] rounded-[3.733px] translate-x-[-50%] translate-y-[-50%] w-[285.623px]"
        data-name="ChatGPT Image Jul 12, 2025, 01_11_40 AM 2"
        style={{
          top: "calc(50% + 0.007px)",
          left: "calc(50% - 0.294px)",
          backgroundImage: `url('${imgChatGptImageJul122025011140Am2}')`,
        }}
      />
    </div>
  );
}

export default function Frame384() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative size-full">
      <div className="absolute flex h-[462.649px] items-center justify-center right-0 top-[186px] w-[412.939px]">
        <div className="flex-none rotate-[346.669deg]">
          <Frame2 />
        </div>
      </div>
      <div className="absolute flex h-[416.587px] items-center justify-center right-[72px] top-0 w-[360.935px]">
        <div className="flex-none rotate-[7.014deg]">
          <Frame3 />
        </div>
      </div>
    </div>
  );
}