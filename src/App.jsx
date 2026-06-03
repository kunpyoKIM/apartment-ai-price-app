import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Moon,
  Sun,
  Printer,
  RotateCcw,
  MapPinned,
  Building2,
  Search,
  Home,
  Store,
  ShieldCheck,
  Sparkles,
  Award,
  Percent,
  ReceiptText,
  FileText,
  MousePointerClick,
  Database,
  BarChart3,
} from "lucide-react";

const toNum = (v) => {
  const n = Number(String(v).replace(/,/g, ""));
  return Number.isFinite(n) ? n : 0;
};

const fmt = (n) => Math.round(n || 0).toLocaleString("ko-KR");

const brandOptions = [
  "디에이치", "아크로", "래미안", "자이", "푸르지오", "힐스테이트", "롯데캐슬", "더샵", "e편한세상", "아이파크", "SK뷰", "우미린", "호반써밋", "중흥S클래스", "일반브랜드", "브랜드없음",
];

const brandPremiumMap = {
  "디에이치": 8.0,
  "아크로": 7.5,
  "래미안": 6.0,
  "자이": 5.5,
  "푸르지오": 4.0,
  "힐스테이트": 4.0,
  "롯데캐슬": 3.5,
  "더샵": 3.5,
  "e편한세상": 3.0,
  "아이파크": 3.0,
  "SK뷰": 2.5,
  "우미린": 2.0,
  "호반써밋": 2.0,
  "중흥S클래스": 1.5,
  "일반브랜드": 0,
  "브랜드없음": -2,
};

const projectRows = [
  { name: "마곡10-2 토지임대부 분양아파트", metro: "서울특별시", city: "강서구", dong: "마곡동", address: "서울특별시 강서구 마곡동 730-82", scale: "공공분양·토지임대부", households: 0, retail: 0, groundArea: 8200, basementArea: 3100, aptSale: 45308, retailSale: 0, aptDeal: 43000, retailDeal: 0, jeonse: 28000, deposit: 0, rent: 0, status: "계약 예정", x: 126.824, y: 37.567 },
  { name: "라클라체 자이드 파인아파트", metro: "서울특별시", city: "동작구", dong: "노량진동", address: "서울특별시 동작구 노량진동 294-220", scale: "사후공급", households: 0, retail: 0, groundArea: 6800, basementArea: 2600, aptSale: 258510, retailSale: 0, aptDeal: 230000, retailDeal: 0, jeonse: 95000, deposit: 0, rent: 0, status: "당첨자 발표", x: 126.944, y: 37.513 },
  { name: "서울원 아이파크", metro: "서울특별시", city: "노원구", dong: "월계동", address: "서울특별시 노원구 월계동", scale: "대단지 복합개발", households: 1856, retail: 120, groundArea: 52000, basementArea: 21000, aptSale: 44500, retailSale: 65000, aptDeal: 40500, retailDeal: 59000, jeonse: 27500, deposit: 9000, rent: 360, status: "분양정보 확인 필요", x: 127.058, y: 37.628 },
  { name: "동작 두산위브 트레지움", metro: "서울특별시", city: "동작구", dong: "상도동", address: "서울특별시 동작구 상도동", scale: "민간분양", households: 582, retail: 28, groundArea: 15500, basementArea: 6200, aptSale: 52000, retailSale: 72000, aptDeal: 49000, retailDeal: 68000, jeonse: 33000, deposit: 11000, rent: 430, status: "분양정보 확인 필요", x: 126.952, y: 37.5 },
  { name: "시흥 하중 A1BL 아파트", metro: "경기도", city: "시흥시", dong: "하중동", address: "경기도 시흥시 하중동", scale: "공공분양", households: 900, retail: 20, groundArea: 24000, basementArea: 9000, aptSale: 22000, retailSale: 35000, aptDeal: 20500, retailDeal: 32000, jeonse: 14500, deposit: 5000, rent: 210, status: "접수 예정·진행", x: 126.805, y: 37.393 },
  { name: "수원역 아너스빌 타임원 아파트", metro: "경기도", city: "수원시", dong: "수원역 생활권", address: "경기도 수원시 수원역 생활권", scale: "민간분양", households: 700, retail: 45, groundArea: 22000, basementArea: 8500, aptSale: 29500, retailSale: 48000, aptDeal: 27500, retailDeal: 44000, jeonse: 18500, deposit: 6500, rent: 280, status: "접수 예정·진행", x: 127.0, y: 37.265 },
  { name: "용인 푸르지오 원클러스터 파크", metro: "경기도", city: "용인시", dong: "처인구", address: "경기도 용인시 처인구", scale: "민간분양", households: 1681, retail: 50, groundArea: 45500, basementArea: 18000, aptSale: 24500, retailSale: 39000, aptDeal: 23000, retailDeal: 36000, jeonse: 15500, deposit: 5500, rent: 230, status: "접수 예정·진행", x: 127.204, y: 37.235 },
];

