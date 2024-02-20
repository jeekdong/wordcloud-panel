import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Data } from '@/components/data'
import { Word } from '@/components/word-cloud'

function App() {
  return (
    <div className="w-full h-full min-h-[100vh] bg-slate-50">
      <Tabs defaultValue="word-cloud" className="w-full text-center py-4">
        <TabsList>
          <TabsTrigger value="word-cloud">词云</TabsTrigger>
          <TabsTrigger value="data">数据</TabsTrigger>
        </TabsList>
        <TabsContent value="word-cloud">
          <Word />
        </TabsContent>
        <TabsContent value="data">
          <Data />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
