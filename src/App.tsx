import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Data } from '@/components/data'
import { Word } from '@/components/word-cloud'
import ThemePanel from '@/components/theme'

function App() {
  return (
    <div className="w-full h-full min-h-[100vh] bg-slate-50">
      <Tabs defaultValue="word-cloud" className="w-full text-center py-4">
        <TabsList>
          <TabsTrigger value="word-cloud">词云</TabsTrigger>
          <TabsTrigger value="data">数据</TabsTrigger>
          <TabsTrigger value="theme">主题</TabsTrigger>
        </TabsList>
        <TabsContent value="word-cloud">
          <Word />
        </TabsContent>
        <TabsContent value="data">
          <Data />
        </TabsContent>
        <TabsContent value="theme">
          <ThemePanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