const districtCenter = {
  "서울특별시 강남구 역삼동": { x: 127.036, y: 37.5 },
  "서울특별시 강서구 마곡동": { x: 126.824, y: 37.567 },
  "서울특별시 동작구 노량진동": { x: 126.944, y: 37.513 },
  "서울특별시 동작구 상도동": { x: 126.952, y: 37.5 },
  "서울특별시 노원구 월계동": { x: 127.058, y: 37.628 },
  "경기도 시흥시 하중동": { x: 126.805, y: 37.393 },
  "경기도 수원시": { x: 127.0, y: 37.265 },
  "경기도 용인시 처인구": { x: 127.204, y: 37.235 },
};

const sourceRows = [
  ["국토교통부", "실거래가, 인허가, 공급계획"],
  ["주택도시보증공사", "분양보증, 고분양가 심사"],
  ["한국부동산원", "가격지수, 미분양, 전세동향"],
  ["청약홈", "모집공고, 분양가, 청약경쟁률"],
  ["통계청", "인구, 가구, 전입·전출"],
];

function parseAddress(address) {
  const parts = String(address || "").trim().split(/\s+/).filter(Boolean);
  const metro = parts.find((p) => /특별시|광역시|특별자치시|특별자치도|경기도|충청|전라|경상|강원|제주/.test(p)) || "서울특별시";
  const city = parts.find((p) => /구$|시$|군$/.test(p) && p !== metro) || "강남구";
  const dong = parts.find((p) => /동$|읍$|면$|리$/.test(p)) || "역삼동";
  return { metro, city, dong };
}

function getCenter(region) {
  const exact = `${region.metro} ${region.city} ${region.dong}`;
  const wide = `${region.metro} ${region.city}`;
  if (districtCenter[exact]) return districtCenter[exact];
  if (districtCenter[wide]) return districtCenter[wide];
  if (region.metro === "경기도") return { x: 127.0, y: 37.3 };
  return { x: 127.036, y: 37.5 };
}

function calcDistanceKm(a, b) {
  const dx = (a.x - b.x) * 88;
  const dy = (a.y - b.y) * 111;
  return Math.sqrt(dx * dx + dy * dy);
}

function gradeFromScore(score) {
  if (score >= 88) return "S";
  if (score >= 78) return "A";
  if (score >= 68) return "B";
  if (score >= 58) return "C";
  return "D";
}

function riskGrade(probability) {
  if (probability < 15) return "매우낮음";
  if (probability < 25) return "낮음";
  if (probability < 40) return "보통";
  if (probability < 60) return "높음";
  return "매우높음";
}

