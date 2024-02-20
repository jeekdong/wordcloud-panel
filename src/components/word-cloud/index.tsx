import WordCloud from "wordcloud";
import { useControls, Leva } from "leva";

import { usePersistData } from "@/store";
import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

// 粗图标他白色
const colors = ["#9195F6", "#B7C9F2", "#F9F07A", "#FB88B4"];

export const Word = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { data, options, setOptions } = usePersistData();

  const cloudData = useMemo(() => {
    return data.filter(([word, value]) => word && value);
  }, [data]) as [string, number][];

  const renderWordCloud = (
    _data: [string, number][],
    _options: WordCloud.Options
  ) => {
    if (canvasRef.current) {
      WordCloud.stop();
      WordCloud(canvasRef.current, {
        list: _data.map(item => [...item]),
        ..._options,
        fontFamily: "sans serif", // 字体
        shrinkToFit: true, // 根据容器大小调整词云大小
        rotateRatio: 1,
        color: () => {
          // 随机返回 options.color 数组中的某个颜色
          return colors[Math.floor(Math.random() * colors.length)];
        },
      });
    }
  };

  useEffect(() => {
    renderWordCloud(cloudData, options);
    return () => {
      WordCloud.stop();
    };
  }, [options, cloudData]);

  // 词云配置表单组件
  const {
    gridSize,
    weightFactor,
    rotationSteps,
    minRotation,
    maxRotation,
    fontWeight,
    backgroundColor,
  } = useControls({
    gridSize: {
      value: 8,
      hint: "以像素为单位的网格大小，用于标记画布的可用性--网格大小越大，字与字之间的间隙就越大。",
    },
    weightFactor: {
      value: 4,
      hint: "缩放因子，用于控制字体大小",
    },
    rotationSteps: {
      value: 20,
      hint: "旋转步进，更多的步进意味着更精细的旋转角度",
    },
    minRotation: {
      value: 0,
      hint: "最小旋转弧度",
    },
    maxRotation: {
      value: 0.34,
      hint: "最大旋转弧度",
    },
    fontWeight: {
      value: "bold",
      options: ["normal", "bold"],
      hint: "字体粗细",
    },
    backgroundColor: {
      value: "#FFF",
      hint: "背景颜色",
    },
  });

  useEffect(() => {
    setOptions({
      gridSize,
      weightFactor,
      rotationSteps,
      minRotation,
      maxRotation,
      fontWeight,
      backgroundColor,
    });
  }, [
    gridSize,
    weightFactor,
    rotationSteps,
    minRotation,
    maxRotation,
    fontWeight,
    backgroundColor,
    setOptions,
  ]);

  const handleExport = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = "word-cloud.png";
      a.click();
    }
  }

  return (
    <div className="max-w-[400px] mx-auto pb-8">
      <canvas
        id="wordCloudCanvas"
        ref={canvasRef}
        className="w-full h-[150%]"
        width="800"
        height="1200"
      ></canvas>
      <Button
        className="mt-4"
        onClick={() => {
          renderWordCloud(cloudData, options);
        }}
      >
        重新生成
      </Button>
      <Button
        variant="outline"
        onClick={handleExport}
        className="ml-2"
      >
        导出图片
      </Button>
      {/* 参数配置表单 */}
      <div>
        <h2 className="font-bold my-4 text-lg text-left pl-4">参数配置</h2>
        <Leva
          fill
          titleBar={{
            drag: false,
          }}
        />
      </div>
    </div>
  );
};
