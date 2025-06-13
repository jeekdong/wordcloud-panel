import { useState } from 'react'
import { usePersistData } from '@/store'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const themes = [
  { id: '1', name: '主题1', colors: ['#FF87E5', '#5B89F7', '#FEC582'] },
  { id: '2', name: '主题2', colors: ['#F27DE0', '#5778EE', '#57B8FF'] },
]

export const ThemePanel = () => {
  const { options, setOptions } = usePersistData()
  const [custom, setCustom] = useState(options.customColors.join(','))

  const applyCustom = () => {
    const colors = custom
      .split(',')
      .map((c) => c.trim())
      .filter((c) => c)
    if (colors.length) {
      setOptions({ ...options, theme: 'custom', customColors: colors })
    }
  }

  return (
    <div className="max-w-[400px] mx-auto space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {themes.map((t) => (
          <div
            key={t.id}
            onClick={() => setOptions({ ...options, theme: t.id as '1' | '2' })}
            className={`cursor-pointer rounded-md p-2 border ${
              options.theme === t.id ? 'border-slate-900' : 'border-transparent'
            }`}
          >
            <div className="flex h-10 rounded overflow-hidden">
              {t.colors.map((c) => (
                <div key={c} style={{ backgroundColor: c }} className="flex-1" />
              ))}
            </div>
            <div className="mt-1 text-center text-sm">{t.name}</div>
          </div>
        ))}
      </div>
      <div>
        <h3 className="font-semibold mb-2">自定义主题</h3>
        <Textarea
          placeholder="#000,#fff,#f00"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
        />
        <Button className="mt-2" onClick={applyCustom}>
          应用
        </Button>
      </div>
    </div>
  )
}

export default ThemePanel
