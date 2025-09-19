import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { PopoverContent } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fontVariables } from "@/data";
import type { Box } from "@/types/boxpoolTypes";

export default function BoxEditPopUp({
  box,
  boxNumber,
  boxName,
  setBoxName,
  boxFont,
  setBoxFont,
  boxFontSize,
  setBoxFontSize,
  setBoxImage,
  setBoxImageURL,
  uploadImage,
  writeBoxData,
}: {
  box: Box;
  boxNumber: number;
  boxName: string;
  setBoxName: Function;
  boxFont: string;
  setBoxFont: Function;
  boxFontSize: number;
  setBoxFontSize: Function;
  setBoxImage: Function;
  setBoxImageURL: Function;
  uploadImage: Function;
  writeBoxData: Function;
}) {
  const clearBoxContents = () => {
    setBoxName("");
    setBoxImageURL("");
    setBoxFont("Arial");
    setBoxFontSize(14);
    console.log("Clear Box:", boxNumber);
  };

  return (
    <PopoverContent onInteractOutside={() => writeBoxData()}>
      <Tabs defaultValue={box.image ? "image" : "text"}>
        <TabsList>
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="image">Image</TabsTrigger>
        </TabsList>
        <TabsContent value="text">
          <div className="flex flex-col">
            <div className="font-bold text-lg text-center">
              Box #{boxNumber}
            </div>
            <Label htmlFor="boxName" className="mb-1">
              Name:
            </Label>
            <Input
              id="boxName"
              type="text"
              value={boxName}
              maxLength={20}
              onChange={(e) => {
                setBoxName(e.target.value);
              }}
            />
            <Label htmlFor="fontSelect" className="mb-1">
              Font:
            </Label>
            <Select
              name="fontSelect"
              // defaultValue="Arial"
              value={boxFont}
              onValueChange={(e) => {
                setBoxFont(e);
              }}
            >
              <SelectTrigger className="w-full mb-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontVariables.map((font, i) => {
                  return (
                    <SelectItem
                      value={font.name}
                      style={{ fontFamily: `${font.name}` }}
                      key={i}
                    >
                      {font.displayName}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <Label htmlFor="fontSize" className="mb-1">
              Font Size:
            </Label>
            <Input
              id="fontSize"
              type="number"
              value={boxFontSize}
              // defaultValue={14}
              onChange={(e) => {
                setBoxFontSize(Number(e.target.value));
              }}
            />
            <Button variant={"destructive"} onClick={clearBoxContents}>
              <Trash2 />
              Clear
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="image">
          <div className="flex flex-col">
            <Label htmlFor="boxImage" className="mb-1">
              Image:
            </Label>
            <Input
              id="boxImage"
              type="file"
              onChange={(e) => setBoxImage(e.target.files?.[0])}
            />
            <Button onClick={() => uploadImage()}>Upload</Button>
            <Button variant={"destructive"} onClick={clearBoxContents}>
              <Trash2 />
              Clear
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </PopoverContent>
  );
}
