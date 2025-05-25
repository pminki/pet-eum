import { Button } from "~/common/components/ui/button";
import { Form, Link } from "react-router";
import InputPair from "~/common/components/input-pair";
import type { Route } from "./+types/services-page";
import { Building, CalendarIcon, Dog, Footprints, House, MailOpen, PawPrint, Sun } from "lucide-react";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "~/common/components/ui/popover";
import { cn } from "~/lib/utils";
import { Calendar } from "~/common/components/ui/calendar";
import { format } from "date-fns";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "서비스 찾기 | wemake" }
  ];
}

export default function ServicesPage() {
  const [startDate, setStartDate] = React.useState<Date>()
  const [endDate, setEndDate] = React.useState<Date>()
  
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <div className="flex items-center flex-col justify-center w-half gap-10">
        <h1 className="text-2xl font-semibold">도우미 찾기</h1>
        <Form className="w-full">
        <div className="font-bold text-sm mb-1">서비스 선택</div>
          <div className="flex justify-between items-center gap-2 mb-7">
            <Button variant="outline" className="flex flex-col py-10 w-1/4">
              <div><Building /></div>
              방문 돌봄
            </Button>
            <Button variant="outline" className="flex flex-col py-10 w-1/5">
              <div><PawPrint /></div>
              산책
            </Button>
            <Button variant="outline" className="flex flex-col py-10 w-1/4">
              <div><Sun /></div>
              낮시간 돌봄
            </Button>
            <Button variant="outline" className="flex flex-col py-10 w-1/4">
              <div><House /></div>
              하우스 돌봄
            </Button>
          </div>

          <div className="mb-7">
            <InputPair
              label="방문/하우스 주소"
              name="address"
              id="address"
              description=""
              required
              placeholder="서울시 강남구 000"
            />
          </div>

          <div className="font-bold text-sm mb-1">돌봄 기간</div>
          <div className="flex justify-between items-center gap-5 mb-7"> 
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[330px] justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {startDate ? format(startDate, "PPP") : <span>시작일</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[330px] justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {endDate ? format(endDate, "PPP") : <span>종료일</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="font-bold text-sm mb-1">반려동물 몸무게</div>
          <div className="flex justify-between items-center gap-2 mb-7">            
            <Button variant="outline" className="flex flex-col p-10 max-w-1/5">
              <div><Dog /></div>
              0~5Kg
            </Button>
            <Button variant="outline" className="flex flex-col p-10">
              <div><Dog /></div>
              6~10Kg
            </Button>
            <Button variant="outline" className="flex flex-col p-10">
              <div><Dog /></div>
              11~15Kg
            </Button>
            <Button variant="outline" className="flex flex-col p-10">
              <div><Dog /></div>
              16~20Kg
            </Button>
            <Button variant="outline" className="flex flex-col p-10">
              <div><Dog /></div>
              21Kg~
            </Button>
          </div>
          <Button className="w-full" type="submit">
            도우미 찾기
          </Button>
        </Form>
      </div>
    </div>
  );
}