function Field({ label, value, onChange, unit, wide = false }) {
  return (
    <label className={wide ? "space-y-1 md:col-span-2" : "space-y-1"}>
      <div className="flex items-center justify-between gap-2 text-xs font-semibold text-slate-600 dark:text-white">
        <span>{label}</span>
        {unit && <span className="text-slate-400 dark:text-white">{unit}</span>}
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-full rounded-xl border border-amber-200 bg-amber-50 px-3 text-right text-sm text-slate-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200 dark:border-slate-500 dark:bg-slate-950 dark:text-white"
      />
    </label>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="space-y-1">
      <div className="text-xs font-semibold text-slate-600 dark:text-white">{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-full rounded-xl border border-amber-200 bg-amber-50 px-3 text-sm text-slate-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200 dark:border-slate-500 dark:bg-slate-950 dark:text-white"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function SmallCard({ icon: Icon, title, value, sub }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-white">
        <Icon className="h-4 w-4" /> {title}
      </div>
      <div className="mt-2 truncate text-xl font-bold text-slate-950 dark:text-white">{value}</div>
      {sub && <div className="mt-1 truncate text-xs text-slate-500 dark:text-white">{sub}</div>}
    </div>
  );
}

function ScoreBar({ label, value }) {
  const safe = Math.max(0, Math.min(100, toNum(value)));
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
      <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-white">
        <span>{label}</span>
        <span>{fmt(safe)}점</span>
      </div>
      <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-700">
        <div className="h-2.5 rounded-full bg-amber-400" style={{ width: `${safe}%` }} />
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, children, right }) {
  return (
    <Card className="rounded-2xl border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900 print:rounded-none print:shadow-none">
      <CardContent className="p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-base font-bold text-slate-950 dark:text-white">
            {Icon && <Icon className="h-5 w-5" />} {title}
          </h2>
          {right}
        </div>
        {children}
      </CardContent>
    </Card>
  );
}

