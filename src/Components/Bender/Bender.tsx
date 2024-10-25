import { useEffect, useState } from "react";
import "./Bender.scss";

const WavyText = () => {
  const [text, setText] = useState("Let's reshape it");
  const [amplitude, setAmplitude] = useState(30);
  const [frequency, setFrequency] = useState(2);
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(200);
  const [fontSize, setFontSize] = useState(20);
  const [svgContent, setSvgContent] = useState<string>("");

  // Create wave path using sine wave
  const createWavePath = () => {
    const points = [];

    for (let x = 0; x <= width; x += 10) {
      const y =
        height / 2 + amplitude * Math.sin((x / width) * Math.PI * frequency);
      points.push(`${x},${y}`);
    }

    return `M${points.join(" L")}`;
  };
  const handleDownload = () => {
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bender.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    let svg = `<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
               <style>
                  @font-face {
                    font-family: "Bender";
                    src: url(BagossStandard-Regular.woff) format("woff");
                    font-style: normal;
                    font-weight: 400;
                  }
                  text {
                    font-family: Bender;
                  }
                 </style>            
                  <rect width="100%" height="100%" fill="none"/>
                    <defs>
                        <path id="wave" d="${createWavePath()}" fill="transparent" />
                    </defs>
                    <text 
                        style="font-size:${fontSize}px"
                            startOffset="50%"
                            textAnchor="middle"
                            >
                        <textPath spacing="auto" href="#wave">${text}</textPath>
                    </text>
               </svg>`;

    setSvgContent(svg);
  }, [text, fontSize, height, amplitude, width, frequency]);

  return (
    <div className="bender">
      <div className="bender__panel">
        <label>
          Tekst
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to wave"
          />
        </label>
        <label htmlFor="">
          width
          <input
            value={width}
            type="range"
            onChange={(e) => setWidth(Number(e.target.value))}
            min={0}
            max={1500}
            step={100}
          />
        </label>
        <label htmlFor="">
          Frekvens
          <input
            value={frequency}
            type="range"
            onChange={(e) => setFrequency(Number(e.target.value))}
            min={1}
            max={10}
            step={0.5}
          />
        </label>
        <label htmlFor="">
          Size
          <input
            value={fontSize}
            type="range"
            onChange={(e) => setFontSize(Number(e.target.value))}
            min={0}
            max={100}
            step={1}
          />
        </label>
        <label htmlFor="">
          height
          <input
            value={height}
            type="range"
            onChange={(e) => setHeight(Number(e.target.value))}
            min={0}
            max={1500}
            step={100}
          />
        </label>
        <label htmlFor="">
          Amplitude
          <input
            value={amplitude}
            type="range"
            onChange={(e) => setAmplitude(Number(e.target.value))}
            min={0}
            max={500}
            step={10}
          />
        </label>
        <button onClick={handleDownload}>last ned</button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <div
          style={{
            border: "1px solid black",
          }}
          dangerouslySetInnerHTML={{ __html: svgContent }}
          id="svg"
        />
      </div>
    </div>
  );
};

export default WavyText;
