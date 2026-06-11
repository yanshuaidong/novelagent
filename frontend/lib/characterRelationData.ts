/**
 * 明末人物关系网络数据（熹宗实录 + 崇祯实录人物志）
 * 节点类型仿 unicorns-investors：核心人物 / 关联人物
 */

export type CharacterNodeType = "皇室" | "后宫" | "大臣" | "宦官" | "武将" | "外敌";

export interface CharacterNodeData {
  type: CharacterNodeType;
  name: string;
  title?: string;
  note?: string;
  degree?: number;
}

export interface CharacterEdgeData {
  type: string;
}

export const CHARACTER_TYPE_STYLE: Record<
  CharacterNodeType,
  { fill: string; icon: string }
> = {
  皇室: { fill: "#FFA07A", icon: "👑" },
  后宫: { fill: "#DA70D6", icon: "🏯" },
  大臣: { fill: "#6495ED", icon: "📜" },
  宦官: { fill: "#3CB371", icon: "🎭" },
  武将: { fill: "#CD853F", icon: "⚔️" },
  外敌: { fill: "#DC143C", icon: "🐉" },
};

export const characterRelationData = {
  nodes: [
    {
      id: "xizong",
      data: {
        type: "皇室",
        name: "朱由校",
        title: "明熹宗朱由校·天启帝",
        note: "本卷主角，著名的「木匠皇帝」，移宫案核心，即位时年十六",
        degree: 14,
      },
    },
    {
      id: "guangzong",
      data: {
        type: "皇室",
        name: "朱常洛",
        title: "明光宗·泰昌帝",
        note: "在位仅一月而崩，红丸案主角",
        degree: 4,
      },
    },
    {
      id: "wang-cairen",
      data: {
        type: "后宫",
        name: "王才人",
        title: "孝和皇太后",
        note: "熹宗生母，为李选侍殴辱致死",
        degree: 2,
      },
    },
    {
      id: "li-xuanshi",
      data: {
        type: "后宫",
        name: "李选侍",
        title: "西李",
        note: "明光宗宠妃，熹宗抚养者；移宫案围绕其欲居乾清宫、干预朝政展开",
        degree: 7,
      },
    },
    {
      id: "keshi",
      data: {
        type: "后宫",
        name: "客氏",
        title: "奉圣夫人",
        note: "本卷初现于朝堂，被熹宗封为奉圣夫人；与魏忠贤内外交通，后期祸乱朝政核心人物",
        degree: 5,
      },
    },
    {
      id: "yanglian",
      data: {
        type: "大臣",
        name: "杨涟",
        title: "兵科都给事中",
        note: "东林六君子之一，率先弹劾魏忠贤；力主移宫、拥立熹宗",
        degree: 7,
      },
    },
    {
      id: "zuoguangdou",
      data: {
        type: "大臣",
        name: "左光斗",
        title: "浙江道御史",
        note: "东林六君子之一，与杨涟并称「杨左」，共同弹劾魏忠贤并最终被迫害致死",
        degree: 6,
      },
    },
    {
      id: "fangcongzhe",
      data: {
        type: "大臣",
        name: "方从哲",
        title: "内阁首辅",
        note: "明末「梃击案」「红丸案」「移宫案」三大案亲历者；党争激烈、辽东战事紧迫的危局中主持朝政",
        degree: 6,
      },
    },
    {
      id: "yexianggao",
      data: {
        type: "大臣",
        name: "叶向高",
        title: "内阁大学士",
        note: "东林党元老，晚明政坛举足轻重，曾两度出任内阁首辅",
        degree: 4,
      },
    },
    {
      id: "sunruyou",
      data: {
        type: "大臣",
        name: "孙如游",
        title: "礼部尚书",
        note: "后入阁；坚决反对册封郑贵妃为太后，在移宫案等事件中扮演重要角色",
        degree: 4,
      },
    },
    {
      id: "zhoujiamo",
      data: {
        type: "大臣",
        name: "周嘉谟",
        title: "吏部尚书",
        note: "东林党人，曾掌管官员选拔大权，后在与魏忠贤的党争中被迫害",
        degree: 4,
      },
    },
    {
      id: "huangkezuan",
      data: {
        type: "大臣",
        name: "黄克缵",
        title: "刑部尚书",
        note: "为官五十余载，以清廉正直闻名，是明末罕见的「五部尚书」",
        degree: 3,
      },
    },
    {
      id: "liruhua",
      data: {
        type: "大臣",
        name: "李汝华",
        title: "户部尚书",
        note: "面对辽东战事巨额军费负责筹措粮饷，在国家财政困顿中艰难维持",
        degree: 3,
      },
    },
    {
      id: "liuyipan",
      data: {
        type: "大臣",
        name: "刘一燝",
        title: "内阁大学士",
        note: "东林党重要成员，移宫等事件中支持杨涟、左光斗，是熹宗初年稳定朝局的核心人物",
        degree: 5,
      },
    },
    {
      id: "hanhuang",
      data: {
        type: "大臣",
        name: "韩爌",
        title: "内阁大学士",
        note: "东林党重要成员，移宫等事件中支持杨涟、左光斗，是熹宗初年稳定朝局的核心人物",
        degree: 4,
      },
    },
    {
      id: "xiongtingbi",
      data: {
        type: "大臣",
        name: "熊廷弼",
        title: "辽东经略",
        note: "力挽狂澜，以卓越军事才能稳定萨尔浒之战后辽东危局，是明末著名军事战略家",
        degree: 5,
      },
    },
    {
      id: "yuanyingtai",
      data: {
        type: "大臣",
        name: "袁应泰",
        title: "兵部侍郎",
        note: "后接替熊廷弼经略辽东；爱民勤政但缺乏军事才能，辽阳、沈阳失守后自焚殉国",
        degree: 4,
      },
    },
    {
      id: "sunchengzong",
      data: {
        type: "大臣",
        name: "孙承宗",
        title: "左春坊左庶子",
        note: "熹宗老师，明末最杰出战略家之一；本卷尚未走到前台",
        degree: 3,
      },
    },
    {
      id: "xuguangqi",
      data: {
        type: "大臣",
        name: "徐光启",
        title: "少詹事",
        note: "管理练兵；政治家兼中国近代科学先驱，曾与利玛窦合译《几何原本》",
        degree: 3,
      },
    },
    {
      id: "wentiren",
      data: {
        type: "大臣",
        name: "温体仁",
        title: "中极殿大学士",
        note: "卷一实录总裁官；后于崇祯朝为权相",
        degree: 2,
      },
    },
    {
      id: "liuzongzhou",
      data: {
        type: "大臣",
        name: "刘宗周",
        title: "礼部主事",
        note: "首参魏忠贤，遭罚俸",
        degree: 2,
      },
    },
    {
      id: "weizhongxian",
      data: {
        type: "宦官",
        name: "魏忠贤",
        title: "魏进忠",
        note: "本卷初现于朝堂，后改名忠贤；提督宝和三店，专权起点；与客氏内外交通",
        degree: 6,
      },
    },
    {
      id: "cuiwensheng",
      data: {
        type: "宦官",
        name: "崔文昇",
        title: "御药房太监",
        note: "明光宗生前御药房太监，进献泻药直接导致光宗病情恶化",
        degree: 3,
      },
    },
    {
      id: "lijinzhong",
      data: {
        type: "宦官",
        name: "李进忠",
        title: "李选侍党羽",
        note: "盗取宫中珍宝，潜逃被缉",
        degree: 2,
      },
    },
    {
      id: "likzhuo",
      data: {
        type: "大臣",
        name: "李可灼",
        title: "鸿胪寺丞",
        note: "自称懂医术，于光宗垂危之际进献「红丸」（可能含重金属成分的丹药）",
        degree: 3,
      },
    },
    {
      id: "zhuchunchen",
      data: {
        type: "大臣",
        name: "朱纯臣",
        title: "监修官",
        note: "左柱国、总督京营戎政、太傅、成国公",
        degree: 2,
      },
    },
    // —— 皇帝与对手 ——
    {
      id: "nuerhachi",
      data: {
        type: "外敌",
        name: "努尔哈赤",
        title: "后金大汗",
        note: "清朝奠基者，明朝辽东最大威胁，实录中亦称「奴酋」",
        degree: 8,
      },
    },
    // —— 朝廷中枢 ——
    {
      id: "shijijie",
      data: {
        type: "大臣",
        name: "史继偕",
        title: "大学士",
        note: "天启年间内阁成员，参与最高层决策",
        degree: 3,
      },
    },
    {
      id: "gubingqian",
      data: {
        type: "大臣",
        name: "顾秉谦",
        title: "内阁首辅",
        note: "谄附魏忠贤，后成为内阁首辅",
        degree: 4,
      },
    },
    {
      id: "zhangheming",
      data: {
        type: "大臣",
        name: "张鹤鸣",
        title: "兵部尚书",
        note: "偏袒主战派王化贞、排挤熊廷弼，「经抚不和」重要推手",
        degree: 5,
      },
    },
    {
      id: "zhangwenda",
      data: {
        type: "大臣",
        name: "张问达",
        title: "吏部尚书",
        note: "后因反对魏忠贤而遭迫害",
        degree: 3,
      },
    },
    {
      id: "wangzaijin",
      data: {
        type: "大臣",
        name: "王在晋",
        title: "兵部左侍郎",
        note: "接替熊廷弼出任辽东经略，主张八里铺筑重关，遭袁崇焕反对",
        degree: 4,
      },
    },
    {
      id: "wangxiangqian",
      data: {
        type: "大臣",
        name: "王象乾",
        title: "兵部尚书",
        note: "后总督蓟辽，长期镇守北疆，深谙边防与抚夷之道",
        degree: 4,
      },
    },
    {
      id: "cuijingrong",
      data: {
        type: "大臣",
        name: "崔景荣",
        title: "兵部尚书",
        degree: 2,
      },
    },
    {
      id: "donghanru",
      data: {
        type: "大臣",
        name: "董汉儒",
        title: "兵部尚书",
        note: "敢于反对魏忠贤滥赏世袭，以刚直著称",
        degree: 3,
      },
    },
    {
      id: "liyangsheng",
      data: {
        type: "大臣",
        name: "李养正",
        title: "总漕",
        note: "后任南京刑部尚书，曾参劾将领",
        degree: 2,
      },
    },
    {
      id: "biziyan",
      data: {
        type: "大臣",
        name: "毕自严",
        title: "天津巡抚",
        note: "从海防角度稳定明军后方，后官至户部尚书",
        degree: 2,
      },
    },
    {
      id: "zhuxuanyuan",
      data: {
        type: "大臣",
        name: "朱燮元",
        title: "四川巡抚",
        note: "后总督川湖黔军务，平定奢安之乱第一功臣",
        degree: 4,
      },
    },
    {
      id: "zhaoyan",
      data: {
        type: "大臣",
        name: "赵彦",
        title: "山东巡抚",
        note: "平定徐鸿儒白莲教起义",
        degree: 3,
      },
    },
    {
      id: "caifuyi",
      data: {
        type: "大臣",
        name: "蔡复一",
        title: "贵州巡抚",
        note: "继王三善之后总督五省军务，继续领导平叛",
        degree: 3,
      },
    },
    {
      id: "zhangfengyi",
      data: {
        type: "大臣",
        name: "张凤翼",
        title: "山海关巡抚",
        note: "协助孙承宗防务",
        degree: 3,
      },
    },
    {
      id: "lisancai",
      data: {
        type: "大臣",
        name: "李三才",
        title: "漕运总督",
        note: "以治理淮河和反对矿税使闻名，与东林党人交好",
        degree: 3,
      },
    },
    // —— 东林党与言官 ——
    {
      id: "weidazhong",
      data: {
        type: "大臣",
        name: "魏大中",
        title: "工科给事中",
        note: "直言杨镐、李如桢案应严惩，参与弹劾魏忠贤，惨死狱中",
        degree: 4,
      },
    },
    {
      id: "zhouzhaorui",
      data: {
        type: "大臣",
        name: "周朝瑞",
        title: "御史",
        note: "东林六君子之一，持续弹劾兵部尚书张鹤鸣",
        degree: 3,
      },
    },
    {
      id: "zouyuanbiao",
      data: {
        type: "大臣",
        name: "邹元标",
        title: "左都御史",
        note: "「东林三君」之一，与冯从吾创办首善书院，东林精神领袖",
        degree: 5,
      },
    },
    {
      id: "gaopanlong",
      data: {
        type: "大臣",
        name: "高攀龙",
        title: "吏部员外郎",
        note: "东林七君子之一，讲学影响巨大，后因弹劾阉党自沉殉节",
        degree: 4,
      },
    },
    {
      id: "zhaonanxing",
      data: {
        type: "大臣",
        name: "赵南星",
        title: "吏部尚书",
        note: "「东林三君」之一，主持京察清除阉党势力，被迫害致死",
        degree: 4,
      },
    },
    {
      id: "sunshenxing",
      data: {
        type: "大臣",
        name: "孙慎行",
        title: "礼部尚书",
        note: "曾以「红丸案」弹劾方从哲「罪同弑逆」",
        degree: 4,
      },
    },
    {
      id: "wangji",
      data: {
        type: "大臣",
        name: "王纪",
        title: "刑部尚书",
        note: "为官正直，与阉党激烈斗争，以清廉著称",
        degree: 3,
      },
    },
    {
      id: "manchaojian",
      data: {
        type: "大臣",
        name: "满朝荐",
        title: "知县",
        note: "著名直臣，敢于对抗税监，天启年间复出后痛陈朝政被革职",
        degree: 2,
      },
    },
    {
      id: "wenzhenmeng",
      data: {
        type: "大臣",
        name: "文震孟",
        title: "状元",
        note: "天启二年状元，东林七君子之一，上《勤政讲学疏》触怒魏忠贤",
        degree: 3,
      },
    },
    {
      id: "jiajichun",
      data: {
        type: "大臣",
        name: "贾继春",
        title: "御史",
        note: "「移宫案」关键人物，立场反复",
        degree: 3,
      },
    },
    {
      id: "guogong",
      data: {
        type: "大臣",
        name: "郭巩",
        title: "户科给事中",
        note: "曾弹劾熊廷弼，被指结交魏忠贤",
        degree: 3,
      },
    },
    {
      id: "ni-yuanlu",
      data: {
        type: "大臣",
        name: "倪元璐",
        title: "庶吉士",
        note: "天启二年庶吉士，忠臣学者，明亡后以死殉国",
        degree: 2,
      },
    },
    {
      id: "huangdaozhou",
      data: {
        type: "大臣",
        name: "黄道周",
        title: "庶吉士",
        note: "天启二年庶吉士，忠臣学者与书法家，明亡殉国",
        degree: 2,
      },
    },
    // —— 阉党与内廷 ——
    {
      id: "cuichengxiu",
      data: {
        type: "大臣",
        name: "崔呈秀",
        title: "阉党五虎之首",
        note: "迫害东林党人的急先锋",
        degree: 5,
      },
    },
    {
      id: "fengquan",
      data: {
        type: "大臣",
        name: "冯铨",
        title: "阉党核心",
        note: "与崔呈秀狼狈为奸，编纂《三朝要典》打击东林党",
        degree: 4,
      },
    },
    {
      id: "sunjie",
      data: {
        type: "大臣",
        name: "孙杰",
        title: "阉党附庸",
        note: "曾为迎合魏忠贤率先弹劾刘一燝、周嘉谟",
        degree: 3,
      },
    },
    {
      id: "wangshaohui",
      data: {
        type: "大臣",
        name: "王绍徽",
        title: "吏部尚书",
        note: "阉党核心，编《东林点将录》攻击东林党",
        degree: 3,
      },
    },
    {
      id: "wangtigan",
      data: {
        type: "宦官",
        name: "王体乾",
        title: "司礼监太监",
        note: "魏忠贤重要党羽",
        degree: 3,
      },
    },
    {
      id: "wang-an",
      data: {
        type: "宦官",
        name: "王安",
        title: "司礼监太监",
        note: "正直太监，曾保护光宗和熹宗，后被魏忠贤害死",
        degree: 3,
      },
    },
    {
      id: "liuchao",
      data: {
        type: "宦官",
        name: "刘朝",
        title: "内库太监",
        note: "掌管内库军器，魏忠贤死党，募兵案引发朝堂争议",
        degree: 3,
      },
    },
    // —— 辽东经略与战略家 ——
    {
      id: "wanghuazhen",
      data: {
        type: "大臣",
        name: "王化贞",
        title: "辽东巡抚",
        note: "主张「但得六万兵便可荡平」，不听熊廷弼劝告，酿成广宁大败",
        degree: 6,
      },
    },
    {
      id: "yuanchonghuan",
      data: {
        type: "武将",
        name: "袁崇焕",
        title: "兵部职方主事",
        note: "天启二年单骑出关考察，宁远之战击伤努尔哈赤，后被崇祯冤杀",
        degree: 6,
      },
    },
    {
      id: "maowenlong",
      data: {
        type: "武将",
        name: "毛文龙",
        title: "东江镇总兵",
        note: "敌后建立东江镇牵制后金，以「镇江大捷」闻名，后被袁崇焕所杀",
        degree: 5,
      },
    },
    {
      id: "yuankeli",
      data: {
        type: "大臣",
        name: "袁可立",
        title: "登莱巡抚",
        note: "在登莱建立东江防线，与毛文龙互为犄角",
        degree: 4,
      },
    },
    {
      id: "yanghao",
      data: {
        type: "大臣",
        name: "杨镐",
        title: "辽东经略",
        note: "萨尔浒之战分兵冒进导致惨败，使明朝丧失战略进攻能力",
        degree: 4,
      },
    },
    {
      id: "yanmingtai",
      data: {
        type: "大臣",
        name: "阎鸣泰",
        title: "山海关巡抚",
        note: "与孙承宗、王象乾共同经营辽西防线",
        degree: 3,
      },
    },
    {
      id: "yaozongwen",
      data: {
        type: "大臣",
        name: "姚宗文",
        title: "阅视辽东军务",
        note: "被指「微议隐剌」导致熊廷弼离职，并举荐王化贞",
        degree: 4,
      },
    },
    {
      id: "mashilong",
      data: {
        type: "武将",
        name: "马世龙",
        title: "平辽将军",
        note: "孙承宗提拔，佩带平辽将军印统领关内外军队",
        degree: 3,
      },
    },
    // —— 辽东前线将领 ——
    {
      id: "mangui",
      data: {
        type: "武将",
        name: "满桂",
        title: "总兵官",
        note: "明末重要武将，战死沙场",
        degree: 3,
      },
    },
    {
      id: "zhaoshujiao",
      data: {
        type: "武将",
        name: "赵率教",
        title: "总兵官",
        note: "明末重要武将，战死沙场",
        degree: 3,
      },
    },
    {
      id: "zudashou",
      data: {
        type: "武将",
        name: "祖大寿",
        title: "总兵官",
        note: "明末重要武将，后降清复明",
        degree: 4,
      },
    },
    {
      id: "qinliangyu",
      data: {
        type: "武将",
        name: "秦良玉",
        title: "女将军",
        note: "正史将相列传中唯一女将军，率白杆兵平乱抗金",
        degree: 3,
      },
    },
    {
      id: "liujing",
      data: {
        type: "武将",
        name: "刘綎",
        title: "萨尔浒统帅",
        note: "万历四十七年萨尔浒之战战死",
        degree: 3,
      },
    },
    // —— 殉国忠烈 ——
    {
      id: "zhangquan",
      data: {
        type: "大臣",
        name: "张铨",
        title: "辽阳巡按",
        note: "辽阳城破后拒不投降，大骂后金而自缢殉国",
        degree: 3,
      },
    },
    {
      id: "wangshan",
      data: {
        type: "大臣",
        name: "王三善",
        title: "贵州巡抚",
        note: "平定奢安之乱中解围贵阳，最终兵败殉国",
        degree: 4,
      },
    },
    // —— 降将、叛乱与西南 ——
    {
      id: "liyongfang",
      data: {
        type: "外敌",
        name: "李永芳",
        title: "明朝降将",
        note: "原明军抚顺游击，后投降努尔哈赤，成为明朝降将「首叛」",
        degree: 4,
      },
    },
    {
      id: "shechongming",
      data: {
        type: "外敌",
        name: "奢崇明",
        title: "永宁土司",
        note: "天启元年发动叛乱，与安邦彦合流，史称「奢安之乱」",
        degree: 4,
      },
    },
    {
      id: "anbangyan",
      data: {
        type: "外敌",
        name: "安邦彦",
        title: "水西土司",
        note: "贵州水西土司，叛乱首领，与奢崇明合流",
        degree: 3,
      },
    },
    {
      id: "xuhongru",
      data: {
        type: "外敌",
        name: "徐鸿儒",
        title: "白莲教首领",
        note: "山东白莲教起义领袖，天启二年震动半个明朝",
        degree: 4,
      },
    },
    {
      id: "yangzhaoji",
      data: {
        type: "武将",
        name: "杨肇基",
        title: "都督同知",
        note: "平定山东白莲教起义的主要将领",
        degree: 3,
      },
    },
    // —— 学界与西学 ——
    {
      id: "lizhizao",
      data: {
        type: "大臣",
        name: "李之藻",
        title: "光禄寺少卿",
        note: "与徐光启同为西学倡导者，力主引进仿制西洋大炮",
        degree: 3,
      },
    },
    {
      id: "dongqichang",
      data: {
        type: "大臣",
        name: "董其昌",
        title: "太常寺少卿",
        note: "明代著名书画家、理论家",
        degree: 2,
      },
    },
    // —— 朝廷中枢（补全）——
    {
      id: "hezongyan",
      data: { type: "大臣", name: "何宗彦", title: "内阁大学士", note: "天启年间入阁", degree: 2 },
    },
    {
      id: "zhuguozuo",
      data: { type: "大臣", name: "朱国祚", title: "内阁大学士", note: "天启年间入阁", degree: 2 },
    },
    {
      id: "shen-qi",
      data: { type: "大臣", name: "沈㴶", title: "内阁大学士", note: "天启年间入阁", degree: 2 },
    },
    {
      id: "zhuyanxi",
      data: { type: "大臣", name: "朱延禧", title: "内阁大学士", note: "天启年间入阁", degree: 2 },
    },
    {
      id: "weiguangwei",
      data: { type: "大臣", name: "魏广微", title: "内阁大学士", note: "阉党阁臣，天启年间入阁", degree: 3 },
    },
    {
      id: "zhuguozhen",
      data: { type: "大臣", name: "朱国桢", title: "内阁大学士", note: "天启年间入阁", degree: 2 },
    },
    {
      id: "shenli",
      data: { type: "大臣", name: "沈鲤", title: "大学士（赠）", note: "万历朝著名阁臣，以方正敢谏著称", degree: 2 },
    },
    {
      id: "linyaoyu",
      data: { type: "大臣", name: "林尧俞", title: "礼部尚书", note: "负责朝廷礼仪等重要事务", degree: 2 },
    },
    {
      id: "zhongyuzheng",
      data: { type: "大臣", name: "钟羽正", title: "工部尚书", note: "负责皇陵和各项工程", degree: 2 },
    },
    {
      id: "weiyangmeng",
      data: { type: "大臣", name: "魏养蒙", title: "南京兵部尚书", note: "死后获赠少保", degree: 2 },
    },
    {
      id: "shenjingjie",
      data: { type: "大臣", name: "沈儆炌", title: "云南巡抚", note: "上奏关于荞甸的善后事宜", degree: 2 },
    },
    {
      id: "libanghua",
      data: { type: "大臣", name: "李邦华", title: "天津巡抚", note: "明末忠臣，师从邹元标，李自成破北京时殉国", degree: 3 },
    },
    {
      id: "taolangxian",
      data: { type: "大臣", name: "陶朗先", title: "登莱巡抚", degree: 2 },
    },
    {
      id: "jinxuezeng",
      data: { type: "大臣", name: "金学曾", title: "福建巡抚（已故）", note: "实录记恤典", degree: 1 },
    },
    {
      id: "yangshuzhong",
      data: { type: "大臣", name: "杨述中", title: "贵州总督", note: "负责协调平叛", degree: 3 },
    },
    {
      id: "heshijin",
      data: { type: "大臣", name: "何士晋", title: "广西巡抚", note: "负责组织广西援兵参与西南平叛", degree: 3 },
    },
    {
      id: "shengyihong",
      data: { type: "大臣", name: "盛以弘", title: "吏部左侍郎", note: "吏部曾推荐其为阁臣人选，未被采纳", degree: 2 },
    },
    {
      id: "guoyunhou",
      data: { type: "大臣", name: "郭允厚", title: "吏科给事中", note: "后官至户部尚书，掌握国家财政大权", degree: 2 },
    },
    {
      id: "lijingbai",
      data: { type: "大臣", name: "李精白", title: "礼科给事中", degree: 2 },
    },
    {
      id: "zhangwoxu",
      data: { type: "大臣", name: "张我续", title: "川湖云贵总督", note: "天启年间负责西南平乱", degree: 3 },
    },
    // —— 东林党与言官（补全）——
    {
      id: "yuanhuazhong",
      data: { type: "大臣", name: "袁化中", title: "御史", note: "东林六君子之一，因对抗魏忠贤遭迫害致死", degree: 3 },
    },
    {
      id: "gudazhang",
      data: { type: "大臣", name: "顾大章", title: "御史", note: "东林六君子之一，因对抗魏忠贤遭迫害致死", degree: 3 },
    },
    {
      id: "guxiancheng",
      data: { type: "大臣", name: "顾宪成", title: "东林创始人", note: "「风声雨声读书声声声入耳，家事国事天下事事事关心」名联作者", degree: 3 },
    },
    {
      id: "fengcongwu",
      data: { type: "大臣", name: "冯从吾", title: "左副都御史", note: "与邹元标创办首善书院，著名教育家", degree: 3 },
    },
    {
      id: "chenrenxi",
      data: { type: "大臣", name: "陈仁锡", title: "探花", note: "天启二年探花，明末著名学者、抗清志士", degree: 2 },
    },
    {
      id: "jiangyunyi",
      data: { type: "大臣", name: "蒋允仪", title: "御史", note: "上疏抨击宦官当道，因追论丁巳京察之祸得罪魏忠贤", degree: 2 },
    },
    {
      id: "zhengman",
      data: { type: "大臣", name: "郑鄤", title: "翰林庶吉士", note: "后卷入党争，被温体仁以「杖母不孝」罪名冤杀", degree: 3 },
    },
    {
      id: "houzhenyang",
      data: { type: "大臣", name: "侯震旸", title: "给事中", note: "因批评魏忠贤和客氏被贬", degree: 2 },
    },
    {
      id: "liutingxuan",
      data: { type: "大臣", name: "刘廷宣", title: "御史", note: "直言敢谏，批评吏治腐败", degree: 2 },
    },
    {
      id: "lianguoshi",
      data: { type: "大臣", name: "练国事", title: "御史", note: "举发山东徐鸿儒起义余党", degree: 2 },
    },
    {
      id: "fangzhenru",
      data: { type: "大臣", name: "方震孺", title: "御史", note: "就辽东战事、用人等发表见解", degree: 2 },
    },
    {
      id: "jiangbingqian",
      data: { type: "大臣", name: "江秉谦", title: "御史", note: "就辽东战事、用人等发表见解", degree: 2 },
    },
    {
      id: "wangzhidao",
      data: { type: "大臣", name: "王志道", title: "御史", note: "就辽东战事、用人等发表见解", degree: 2 },
    },
    {
      id: "xiaoji",
      data: { type: "大臣", name: "萧基", title: "给事中", note: "就辽东战事、用人等发表见解", degree: 2 },
    },
    {
      id: "maoshilong",
      data: { type: "大臣", name: "毛士龙", title: "给事中", note: "就辽东战事、用人等发表见解", degree: 2 },
    },
    {
      id: "xiongdeyang",
      data: { type: "大臣", name: "熊德阳", title: "御史", note: "曾上书弹劾阉党", degree: 2 },
    },
    {
      id: "zhouzongjian",
      data: { type: "大臣", name: "周宗建", title: "御史", note: "曾上书弹劾阉党", degree: 2 },
    },
    {
      id: "fangyoudu",
      data: { type: "大臣", name: "方有度", title: "工科给事中", degree: 2 },
    },
    {
      id: "zhangjie",
      data: { type: "大臣", name: "张捷", title: "御史", note: "曾疏荐多位官员", degree: 2 },
    },
    {
      id: "dongchengye",
      data: { type: "大臣", name: "董承业", title: "刑科给事中", degree: 2 },
    },
    {
      id: "zhouxiling",
      data: { type: "大臣", name: "周希令", title: "礼科给事中", degree: 2 },
    },
    // —— 阉党与内廷（补全）——
    {
      id: "sunlong",
      data: { type: "宦官", name: "孙隆", title: "苏杭织造太监", note: "掌管江南织造", degree: 2 },
    },
    // —— 辽东（补全）——
    {
      id: "shenyourong",
      data: {
        type: "武将",
        name: "沈有容",
        title: "登州防海副总兵",
        note: "派船搜剿招抚流亡、接回大量辽民；抗倭及驱逐荷兰殖民者",
        degree: 3,
      },
    },
    {
      id: "heshixian",
      data: { type: "武将", name: "贺世贤", title: "沈阳总兵", note: "天启元年沈阳之战力战后金，城陷战死", degree: 2 },
    },
    {
      id: "youshigong",
      data: { type: "武将", name: "尤世功", title: "沈阳总兵", note: "天启元年沈阳之战力战后金，城陷战死", degree: 2 },
    },
    {
      id: "chence",
      data: { type: "武将", name: "陈策", title: "总兵官", note: "闻沈阳陷落率川浙兵赴援浑河，兵败阵亡", degree: 2 },
    },
    {
      id: "tongzhongkui",
      data: { type: "武将", name: "童仲揆", title: "援辽将领", note: "率部赴援浑河，以寡敌众血战后金，兵败阵亡", degree: 2 },
    },
    {
      id: "qijin",
      data: { type: "武将", name: "戚金", title: "援辽将领", note: "率部赴援浑河，以寡敌众血战后金，兵败阵亡", degree: 2 },
    },
    {
      id: "qinbangping",
      data: { type: "武将", name: "秦邦屏", title: "援辽将领", note: "率部赴援浑河，以寡敌众血战后金，兵败阵亡", degree: 2 },
    },
    {
      id: "zhoudunji",
      data: { type: "武将", name: "周敦吉", title: "援辽将领", note: "率部赴援浑河，以寡敌众血战后金，兵败阵亡", degree: 2 },
    },
    {
      id: "dusong",
      data: { type: "武将", name: "杜松", title: "萨尔浒统帅", note: "万历四十七年萨尔浒之战战死", degree: 2 },
    },
    {
      id: "malin",
      data: { type: "武将", name: "马林", title: "萨尔浒统帅", note: "万历四十七年萨尔浒之战战死", degree: 2 },
    },
    {
      id: "lirubai",
      data: { type: "武将", name: "李如柏", title: "萨尔浒统帅", note: "万历四十七年萨尔浒之战，因战败获罪", degree: 2 },
    },
    {
      id: "liruzhen",
      data: { type: "武将", name: "李如桢", title: "铁岭总兵", note: "萨尔浒之战中拥兵不救，因战败获罪", degree: 3 },
    },
    {
      id: "wusangui",
      data: { type: "武将", name: "吴三桂", title: "总兵官", note: "明末重要武将，因引清兵入关等事被历史铭记", degree: 3 },
    },
    {
      id: "qijiguang",
      data: { type: "武将", name: "戚继光", title: "抗倭名将（已故）", note: "文中提及早年修筑的鞍山城，家族威望延续身后", degree: 2 },
    },
    {
      id: "liuxingzuo",
      data: { type: "武将", name: "刘兴祚", title: "后金将领", note: "驻守复州时计划率众反正归明，事泄后失败", degree: 2 },
    },
    // —— 殉国忠烈（补全）——
    {
      id: "hetingkui",
      data: { type: "大臣", name: "何廷魁", title: "辽阳副使", note: "辽阳陷落后投井殉国", degree: 2 },
    },
    {
      id: "cuiruxiu",
      data: { type: "大臣", name: "崔儒秀", title: "兵备佥事", note: "辽阳陷落后自杀殉国", degree: 2 },
    },
    {
      id: "fuzonglong",
      data: { type: "大臣", name: "傅宗龙", title: "兵部尚书", note: "总督陕西军务，对抗李自成被俘后绝食而死", degree: 2 },
    },
    // —— 降将、叛乱与西南（补全）——
    {
      id: "liyun",
      data: { type: "大臣", name: "李橒", title: "贵州巡抚", note: "贵阳被围十月间与巡按史永安等守城有功", degree: 3 },
    },
    {
      id: "shiyongan",
      data: { type: "大臣", name: "史永安", title: "贵州巡按", note: "与李橒等守贵阳有功", degree: 2 },
    },
    {
      id: "muchangzuo",
      data: { type: "大臣", name: "沐昌祚", title: "黔国公", note: "镇守云南，奉命出兵援黔", degree: 3 },
    },
    {
      id: "chenliangce",
      data: { type: "武将", name: "陈良策", title: "守备", note: "曾提议改变朝鲜粮道运输路线", degree: 2 },
    },
    // —— 学界与西学（补全）——
    {
      id: "dongyingju",
      data: { type: "大臣", name: "董应举", title: "屯田大臣", note: "被张捷举荐，曾主理屯田、大兴屯政", degree: 2 },
    },
    {
      id: "wuzongda",
      data: { type: "大臣", name: "吴宗达", title: "国子监祭酒", note: "后入阁为相", degree: 2 },
    },
    {
      id: "xingyunlu",
      data: { type: "大臣", name: "邢云路", title: "历学家", note: "精通历法，曾进呈《七政真数》", degree: 2 },
    },
    {
      id: "guoshoujing",
      data: { type: "大臣", name: "郭守敬", title: "元代科学家", note: "其修筑的通惠河河道在原文中被提及", degree: 1 },
    },
    // —— 延伸人物 ——
    {
      id: "yangsichang",
      data: { type: "大臣", name: "杨嗣昌", title: "崇祯重臣", note: "提出「四正六隅，十面张网」镇压农民军，主张「攘外必先安内」", degree: 2 },
    },
    {
      id: "hongchengchou",
      data: { type: "大臣", name: "洪承畴", title: "总督", note: "松锦之战兵败降清，后成为清朝平定南方的重要力量", degree: 3 },
    },
    {
      id: "luxiangsheng",
      data: { type: "武将", name: "卢象昇", title: "庶吉士", note: "天启二年庶吉士，明末抗清名将", degree: 2 },
    },
    {
      id: "sunchuanting",
      data: { type: "大臣", name: "孙传庭", title: "庶吉士", note: "天启二年庶吉士，明末剿灭农民军的关键将领", degree: 2 },
    },
    {
      id: "zhouyanru",
      data: { type: "大臣", name: "周延儒", title: "内阁首辅", note: "崇祯朝内阁首辅，有党争、谎报军功等争议", degree: 2 },
    },
    {
      id: "xueguoguan",
      data: { type: "大臣", name: "薛国观", title: "内阁首辅", note: "崇祯朝内阁首辅，有贪墨等争议", degree: 2 },
    },
    {
      id: "qianqianyi",
      data: { type: "大臣", name: "钱谦益", title: "文坛领袖", note: "明末清初文坛领袖", degree: 2 },
    },
    {
      id: "wuweiye",
      data: { type: "大臣", name: "吴伟业", title: "文坛领袖", note: "明末清初文坛领袖", degree: 2 },
    },
    {
      id: "huangzongxi",
      data: { type: "大臣", name: "黄宗羲", title: "思想家", note: "明末清初三大思想家之一", degree: 2 },
    },
    {
      id: "guyanwu",
      data: { type: "大臣", name: "顾炎武", title: "思想家", note: "明末清初三大思想家之一", degree: 2 },
    },
    {
      id: "wangfuzhi",
      data: { type: "大臣", name: "王夫之", title: "思想家", note: "明末清初三大思想家之一", degree: 2 },
    },
    {
      id: "houfangyu",
      data: { type: "大臣", name: "侯方域", title: "明末四公子", note: "合称「明末四公子」之一", degree: 2 },
    },
    {
      id: "fangyizhi",
      data: { type: "大臣", name: "方以智", title: "明末四公子", note: "合称「明末四公子」之一", degree: 2 },
    },
    {
      id: "maoxiang",
      data: { type: "大臣", name: "冒襄", title: "明末四公子", note: "合称「明末四公子」之一", degree: 2 },
    },
    {
      id: "chenzhenhui",
      data: { type: "大臣", name: "陈贞慧", title: "明末四公子", note: "合称「明末四公子」之一", degree: 2 },
    },
    {
      id: "wuyingji",
      data: { type: "大臣", name: "吴应箕", title: "复社成员", note: "反对阉党、抵抗清军，最终殉国", degree: 2 },
    },
    {
      id: "fushan",
      data: { type: "大臣", name: "傅山", title: "思想家", note: "明末清初思想家、学者", degree: 2 },
    },
    {
      id: "liying",
      data: { type: "大臣", name: "李颙", title: "学者", note: "明末清初思想家、学者", degree: 2 },
    },
    {
      id: "zhuzhiyu",
      data: { type: "大臣", name: "朱之瑜", title: "遗民学者", note: "明末遗民，东渡日本传播儒学，对日本水户学影响甚大", degree: 2 },
    },
    {
      id: "wangyangming",
      data: { type: "大臣", name: "王阳明", title: "前代先贤", note: "文中引用的前代先贤，非天启朝直接出场", degree: 1 },
    },
    {
      id: "xujie",
      data: { type: "大臣", name: "徐阶", title: "前代先贤", note: "文中引用的前代先贤，非天启朝直接出场", degree: 1 },
    },
    {
      id: "zhangjuzheng",
      data: { type: "大臣", name: "张居正", title: "前代先贤", note: "文中引用的前代先贤，非天启朝直接出场", degree: 1 },
    },
    {
      id: "fangxiaoru",
      data: { type: "大臣", name: "方孝孺", title: "追谥对象", note: "因「诛十族」典故在后世赫赫有名", degree: 1 },
    },
    {
      id: "wangzhicai",
      data: { type: "大臣", name: "王之寀", title: "刑部主事", note: "揭开「梃击案」的关键人物", degree: 2 },
    },
    {
      id: "zhangcha",
      data: { type: "大臣", name: "张差", title: "梃击案关键人物", note: "明末三大案之一", degree: 2 },
    },
    // —— 崇祯实录：皇帝与对手 ——
    {
      id: "chongzhen",
      data: {
        type: "皇室",
        name: "朱由检",
        title: "崇祯帝",
        note: "明朝末代皇帝，在位十七年；崇祯十七年三月李自成攻破北京，于煤山自缢殉国",
        degree: 16,
      },
    },
    {
      id: "huangtaiji",
      data: {
        type: "外敌",
        name: "皇太极",
        title: "后金天聪汗",
        note: "后金（清）开国皇帝，指挥清军不断破关而入，为入主中原奠定基础",
        degree: 10,
      },
    },
    {
      id: "duoergun",
      data: {
        type: "外敌",
        name: "多尔衮",
        title: "清摄政王",
        note: "清初实际掌权者，入关后成为清朝摄政王",
        degree: 8,
      },
    },
    // —— 农民起义领袖 ——
    {
      id: "lizicheng",
      data: {
        type: "外敌",
        name: "李自成",
        title: "大顺闯王",
        note: "明末农民起义领袖，于西安称帝，率军东征攻克北京，直接推翻明朝",
        degree: 12,
      },
    },
    {
      id: "zhangxianzhong",
      data: {
        type: "外敌",
        name: "张献忠",
        title: "大西政权",
        note: "明末农民起义另一主要领袖，转战湖广、四川等地，与明军反复交战",
        degree: 8,
      },
    },
    {
      id: "gaoyingxiang",
      data: {
        type: "外敌",
        name: "高迎祥",
        title: "闯王（首位）",
        note: "早期农民军重要领袖，「闯王」名号的首位使用者；在盭厔被孙传庭击败擒杀",
        degree: 5,
      },
    },
    {
      id: "luorucai",
      data: { type: "外敌", name: "罗汝才", title: "农民军头领", note: "明末农民军重要头领，各据一方", degree: 3 },
    },
    {
      id: "heylong",
      data: { type: "外敌", name: "贺一龙", title: "农民军头领", note: "明末农民军重要头领", degree: 3 },
    },
    {
      id: "mashouying",
      data: { type: "外敌", name: "马守应", title: "老回回", note: "明末农民军重要头领", degree: 3 },
    },
    {
      id: "hejin",
      data: { type: "外敌", name: "贺锦", title: "农民军头领", note: "明末农民军重要头领", degree: 3 },
    },
    {
      id: "yuanshizhong",
      data: { type: "外敌", name: "袁时中", title: "农民军头领", note: "明末农民军重要头领", degree: 3 },
    },
    {
      id: "hunshiwang",
      data: { type: "外敌", name: "混十万", title: "农民军头领", note: "明末农民军重要头领", degree: 3 },
    },
    {
      id: "wangjiayin",
      data: {
        type: "外敌",
        name: "王嘉胤",
        title: "陕西起义领袖",
        note: "崇祯初年陕西农民起义早期领袖，被曹文诏击斩",
        degree: 3,
      },
    },
    // —— 崇祯朝廷中枢 ——
    {
      id: "qianlongxi",
      data: { type: "大臣", name: "钱龙锡", title: "内阁大学士", note: "在袁崇焕案中被牵连下狱，后戍边", degree: 4 },
    },
    {
      id: "wushen",
      data: { type: "大臣", name: "吴甡", title: "大学士", note: "奉命携帑金赴陕西赈灾并处理招抚事宜；后督师无功", degree: 3 },
    },
    {
      id: "chenxinjia",
      data: { type: "大臣", name: "陈新甲", title: "兵部尚书", note: "因主和被处死", degree: 4 },
    },
    {
      id: "lijiantai",
      data: { type: "大臣", name: "李建泰", title: "大学士", note: "主动请缨「代朕亲征」，出京后行动迟缓，兵败被俘", degree: 3 },
    },
    {
      id: "fanjingwen",
      data: { type: "大臣", name: "范景文", title: "工部尚书", note: "后兼东阁大学士，受命守城，北京城破后投井殉国", degree: 4 },
    },
    {
      id: "jinsheng",
      data: { type: "大臣", name: "金声", title: "翰林庶吉士", note: "推荐义士申甫练兵，城破后坚持抗清，被俘就义", degree: 3 },
    },
    {
      id: "zhangjinyan",
      data: { type: "大臣", name: "张缙彦", title: "兵部尚书", note: "负责京城防御，后降清", degree: 3 },
    },
    {
      id: "chenyan",
      data: { type: "大臣", name: "陈演", title: "大学士", note: "国难当头无所作为，后被大顺军拷掠而死", degree: 3 },
    },
    {
      id: "weizaode",
      data: { type: "大臣", name: "魏藻德", title: "大学士", note: "国难当头无所作为，后被大顺军拷掠而死", degree: 3 },
    },
    {
      id: "qiuyu",
      data: { type: "大臣", name: "丘瑜", title: "东阁大学士", note: "城破后被俘不屈或死于拷掠", degree: 2 },
    },
    {
      id: "fangyuegong",
      data: { type: "大臣", name: "方岳贡", title: "东阁大学士", note: "城破后被俘不屈或死于拷掠", degree: 2 },
    },
    {
      id: "zhangpu",
      data: { type: "大臣", name: "张溥", title: "复社领袖", note: "文中因「结党」遭弹劾", degree: 3 },
    },
    {
      id: "mashiying",
      data: { type: "大臣", name: "马士英", title: "凤阳总督", note: "明朝灭亡后在南京拥立福王，成为南明弘光朝权臣", degree: 5 },
    },
    {
      id: "shikefa",
      data: { type: "大臣", name: "史可法", title: "漕运总督", note: "后为南明抗清名臣，以忠烈著称", degree: 6 },
    },
    {
      id: "liuhongxun",
      data: { type: "大臣", name: "刘鸿训", title: "大学士", note: "崇祯朝重要官员，参与中枢决策", degree: 2 },
    },
    {
      id: "liuzhilun",
      data: { type: "大臣", name: "刘之纶", title: "兵部侍郎", note: "崇祯朝重要官员", degree: 2 },
    },
    {
      id: "sunyuanhua",
      data: { type: "武将", name: "孙元化", title: "登莱巡抚", note: "因招抚孔有德兵败被诛", degree: 4 },
    },
    {
      id: "ruandaocheng",
      data: { type: "大臣", name: "阮大铖", title: "阉党余孽", note: "在南明时期扮演关键角色", degree: 4 },
    },
    {
      id: "wuchangshi",
      data: { type: "大臣", name: "吴昌时", title: "兵部侍郎", note: "崇祯朝重要官员", degree: 2 },
    },
    {
      id: "heruchong",
      data: { type: "大臣", name: "何如宠", title: "内阁首辅", note: "崇祯朝首辅及大学士", degree: 3 },
    },
    {
      id: "qianshisheng",
      data: { type: "大臣", name: "钱士升", title: "内阁首辅", note: "崇祯朝首辅及大学士", degree: 3 },
    },
    {
      id: "zhengsanjun",
      data: { type: "大臣", name: "郑三俊", title: "吏部尚书", note: "崇祯后期各部尚书及大学士", degree: 2 },
    },
    {
      id: "liyuzhi",
      data: { type: "大臣", name: "李遇知", title: "户部尚书", degree: 2 },
    },
    {
      id: "fengyuanbiao",
      data: { type: "大臣", name: "冯元飈", title: "大学士", degree: 2 },
    },
    {
      id: "wangyingxiong",
      data: { type: "大臣", name: "王应熊", title: "大学士", degree: 2 },
    },
    {
      id: "jiangdejing",
      data: { type: "大臣", name: "蒋德璟", title: "大学士", degree: 2 },
    },
    {
      id: "huangjingfang",
      data: { type: "大臣", name: "黄景昉", title: "大学士", degree: 2 },
    },
    {
      id: "hefengsheng",
      data: { type: "大臣", name: "贺逢圣", title: "大学士", note: "武昌陷落遭李自成杀害", degree: 3 },
    },
    {
      id: "lvweiqi",
      data: { type: "大臣", name: "吕维祺", title: "南京兵部尚书", note: "遭李自成杀害", degree: 3 },
    },
    {
      id: "xiesheng",
      data: { type: "大臣", name: "谢升", title: "大学士", degree: 2 },
    },
    {
      id: "fanfucui",
      data: { type: "大臣", name: "范复粹", title: "大学士", degree: 2 },
    },
    {
      id: "wanyuanji",
      data: { type: "大臣", name: "万元吉", title: "大学士", degree: 2 },
    },
    // —— 崇祯东林党与言官 ——
    {
      id: "chenzizhuang",
      data: { type: "大臣", name: "陈子壮", title: "抗清志士", note: "明末名臣，在广州殉国", degree: 3 },
    },
    {
      id: "zhoushunzhang",
      data: { type: "大臣", name: "周顺昌", title: "东林党人", note: "在晚明党争与抗阉斗争中留名", degree: 3 },
    },
    {
      id: "huangzunsu",
      data: { type: "大臣", name: "黄尊素", title: "东林党人", note: "魏大中之父，东林党骨干", degree: 3 },
    },
    {
      id: "miaochangqi",
      data: { type: "大臣", name: "缪昌期", title: "东林党人", note: "在晚明党争与抗阉斗争中留名", degree: 3 },
    },
    // —— 崇祯名将与督抚 ——
    {
      id: "zuoliangyu",
      data: {
        type: "武将",
        name: "左良玉",
        title: "平贼将军",
        note: "手握重兵，盘踞湖广，大破张献忠于玛瑙山；南明时封宁南伯",
        degree: 6,
      },
    },
    {
      id: "caowenzhao",
      data: {
        type: "武将",
        name: "曹文诏",
        title: "总兵官",
        note: "明末第一猛将，在山西、陕西等地屡败农民军，击杀王嘉胤；后在娑罗寨力竭自刎",
        degree: 5,
      },
    },
    {
      id: "caobianjiao",
      data: { type: "武将", name: "曹变蛟", title: "总兵官", note: "随洪承畴、孙传庭转战，松山之战被俘不屈而死", degree: 4 },
    },
    {
      id: "wangqiaonian",
      data: { type: "大臣", name: "汪乔年", title: "陕西总督", note: "负责剿寇与防务", degree: 3 },
    },
    {
      id: "dingqirui",
      data: { type: "大臣", name: "丁启睿", title: "总督", note: "负责剿寇与防务", degree: 3 },
    },
    {
      id: "zhouyuji",
      data: {
        type: "武将",
        name: "周遇吉",
        title: "山西总兵",
        note: "宁武关守将，孤立无援下力战殉国，全家自焚",
        degree: 4,
      },
    },
    {
      id: "qiuminyang",
      data: { type: "大臣", name: "丘民仰", title: "辽东巡抚", note: "松山之战被俘不屈而死", degree: 3 },
    },
    {
      id: "yangguozhu",
      data: { type: "武将", name: "杨国柱", title: "总兵官", note: "松山之战阵亡", degree: 3 },
    },
    {
      id: "wangtingchen",
      data: { type: "武将", name: "王廷臣", title: "总兵官", note: "松山之战被俘不屈死", degree: 3 },
    },
    {
      id: "wangpu",
      data: { type: "武将", name: "王朴", title: "总兵官", note: "松山之战先逃", degree: 3 },
    },
    {
      id: "tangtong",
      data: { type: "武将", name: "唐通", title: "总兵官", note: "后降李自成又降清", degree: 3 },
    },
    {
      id: "baiguangen",
      data: { type: "武将", name: "白广恩", title: "总兵官", degree: 2 },
    },
    {
      id: "make",
      data: { type: "武将", name: "马科", title: "总兵官", degree: 2 },
    },
    {
      id: "gaojie",
      data: { type: "武将", name: "高杰", title: "江北四镇", note: "原为李自成部将后降明", degree: 4 },
    },
    {
      id: "liuzeqing",
      data: { type: "武将", name: "刘泽清", title: "江北四镇", note: "抗命南逃后降清", degree: 4 },
    },
    {
      id: "huangdegong",
      data: { type: "武将", name: "黄得功", title: "江北四镇", degree: 4 },
    },
    {
      id: "liuliangzuo",
      data: { type: "武将", name: "刘良佐", title: "江北四镇", degree: 4 },
    },
    {
      id: "xudingguo",
      data: { type: "武将", name: "许定国", title: "总兵官", note: "杀高杰降清", degree: 3 },
    },
    {
      id: "chenyongfu",
      data: { type: "武将", name: "陈永福", title: "总兵官", note: "曾射伤李自成", degree: 3 },
    },
    {
      id: "zuoguangxian",
      data: { type: "武将", name: "左光先", title: "总兵官", note: "后降清", degree: 2 },
    },
    {
      id: "chenqiyu",
      data: {
        type: "大臣",
        name: "陈奇瑜",
        title: "五省总督",
        note: "在车厢峡几乎困死李自成等部，因接受诈降导致农民军脱困，被削职下狱",
        degree: 4,
      },
    },
    {
      id: "yanghe",
      data: { type: "大臣", name: "杨鹤", title: "总督", note: "因招抚政策失败被下狱", degree: 3 },
    },
    {
      id: "zhengzhilong",
      data: { type: "武将", name: "郑芝龙", title: "福建总兵", note: "明末海盗出身的将领，郑成功之父", degree: 4 },
    },
    {
      id: "zhangchun",
      data: { type: "大臣", name: "张春", title: "监军", note: "率军增援大凌河，兵败被俘后拒绝投降", degree: 3 },
    },
    {
      id: "wuxiang",
      data: { type: "武将", name: "吴襄", title: "总兵", note: "吴三桂之父", degree: 3 },
    },
    {
      id: "herenlong",
      data: { type: "武将", name: "贺人龙", title: "总兵官", note: "活跃于剿寇前线", degree: 3 },
    },
    {
      id: "zhangyingchang",
      data: { type: "武将", name: "张应昌", title: "总兵官", note: "活跃于剿寇前线", degree: 2 },
    },
    // —— 崇祯宦官与内廷 ——
    {
      id: "xuxianchun",
      data: { type: "宦官", name: "许显纯", title: "阉党要员", note: "崇祯初被清算", degree: 3 },
    },
    {
      id: "tianergeng",
      data: { type: "宦官", name: "田尔耕", title: "阉党要员", note: "崇祯初被清算", degree: 3 },
    },
    {
      id: "wangchengen",
      data: {
        type: "宦官",
        name: "王承恩",
        title: "司礼监太监",
        note: "崇祯帝心腹，城破之日跟随皇帝登上煤山，皇帝自缢后亦自缢从死",
        degree: 4,
      },
    },
    {
      id: "duxun",
      data: { type: "宦官", name: "杜勋", title: "监视太监", note: "射书城中约降，劝说崇祯帝退位", degree: 3 },
    },
    {
      id: "caohuachun",
      data: { type: "宦官", name: "曹化淳", title: "权监", note: "被指控打开城门迎降李自成", degree: 3 },
    },
    // —— 降将叛将 ——
    {
      id: "kongyoude",
      data: {
        type: "外敌",
        name: "孔有德",
        title: "恭顺王",
        note: "吴桥兵变后攻陷登州，渡海降清，为清兵先锋",
        degree: 5,
      },
    },
    {
      id: "gengzhongming",
      data: { type: "外敌", name: "耿仲明", title: "怀顺王", note: "与孔有德一同兵变降清", degree: 4 },
    },
    {
      id: "shangkexi",
      data: { type: "外敌", name: "尚可喜", title: "平南王", note: "降清后与孔、耿合称「三顺王」", degree: 4 },
    },
    // —— 殉国忠烈 ——
    {
      id: "zhouhuanghou",
      data: { type: "后宫", name: "周皇后", title: "崇祯皇后", note: "城破前夕自缢殉国", degree: 3 },
    },
    // —— 大顺政权 ——
    {
      id: "niujinxing",
      data: { type: "外敌", name: "牛金星", title: "大顺丞相", note: "李自成拜为丞相，更定六政府尚书等伪官", degree: 4 },
    },
    {
      id: "songxiance",
      data: { type: "外敌", name: "宋献策", title: "大顺军师", note: "李自成拜为军师，以善奇计著称", degree: 3 },
    },
    {
      id: "liuzongmin",
      data: { type: "外敌", name: "刘宗敏", title: "汝侯", note: "李自成麾下权将军，在北京负责拷掠明朝官员追赃助饷", degree: 4 },
    },
    // —— 皇室与宗藩 ——
    {
      id: "yianhuanghou",
      data: { type: "后宫", name: "懿安皇后", title: "天启皇后张氏", note: "天启、崇祯初皇室成员", degree: 2 },
    },
    {
      id: "tianguifei",
      data: { type: "后宫", name: "田贵妃", title: "崇祯妃", note: "天启、崇祯初皇室成员", degree: 2 },
    },
    {
      id: "zhucilang",
      data: { type: "皇室", name: "朱慈烺", title: "皇太子", note: "北京危急时崇祯帝曾命大臣商讨让其监抚南京", degree: 4 },
    },
    {
      id: "zhuchangxun",
      data: { type: "皇室", name: "朱常洵", title: "福王", note: "被农民军杀害的明宗室", degree: 3 },
    },
    {
      id: "zhuyiming",
      data: { type: "皇室", name: "朱翊铭", title: "襄王", note: "被农民军杀害的明宗室", degree: 2 },
    },
    {
      id: "zhuhuakui",
      data: { type: "皇室", name: "朱华奎", title: "楚王", note: "被农民军杀害的明宗室", degree: 2 },
    },
    {
      id: "zhuyujian",
      data: { type: "皇室", name: "朱聿键", title: "唐王·隆武帝", note: "奏南阳饥荒人相食，请率兵勤王；后为南明隆武帝", degree: 4 },
    },
    {
      id: "zhuchangying",
      data: { type: "皇室", name: "朱常瀛", title: "桂王", note: "各藩王，或抗清，或遇害", degree: 2 },
    },
    {
      id: "zhuchangrun",
      data: { type: "皇室", name: "朱常润", title: "惠王", degree: 2 },
    },
    {
      id: "zhuyinhong",
      data: { type: "皇室", name: "朱禋洪", title: "岷王", degree: 2 },
    },
    {
      id: "zhushouyong",
      data: { type: "皇室", name: "朱寿镛", title: "鲁王", degree: 2 },
    },
    // —— 其他 ——
    {
      id: "tangruowang",
      data: { type: "大臣", name: "汤若望", title: "西洋传教士", note: "文中提及火器演练", degree: 3 },
    },
  ],
  edges: [
    { id: "e1", source: "guangzong", target: "xizong", data: { type: "父子" } },
    { id: "e2", source: "wang-cairen", target: "xizong", data: { type: "生母" } },
    { id: "e3", source: "keshi", target: "xizong", data: { type: "乳母" } },
    { id: "e4", source: "li-xuanshi", target: "xizong", data: { type: "抚养" } },
    { id: "e5", source: "li-xuanshi", target: "wang-cairen", data: { type: "殴辱" } },
    { id: "e6", source: "yanglian", target: "xizong", data: { type: "拥立" } },
    { id: "e7", source: "zuoguangdou", target: "xizong", data: { type: "拥立" } },
    { id: "e8", source: "yanglian", target: "li-xuanshi", data: { type: "弹劾" } },
    { id: "e9", source: "zuoguangdou", target: "li-xuanshi", data: { type: "弹劾" } },
    { id: "e10", source: "weizhongxian", target: "xizong", data: { type: "近侍" } },
    { id: "e11", source: "weizhongxian", target: "keshi", data: { type: "交通" } },
    { id: "e12", source: "fangcongzhe", target: "li-xuanshi", data: { type: "庇护" } },
    { id: "e13", source: "likzhuo", target: "guangzong", data: { type: "进红丸" } },
    { id: "e14", source: "cuiwensheng", target: "guangzong", data: { type: "进药" } },
    { id: "e15", source: "lijinzhong", target: "li-xuanshi", data: { type: "党羽" } },
    { id: "e16", source: "xiongtingbi", target: "xizong", data: { type: "经略" } },
    { id: "e17", source: "liuzongzhou", target: "weizhongxian", data: { type: "弹劾" } },
    { id: "e18", source: "zuoguangdou", target: "sunruyou", data: { type: "反对" } },
    { id: "e19", source: "fangcongzhe", target: "likzhuo", data: { type: "庇护" } },
    { id: "e20", source: "liuyipan", target: "xizong", data: { type: "辅政" } },
    { id: "e21", source: "zhuchunchen", target: "xizong", data: { type: "监修" } },
    { id: "e22", source: "wentiren", target: "xizong", data: { type: "总裁实录" } },
    { id: "e23", source: "yuanyingtai", target: "xiongtingbi", data: { type: "接任" } },
    { id: "e24", source: "yuanyingtai", target: "xizong", data: { type: "经略" } },
    { id: "e25", source: "sunchengzong", target: "xizong", data: { type: "日讲" } },
    { id: "e26", source: "xuguangqi", target: "xizong", data: { type: "练兵" } },
    { id: "e27", source: "yanglian", target: "weizhongxian", data: { type: "弹劾" } },
    { id: "e28", source: "zuoguangdou", target: "weizhongxian", data: { type: "弹劾" } },
    { id: "e29", source: "fangcongzhe", target: "cuiwensheng", data: { type: "庇护" } },
    { id: "e30", source: "yanglian", target: "xiongtingbi", data: { type: "论辽" } },
    { id: "e31", source: "xiongtingbi", target: "yuanyingtai", data: { type: "罢职" } },
    { id: "e32", source: "fangcongzhe", target: "xizong", data: { type: "首辅" } },
    { id: "e33", source: "yexianggao", target: "xizong", data: { type: "大学士" } },
    { id: "e34", source: "yexianggao", target: "fangcongzhe", data: { type: "同阁" } },
    { id: "e35", source: "sunruyou", target: "xizong", data: { type: "入阁" } },
    { id: "e36", source: "zhoujiamo", target: "xizong", data: { type: "掌铨选" } },
    { id: "e37", source: "zhoujiamo", target: "weizhongxian", data: { type: "党争" } },
    { id: "e38", source: "huangkezuan", target: "xizong", data: { type: "刑部" } },
    { id: "e39", source: "liruhua", target: "xizong", data: { type: "筹饷" } },
    { id: "e40", source: "liruhua", target: "xiongtingbi", data: { type: "辽饷" } },
    { id: "e41", source: "liuyipan", target: "yanglian", data: { type: "支持" } },
    { id: "e42", source: "liuyipan", target: "zuoguangdou", data: { type: "支持" } },
    { id: "e43", source: "hanhuang", target: "xizong", data: { type: "大学士" } },
    { id: "e44", source: "hanhuang", target: "yanglian", data: { type: "东林" } },
    { id: "e45", source: "hanhuang", target: "zuoguangdou", data: { type: "东林" } },
    { id: "e46", source: "sunruyou", target: "li-xuanshi", data: { type: "移宫" } },
    // 外敌与辽东
    { id: "e47", source: "nuerhachi", target: "xiongtingbi", data: { type: "对峙" } },
    { id: "e48", source: "nuerhachi", target: "xizong", data: { type: "辽东危局" } },
    { id: "e49", source: "nuerhachi", target: "yuanyingtai", data: { type: "攻陷辽阳" } },
    { id: "e50", source: "nuerhachi", target: "yuanchonghuan", data: { type: "宁远败伤" } },
    { id: "e51", source: "liyongfang", target: "nuerhachi", data: { type: "首叛降金" } },
    { id: "e52", source: "liyongfang", target: "xiongtingbi", data: { type: "劝降" } },
    // 经抚不和
    { id: "e53", source: "wanghuazhen", target: "xiongtingbi", data: { type: "经抚不和" } },
    { id: "e54", source: "zhangheming", target: "wanghuazhen", data: { type: "偏袒" } },
    { id: "e55", source: "zhangheming", target: "xiongtingbi", data: { type: "排挤" } },
    { id: "e56", source: "zhouzhaorui", target: "zhangheming", data: { type: "弹劾" } },
    { id: "e57", source: "yaozongwen", target: "xiongtingbi", data: { type: "罢职" } },
    { id: "e58", source: "yaozongwen", target: "wanghuazhen", data: { type: "举荐" } },
    { id: "e59", source: "wangzaijin", target: "xiongtingbi", data: { type: "接任" } },
    { id: "e60", source: "yuanchonghuan", target: "wangzaijin", data: { type: "反对" } },
    { id: "e61", source: "yanghao", target: "nuerhachi", data: { type: "萨尔浒败" } },
    { id: "e62", source: "yanghao", target: "liujing", data: { type: "统帅" } },
    // 孙承宗辽东体系
    { id: "e63", source: "sunchengzong", target: "xiongtingbi", data: { type: "边防" } },
    { id: "e64", source: "sunchengzong", target: "yuanchonghuan", data: { type: "提拔" } },
    { id: "e65", source: "sunchengzong", target: "mashilong", data: { type: "委任" } },
    { id: "e66", source: "sunchengzong", target: "zhangfengyi", data: { type: "协防" } },
    { id: "e67", source: "sunchengzong", target: "yanmingtai", data: { type: "协防" } },
    { id: "e68", source: "sunchengzong", target: "wangxiangqian", data: { type: "协防" } },
    { id: "e69", source: "yuanchonghuan", target: "xizong", data: { type: "筑城" } },
    { id: "e70", source: "yuanchonghuan", target: "maowenlong", data: { type: "诛杀" } },
    { id: "e71", source: "maowenlong", target: "yuankeli", data: { type: "犄角" } },
    { id: "e72", source: "maowenlong", target: "nuerhachi", data: { type: "牵制" } },
    { id: "e73", source: "yuankeli", target: "nuerhachi", data: { type: "东江防线" } },
    { id: "e74", source: "zudashou", target: "yuanchonghuan", data: { type: "守宁远" } },
    { id: "e75", source: "mangui", target: "nuerhachi", data: { type: "战死" } },
    { id: "e76", source: "zhaoshujiao", target: "nuerhachi", data: { type: "战死" } },
    { id: "e77", source: "zhangquan", target: "nuerhachi", data: { type: "殉国" } },
    { id: "e78", source: "zhangquan", target: "yuanyingtai", data: { type: "辽阳殉国" } },
    // 阉党体系
    { id: "e79", source: "cuichengxiu", target: "weizhongxian", data: { type: "五虎" } },
    { id: "e80", source: "fengquan", target: "weizhongxian", data: { type: "党羽" } },
    { id: "e81", source: "fengquan", target: "cuichengxiu", data: { type: "狼狈为奸" } },
    { id: "e82", source: "gubingqian", target: "weizhongxian", data: { type: "谄附" } },
    { id: "e83", source: "sunjie", target: "weizhongxian", data: { type: "迎合" } },
    { id: "e84", source: "sunjie", target: "liuyipan", data: { type: "弹劾" } },
    { id: "e85", source: "sunjie", target: "zhoujiamo", data: { type: "弹劾" } },
    { id: "e86", source: "wangshaohui", target: "weizhongxian", data: { type: "党羽" } },
    { id: "e87", source: "wangtigan", target: "weizhongxian", data: { type: "党羽" } },
    { id: "e88", source: "liuchao", target: "weizhongxian", data: { type: "死党" } },
    { id: "e89", source: "guogong", target: "weizhongxian", data: { type: "结交" } },
    { id: "e90", source: "guogong", target: "xiongtingbi", data: { type: "弹劾" } },
    { id: "e91", source: "gubingqian", target: "xizong", data: { type: "首辅" } },
    { id: "e92", source: "donghanru", target: "weizhongxian", data: { type: "反对" } },
    { id: "e93", source: "zhangwenda", target: "weizhongxian", data: { type: "反对" } },
    { id: "e94", source: "wang-an", target: "guangzong", data: { type: "保护" } },
    { id: "e95", source: "wang-an", target: "xizong", data: { type: "保护" } },
    { id: "e96", source: "weizhongxian", target: "wang-an", data: { type: "害死" } },
    // 东林党体系
    { id: "e97", source: "weidazhong", target: "weizhongxian", data: { type: "弹劾" } },
    { id: "e98", source: "weidazhong", target: "yanglian", data: { type: "东林" } },
    { id: "e99", source: "zouyuanbiao", target: "yanglian", data: { type: "东林" } },
    { id: "e100", source: "zouyuanbiao", target: "zuoguangdou", data: { type: "东林" } },
    { id: "e101", source: "gaopanlong", target: "yanglian", data: { type: "东林" } },
    { id: "e102", source: "zhaonanxing", target: "weizhongxian", data: { type: "对抗" } },
    { id: "e103", source: "zhaonanxing", target: "yanglian", data: { type: "东林" } },
    { id: "e104", source: "sunshenxing", target: "fangcongzhe", data: { type: "红丸弹劾" } },
    { id: "e105", source: "huangkezuan", target: "fangcongzhe", data: { type: "红丸辩护" } },
    { id: "e106", source: "sunshenxing", target: "huangkezuan", data: { type: "对立" } },
    { id: "e107", source: "wangji", target: "weizhongxian", data: { type: "斗争" } },
    { id: "e108", source: "wenzhenmeng", target: "weizhongxian", data: { type: "触怒" } },
    { id: "e109", source: "cuichengxiu", target: "yanglian", data: { type: "迫害" } },
    { id: "e110", source: "cuichengxiu", target: "zuoguangdou", data: { type: "迫害" } },
    { id: "e111", source: "cuichengxiu", target: "weidazhong", data: { type: "迫害" } },
    { id: "e112", source: "lisancai", target: "yanglian", data: { type: "交好" } },
    { id: "e113", source: "lisancai", target: "yexianggao", data: { type: "东林" } },
    // 红丸移宫
    { id: "e114", source: "jiajichun", target: "li-xuanshi", data: { type: "移宫" } },
    { id: "e115", source: "jiajichun", target: "fangcongzhe", data: { type: "立场反复" } },
    // 西南平叛
    { id: "e116", source: "shechongming", target: "anbangyan", data: { type: "合流" } },
    { id: "e117", source: "shechongming", target: "xizong", data: { type: "奢安之乱" } },
    { id: "e118", source: "wangshan", target: "shechongming", data: { type: "平叛" } },
    { id: "e119", source: "wangshan", target: "anbangyan", data: { type: "平叛" } },
    { id: "e120", source: "zhuxuanyuan", target: "shechongming", data: { type: "平叛" } },
    { id: "e121", source: "zhuxuanyuan", target: "wangshan", data: { type: "接任" } },
    { id: "e122", source: "caifuyi", target: "wangshan", data: { type: "接任" } },
    { id: "e123", source: "caifuyi", target: "anbangyan", data: { type: "平叛" } },
    // 山东白莲教
    { id: "e124", source: "xuhongru", target: "xizong", data: { type: "白莲教乱" } },
    { id: "e125", source: "zhaoyan", target: "xuhongru", data: { type: "平叛" } },
    { id: "e126", source: "yangzhaoji", target: "xuhongru", data: { type: "平叛" } },
    // 西学与中枢
    { id: "e127", source: "lizhizao", target: "xuguangqi", data: { type: "西学" } },
    { id: "e128", source: "lizhizao", target: "xizong", data: { type: "西洋大炮" } },
    { id: "e129", source: "shijijie", target: "xizong", data: { type: "大学士" } },
    { id: "e130", source: "wangxiangqian", target: "xizong", data: { type: "蓟辽" } },
    { id: "e131", source: "qinliangyu", target: "nuerhachi", data: { type: "抗金" } },
    { id: "e132", source: "ni-yuanlu", target: "xizong", data: { type: "庶吉士" } },
    { id: "e133", source: "huangdaozhou", target: "xizong", data: { type: "庶吉士" } },
    { id: "e134", source: "yexianggao", target: "xiongtingbi", data: { type: "熊王之争" } },
    { id: "e135", source: "yexianggao", target: "wanghuazhen", data: { type: "熊王之争" } },
    // 内阁补全
    { id: "e136", source: "hezongyan", target: "xizong", data: { type: "入阁" } },
    { id: "e137", source: "zhuguozuo", target: "xizong", data: { type: "入阁" } },
    { id: "e138", source: "shen-qi", target: "xizong", data: { type: "入阁" } },
    { id: "e139", source: "zhuyanxi", target: "xizong", data: { type: "入阁" } },
    { id: "e140", source: "weiguangwei", target: "xizong", data: { type: "入阁" } },
    { id: "e141", source: "weiguangwei", target: "weizhongxian", data: { type: "阉党阁臣" } },
    { id: "e142", source: "zhuguozhen", target: "xizong", data: { type: "入阁" } },
    { id: "e143", source: "linyaoyu", target: "xizong", data: { type: "礼部" } },
    { id: "e144", source: "zhongyuzheng", target: "xizong", data: { type: "工部" } },
    { id: "e145", source: "weiyangmeng", target: "xizong", data: { type: "南京兵部" } },
    { id: "e146", source: "shenjingjie", target: "xizong", data: { type: "云南巡抚" } },
    { id: "e147", source: "libanghua", target: "zouyuanbiao", data: { type: "师从" } },
    { id: "e148", source: "taolangxian", target: "yuankeli", data: { type: "登莱" } },
    { id: "e149", source: "yangshuzhong", target: "shechongming", data: { type: "平叛" } },
    { id: "e150", source: "heshijin", target: "shechongming", data: { type: "援黔" } },
    { id: "e151", source: "zhangwoxu", target: "shechongming", data: { type: "平乱" } },
    { id: "e152", source: "guoyunhou", target: "xizong", data: { type: "户部" } },
    // 东林党补全
    { id: "e153", source: "yuanhuazhong", target: "yanglian", data: { type: "六君子" } },
    { id: "e154", source: "gudazhang", target: "yanglian", data: { type: "六君子" } },
    { id: "e155", source: "yuanhuazhong", target: "weizhongxian", data: { type: "迫害" } },
    { id: "e156", source: "gudazhang", target: "weizhongxian", data: { type: "迫害" } },
    { id: "e157", source: "guxiancheng", target: "zouyuanbiao", data: { type: "东林三君" } },
    { id: "e158", source: "guxiancheng", target: "zhaonanxing", data: { type: "东林三君" } },
    { id: "e159", source: "fengcongwu", target: "zouyuanbiao", data: { type: "首善书院" } },
    { id: "e160", source: "chenrenxi", target: "wenzhenmeng", data: { type: "天启二年" } },
    { id: "e161", source: "jiangyunyi", target: "weizhongxian", data: { type: "得罪" } },
    { id: "e162", source: "wentiren", target: "zhengman", data: { type: "冤杀" } },
    { id: "e163", source: "houzhenyang", target: "weizhongxian", data: { type: "批评" } },
    { id: "e164", source: "houzhenyang", target: "keshi", data: { type: "批评" } },
    { id: "e165", source: "lianguoshi", target: "xuhongru", data: { type: "举发余党" } },
    { id: "e166", source: "fangzhenru", target: "xiongtingbi", data: { type: "论辽" } },
    { id: "e167", source: "jiangbingqian", target: "xiongtingbi", data: { type: "论辽" } },
    { id: "e168", source: "wangzhidao", target: "wanghuazhen", data: { type: "论辽" } },
    { id: "e169", source: "xiaoji", target: "yanglian", data: { type: "东林" } },
    { id: "e170", source: "maoshilong", target: "yanglian", data: { type: "东林" } },
    { id: "e171", source: "xiongdeyang", target: "weizhongxian", data: { type: "弹劾" } },
    { id: "e172", source: "zhouzongjian", target: "weizhongxian", data: { type: "弹劾" } },
    { id: "e173", source: "zhangjie", target: "dongyingju", data: { type: "举荐" } },
    { id: "e174", source: "dongchengye", target: "xizong", data: { type: "言路" } },
    { id: "e175", source: "zhouxiling", target: "xizong", data: { type: "言路" } },
    { id: "e176", source: "liutingxuan", target: "zhoujiamo", data: { type: "论吏治" } },
    // 阉党补全
    { id: "e177", source: "sunlong", target: "weizhongxian", data: { type: "内廷" } },
    // 辽东将领补全
    { id: "e178", source: "shenyourong", target: "yuankeli", data: { type: "登莱防务" } },
    { id: "e179", source: "heshixian", target: "nuerhachi", data: { type: "沈阳战死" } },
    { id: "e180", source: "youshigong", target: "nuerhachi", data: { type: "沈阳战死" } },
    { id: "e181", source: "chence", target: "nuerhachi", data: { type: "浑河阵亡" } },
    { id: "e182", source: "tongzhongkui", target: "nuerhachi", data: { type: "浑河阵亡" } },
    { id: "e183", source: "qijin", target: "nuerhachi", data: { type: "浑河阵亡" } },
    { id: "e184", source: "qinbangping", target: "nuerhachi", data: { type: "浑河阵亡" } },
    { id: "e185", source: "zhoudunji", target: "nuerhachi", data: { type: "浑河阵亡" } },
    { id: "e186", source: "qijin", target: "qijiguang", data: { type: "戚家后人" } },
    { id: "e187", source: "dusong", target: "nuerhachi", data: { type: "萨尔浒战死" } },
    { id: "e188", source: "malin", target: "nuerhachi", data: { type: "萨尔浒战死" } },
    { id: "e189", source: "yanghao", target: "dusong", data: { type: "统帅" } },
    { id: "e190", source: "yanghao", target: "malin", data: { type: "统帅" } },
    { id: "e191", source: "yanghao", target: "lirubai", data: { type: "统帅" } },
    { id: "e192", source: "weidazhong", target: "liruzhen", data: { type: "弹劾" } },
    { id: "e193", source: "weidazhong", target: "yanghao", data: { type: "弹劾" } },
    { id: "e194", source: "wusangui", target: "zudashou", data: { type: "关宁集团" } },
    { id: "e195", source: "wusangui", target: "nuerhachi", data: { type: "明末武将" } },
    { id: "e196", source: "liuxingzuo", target: "nuerhachi", data: { type: "反正事泄" } },
    { id: "e197", source: "liuxingzuo", target: "xiongtingbi", data: { type: "联络" } },
    // 殉国补全
    { id: "e198", source: "hetingkui", target: "nuerhachi", data: { type: "殉国" } },
    { id: "e199", source: "cuiruxiu", target: "nuerhachi", data: { type: "殉国" } },
    { id: "e200", source: "hetingkui", target: "yuanyingtai", data: { type: "辽阳殉国" } },
    { id: "e201", source: "cuiruxiu", target: "yuanyingtai", data: { type: "辽阳殉国" } },
    // 西南补全
    { id: "e202", source: "liyun", target: "shechongming", data: { type: "守贵阳" } },
    { id: "e203", source: "shiyongan", target: "liyun", data: { type: "守城" } },
    { id: "e204", source: "muchangzuo", target: "shechongming", data: { type: "援黔" } },
    { id: "e205", source: "chenliangce", target: "xiongtingbi", data: { type: "粮道" } },
    // 学界补全
    { id: "e206", source: "wuzongda", target: "xizong", data: { type: "入阁" } },
    { id: "e207", source: "xingyunlu", target: "xuguangqi", data: { type: "历学" } },
    // 延伸人物
    { id: "e208", source: "yangsichang", target: "fuzonglong", data: { type: "明末军政" } },
    { id: "e209", source: "hongchengchou", target: "nuerhachi", data: { type: "松锦降清" } },
    { id: "e210", source: "hongchengchou", target: "zudashou", data: { type: "松锦之战" } },
    { id: "e211", source: "luxiangsheng", target: "xizong", data: { type: "庶吉士" } },
    { id: "e212", source: "sunchuanting", target: "xizong", data: { type: "庶吉士" } },
    { id: "e213", source: "luxiangsheng", target: "ni-yuanlu", data: { type: "天启二年" } },
    { id: "e214", source: "sunchuanting", target: "huangdaozhou", data: { type: "天启二年" } },
    { id: "e215", source: "zhouyanru", target: "wentiren", data: { type: "崇祯首辅" } },
    { id: "e216", source: "xueguoguan", target: "zhouyanru", data: { type: "崇祯阁臣" } },
    { id: "e217", source: "qianqianyi", target: "wuweiye", data: { type: "文坛" } },
    { id: "e218", source: "huangzongxi", target: "guyanwu", data: { type: "三大思想家" } },
    { id: "e219", source: "guyanwu", target: "wangfuzhi", data: { type: "三大思想家" } },
    { id: "e220", source: "houfangyu", target: "maoxiang", data: { type: "四公子" } },
    { id: "e221", source: "fangyizhi", target: "chenzhenhui", data: { type: "四公子" } },
    { id: "e222", source: "wuyingji", target: "weizhongxian", data: { type: "反对阉党" } },
    { id: "e223", source: "fushan", target: "liying", data: { type: "学界" } },
    { id: "e224", source: "zhuzhiyu", target: "huangzongxi", data: { type: "儒学传承" } },
    { id: "e225", source: "wangzhicai", target: "guangzong", data: { type: "梃击案" } },
    { id: "e226", source: "zhangcha", target: "guangzong", data: { type: "梃击案" } },
    { id: "e227", source: "liuzongzhou", target: "yanglian", data: { type: "东林" } },
    { id: "e228", source: "biziyan", target: "xiongtingbi", data: { type: "海防后勤" } },
    { id: "e229", source: "shenli", target: "fangcongzhe", data: { type: "前朝阁臣" } },
    // —— 崇祯朝：皇室传承 ——
    { id: "e230", source: "guangzong", target: "chongzhen", data: { type: "父子" } },
    { id: "e231", source: "xizong", target: "chongzhen", data: { type: "兄弟" } },
    { id: "e232", source: "chongzhen", target: "zhouhuanghou", data: { type: "夫妻" } },
    { id: "e233", source: "chongzhen", target: "tianguifei", data: { type: "妃" } },
    { id: "e234", source: "chongzhen", target: "zhucilang", data: { type: "父子" } },
    { id: "e235", source: "yianhuanghou", target: "xizong", data: { type: "皇后" } },
    { id: "e236", source: "chongzhen", target: "weizhongxian", data: { type: "铲除阉党" } },
    { id: "e237", source: "wangchengen", target: "chongzhen", data: { type: "煤山殉死" } },
    // —— 崇祯中枢 ——
    { id: "e239", source: "chongzhen", target: "wentiren", data: { type: "倚重" } },
    { id: "e240", source: "chongzhen", target: "zhouyanru", data: { type: "首辅" } },
    { id: "e241", source: "chongzhen", target: "yangsichang", data: { type: "倚重" } },
    { id: "e242", source: "chongzhen", target: "hanhuang", data: { type: "首辅" } },
    { id: "e243", source: "chongzhen", target: "xuguangqi", data: { type: "修历" } },
    { id: "e244", source: "wentiren", target: "zhouyanru", data: { type: "争权" } },
    { id: "e245", source: "wentiren", target: "qianlongxi", data: { type: "排挤" } },
    { id: "e246", source: "qianlongxi", target: "yuanchonghuan", data: { type: "牵连" } },
    { id: "e247", source: "chongzhen", target: "yuanchonghuan", data: { type: "冤杀" } },
    { id: "e248", source: "huangdaozhou", target: "qianlongxi", data: { type: "营救" } },
    { id: "e249", source: "huangdaozhou", target: "yangsichang", data: { type: "弹劾夺情" } },
    { id: "e250", source: "fanjingwen", target: "chongzhen", data: { type: "守城殉国" } },
    { id: "e251", source: "libanghua", target: "chongzhen", data: { type: "殉国" } },
    { id: "e252", source: "ni-yuanlu", target: "chongzhen", data: { type: "殉国" } },
    { id: "e253", source: "jinsheng", target: "chongzhen", data: { type: "抗清殉国" } },
    { id: "e254", source: "zhangjinyan", target: "chongzhen", data: { type: "守城" } },
    { id: "e255", source: "zhangjinyan", target: "lizicheng", data: { type: "降清" } },
    { id: "e256", source: "chenyan", target: "lizicheng", data: { type: "拷掠而死" } },
    { id: "e257", source: "weizaode", target: "lizicheng", data: { type: "拷掠而死" } },
    { id: "e258", source: "liuzongzhou", target: "chongzhen", data: { type: "直谏" } },
    { id: "e259", source: "wenzhenmeng", target: "wentiren", data: { type: "不和被免" } },
    { id: "e260", source: "zhangpu", target: "wentiren", data: { type: "结党弹劾" } },
    { id: "e261", source: "mashiying", target: "zhuchangxun", data: { type: "拥立福王" } },
    { id: "e262", source: "shikefa", target: "mashiying", data: { type: "南明抗清" } },
    { id: "e263", source: "ruandaocheng", target: "mashiying", data: { type: "南明" } },
    { id: "e264", source: "qianqianyi", target: "chongzhen", data: { type: "文坛" } },
    { id: "e265", source: "chenxinjia", target: "chongzhen", data: { type: "主和被诛" } },
    { id: "e266", source: "lijiantai", target: "chongzhen", data: { type: "代朕亲征" } },
    // —— 清军 ——
    { id: "e267", source: "huangtaiji", target: "nuerhachi", data: { type: "继承" } },
    { id: "e268", source: "duoergun", target: "huangtaiji", data: { type: "亲族" } },
    { id: "e269", source: "huangtaiji", target: "chongzhen", data: { type: "破关入塞" } },
    { id: "e270", source: "huangtaiji", target: "maowenlong", data: { type: "攻陷皮岛" } },
    { id: "e271", source: "hongchengchou", target: "huangtaiji", data: { type: "松锦降清" } },
    { id: "e272", source: "hongchengchou", target: "caobianjiao", data: { type: "松山" } },
    { id: "e273", source: "hongchengchou", target: "qiuminyang", data: { type: "松山" } },
    { id: "e274", source: "hongchengchou", target: "wangpu", data: { type: "松山" } },
    { id: "e275", source: "zudashou", target: "huangtaiji", data: { type: "锦州降清" } },
    { id: "e276", source: "sunchengzong", target: "huangtaiji", data: { type: "高阳殉国" } },
    { id: "e277", source: "luxiangsheng", target: "huangtaiji", data: { type: "巨鹿殉国" } },
    { id: "e278", source: "zhangchun", target: "huangtaiji", data: { type: "大凌河被俘" } },
    { id: "e279", source: "kongyoude", target: "huangtaiji", data: { type: "渡海降清" } },
    { id: "e280", source: "gengzhongming", target: "kongyoude", data: { type: "三顺王" } },
    { id: "e281", source: "shangkexi", target: "kongyoude", data: { type: "三顺王" } },
    { id: "e282", source: "sunyuanhua", target: "kongyoude", data: { type: "吴桥兵变" } },
    { id: "e283", source: "duoergun", target: "wusangui", data: { type: "入关" } },
    { id: "e284", source: "wusangui", target: "chongzhen", data: { type: "弃宁入卫" } },
    { id: "e285", source: "wusangui", target: "lizicheng", data: { type: "引清入关" } },
    { id: "e286", source: "wuxiang", target: "wusangui", data: { type: "父子" } },
    { id: "e287", source: "wusangui", target: "wuxiang", data: { type: "父被拷杀" } },
    // —— 农民军 ——
    { id: "e288", source: "lizicheng", target: "gaoyingxiang", data: { type: "继承闯王" } },
    { id: "e289", source: "sunchuanting", target: "gaoyingxiang", data: { type: "擒杀" } },
    { id: "e290", source: "sunchuanting", target: "lizicheng", data: { type: "郏县兵败" } },
    { id: "e291", source: "lizicheng", target: "chongzhen", data: { type: "攻破北京" } },
    { id: "e292", source: "lizicheng", target: "niujinxing", data: { type: "大顺丞相" } },
    { id: "e293", source: "lizicheng", target: "songxiance", data: { type: "大顺军师" } },
    { id: "e294", source: "lizicheng", target: "liuzongmin", data: { type: "权将军" } },
    { id: "e295", source: "liuzongmin", target: "chenyan", data: { type: "追赃" } },
    { id: "e296", source: "lizicheng", target: "zhuchangxun", data: { type: "杀害宗室" } },
    { id: "e297", source: "lizicheng", target: "hefengsheng", data: { type: "杀害" } },
    { id: "e298", source: "lizicheng", target: "lvweiqi", data: { type: "杀害" } },
    { id: "e299", source: "lizicheng", target: "zhouyuji", data: { type: "宁武关" } },
    { id: "e300", source: "chenyongfu", target: "lizicheng", data: { type: "射伤" } },
    { id: "e301", source: "gaojie", target: "lizicheng", data: { type: "原部将" } },
    { id: "e302", source: "chenqiyu", target: "lizicheng", data: { type: "车厢峡" } },
    { id: "e303", source: "yanghe", target: "lizicheng", data: { type: "招抚失败" } },
    { id: "e304", source: "caowenzhao", target: "wangjiayin", data: { type: "击斩" } },
    { id: "e305", source: "caowenzhao", target: "lizicheng", data: { type: "屡败" } },
    { id: "e306", source: "fuzonglong", target: "lizicheng", data: { type: "兵败被杀" } },
    { id: "e307", source: "yangsichang", target: "lizicheng", data: { type: "十面张网" } },
    { id: "e308", source: "zhangxianzhong", target: "lizicheng", data: { type: "合流分据" } },
    { id: "e309", source: "zuoliangyu", target: "zhangxianzhong", data: { type: "玛瑙山大破" } },
    { id: "e310", source: "zhangxianzhong", target: "chongzhen", data: { type: "转战湖广" } },
    { id: "e311", source: "luorucai", target: "lizicheng", data: { type: "合流" } },
    { id: "e312", source: "heylong", target: "lizicheng", data: { type: "合流" } },
    { id: "e313", source: "mashouying", target: "lizicheng", data: { type: "合流" } },
    // —— 崇祯将领 ——
    { id: "e314", source: "zuoliangyu", target: "chongzhen", data: { type: "平贼" } },
    { id: "e315", source: "hongchengchou", target: "lizicheng", data: { type: "剿匪" } },
    { id: "e316", source: "hongchengchou", target: "sunchuanting", data: { type: "督师" } },
    { id: "e317", source: "sunchuanting", target: "chongzhen", data: { type: "陕西总督" } },
    { id: "e318", source: "luxiangsheng", target: "chongzhen", data: { type: "总理军务" } },
    { id: "e319", source: "yuanchonghuan", target: "chongzhen", data: { type: "督师蓟辽" } },
    { id: "e320", source: "gaojie", target: "huangdegong", data: { type: "江北四镇" } },
    { id: "e321", source: "liuzeqing", target: "huangdegong", data: { type: "江北四镇" } },
    { id: "e322", source: "liuliangzuo", target: "huangdegong", data: { type: "江北四镇" } },
    { id: "e323", source: "xudingguo", target: "gaojie", data: { type: "杀而降清" } },
    { id: "e324", source: "zhengzhilong", target: "chongzhen", data: { type: "福建总兵" } },
    { id: "e325", source: "herenlong", target: "sunchuanting", data: { type: "剿寇" } },
    { id: "e326", source: "wangqiaonian", target: "lizicheng", data: { type: "剿寇" } },
    { id: "e327", source: "dingqirui", target: "lizicheng", data: { type: "剿寇" } },
    { id: "e328", source: "lianguoshi", target: "chongzhen", data: { type: "赈灾平叛" } },
    // —— 东林延续 ——
    { id: "e329", source: "zhoushunzhang", target: "weizhongxian", data: { type: "抗阉" } },
    { id: "e330", source: "huangzunsu", target: "weidazhong", data: { type: "父子" } },
    { id: "e331", source: "huangzunsu", target: "yanglian", data: { type: "东林" } },
    { id: "e332", source: "miaochangqi", target: "yanglian", data: { type: "东林" } },
    { id: "e333", source: "chenzizhuang", target: "chongzhen", data: { type: "抗清殉国" } },
    { id: "e334", source: "xuxianchun", target: "weizhongxian", data: { type: "阉党" } },
    { id: "e335", source: "tianergeng", target: "weizhongxian", data: { type: "阉党" } },
    { id: "e336", source: "xuxianchun", target: "yanglian", data: { type: "迫害" } },
    { id: "e337", source: "duxun", target: "chongzhen", data: { type: "内应" } },
    { id: "e338", source: "caohuachun", target: "lizicheng", data: { type: "开门迎降" } },
    // —— 西学与宗藩 ——
    { id: "e339", source: "tangruowang", target: "xuguangqi", data: { type: "西学" } },
    { id: "e340", source: "tangruowang", target: "chongzhen", data: { type: "火器演练" } },
    { id: "e341", source: "zhuyujian", target: "chongzhen", data: { type: "勤王" } },
    { id: "e342", source: "zhushouyong", target: "chongzhen", data: { type: "宗藩" } },
  ],
};
