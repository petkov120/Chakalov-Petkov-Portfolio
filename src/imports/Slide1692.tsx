import imgPta1 from "figma:asset/3b9ef818ebbe3856fb9217a87724459cdaf11b3b.png";

export default function Slide1692() {
  return (
    <div
      className="bg-[#9d2d9d] overflow-clip relative rounded-[26px] shadow-[-1px_3.406px_10.4px_0px_rgba(0,0,0,0.2)] size-full"
      data-name="Slide 16:9 - 2"
    >
      <div
        className="absolute bg-center bg-cover bg-no-repeat h-[631.264px] rounded-[7.797px] translate-x-[-50%] translate-y-[-50%] w-[1038px]"
        data-name="PTA 1"
        style={{ top: "calc(50% + 0.132px)", left: "calc(50% + 0.5px)", backgroundImage: `url('${imgPta1}')` }}
      />
    </div>
  );
}