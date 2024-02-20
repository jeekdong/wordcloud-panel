import { create } from 'zustand'
import { combine, persist } from 'zustand/middleware'

import type { Options } from 'wordcloud'

export const usePersistData = create(
  persist(
    combine(
      {
        data: [] as [string | null, number | null][],
        options: {
          gridSize: 8, // 字之间的间隙
          weightFactor: 4, // 缩放因子，用于控制字体大小
          fontFamily: "sans serif", // 字体
          color: "random-light",
          rotateRatio: 1, // 旋转比例，0 表示不旋转，1 表示总是旋转
          rotationSteps: 20, // 旋转步进，更多的步进意味着更精细的旋转角度
          backgroundColor: "#FFF", // 背景颜色
          shrinkToFit: true, // 是否根据容器大小调整词云大小
          minRotation: 0, // 最小旋转角度
          maxRotation: 0.34, // 最大旋转角度
          fontWeight: "bold",
        } as Options
      },
      set => ({
        setData: (data: [string | null, number | null][]) => set({ data }),
        setOptions: (options: Options) => set({ options })
      })
    ),
    {
      name: 'wordcloud-panel-data',
      getStorage: () => localStorage,
    }
  )
)