import {
  DataSheetGrid,
  checkboxColumn,
  textColumn,
  keyColumn,
  intColumn,
} from "react-datasheet-grid";
import type { Column } from "react-datasheet-grid";
import copy from "copy-to-clipboard";
import { toast } from '@/components/toast';

import "react-datasheet-grid/dist/style.css";

import { usePersistData } from "@/store";
import { useMemo, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

interface Data {
  word: string | null;
  value: number | null;
}

export const Data = () => {
  const { data, setData } = usePersistData();
  const [exportOpen, setExportOpen] = useState(false);
  const displayData = useMemo(() => {
    return data.map(([word, value]) => ({
      word,
      value,
    }));
  }, [data]);
  const setOriData = (data: Data[]) => {
    setData(data.map(({ word, value }) => [word, value]));
  };
  const columns: Column<Data>[] = [
    {
      ...keyColumn<Data, "word">("word", textColumn),
      title: "词",
    },
    {
      ...keyColumn<Data, "value">("value", intColumn),
      title: "权重",
    },
  ];
  // 处理导入
  const [importData, setImportData] = useState<string>('');
  const handleImport = () => {
    try {
      console.log('importData', importData)
      const data = JSON.parse(importData);
      if (!Array.isArray(data)) {
        toast('数据格式错误')
        return
      }
      if (
        data.length &&
        !data.every(
          (item) =>
            item &&
              Array.isArray(item) && item.length === 2
        )
      ) {
        toast('数据格式错误')
        return
      }
      setData(data);
      setExportOpen(false);
      toast('导入成功')
    } catch (e) {
      console.log('导入失败', e)
      toast('导入失败')
    }
  }
  return (
    <div className="max-w-[800px] mx-auto">
      <DataSheetGrid<Data>
        value={displayData}
        onChange={setOriData}
        columns={columns}
      />
      <Dialog open={exportOpen} onOpenChange={setExportOpen}>
        <DialogTrigger>
          <Button className="mt-8">导入/导出</Button>
        </DialogTrigger>
        <DialogContent className="min-h-64">
          <DialogHeader>
            <Tabs defaultValue="export" className="w-full text-center py-4">
              <DialogTitle>
                <TabsList>
                  <TabsTrigger value="export">导出</TabsTrigger>
                  <TabsTrigger value="import">导入</TabsTrigger>
                </TabsList>
              </DialogTitle>
              <DialogDescription>
                <TabsContent value="export">
                  <Button
                    className="mt-8"
                    onClick={() => {
                      copy(JSON.stringify(data));
                      setExportOpen(false);
                      toast('复制成功')
                    }}
                  >
                    复制数据
                  </Button>
                </TabsContent>
                <TabsContent value="import">
                  <Textarea 
                    placeholder="导入词云数据"
                    value={importData}
                    onChange={(e) => setImportData(e.target.value)}
                  />
                  <Button className="mt-2" onClick={handleImport}>确定</Button>
                </TabsContent>
              </DialogDescription>
            </Tabs>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
