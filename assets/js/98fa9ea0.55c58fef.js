"use strict";(self.webpackChunkmassarg_docs=self.webpackChunkmassarg_docs||[]).push([[118],{751:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>d,default:()=>h,frontMatter:()=>l,metadata:()=>r,toc:()=>o});var i=s(6070),t=s(7468);const l={id:"option.MassargOption",title:"Class: MassargOption<OptionType, Args>",sidebar_label:"MassargOption",custom_edit_url:null},d=void 0,r={id:"api/classes/option.MassargOption",title:"Class: MassargOption<OptionType, Args>",description:"option.MassargOption",source:"@site/docs/api/classes/option.MassargOption.md",sourceDirName:"api/classes",slug:"/api/classes/option.MassargOption",permalink:"/massarg/docs/api/classes/option.MassargOption",draft:!1,unlisted:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"option.MassargOption",title:"Class: MassargOption<OptionType, Args>",sidebar_label:"MassargOption",custom_edit_url:null},sidebar:"api",previous:{title:"MassargNumber",permalink:"/massarg/docs/api/classes/option.MassargNumber"}},c={},o=[{value:"Type parameters",id:"type-parameters",level:2},{value:"Hierarchy",id:"hierarchy",level:2},{value:"Implements",id:"implements",level:2},{value:"Constructors",id:"constructors",level:2},{value:"constructor",id:"constructor",level:3},{value:"Type parameters",id:"type-parameters-1",level:4},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Properties",id:"properties",level:2},{value:"name",id:"name",level:3},{value:"Implementation of",id:"implementation-of",level:4},{value:"Defined in",id:"defined-in-1",level:4},{value:"description",id:"description",level:3},{value:"Implementation of",id:"implementation-of-1",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"defaultValue",id:"defaultvalue",level:3},{value:"Implementation of",id:"implementation-of-2",level:4},{value:"Defined in",id:"defined-in-3",level:4},{value:"aliases",id:"aliases",level:3},{value:"Implementation of",id:"implementation-of-3",level:4},{value:"Defined in",id:"defined-in-4",level:4},{value:"parse",id:"parse",level:3},{value:"Implementation of",id:"implementation-of-4",level:4},{value:"Defined in",id:"defined-in-5",level:4},{value:"isArray",id:"isarray",level:3},{value:"Defined in",id:"defined-in-6",level:4},{value:"isRequired",id:"isrequired",level:3},{value:"Defined in",id:"defined-in-7",level:4},{value:"isDefault",id:"isdefault",level:3},{value:"Implementation of",id:"implementation-of-5",level:4},{value:"Defined in",id:"defined-in-8",level:4},{value:"outputName",id:"outputname",level:3},{value:"Implementation of",id:"implementation-of-6",level:4},{value:"Defined in",id:"defined-in-9",level:4},{value:"Methods",id:"methods",level:2},{value:"fromTypedConfig",id:"fromtypedconfig",level:3},{value:"Type parameters",id:"type-parameters-2",level:4},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Defined in",id:"defined-in-10",level:4},{value:"getOutputName",id:"getoutputname",level:3},{value:"Returns",id:"returns-2",level:4},{value:"Defined in",id:"defined-in-11",level:4},{value:"helpString",id:"helpstring",level:3},{value:"Returns",id:"returns-3",level:4},{value:"Defined in",id:"defined-in-12",level:4},{value:"isMatch",id:"ismatch",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-4",level:4},{value:"Defined in",id:"defined-in-13",level:4},{value:"qualifiedNames",id:"qualifiednames",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-5",level:4},{value:"Defined in",id:"defined-in-14",level:4}];function a(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/massarg/docs/api/modules/option",children:"option"}),".MassargOption"]}),"\n",(0,i.jsx)(n.p,{children:"An option that can be passed to a command."}),"\n",(0,i.jsx)(n.p,{children:"Options can be specified in two ways:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Using the long form, e.g. ",(0,i.jsx)(n.code,{children:"--option value"})]}),"\n",(0,i.jsxs)(n.li,{children:["Using the short form, e.g. ",(0,i.jsx)(n.code,{children:"-o value"})]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"They can also have a parse function, which will be used to parse the value passed in from the\noriginal argument (string)."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"Example"})})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"massarg(options).option({\n  name: 'option',\n  description: 'An option',\n  defaultValue: 'default',\n  aliases: ['o'],\n  parse: (value) => value.toUpperCase(),\n})\n"})}),"\n",(0,i.jsx)(n.h2,{id:"type-parameters",children:"Type parameters"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,i.jsx)(n.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"OptionType"})}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:["extends ",(0,i.jsx)(n.code,{children:"any"})," = ",(0,i.jsx)(n.code,{children:"unknown"})]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"Args"})}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:["extends ",(0,i.jsx)(n.a,{href:"/massarg/docs/api/modules/command#argsobject",children:(0,i.jsx)(n.code,{children:"ArgsObject"})})," = ",(0,i.jsx)(n.a,{href:"/massarg/docs/api/modules/command#argsobject",children:(0,i.jsx)(n.code,{children:"ArgsObject"})})]})]})]})]}),"\n",(0,i.jsx)(n.h2,{id:"hierarchy",children:"Hierarchy"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"MassargOption"})})}),"\n",(0,i.jsxs)(n.p,{children:["\u21b3 ",(0,i.jsx)(n.a,{href:"/massarg/docs/api/classes/option.MassargNumber",children:(0,i.jsx)(n.code,{children:"MassargNumber"})})]}),"\n",(0,i.jsxs)(n.p,{children:["\u21b3 ",(0,i.jsx)(n.a,{href:"/massarg/docs/api/classes/option.MassargFlag",children:(0,i.jsx)(n.code,{children:"MassargFlag"})})]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"implements",children:"Implements"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"/massarg/docs/api/modules/option#optionconfig-1",children:(0,i.jsx)(n.code,{children:"OptionConfig"})}),"<",(0,i.jsx)(n.code,{children:"OptionType"}),", ",(0,i.jsx)(n.code,{children:"Args"}),">"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"constructors",children:"Constructors"}),"\n",(0,i.jsx)(n.h3,{id:"constructor",children:"constructor"}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"new MassargOption"}),"<",(0,i.jsx)(n.code,{children:"OptionType"}),", ",(0,i.jsx)(n.code,{children:"Args"}),">(",(0,i.jsx)(n.code,{children:"options"}),"): ",(0,i.jsx)(n.a,{href:"/massarg/docs/api/classes/option.MassargOption",children:(0,i.jsx)(n.code,{children:"MassargOption"})}),"<",(0,i.jsx)(n.code,{children:"OptionType"}),", ",(0,i.jsx)(n.code,{children:"Args"}),">"]}),"\n",(0,i.jsx)(n.h4,{id:"type-parameters-1",children:"Type parameters"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,i.jsx)(n.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"OptionType"})}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:["extends ",(0,i.jsx)(n.code,{children:"unknown"})," = ",(0,i.jsx)(n.code,{children:"unknown"})]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"Args"})}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:["extends ",(0,i.jsx)(n.a,{href:"/massarg/docs/api/modules/command#argsobject",children:(0,i.jsx)(n.code,{children:"ArgsObject"})})," = ",(0,i.jsx)(n.a,{href:"/massarg/docs/api/modules/command#argsobject",children:(0,i.jsx)(n.code,{children:"ArgsObject"})})]})]})]})]}),"\n",(0,i.jsx)(n.h4,{id:"parameters",children:"Parameters"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,i.jsx)(n.th,{style:{textAlign:"left"},children:"Type"}),(0,i.jsx)(n.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"options"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"Object"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"-"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"options.name"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"string"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Name of the option"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"options.description"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"string"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Description of the option, displayed in the help output"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"options.aliases"})}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:[(0,i.jsx)(n.code,{children:"string"}),"[]"]}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Aliases for the option, which can be used with the shorthand option notation."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"options.defaultValue?"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"any"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Default value of the option"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"options.array?"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"boolean"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Whether the option is an array. Array options can be specified multiple times, and the values will be collected into an array. Normally, specifying an option multiple times will override the previous value."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"options.required?"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"boolean"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Whether the option is required. If it is required, parsing will throw an error if it's not present."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"options.isDefault?"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"boolean"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Whether the option is the default option. The default option is the option that is used if no other option is specified, e.g. a value is passed in without an option name. Note that if commands match the same argument first, they will be used instead of the default option."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"options.hidden?"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"boolean"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Whether the option is hidden. Hidden options are not displayed in the help output."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"options.outputName?"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"string"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Specify a custom name for the output, which will be used when parsing the args."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"options.parse?"})}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:[(0,i.jsx)(n.a,{href:"/massarg/docs/api/modules/option#parser",children:(0,i.jsx)(n.code,{children:"Parser"})}),"<",(0,i.jsx)(n.code,{children:"Args"}),", ",(0,i.jsx)(n.code,{children:"OptionType"}),">"]}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:"Parse the value of the option. You can return any type here, or throw an error if the value is invalid."})]})]})]}),"\n",(0,i.jsx)(n.h4,{id:"returns",children:"Returns"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/massarg/docs/api/classes/option.MassargOption",children:(0,i.jsx)(n.code,{children:"MassargOption"})}),"<",(0,i.jsx)(n.code,{children:"OptionType"}),", ",(0,i.jsx)(n.code,{children:"Args"}),">"]}),"\n",(0,i.jsx)(n.h4,{id:"defined-in",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L192",children:"src/option.ts:192"})}),"\n",(0,i.jsx)(n.h2,{id:"properties",children:"Properties"}),"\n",(0,i.jsx)(n.h3,{id:"name",children:"name"}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"name"}),": ",(0,i.jsx)(n.code,{children:"string"})]}),"\n",(0,i.jsx)(n.h4,{id:"implementation-of",children:"Implementation of"}),"\n",(0,i.jsx)(n.p,{children:"OptionConfig.name"}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-1",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L177",children:"src/option.ts:177"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"description",children:"description"}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"description"}),": ",(0,i.jsx)(n.code,{children:"string"})]}),"\n",(0,i.jsx)(n.h4,{id:"implementation-of-1",children:"Implementation of"}),"\n",(0,i.jsx)(n.p,{children:"OptionConfig.description"}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-2",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L178",children:"src/option.ts:178"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"defaultvalue",children:"defaultValue"}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.code,{children:"Optional"})," ",(0,i.jsx)(n.strong,{children:"defaultValue"}),": ",(0,i.jsx)(n.code,{children:"OptionType"})]}),"\n",(0,i.jsx)(n.h4,{id:"implementation-of-2",children:"Implementation of"}),"\n",(0,i.jsx)(n.p,{children:"OptionConfig.defaultValue"}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-3",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L179",children:"src/option.ts:179"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"aliases",children:"aliases"}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"aliases"}),": ",(0,i.jsx)(n.code,{children:"string"}),"[]"]}),"\n",(0,i.jsx)(n.h4,{id:"implementation-of-3",children:"Implementation of"}),"\n",(0,i.jsx)(n.p,{children:"OptionConfig.aliases"}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-4",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L180",children:"src/option.ts:180"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"parse",children:"parse"}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"parse"}),": ",(0,i.jsx)(n.a,{href:"/massarg/docs/api/modules/option#parser",children:(0,i.jsx)(n.code,{children:"Parser"})}),"<",(0,i.jsx)(n.code,{children:"Args"}),", ",(0,i.jsx)(n.code,{children:"OptionType"}),">"]}),"\n",(0,i.jsx)(n.h4,{id:"implementation-of-4",children:"Implementation of"}),"\n",(0,i.jsx)(n.p,{children:"OptionConfig.parse"}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-5",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L181",children:"src/option.ts:181"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"isarray",children:"isArray"}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"isArray"}),": ",(0,i.jsx)(n.code,{children:"boolean"})]}),"\n",(0,i.jsx)(n.p,{children:"Whether this option can be used multiple times. Any passed values will end up in an array\ninstead of each usage overwriting the existing value."}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-6",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L186",children:"src/option.ts:186"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"isrequired",children:"isRequired"}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"isRequired"}),": ",(0,i.jsx)(n.code,{children:"boolean"})]}),"\n",(0,i.jsx)(n.p,{children:"Whether this option is required. Failing to specify this option will throw an error."}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-7",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L188",children:"src/option.ts:188"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"isdefault",children:"isDefault"}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"isDefault"}),": ",(0,i.jsx)(n.code,{children:"boolean"})]}),"\n",(0,i.jsx)(n.h4,{id:"implementation-of-5",children:"Implementation of"}),"\n",(0,i.jsx)(n.p,{children:"OptionConfig.isDefault"}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-8",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L189",children:"src/option.ts:189"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"outputname",children:"outputName"}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.code,{children:"Optional"})," ",(0,i.jsx)(n.strong,{children:"outputName"}),": ",(0,i.jsx)(n.code,{children:"string"})]}),"\n",(0,i.jsx)(n.h4,{id:"implementation-of-6",children:"Implementation of"}),"\n",(0,i.jsx)(n.p,{children:"OptionConfig.outputName"}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-9",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L190",children:"src/option.ts:190"})}),"\n",(0,i.jsx)(n.h2,{id:"methods",children:"Methods"}),"\n",(0,i.jsx)(n.h3,{id:"fromtypedconfig",children:"fromTypedConfig"}),"\n",(0,i.jsxs)(n.p,{children:["\u25b8 ",(0,i.jsx)(n.strong,{children:"fromTypedConfig"}),"<",(0,i.jsx)(n.code,{children:"T"}),", ",(0,i.jsx)(n.code,{children:"A"}),">(",(0,i.jsx)(n.code,{children:"config"}),"): ",(0,i.jsx)(n.a,{href:"/massarg/docs/api/classes/option.MassargOption",children:(0,i.jsx)(n.code,{children:"MassargOption"})}),"<",(0,i.jsx)(n.code,{children:"T"}),", ",(0,i.jsx)(n.a,{href:"/massarg/docs/api/modules/command#argsobject",children:(0,i.jsx)(n.code,{children:"ArgsObject"})}),">"]}),"\n",(0,i.jsxs)(n.p,{children:["Create a typed option from a configuration. Currently supports ",(0,i.jsx)(n.code,{children:"number"})," options which\nare automatically transformed from ",(0,i.jsx)(n.code,{children:"string"})," to ",(0,i.jsx)(n.code,{children:"number"}),"."]}),"\n",(0,i.jsx)(n.h4,{id:"type-parameters-2",children:"Type parameters"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,i.jsx)(n.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"T"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"unknown"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"A"})}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:["extends ",(0,i.jsx)(n.a,{href:"/massarg/docs/api/modules/command#argsobject",children:(0,i.jsx)(n.code,{children:"ArgsObject"})})," = ",(0,i.jsx)(n.a,{href:"/massarg/docs/api/modules/command#argsobject",children:(0,i.jsx)(n.code,{children:"ArgsObject"})})]})]})]})]}),"\n",(0,i.jsx)(n.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,i.jsx)(n.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"config"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"Object"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"config.name"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"string"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"config.description"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"string"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"config.aliases"})}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:[(0,i.jsx)(n.code,{children:"string"}),"[]"]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"config.type"})}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:[(0,i.jsx)(n.code,{children:"undefined"})," | ",(0,i.jsx)(n.code,{children:'"number"'})]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"config.defaultValue"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"any"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"config.array"})}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:[(0,i.jsx)(n.code,{children:"undefined"})," | ",(0,i.jsx)(n.code,{children:"boolean"})]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"config.required"})}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:[(0,i.jsx)(n.code,{children:"undefined"})," | ",(0,i.jsx)(n.code,{children:"boolean"})]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"config.isDefault"})}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:[(0,i.jsx)(n.code,{children:"undefined"})," | ",(0,i.jsx)(n.code,{children:"boolean"})]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"config.hidden"})}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:[(0,i.jsx)(n.code,{children:"undefined"})," | ",(0,i.jsx)(n.code,{children:"boolean"})]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"config.outputName"})}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:[(0,i.jsx)(n.code,{children:"undefined"})," | ",(0,i.jsx)(n.code,{children:"string"})]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"config.parse"})}),(0,i.jsxs)(n.td,{style:{textAlign:"left"},children:[(0,i.jsx)(n.code,{children:"undefined"})," | ",(0,i.jsx)(n.a,{href:"/massarg/docs/api/modules/option#parser",children:(0,i.jsx)(n.code,{children:"Parser"})}),"<",(0,i.jsx)(n.code,{children:"A"}),", ",(0,i.jsx)(n.code,{children:"T"}),">"]})]})]})]}),"\n",(0,i.jsx)(n.h4,{id:"returns-1",children:"Returns"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/massarg/docs/api/classes/option.MassargOption",children:(0,i.jsx)(n.code,{children:"MassargOption"})}),"<",(0,i.jsx)(n.code,{children:"T"}),", ",(0,i.jsx)(n.a,{href:"/massarg/docs/api/modules/command#argsobject",children:(0,i.jsx)(n.code,{children:"ArgsObject"})}),">"]}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-10",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L209",children:"src/option.ts:209"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"getoutputname",children:"getOutputName"}),"\n",(0,i.jsxs)(n.p,{children:["\u25b8 ",(0,i.jsx)(n.strong,{children:"getOutputName"}),"(): ",(0,i.jsx)(n.code,{children:"string"})]}),"\n",(0,i.jsx)(n.p,{children:"Returns the key which this option outputs to in the final object."}),"\n",(0,i.jsx)(n.h4,{id:"returns-2",children:"Returns"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"string"})}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"Default"})})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"The camelCase version of this option's name.\n\nCan be overridden with {@link outputName}.\n"})}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-11",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L226",children:"src/option.ts:226"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"helpstring",children:"helpString"}),"\n",(0,i.jsxs)(n.p,{children:["\u25b8 ",(0,i.jsx)(n.strong,{children:"helpString"}),"(): ",(0,i.jsx)(n.code,{children:"string"})]}),"\n",(0,i.jsx)(n.p,{children:"Get the help string for this option"}),"\n",(0,i.jsx)(n.h4,{id:"returns-3",children:"Returns"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"string"})}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-12",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L260",children:"src/option.ts:260"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"ismatch",children:"isMatch"}),"\n",(0,i.jsxs)(n.p,{children:["\u25b8 ",(0,i.jsx)(n.strong,{children:"isMatch"}),"(",(0,i.jsx)(n.code,{children:"arg"}),", ",(0,i.jsx)(n.code,{children:"prefixes"}),"): ",(0,i.jsx)(n.code,{children:"boolean"})]}),"\n",(0,i.jsx)(n.p,{children:"Returns true if the flag (including any prefixes) matches the name or aliases"}),"\n",(0,i.jsx)(n.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,i.jsx)(n.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"arg"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"string"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"prefixes"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.a,{href:"/massarg/docs/api/modules/option#prefixes",children:(0,i.jsx)(n.code,{children:"Prefixes"})})})]})]})]}),"\n",(0,i.jsx)(n.h4,{id:"returns-4",children:"Returns"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"boolean"})}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-13",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L266",children:"src/option.ts:266"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"qualifiednames",children:"qualifiedNames"}),"\n",(0,i.jsxs)(n.p,{children:["\u25b8 ",(0,i.jsx)(n.strong,{children:"qualifiedNames"}),"(",(0,i.jsx)(n.code,{children:"prefixes"}),"): ",(0,i.jsx)(n.a,{href:"/massarg/docs/api/modules/option#qualifiednames",children:(0,i.jsx)(n.code,{children:"QualifiedNames"})})]}),"\n",(0,i.jsx)(n.p,{children:"Return the finalized names that will cause this option to match."}),"\n",(0,i.jsx)(n.h4,{id:"parameters-3",children:"Parameters"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{style:{textAlign:"left"},children:"Name"}),(0,i.jsx)(n.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,i.jsx)(n.tbody,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.code,{children:"prefixes"})}),(0,i.jsx)(n.td,{style:{textAlign:"left"},children:(0,i.jsx)(n.a,{href:"/massarg/docs/api/modules/option#prefixes",children:(0,i.jsx)(n.code,{children:"Prefixes"})})})]})})]}),"\n",(0,i.jsx)(n.h4,{id:"returns-5",children:"Returns"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"/massarg/docs/api/modules/option#qualifiednames",children:(0,i.jsx)(n.code,{children:"QualifiedNames"})})}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-14",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L277",children:"src/option.ts:277"})})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},7468:(e,n,s)=>{s.d(n,{R:()=>d,x:()=>r});var i=s(758);const t={},l=i.createContext(t);function d(e){const n=i.useContext(l);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:d(e.components),i.createElement(l.Provider,{value:n},e.children)}}}]);