export default function ApartmentReverseEstimatorApp() {
  const [dark, setDark] = useState(false);
  const [newLotNumber, setNewLotNumber] = useState("서울특별시 강남구 역삼동 000-00");
  const [newLandArea, setNewLandArea] = useState("1,200");
  const [newAptArea, setNewAptArea] = useState("8,000");
  const [newRetailArea, setNewRetailArea] = useState("650");
  const [newBasementArea, setNewBasementArea] = useState("3,500");
  const [brandName, setBrandName] = useState("래미안");
  const [communityLevel, setCommunityLevel] = useState("상");
  const [parkingLevel, setParkingLevel] = useState("상");
  const [unitPlanLevel, setUnitPlanLevel] = useState("상");
  const [radius, setRadius] = useState("3.0");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [populationScore, setPopulationScore] = useState("78");
  const [supplyScore, setSupplyScore] = useState("68");
  const [unsoldRisk, setUnsoldRisk] = useState("18");
  const [jeonseScore, setJeonseScore] = useState("72");
  const [transportScore, setTransportScore] = useState("84");
  const [jobScore, setJobScore] = useState("81");
  const [schoolScore, setSchoolScore] = useState("76");
  const [policyRisk, setPolicyRisk] = useState("35");

  const autoRegion = useMemo(() => parseAddress(newLotNumber), [newLotNumber]);
  const center = useMemo(() => getCenter(autoRegion), [autoRegion]);

  const nearbyProjects = useMemo(() => {
    return projectRows
      .map((p) => ({ ...p, distance: calcDistanceKm(center, p) }))
      .filter((p) => p.metro === autoRegion.metro || p.distance <= Math.max(toNum(radius), 3) * 6)
      .sort((a, b) => a.distance - b.distance);
  }, [autoRegion, center, radius]);

  const selected = nearbyProjects[selectedIndex] || nearbyProjects[0] || { ...projectRows[0], distance: 0 };

  const result = useMemo(() => {
    const safeDistance = Number.isFinite(selected.distance) ? selected.distance : 0;
    const autoCapRate = selected.metro === "서울특별시" ? 0.042 : 0.048;
    const autoLeaseRatio = selected.metro === "서울특별시" ? 0.58 : 0.65;
    const retailIncomeValuePy = selected.rent > 0 ? selected.rent * 12 / autoCapRate + selected.deposit : 0;
    const jeonseConvertedSalePy = selected.jeonse / autoLeaseRatio;
    const aptExpectedPy = selected.aptDeal * 0.45 + jeonseConvertedSalePy * 0.3 + selected.aptSale * 0.25;
    const retailExpectedPy = selected.retailSale > 0 ? selected.retailDeal * 0.45 + retailIncomeValuePy * 0.35 + selected.retailSale * 0.2 : 0;

    const demandScore =
      toNum(populationScore) * 0.18 + toNum(jeonseScore) * 0.14 + toNum(transportScore) * 0.18 + toNum(jobScore) * 0.17 +
      toNum(schoolScore) * 0.1 + toNum(supplyScore) * 0.13 + (100 - toNum(unsoldRisk)) * 0.06 + (100 - toNum(policyRisk)) * 0.04;

    const premiumFactor = (demandScore - 60) / 100;
    const riskFactor = (toNum(unsoldRisk) + toNum(policyRisk)) / 200;
    const aiAptPy = aptExpectedPy * (1 + premiumFactor * 0.15 - riskFactor * 0.07);
    const aiRetailPy = retailExpectedPy * (1 + premiumFactor * 0.1 - riskFactor * 0.05);
    const unsoldProbability = Math.max(3, Math.min(85, toNum(unsoldRisk) * 0.55 + toNum(policyRisk) * 0.18 + (100 - demandScore) * 0.35));

    const communityPremium = communityLevel === "상" ? 1.2 : communityLevel === "중" ? 0.5 : -0.5;
    const parkingPremium = parkingLevel === "상" ? 0.8 : parkingLevel === "중" ? 0.2 : -0.5;
    const unitPlanPremium = unitPlanLevel === "상" ? 1.0 : unitPlanLevel === "중" ? 0.3 : -0.7;
    const brandPremium = brandPremiumMap[brandName] ?? 0;
    const distanceBonus = Math.max(-2, Math.min(2, 2 - safeDistance * 0.3));

    const locationPremium = Math.max(-5, Math.min(10, (demandScore - 65) * 0.16 + (toNum(transportScore) - 70) * 0.06 + (toNum(jobScore) - 70) * 0.04 + (toNum(schoolScore) - 70) * 0.03 + distanceBonus));
    const productPremium = Math.max(-3, Math.min(10, brandPremium + communityPremium + parkingPremium + unitPlanPremium));
    const riskDiscount = Math.max(0, Math.min(18, unsoldProbability * 0.13 + toNum(policyRisk) * 0.04 + Math.max(0, 60 - toNum(supplyScore)) * 0.04));

    const newAptSalePy = aiAptPy * (1 + (locationPremium + productPremium - riskDiscount) / 100);
    const newRetailSalePy = aiRetailPy ? aiRetailPy * (1 + (locationPremium * 0.7 + productPremium * 0.45 - riskDiscount * 0.8) / 100) : 0;
    const newTotalArea = toNum(newAptArea) + toNum(newRetailArea) + toNum(newBasementArea);
    const newFar = toNum(newLandArea) ? (toNum(newAptArea) + toNum(newRetailArea)) / toNum(newLandArea) * 100 : 0;
    const newAptRevenue = newAptSalePy * toNum(newAptArea);
    const newRetailRevenue = newRetailSalePy * toNum(newRetailArea);
    const newTotalRevenue = newAptRevenue + newRetailRevenue;

    const productGrade = gradeFromScore(62 + productPremium * 4);
    const locGrade = gradeFromScore(demandScore + toNum(transportScore) * 0.08 + toNum(jobScore) * 0.05 - 8);
    const pfScore = demandScore + productPremium * 2 - riskDiscount * 2;
    const pfGrade = pfScore >= 90 ? "AA" : pfScore >= 80 ? "A" : pfScore >= 70 ? "BBB" : pfScore >= 60 ? "BB" : "B";

    return {
      safeDistance,
      autoLeaseRatio,
      autoCapRate,
      retailIncomeValuePy,
      jeonseConvertedSalePy,
      aiAptPy,
      aiRetailPy,
      locationPremium,
      productPremium,
      riskDiscount,
      productGrade,
      locGrade,
      riskLabel: riskGrade(unsoldProbability),
      demandScore,
      unsoldProbability,
      newAptSalePy,
      newRetailSalePy,
      newTotalArea,
      newFar,
      newAptRevenue,
      newRetailRevenue,
      newTotalRevenue,
      pfGrade,
      selectedTotalArea: selected.groundArea + selected.basementArea,
      selectedBasementRatio: selected.groundArea + selected.basementArea ? selected.basementArea / (selected.groundArea + selected.basementArea) * 100 : 0,
    };
  }, [selected, populationScore, supplyScore, unsoldRisk, jeonseScore, transportScore, jobScore, schoolScore, policyRisk, newLandArea, newAptArea, newRetailArea, newBasementArea, brandName, communityLevel, parkingLevel, unitPlanLevel]);

  const reset = () => {
    setNewLotNumber("서울특별시 강남구 역삼동 000-00");
    setNewLandArea("1,200");
    setNewAptArea("8,000");
    setNewRetailArea("650");
    setNewBasementArea("3,500");
    setBrandName("래미안");
    setCommunityLevel("상");
    setParkingLevel("상");
    setUnitPlanLevel("상");
    setRadius("3.0");
    setSelectedIndex(0);
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div className={dark ? "min-h-screen bg-slate-950 text-white" : "min-h-screen bg-slate-50 text-slate-950"}>
        <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-slate-700 dark:bg-slate-950/95 print:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-xs font-semibold text-amber-700 dark:text-white">전국 소규모지역 AI 분양가·거래가 예측 시스템</div>
              <h1 className="text-xl font-bold md:text-2xl">아파트·근린상가 분양 및 거래가액 분석 앱</h1>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => setDark(!dark)} variant="outline" className="h-9 rounded-xl dark:border-slate-500 dark:bg-slate-900 dark:text-white">
                {dark ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />} 화면모드
              </Button>
              <Button onClick={() => window.print()} variant="outline" className="h-9 rounded-xl dark:border-slate-500 dark:bg-slate-900 dark:text-white">
                <Printer className="mr-2 h-4 w-4" /> PDF 출력
              </Button>
              <Button onClick={reset} variant="outline" className="h-9 rounded-xl dark:border-slate-500 dark:bg-slate-900 dark:text-white">
                <RotateCcw className="mr-2 h-4 w-4" /> 기본값
              </Button>
            </div>
          </div>
        </div>

        <main className="mx-auto max-w-7xl space-y-4 p-4 print:max-w-none print:p-0">
          <Section title="신규사업지 입력" icon={FileText} right={<Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">대표지번 연동</Badge>}>
            <div className="grid gap-3 md:grid-cols-4">
              <Field label="대표지번" value={newLotNumber} onChange={(v) => { setNewLotNumber(v); setSelectedIndex(0); }} unit="입력" wide />
              <Field label="토지면적" value={newLandArea} onChange={setNewLandArea} unit="평" />
              <Field label="반경" value={radius} onChange={setRadius} unit="km" />
              <Field label="아파트 연면적" value={newAptArea} onChange={setNewAptArea} unit="평" />
              <Field label="근린상가 연면적" value={newRetailArea} onChange={setNewRetailArea} unit="평" />
              <Field label="지하 연면적" value={newBasementArea} onChange={setNewBasementArea} unit="평" />
              <SelectField label="브랜드" value={brandName} onChange={setBrandName} options={brandOptions} />
              <SelectField label="커뮤니티" value={communityLevel} onChange={setCommunityLevel} options={["상", "중", "하"]} />
              <SelectField label="주차" value={parkingLevel} onChange={setParkingLevel} options={["상", "중", "하"]} />
              <SelectField label="평면" value={unitPlanLevel} onChange={setUnitPlanLevel} options={["상", "중", "하"]} />
            </div>
          </Section>

          <Section title="지역 자동인식" icon={MapPinned}>
            <div className="grid gap-3 md:grid-cols-4">
              <SmallCard icon={MapPinned} title="광역" value={autoRegion.metro} sub="대표지번 자동인식" />
              <SmallCard icon={Building2} title="시군구" value={autoRegion.city} sub="대표지번 자동인식" />
              <SmallCard icon={MapPinned} title="읍면동" value={autoRegion.dong} sub="대표지번 자동인식" />
              <SmallCard icon={ReceiptText} title="신규 규모" value={`${fmt(result.newTotalArea)} 평`} sub={`용적률 ${fmt(result.newFar)}%`} />
            </div>
          </Section>

          <Section title="현재 신규사업지 주변 분양중 위치" icon={Search} right={<Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">거리순 {nearbyProjects.length}건</Badge>}>
            <div className="max-h-72 overflow-auto rounded-2xl border border-slate-200 dark:border-slate-700">
              <table className="min-w-[900px] w-full text-sm dark:text-white">
                <thead className="sticky top-0 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-white">
                  <tr>
                    <th className="w-24 p-2 text-left print:hidden">선택</th>
                    <th className="p-2 text-left">순위</th>
                    <th className="p-2 text-left">단지명</th>
                    <th className="p-2 text-left">위치</th>
                    <th className="p-2 text-right">거리</th>
                    <th className="p-2 text-right">세대수</th>
                    <th className="p-2 text-left">상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {nearbyProjects.map((p, i) => (
                    <tr key={p.name} className={i === selectedIndex ? "bg-amber-50 dark:bg-amber-900/35" : "bg-white dark:bg-slate-900"}>
                      <td className="p-2 print:hidden">
                        <Button
                          size="sm"
                          variant="outline"
                          className={
                            i === selectedIndex
                              ? "h-8 rounded-xl border-amber-500 bg-amber-400 text-slate-950 hover:bg-amber-300 dark:border-amber-300 dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-300"
                              : "h-8 rounded-xl border-slate-300 bg-white text-slate-800 hover:bg-slate-100 dark:border-slate-500 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                          }
                          onClick={() => setSelectedIndex(i)}
                        >
                          <MousePointerClick className="mr-1 h-3 w-3" /> {i === selectedIndex ? "선택됨" : "선택"}
                        </Button>
                      </td>
                      <td className="p-2 font-semibold">{i + 1}</td>
                      <td className="p-2 font-semibold">{p.name}</td>
                      <td className="p-2 text-slate-600 dark:text-white">{p.address}</td>
                      <td className="p-2 text-right">{p.distance.toFixed(1)} km</td>
                      <td className="p-2 text-right">{p.households ? fmt(p.households) : "확인필요"}</td>
                      <td className="p-2 text-slate-600 dark:text-white">{p.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="AI 자동보정 및 신규사업부지 적정 분양가" icon={Sparkles}>
            <div className="grid gap-3 md:grid-cols-6">
              <SmallCard icon={MapPinned} title="입지보정" value={`${result.locationPremium.toFixed(1)} %`} sub={`입지등급 ${result.locGrade}`} />
              <SmallCard icon={Award} title="상품보정" value={`${result.productPremium.toFixed(1)} %`} sub={`${result.productGrade} / ${brandName}`} />
              <SmallCard icon={Percent} title="위험할인" value={`-${result.riskDiscount.toFixed(1)} %`} sub={result.riskLabel} />
              <SmallCard icon={Home} title="아파트 적정분양가" value={`${fmt(result.newAptSalePy)}`} sub="천원/평" />
              <SmallCard icon={Store} title="상가 적정분양가" value={result.newRetailSalePy ? fmt(result.newRetailSalePy) : "자료확인"} sub="천원/평" />
              <SmallCard icon={ShieldCheck} title="PF 등급" value={result.pfGrade} sub={`총수입 ${fmt(result.newTotalRevenue)}천원`} />
            </div>
            <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-slate-700 dark:border-amber-700 dark:bg-amber-950/40 dark:text-white">
              추정사유: 대표지번 기준 자동인식 지역은 {autoRegion.metro} {autoRegion.city} {autoRegion.dong}임. 가장 가까운 비교단지인 {selected.name}의 분양평단가, 최근 거래평단가, 전세 역산 매매가, 월세 수익환산가를 기준으로 하며, 브랜드 {brandName} 및 커뮤니티·주차·평면 수준을 반영함.
            </div>
          </Section>

          <Section title="선택단지 상세정보" icon={Building2}>
            <div className="overflow-auto rounded-2xl border border-slate-200 dark:border-slate-700">
              <table className="w-full min-w-[520px] text-sm dark:text-white">
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {[
                    ["단지명", selected.name],
                    ["위치", selected.address],
                    ["거리", `${result.safeDistance.toFixed(1)} km`],
                    ["규모", selected.scale],
                    ["세대수", selected.households ? `${fmt(selected.households)} 세대` : "확인필요"],
                    ["상가", selected.retail ? `${fmt(selected.retail)} 호` : "확인필요"],
                    ["지상 연면적", `${fmt(selected.groundArea)} 평`],
                    ["지하 연면적", `${fmt(selected.basementArea)} 평`],
                  ].map(([k, v]) => (
                    <tr key={k}>
                      <td className="w-36 bg-slate-50 p-2 font-semibold dark:bg-slate-800 dark:text-white">{k}</td>
                      <td className="p-2 text-right dark:text-white">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="최근 분양·거래·임대 비교" icon={BarChart3}>
            <div className="overflow-auto rounded-2xl border border-slate-200 dark:border-slate-700">
              <table className="w-full min-w-[560px] text-sm dark:text-white">
                <thead className="bg-slate-100 dark:bg-slate-800 dark:text-white">
                  <tr><th className="p-2 text-left">구분</th><th className="p-2 text-right">아파트</th><th className="p-2 text-right">근린상가</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr><td className="p-2 font-semibold">분양평단가</td><td className="p-2 text-right">{fmt(selected.aptSale)}</td><td className="p-2 text-right">{selected.retailSale ? fmt(selected.retailSale) : "자료확인"}</td></tr>
                  <tr><td className="p-2 font-semibold">거래평단가</td><td className="p-2 text-right">{fmt(selected.aptDeal)}</td><td className="p-2 text-right">{selected.retailDeal ? fmt(selected.retailDeal) : "자료확인"}</td></tr>
                  <tr><td className="p-2 font-semibold">전세·월세</td><td className="p-2 text-right">전세 {fmt(selected.jeonse)}</td><td className="p-2 text-right">보증금 {fmt(selected.deposit)} / 월세 {fmt(selected.rent)}</td></tr>
                  <tr className="bg-amber-50 dark:bg-amber-900/30"><td className="p-2 font-bold">AI 예상 거래가액</td><td className="p-2 text-right font-bold">{fmt(result.aiAptPy)}</td><td className="p-2 text-right font-bold">{result.aiRetailPy ? fmt(result.aiRetailPy) : "자료확인"}</td></tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="신규사업지 적정분양가 산정표" icon={ReceiptText}>
            <div className="overflow-auto rounded-2xl border border-slate-200 dark:border-slate-700">
              <table className="w-full min-w-[760px] text-sm dark:text-white">
                <thead className="bg-slate-100 dark:bg-slate-800">
                  <tr><th className="p-2 text-left">구분</th><th className="p-2 text-right">아파트</th><th className="p-2 text-right">근린상가</th><th className="p-2 text-left">산정근거</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr><td className="p-2 font-semibold">신규 연면적</td><td className="p-2 text-right">{fmt(toNum(newAptArea))} 평</td><td className="p-2 text-right">{fmt(toNum(newRetailArea))} 평</td><td className="p-2">입력 연면적 기준</td></tr>
                  <tr><td className="p-2 font-semibold">참조 분양평단가</td><td className="p-2 text-right">{fmt(selected.aptSale)} 천원/평</td><td className="p-2 text-right">{selected.retailSale ? `${fmt(selected.retailSale)} 천원/평` : "자료확인"}</td><td className="p-2">선택 비교단지 분양가</td></tr>
                  <tr><td className="p-2 font-semibold">AI 자동보정</td><td className="p-2 text-right">입지 {result.locationPremium.toFixed(1)}% / 상품 {result.productPremium.toFixed(1)}% / 위험 -{result.riskDiscount.toFixed(1)}%</td><td className="p-2 text-right">동일 기준</td><td className="p-2">브랜드·수요·위험 자동산출</td></tr>
                  <tr className="bg-amber-50 dark:bg-amber-900/30"><td className="p-2 font-bold">신규 적정 분양가</td><td className="p-2 text-right font-bold">{fmt(result.newAptSalePy)} 천원/평</td><td className="p-2 text-right font-bold">{result.newRetailSalePy ? `${fmt(result.newRetailSalePy)} 천원/평` : "자료확인"}</td><td className="p-2">거래·임대·수요 보정 후 산출</td></tr>
                  <tr className="bg-amber-50 dark:bg-amber-900/30"><td className="p-2 font-bold">총 분양수입</td><td className="p-2 text-right font-bold">{fmt(result.newAptRevenue)} 천원</td><td className="p-2 text-right font-bold">{fmt(result.newRetailRevenue)} 천원</td><td className="p-2">합계 {fmt(result.newTotalRevenue)} 천원</td></tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="AI 자동보정 산출내역" icon={Sparkles}>
            <div className="overflow-auto rounded-2xl border border-slate-200 dark:border-slate-700">
              <table className="w-full min-w-[860px] text-sm dark:text-white">
                <thead className="bg-slate-100 dark:bg-slate-800 dark:text-white">
                  <tr>
                    <th className="p-2 text-left">구분</th>
                    <th className="p-2 text-right">산출값</th>
                    <th className="p-2 text-left">반영요소</th>
                    <th className="p-2 text-left">해석</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr>
                    <td className="p-2 font-semibold">입지보정</td>
                    <td className="p-2 text-right font-bold">{result.locationPremium.toFixed(1)}%</td>
                    <td className="p-2">수요점수 {fmt(result.demandScore)}점, 교통·철도 {transportScore}점, 일자리 {jobScore}점, 학군·생활권 {schoolScore}점, 비교단지 거리 {result.safeDistance.toFixed(1)}km</td>
                    <td className="p-2">입지등급 {result.locGrade}로 평가되며, 신규사업지와 비교단지의 근접성 및 생활권 수요를 반영함.</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">상품보정</td>
                    <td className="p-2 text-right font-bold">{result.productPremium.toFixed(1)}%</td>
                    <td className="p-2">브랜드 {brandName}, 커뮤니티 {communityLevel}, 주차 {parkingLevel}, 평면 {unitPlanLevel}</td>
                    <td className="p-2">상품등급 {result.productGrade}로 평가되며, 브랜드 인지도와 단지 상품성을 분양가 프리미엄으로 반영함.</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">위험할인</td>
                    <td className="p-2 text-right font-bold">-{result.riskDiscount.toFixed(1)}%</td>
                    <td className="p-2">미분양위험 {unsoldRisk}점, 정책위험 {policyRisk}점, 공급부족 {supplyScore}점, 미분양 확률 {fmt(result.unsoldProbability)}%</td>
                    <td className="p-2">위험등급 {result.riskLabel}로 평가되며, 미분양·정책·공급 리스크를 분양가 할인요인으로 반영함.</td>
                  </tr>
                  <tr className="bg-amber-50 dark:bg-amber-900/30">
                    <td className="p-2 font-bold">순보정률</td>
                    <td className="p-2 text-right font-bold">{(result.locationPremium + result.productPremium - result.riskDiscount).toFixed(1)}%</td>
                    <td className="p-2">입지보정 + 상품보정 - 위험할인</td>
                    <td className="p-2">신규사업지 적정 분양가 산정 시 최종 적용되는 총 보정률임.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="지역 수요·위험 점수" icon={Database}>
            <div className="grid gap-3 md:grid-cols-4">
              <Field label="인구·가구" value={populationScore} onChange={setPopulationScore} unit="점" />
              <Field label="공급부족" value={supplyScore} onChange={setSupplyScore} unit="점" />
              <Field label="미분양위험" value={unsoldRisk} onChange={setUnsoldRisk} unit="점" />
              <Field label="전세수요" value={jeonseScore} onChange={setJeonseScore} unit="점" />
              <Field label="교통·철도" value={transportScore} onChange={setTransportScore} unit="점" />
              <Field label="일자리" value={jobScore} onChange={setJobScore} unit="점" />
              <Field label="학군·생활권" value={schoolScore} onChange={setSchoolScore} unit="점" />
              <Field label="정책위험" value={policyRisk} onChange={setPolicyRisk} unit="점" />
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-4">
              <ScoreBar label="인구·가구 기반수요" value={populationScore} />
              <ScoreBar label="공급부족 지수" value={supplyScore} />
              <ScoreBar label="미분양 위험" value={unsoldRisk} />
              <ScoreBar label="전세수요 지수" value={jeonseScore} />
              <ScoreBar label="교통·철도 지수" value={transportScore} />
              <ScoreBar label="일자리 지수" value={jobScore} />
              <ScoreBar label="학군·생활권 지수" value={schoolScore} />
              <ScoreBar label="정책위험 지수" value={policyRisk} />
            </div>
          </Section>

          <Section title="5대 기관 참조 데이터" icon={Database}>
            <div className="grid gap-2 md:grid-cols-5">
              {sourceRows.map(([agency, data]) => (
                <div key={agency} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
                  <div className="text-sm font-bold">{agency}</div>
                  <div className="mt-1 text-xs leading-5 text-slate-500 dark:text-white">{data}</div>
                </div>
              ))}
            </div>
          </Section>
        </main>
      </div>
    </div>
  );
}
