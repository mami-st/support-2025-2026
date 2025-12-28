// 生活困窮者支援情報データ（2025-2026年末年始）
// CSVデータから変換

const SUPPORT_DATA = {
  // 支援団体情報
  providers: {
    "e8310155-709b-4826-9cd2-ed5952a0d9c8": { name: "TOKYOチャレンジネット", legalName: "" },
    "2ed47a2a-a905-4af9-a0c3-3a35b531cbad": { name: "厚生労働省", legalName: "" },
    "7dc16eff-db44-4939-b325-45c60d8d16b3": { name: "内閣府", legalName: "" },
    "91f68e79-7137-4744-8ef6-eca332c6539c": { name: "もやい", legalName: "認定NPO法人自立生活サポートセンター・もやい" },
    "a8d30a5f-dfae-4343-8ad4-e5ca5dc79405": { name: "一般社団法人 社会的包摂サポートセンター", legalName: "" },
    "5e7ad034-9222-4351-a0d7-14d9c0222751": { name: "仙台夜まわりグループ", legalName: "" },
    "36b0f1d5-09ea-4baf-a7d4-46cdfcb5b501": { name: "ワンファミリー仙台", legalName: "" },
    "6f8f1191-7a8f-4a03-a8c8-2cbf4b2a8c57": { name: "萌友", legalName: "" },
    "b00d96ba-e7c8-495e-ae41-472f2b19d52c": { name: "ガンバの会", legalName: "" },
    "dc42edff-99cc-435d-afc2-80386bd62271": { name: "反貧困ささえあい千葉", legalName: "" },
    "9097b0db-417d-4d84-b3f9-c58a41f89c80": { name: "反貧困ネットワーク", legalName: "" },
    "66e5c6f1-6b4d-40f6-b3b2-730b7131e992": { name: "トイミッケ", legalName: "" },
    "c4379a94-a523-41e4-ab68-30174f2220c7": { name: "TENOHASI", legalName: "" },
    "f42d0af7-c0e4-430b-b399-6649ac220bbe": { name: "山谷越年越冬闘争", legalName: "" },
    "71ea64bf-3fde-43a2-91c4-65740cf85d71": { name: "わかちあい練馬", legalName: "" },
    "503a00bb-6cc3-46c6-9a4f-d39e9a1e730f": { name: "さんきゅうハウス", legalName: "" },
    "bd7b792f-37e9-456b-94c9-5b3002c250f7": { name: "くにたち年末年始困りごと相談会", legalName: "" },
    "e082a958-b4cd-4ab6-af79-ca2d263e7c86": { name: "年末・年始困りごと相談会", legalName: "" },
    "f5da4dfe-4838-4971-be7d-7dd1ce5ec7a8": { name: "寿越冬闘争実行委員会", legalName: "" },
    "a1930895-37af-4d30-8a48-b0cff456be21": { name: "名古屋越冬実行委員会", legalName: "" },
    "fcd1c5de-6f0f-4b86-9591-02a9d1cffc0e": { name: "釜ヶ崎越冬闘争実行委員会", legalName: "" },
    "bbfb66af-3331-4ed3-8761-33ce7e956c36": { name: "住まいとくらし SOS おおさか", legalName: "" },
    "9998eaa3-954a-4a4d-978d-53ef541bf7aa": { name: "神戸越年越冬実行委員会", legalName: "" },
    "2420d75b-0d4b-49f9-aafc-2c4b27e25bbc": { name: "NPO法人岡山きずな", legalName: "" },
    "d6b18514-029a-4548-b4b9-b6cf13044548": { name: "野宿労働者の人権を守る広島夜回りの会", legalName: "" },
    "f3ef4613-9eff-4e68-b165-23295a96ea38": { name: "NPO法人抱樸", legalName: "" },
    "0675d6bf-df52-4880-9421-3cf3f193cacd": { name: "ホームレス自立支援センター北九州", legalName: "" },
    "41ca1d31-9445-4e09-9e08-9004eba7cae6": { name: "社会福祉法人グリーンコープ抱樸館福岡", legalName: "" },
    "ee0a506f-ea8e-42b1-b474-cc97fc64ac98": { name: "福岡おにぎりの会", legalName: "" },
    "d155e299-9d1c-449f-ade9-426384a17b50": { name: "NPO法人かごしまホームレス生活者支えあう会", legalName: "" }
  },

  // 緊急連絡先（常時表示用）
  emergencyContacts: [
    {
      name: "よりそいホットライン",
      description: "24時間365日の何でも電話相談",
      phone: "0120-279-338",
      phoneAlt: "0120-279-226（岩手・宮城・福島）",
      provider: "一般社団法人 社会的包摂サポートセンター",
      isEmergency: true
    },
    {
      name: "孤独・孤立相談ダイヤル",
      description: "12/25〜1/4 24時間対応（チャット・メール相談も可）",
      phone: "#9999",
      url: "https://www.notalone-cao.go.jp/toitsu/",
      provider: "内閣府",
      isEmergency: true
    },
    {
      name: "まもろうよ こころ",
      description: "不安や悩みを抱える方への相談窓口まとめ",
      url: "https://www.mhlw.go.jp/mamorouyokokoro/",
      provider: "厚生労働省",
      isEmergency: true
    }
  ],

  // 支援情報（地域別）
  offers: [
    // 全国
    {
      id: "012aa651-0dda-4522-9cd3-fde5a9d3b17a",
      providerId: "a8d30a5f-dfae-4343-8ad4-e5ca5dc79405",
      providerName: "一般社団法人 社会的包摂サポートセンター",
      serviceName: "よりそいホットライン 24時間365日の何でも電話相談",
      prefecture: "全国",
      area: "",
      schedule: "24時間365日",
      location: "",
      phone: "0120-279-338",
      phoneAlt: "0120-279-226（岩手・宮城・福島）",
      url: "",
      notes: "",
      serviceTypes: ["電話相談"],
      dates: [],
      isNational: true,
      sourceText: "■全国\nよりそいホットライン 24時間365日の何でも電話相談\n一般社団法人 社会的包摂サポートセンター\nTEL 0120-279-338　（岩手、宮城、福島の3県からのみTEL:0120-279-226）"
    },

    // 東京・TOKYOチャレンジネット
    {
      id: "6a2ef1d4-4348-4b1e-b974-34557a4e39c1",
      providerId: "e8310155-709b-4826-9cd2-ed5952a0d9c8",
      providerName: "TOKYOチャレンジネット",
      serviceName: "年末年始の一時的な宿泊先提供（臨時開所）",
      prefecture: "東京",
      area: "",
      schedule: "12月29日に臨時開所、年始は1月5日から開所",
      location: "",
      phone: "",
      url: "https://www.tokyo-challenge.net/",
      notes: "東京都による公的支援",
      serviceTypes: ["宿泊支援"],
      dates: ["2025-12-29", "2026-01-05"],
      isPublic: true,
      sourceText: "※東京都は「TOKYOチャレンジネット」にて、12月29日に臨時開所をおこない年末年始の一時的な宿泊先を提供します。年始は1月5日からの開所となります。"
    },

    // もやい - 食料品配布&相談会
    {
      id: "b2c77af9-b297-4b00-9782-bdccd17114a0",
      providerId: "91f68e79-7137-4744-8ef6-eca332c6539c",
      providerName: "もやい",
      serviceName: "食料品配布&相談会",
      prefecture: "東京",
      area: "新宿",
      schedule: "12月27日14時～（13時半ごろにはお越しください）、1月3日14時～（13時半ごろにはお越しください）",
      location: "東京新宿都庁下",
      phone: "",
      url: "https://www.npomoyai.or.jp/20251224/10521",
      notes: "",
      serviceTypes: ["食料配布", "相談会"],
      dates: ["2025-12-27", "2026-01-03"],
      sourceText: "■もやい\n・食料品配布&相談会\n12月27日14時～（13時半ごろにはお越しください）\n1月3日14時～（13時半ごろにはお越しください）\n東京新宿都庁下"
    },

    // もやい - 臨時相談会
    {
      id: "4c5fe0e1-e9c4-4985-a65a-34c18a119542",
      providerId: "91f68e79-7137-4744-8ef6-eca332c6539c",
      providerName: "もやい",
      serviceName: "臨時相談会（緊急対応）",
      prefecture: "東京",
      area: "新宿",
      schedule: "12月30日（15～20時）",
      location: "もやい事務所",
      phone: "",
      url: "https://www.npomoyai.or.jp/20251224/10521",
      notes: "※12月30日は緊急対応のため大変申し訳ありませんが緊急でない方の対応はお断りをさせていただきます。",
      serviceTypes: ["相談会"],
      dates: ["2025-12-30"],
      isEmergencyOnly: true,
      sourceText: "■もやい\n・臨時相談会\n12月30日（15～20時）\n年末緊急対応として事務所での臨時相談会をおこないます。\n※12月30日は緊急対応のため大変申し訳ありませんが緊急でない方の対応はお断りをさせていただきます。"
    },

    // 宮城・仙台 - 仙台夜まわりグループ 食事提供
    {
      id: "5a7106ad-d2a3-4827-ade4-18311785991e",
      providerId: "5e7ad034-9222-4351-a0d7-14d9c0222751",
      providerName: "仙台夜まわりグループ",
      serviceName: "食事提供・相談会ほか",
      prefecture: "宮城",
      area: "仙台",
      schedule: "12月30日～1月4日（各日9時半～10時）",
      location: "みやぎNPOプラザ門前（仙台市宮城野区榴ケ岡5）",
      phone: "",
      url: "",
      notes: "",
      serviceTypes: ["炊き出し", "相談会"],
      dates: ["2025-12-30", "2025-12-31", "2026-01-01", "2026-01-02", "2026-01-03", "2026-01-04"],
      sourceText: "■宮城・仙台\n【仙台夜まわりグループ】\n・食事提供・相談会ほか\n12月30日～1月4日（各日9時半～10時）\nみやぎNPOプラザ門前（仙台市宮城野区榴ケ岡5）"
    },

    // 宮城・仙台 - 仙台夜まわりグループ 電話相談
    {
      id: "ba115a36-55b8-4710-88fc-619d69dbef35",
      providerId: "5e7ad034-9222-4351-a0d7-14d9c0222751",
      providerName: "仙台夜まわりグループ",
      serviceName: "電話相談",
      prefecture: "宮城",
      area: "仙台",
      schedule: "12月27日～1月5日（8時～21時半）",
      location: "",
      phone: "050-1720-9432",
      url: "",
      notes: "",
      serviceTypes: ["電話相談"],
      dates: ["2025-12-27", "2025-12-28", "2025-12-29", "2025-12-30", "2025-12-31", "2026-01-01", "2026-01-02", "2026-01-03", "2026-01-04", "2026-01-05"],
      sourceText: "■宮城・仙台\n【仙台夜まわりグループ】\n・電話相談\n12月27日～1月5日（8時～21時半）\nTEL 050-1720-9432"
    },

    // 宮城・仙台 - ワンファミリー仙台
    {
      id: "2550ca99-d13a-491e-b092-e15a48610bdd",
      providerId: "36b0f1d5-09ea-4baf-a7d4-46cdfcb5b501",
      providerName: "ワンファミリー仙台",
      serviceName: "生活の相談",
      prefecture: "宮城",
      area: "仙台",
      schedule: "12月27日～1月5日（9時～18時）",
      location: "仙台市青葉区二日町4-26リバティーハイツ二日町102",
      phone: "022-398-9854",
      url: "",
      notes: "相談の際はまずはお電話ください",
      serviceTypes: ["相談会"],
      dates: ["2025-12-27", "2025-12-28", "2025-12-29", "2025-12-30", "2025-12-31", "2026-01-01", "2026-01-02", "2026-01-03", "2026-01-04", "2026-01-05"],
      sourceText: "■宮城・仙台\n【ワンファミリー仙台】\n・生活の相談\n12月27日～1月5日（9時～18時）\n仙台市青葉区二日町4-26リバティーハイツ二日町102（相談の際はまずはお電話ください）\nTEL 022-398-9854"
    },

    // 宮城・仙台 - 萌友
    {
      id: "e3fbb3f5-5398-4784-9069-936f5194ed43",
      providerId: "6f8f1191-7a8f-4a03-a8c8-2cbf4b2a8c57",
      providerName: "萌友",
      serviceName: "食事会",
      prefecture: "宮城",
      area: "仙台",
      schedule: "12月31日12時～",
      location: "カトリック北仙台教会（仙台市青葉区）",
      phone: "",
      url: "",
      notes: "",
      serviceTypes: ["炊き出し"],
      dates: ["2025-12-31"],
      sourceText: "■宮城・仙台\n【萌友】\n・食事会\n12月31日12時～\nカトリック北仙台教会（仙台市青葉区）"
    },

    // 千葉・市川 - ガンバの会 パトロール
    {
      id: "f0e4cd1f-c6f5-4601-8a02-31d85666c0dc",
      providerId: "b00d96ba-e7c8-495e-ae41-472f2b19d52c",
      providerName: "ガンバの会",
      serviceName: "路上パトロール（食料等の支援あり）",
      prefecture: "千葉",
      area: "市川",
      schedule: "12月29日、1月2日（いずれも19時～21時）",
      location: "市川八幡キリスト教会出発　千葉県市川市内",
      phone: "",
      url: "",
      notes: "",
      serviceTypes: ["食料配布"],
      dates: ["2025-12-29", "2026-01-02"],
      sourceText: "■千葉・市川\n【ガンバの会】\n・路上パトロール（食料等の支援あり）\n12 月29日、1月2日（いずれも19 時～21時）\n市川八幡キリスト教会出発　千葉県市川市内"
    },

    // 千葉・市川 - ガンバの会 相談
    {
      id: "eacb8967-da19-492b-a1a2-9dbfca97d90a",
      providerId: "b00d96ba-e7c8-495e-ae41-472f2b19d52c",
      providerName: "ガンバの会",
      serviceName: "年末年始相談、シェルター利用相談",
      prefecture: "千葉",
      area: "市川",
      schedule: "12月27日～1月5日（9時～11時）",
      location: "NPO法人ガンバの会事務所（千葉県市川市八幡3-28-23-3F）",
      phone: "047-704-9915",
      url: "",
      notes: "",
      serviceTypes: ["相談会", "宿泊支援"],
      dates: ["2025-12-27", "2025-12-28", "2025-12-29", "2025-12-30", "2025-12-31", "2026-01-01", "2026-01-02", "2026-01-03", "2026-01-04", "2026-01-05"],
      sourceText: "■千葉・市川\n【ガンバの会】\n・年末年始相談、シェルター利用相談\n12 月27日～ 1 月5日（9時～11時）\nNPO法人ガンバの会事務所（千葉県市川市八幡3-28-23-3F）\nNPO 法人ガンバの会 TEL 047-704-9915"
    },

    // 千葉・船橋 - 反貧困ささえあい千葉
    {
      id: "7b9dfddf-8686-4457-aa18-119ac47c1017",
      providerId: "dc42edff-99cc-435d-afc2-80386bd62271",
      providerName: "反貧困ささえあい千葉",
      serviceName: "相談会、炊き出し",
      prefecture: "千葉",
      area: "船橋",
      schedule: "12月30日（13～16時）",
      location: "ハレカフェ（船橋市浜町1-6-5-120）",
      phone: "",
      url: "",
      notes: "",
      serviceTypes: ["炊き出し", "相談会"],
      dates: ["2025-12-30"],
      sourceText: "■千葉・船橋\n【反貧困ささえあい千葉】\n・相談会、炊き出し\n12月30日（13～16時）\nハレカフェ（船橋市浜町1-6-5-120）"
    },

    // 東京・反貧困ネットワーク
    {
      id: "ce28af7f-5d27-42f1-9259-dc7e6910906a",
      providerId: "9097b0db-417d-4d84-b3f9-c58a41f89c80",
      providerName: "反貧困ネットワーク",
      serviceName: "大人食堂（食料支援・生活支援）",
      prefecture: "東京",
      area: "新宿",
      schedule: "1月1日（13時～17時）",
      location: "反貧困ネットワークサポートセンター（東京都新宿区西早稲田2-4-7東京DEW）",
      phone: "",
      url: "",
      notes: "",
      serviceTypes: ["炊き出し", "相談会"],
      dates: ["2026-01-01"],
      sourceText: "■東京・反貧困ネットワーク\n・大人食堂（食料支援・生活支援）\n1月1日（13時～17時）\n反貧困ネットワークサポートセンター（東京都新宿区西早稲田2-4-7東京DEW）"
    },

    // 東京・トイミッケ
    {
      id: "39b98be9-25ce-41c2-b160-2afd9f457514",
      providerId: "66e5c6f1-6b4d-40f6-b3b2-730b7131e992",
      providerName: "トイミッケ",
      serviceName: "宿泊相談ほか",
      prefecture: "東京",
      area: "池袋",
      schedule: "12月30日、1月2日、1月4日（13時～17時）",
      location: "東京都豊島区池袋2-11-9安藤ビル303号FRIENDS XV会議室",
      phone: "",
      url: "https://camp-fire.jp/projects/893162/view/activities/784780",
      notes: "※利用にはさまざまな条件がありますので、必ずリンク先をご覧ください。",
      serviceTypes: ["宿泊支援", "相談会"],
      dates: ["2025-12-30", "2026-01-02", "2026-01-04"],
      sourceText: "■東京・トイミッケ\n・宿泊相談ほか\n12月30日、1月2日、1月4日（13時～17時）\n東京都豊島区池袋2-11-9安藤ビル303号FRIENDS XV会議室\n※利用にはさまざまな条件がありますので、必ずリンク先をご覧ください。"
    },

    // 東京・池袋 - TENOHASI 炊き出し
    {
      id: "92c23d65-72e8-4198-93b6-3eddb8539853",
      providerId: "c4379a94-a523-41e4-ab68-30174f2220c7",
      providerName: "TENOHASI",
      serviceName: "炊き出し、医療生活相談",
      prefecture: "東京",
      area: "池袋",
      schedule: "12月27日、29日、31日（17時～医療相談&生活相談、18時～お弁当配布）",
      location: "東池袋中央公園",
      phone: "",
      url: "",
      notes: "",
      serviceTypes: ["炊き出し", "相談会"],
      dates: ["2025-12-27", "2025-12-29", "2025-12-31"],
      sourceText: "■東京・池袋\n【TENOHASI】\n・炊き出し、医療生活相談\n12月27日、29日、31日（17時～医療相談&生活相談、18時～お弁当配布）\n東池袋中央公園"
    },

    // 東京・池袋 - TENOHASI 夜回り
    {
      id: "df1346e0-ec87-4a02-9360-d58da2c859a3",
      providerId: "c4379a94-a523-41e4-ab68-30174f2220c7",
      providerName: "TENOHASI",
      serviceName: "夜回り",
      prefecture: "東京",
      area: "池袋",
      schedule: "12月31日21時半～",
      location: "池袋駅前公園⇒池袋駅周辺",
      phone: "",
      url: "",
      notes: "",
      serviceTypes: ["食料配布"],
      dates: ["2025-12-31"],
      sourceText: "■東京・池袋\n【TENOHASI】\n・夜回り\n12月31日21時半～\n池袋駅前公園⇒池袋駅周辺"
    },

    // 東京・山谷
    {
      id: "b7a191a0-4790-4dba-80c3-a3f5c813c0c5",
      providerId: "f42d0af7-c0e4-430b-b399-6649ac220bbe",
      providerName: "山谷越年越冬闘争",
      serviceName: "共同炊事ほか",
      prefecture: "東京",
      area: "山谷",
      schedule: "12月29日昼～1月4日朝",
      location: "城北労働福祉センター（台東区日本堤2-2-11）前路上",
      phone: "",
      url: "",
      notes: "",
      serviceTypes: ["炊き出し"],
      dates: ["2025-12-29", "2025-12-30", "2025-12-31", "2026-01-01", "2026-01-02", "2026-01-03", "2026-01-04"],
      sourceText: "■東京・山谷\n【山谷越年越冬闘争】\n・共同炊事ほか\n12月29日昼～1月4日朝\n城北労働福祉センター（台東区日本堤2-2-11）前路上"
    },

    // 東京・練馬
    {
      id: "64d59922-d3d5-474c-abb3-1353e40757c6",
      providerId: "71ea64bf-3fde-43a2-91c4-65740cf85d71",
      providerName: "わかちあい練馬",
      serviceName: "食料支援、臨時相談",
      prefecture: "東京",
      area: "練馬",
      schedule: "随時",
      location: "",
      phone: "050-1750-5718",
      url: "",
      notes: "練馬区近郊の方",
      serviceTypes: ["食料配布", "相談会"],
      dates: [],
      sourceText: "■東京・練馬\n【わかちあい練馬】\n・食料支援、臨時相談\n随時\n050-1750-5718（練馬区近郊の方）"
    },

    // 東京・立川
    {
      id: "abaec652-b69f-4855-b947-7c4a362ebcb2",
      providerId: "503a00bb-6cc3-46c6-9a4f-d39e9a1e730f",
      providerName: "さんきゅうハウス",
      serviceName: "新年お雑煮会",
      prefecture: "東京",
      area: "立川",
      schedule: "1月1日（11時～14時）",
      location: "立川市緑町公園",
      phone: "",
      url: "",
      notes: "",
      serviceTypes: ["炊き出し"],
      dates: ["2026-01-01"],
      sourceText: "■東京・立川\n【さんきゅうハウス】\n・新年お雑煮会\n1月1日（11時～14時）\n立川市緑町公園"
    },

    // 東京・国立
    {
      id: "0940cb6a-f5f4-4419-9c83-bb3dbf3bc144",
      providerId: "bd7b792f-37e9-456b-94c9-5b3002c250f7",
      providerName: "くにたち年末年始困りごと相談会",
      serviceName: "食料配布、相談会",
      prefecture: "東京",
      area: "国立",
      schedule: "12月27日、1月4日（いずれも11時～15時）",
      location: "国立市役所西側広場",
      phone: "",
      url: "",
      notes: "",
      serviceTypes: ["食料配布", "相談会"],
      dates: ["2025-12-27", "2026-01-04"],
      sourceText: "■東京・国立\n【くにたち年末年始困りごと相談会】\n・食料配布、相談会\n12月27日、1月4日（いずれも11時～15時）\n国立市役所西側広場"
    },

    // 東京・府中
    {
      id: "f0b2839c-6d1b-4799-a489-886f57e80994",
      providerId: "e082a958-b4cd-4ab6-af79-ca2d263e7c86",
      providerName: "年末・年始困りごと相談会",
      serviceName: "食料配布、相談会",
      prefecture: "東京",
      area: "府中",
      schedule: "12月28日（11～15時）",
      location: "府中公園",
      phone: "",
      url: "",
      notes: "",
      serviceTypes: ["食料配布", "相談会"],
      dates: ["2025-12-28"],
      sourceText: "■東京府中\n【年末・年始困りごと相談会】\n・食料配布、相談会\n12月28日（11～15時）\n府中公園"
    },

    // 神奈川・横浜
    {
      id: "bba82992-235c-4c6f-a858-6a4f3cc561e8",
      providerId: "f5da4dfe-4838-4971-be7d-7dd1ce5ec7a8",
      providerName: "寿越冬闘争実行委員会",
      serviceName: "炊き出し、各種相談ほか",
      prefecture: "神奈川",
      area: "横浜",
      schedule: "12月27日～1月5日",
      location: "寿公園（横浜市中区寿町3-9-4）ほか",
      phone: "045-641-5599",
      url: "",
      notes: "TEL/FAX",
      serviceTypes: ["炊き出し", "相談会"],
      dates: ["2025-12-27", "2025-12-28", "2025-12-29", "2025-12-30", "2025-12-31", "2026-01-01", "2026-01-02", "2026-01-03", "2026-01-04", "2026-01-05"],
      sourceText: "■神奈川・横浜\n【寿越冬闘争実行委員会】\n・炊き出し、各種相談ほか\n12月27日～1月5日\n寿公園 （横浜市中区寿町3-9-4） ほか\nTEL/FAX 045-641-5599"
    },

    // 愛知・名古屋
    {
      id: "1fcea637-3700-4f62-a762-f96dd7b0e906",
      providerId: "a1930895-37af-4d30-8a48-b0cff456be21",
      providerName: "名古屋越冬実行委員会",
      serviceName: "炊き出し、各種相談ほか",
      prefecture: "愛知",
      area: "名古屋",
      schedule: "12月28日～1月4日",
      location: "大津橋小園内 外堀通り（テニスコート西側）（名古屋市中区丸の内三の丸2-7）",
      phone: "",
      url: "",
      notes: "",
      serviceTypes: ["炊き出し", "相談会"],
      dates: ["2025-12-28", "2025-12-29", "2025-12-30", "2025-12-31", "2026-01-01", "2026-01-02", "2026-01-03", "2026-01-04"],
      sourceText: "■愛知・名古屋\n【名古屋越冬実行委員会】\n・炊き出し、各種相談ほか\n12 月28日～1月4日\n大津橋小園内 外堀通り（テニスコート西側）（名古屋市中区丸の内三の丸2-7）"
    },

    // 大阪・釜ヶ崎 - 越冬闘争
    {
      id: "c8858e39-9408-424a-9759-97dc571aa6d7",
      providerId: "fcd1c5de-6f0f-4b86-9591-02a9d1cffc0e",
      providerName: "釜ヶ崎越冬闘争実行委員会",
      serviceName: "炊き出し、人民パトロールほか",
      prefecture: "大阪",
      area: "釜ヶ崎",
      schedule: "12月28日夜～1月4日",
      location: "三角公園ほか",
      phone: "",
      url: "",
      notes: "",
      serviceTypes: ["炊き出し"],
      dates: ["2025-12-28", "2025-12-29", "2025-12-30", "2025-12-31", "2026-01-01", "2026-01-02", "2026-01-03", "2026-01-04"],
      sourceText: "■大阪・釜ヶ崎\n【釜ヶ崎越冬闘争実行委員会】\n・炊き出し、人民パトロールほか\n12 月28日夜～1月4日\n三角公園ほか"
    },

    // 大阪・釜ヶ崎 - SOSおおさか
    {
      id: "bd20eb64-015a-4477-94b5-4ce9179f71ed",
      providerId: "bbfb66af-3331-4ed3-8761-33ce7e956c36",
      providerName: "住まいとくらし SOS おおさか",
      serviceName: "各種相談、緊急宿泊ほか",
      prefecture: "大阪",
      area: "釜ヶ崎",
      schedule: "12月30日～1月3日",
      location: "大阪市西成区太子1-13-28",
      phone: "",
      url: "",
      notes: "",
      serviceTypes: ["相談会", "宿泊支援"],
      dates: ["2025-12-30", "2025-12-31", "2026-01-01", "2026-01-02", "2026-01-03"],
      sourceText: "■大阪・釜ヶ崎\n【住まいとくらし SOS おおさか】\n・各種相談、緊急宿泊ほか\n12月30日～1月3日\n大阪市西成区太子1-13-28"
    },

    // 兵庫・神戸
    {
      id: "d5ec22e2-c1b8-465c-8709-f87655186218",
      providerId: "9998eaa3-954a-4a4d-978d-53ef541bf7aa",
      providerName: "神戸越年越冬実行委員会",
      serviceName: "炊き出し、各種相談ほか",
      prefecture: "兵庫",
      area: "神戸",
      schedule: "12月27日～1月4日（10時～15時半）",
      location: "東遊園地花時計前（神戸市中央区加納町6丁目）神戸市役所南端",
      phone: "",
      url: "",
      notes: "",
      serviceTypes: ["炊き出し", "相談会"],
      dates: ["2025-12-27", "2025-12-28", "2025-12-29", "2025-12-30", "2025-12-31", "2026-01-01", "2026-01-02", "2026-01-03", "2026-01-04"],
      sourceText: "■兵庫・神戸\n【神戸越年越冬実行委員会】\n・炊き出し、各種相談ほか\n12 月27日 ～1月4日（10 時～15 時半）\n東遊園地花時計前（神戸市中央区加納町6丁目）神戸市役所南端"
    },

    // 岡山
    {
      id: "0638f367-1038-4604-8524-27a319be1ff1",
      providerId: "2420d75b-0d4b-49f9-aafc-2c4b27e25bbc",
      providerName: "NPO法人岡山きずな",
      serviceName: "無料食堂、生活相談ほか",
      prefecture: "岡山",
      area: "",
      schedule: "12月27日～1月4日（11時～14時）",
      location: "安楽亭（岡山市北区下中野70番地）",
      phone: "",
      url: "",
      notes: "",
      serviceTypes: ["炊き出し", "相談会"],
      dates: ["2025-12-27", "2025-12-28", "2025-12-29", "2025-12-30", "2025-12-31", "2026-01-01", "2026-01-02", "2026-01-03", "2026-01-04"],
      sourceText: "■岡山\n【NPO法人岡山きずな】\n・無料食堂、生活相談ほか\n12月27日～1月4日（11時～14時）\n安楽亭（岡山市北区下中野70番地）"
    },

    // 広島
    {
      id: "6b5afbcb-9311-4568-bf88-cbfb4db58a43",
      providerId: "d6b18514-029a-4548-b4b9-b6cf13044548",
      providerName: "野宿労働者の人権を守る広島夜回りの会",
      serviceName: "夜回り・おせち風弁当の提供など",
      prefecture: "広島",
      area: "",
      schedule: "12月31日（17時ごろ～）",
      location: "広島駅南口地下広場、旧市民球場前（原爆ドーム向かい）など",
      phone: "",
      url: "",
      notes: "",
      serviceTypes: ["炊き出し", "食料配布"],
      dates: ["2025-12-31"],
      sourceText: "■広島\n【野宿労働者の人権を守る広島夜回りの会】\n・夜回り・おせち風弁当の提供など\n12月31日（17時ごろ～）\n広島駅南口地下広場、旧市民球場前（原爆ドーム向かい）など"
    },

    // 福岡・北九州 - 抱樸
    {
      id: "8b9f28db-814e-46a2-8ad1-7b8bef19aa1f",
      providerId: "f3ef4613-9eff-4e68-b165-23295a96ea38",
      providerName: "NPO法人抱樸",
      serviceName: "弁当配布、各種相談、追悼集会",
      prefecture: "福岡",
      area: "北九州",
      schedule: "1月3日14時半～",
      location: "勝山公園（福岡県北九州市小倉北区城内4）",
      phone: "",
      url: "",
      notes: "",
      serviceTypes: ["食料配布", "相談会"],
      dates: ["2026-01-03"],
      sourceText: "■福岡・北九州\n【NPO法人抱樸】\n・弁当配布、各種相談、追悼集会\n1月3日14時半～\n勝山公園（福岡県北九州市小倉北区城内4）"
    },

    // 福岡・北九州 - 自立支援センター
    {
      id: "299c511e-2225-4ef1-813d-7e584a56e5ae",
      providerId: "0675d6bf-df52-4880-9421-3cf3f193cacd",
      providerName: "ホームレス自立支援センター北九州",
      serviceName: "緊急相談",
      prefecture: "福岡",
      area: "北九州",
      schedule: "年末年始期間中",
      location: "北九州市小倉北区大門1－6－48ホームレス自立支援センター",
      phone: "093-571-1304",
      url: "",
      notes: "",
      serviceTypes: ["相談会"],
      dates: ["2025-12-27", "2025-12-28", "2025-12-29", "2025-12-30", "2025-12-31", "2026-01-01", "2026-01-02", "2026-01-03", "2026-01-04", "2026-01-05"],
      sourceText: "■福岡・北九州\n【ホームレス自立支援センター北九州】\n・緊急相談\n年末年始期間中\n北九州市小倉北区大門1－6－48ホームレス自立支援センター\nTEL 093-571-1304"
    },

    // 福岡 - グリーンコープ
    {
      id: "ad3379b7-1167-42ee-98a4-987c5c8ced9a",
      providerId: "41ca1d31-9445-4e09-9e08-9004eba7cae6",
      providerName: "社会福祉法人グリーンコープ抱樸館福岡",
      serviceName: "緊急相談",
      prefecture: "福岡",
      area: "",
      schedule: "年末年始期間中",
      location: "福岡市東区多の津5-5-8",
      phone: "092-624-7771",
      url: "",
      notes: "",
      serviceTypes: ["相談会"],
      dates: ["2025-12-27", "2025-12-28", "2025-12-29", "2025-12-30", "2025-12-31", "2026-01-01", "2026-01-02", "2026-01-03", "2026-01-04", "2026-01-05"],
      sourceText: "■福岡\n【社会福祉法人グリーンコープ抱樸館福岡】\n・緊急相談\n年末年始期間中\n福岡市東区多の津5-5-8\nTEL 092-624-7771"
    },

    // 福岡 - おにぎりの会
    {
      id: "61e8716e-15c9-4e58-96b4-21bf3b0d6d00",
      providerId: "ee0a506f-ea8e-42b1-b474-cc97fc64ac98",
      providerName: "福岡おにぎりの会",
      serviceName: "生活相談、食糧支援など",
      prefecture: "福岡",
      area: "",
      schedule: "12月29日",
      location: "美野島司牧センター（福岡市博多区美野島2-5-31）",
      phone: "",
      url: "",
      notes: "",
      serviceTypes: ["食料配布", "相談会"],
      dates: ["2025-12-29"],
      sourceText: "■福岡\n【福岡おにぎりの会】\n・生活相談、食糧支援など\n12月29日\n美野島司牧センター（福岡市博多区美野島2-5-31）"
    },

    // 鹿児島
    {
      id: "775016e2-06c3-40da-b297-2218a9f3cbc4",
      providerId: "d155e299-9d1c-449f-ade9-426384a17b50",
      providerName: "NPO法人かごしまホームレス生活者支えあう会",
      serviceName: "食事・支援物資提供、越冬炊き出しほか",
      prefecture: "鹿児島",
      area: "",
      schedule: "料理会・食事・支援物資提供は12月28日14時～、越冬炊き出しは12月31日・1月1日12時～、炊き出しは1月4日17時～",
      location: "県民交流センター東棟5F調理室（鹿児島市市山下町14－50）、鹿児島キリスト教会（鹿児島市平之町14－21）、甲突川武之橋左岸緑地帯",
      phone: "",
      url: "",
      notes: "",
      serviceTypes: ["炊き出し", "食料配布"],
      dates: ["2025-12-28", "2025-12-31", "2026-01-01", "2026-01-04"],
      sourceText: "■鹿児島\n【NPO法人かごしまホームレス生活者支えあう会】\n・食事・支援物資提供、越冬炊き出しほか\n料理会・食事・支援物資提供は12月28日14時～県民交流センター東棟5F調理室（鹿児島市市山下町14－50）、越冬炊き出しは、12月31日、1月1日12時～鹿児島キリスト教会（鹿児島市平之町14－21鹿児島三育小学校）、炊き出しは1月4日（17時～）甲突川武之橋左岸緑地帯"
    }
  ],

  // フィルター用の定数
  prefectures: ["全国", "宮城", "千葉", "東京", "神奈川", "愛知", "大阪", "兵庫", "岡山", "広島", "福岡", "鹿児島"],
  serviceTypes: ["炊き出し", "食料配布", "相談会", "電話相談", "宿泊支援"],
  
  // 日付範囲
  dateRange: {
    start: "2025-12-27",
    end: "2026-01-05"
  }
};

// データをグローバルに公開
if (typeof window !== 'undefined') {
  window.SUPPORT_DATA = SUPPORT_DATA;
}
