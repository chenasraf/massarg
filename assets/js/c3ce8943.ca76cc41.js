"use strict";(self.webpackChunkmassarg_docs=self.webpackChunkmassarg_docs||[]).push([[243],{436:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>a,contentTitle:()=>l,default:()=>o,frontMatter:()=>d,metadata:()=>t,toc:()=>c});var i=n(6070),r=n(7468);const d={id:"option.MassargFlag",title:"Class: MassargFlag",sidebar_label:"MassargFlag",custom_edit_url:null},l=void 0,t={id:"api/classes/option.MassargFlag",title:"Class: MassargFlag",description:"option.MassargFlag",source:"@site/docs/api/classes/option.MassargFlag.md",sourceDirName:"api/classes",slug:"/api/classes/option.MassargFlag",permalink:"/massarg/docs/api/classes/option.MassargFlag",draft:!1,unlisted:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"option.MassargFlag",title:"Class: MassargFlag",sidebar_label:"MassargFlag",custom_edit_url:null},sidebar:"api",previous:{title:"Massarg",permalink:"/massarg/docs/api/classes/massarg.Massarg"},next:{title:"MassargHelpFlag",permalink:"/massarg/docs/api/classes/option.MassargHelpFlag"}},a={},c=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Constructors",id:"constructors",level:2},{value:"constructor",id:"constructor",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Overrides",id:"overrides",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Properties",id:"properties",level:2},{value:"negatable",id:"negatable",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"negationName",id:"negationname",level:3},{value:"Defined in",id:"defined-in-2",level:4},{value:"negationAliases",id:"negationaliases",level:3},{value:"Defined in",id:"defined-in-3",level:4},{value:"name",id:"name",level:3},{value:"Inherited from",id:"inherited-from",level:4},{value:"Defined in",id:"defined-in-4",level:4},{value:"description",id:"description",level:3},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"Defined in",id:"defined-in-5",level:4},{value:"defaultValue",id:"defaultvalue",level:3},{value:"Inherited from",id:"inherited-from-2",level:4},{value:"Defined in",id:"defined-in-6",level:4},{value:"aliases",id:"aliases",level:3},{value:"Inherited from",id:"inherited-from-3",level:4},{value:"Defined in",id:"defined-in-7",level:4},{value:"parse",id:"parse",level:3},{value:"Inherited from",id:"inherited-from-4",level:4},{value:"Defined in",id:"defined-in-8",level:4},{value:"isArray",id:"isarray",level:3},{value:"Inherited from",id:"inherited-from-5",level:4},{value:"Defined in",id:"defined-in-9",level:4},{value:"isRequired",id:"isrequired",level:3},{value:"Inherited from",id:"inherited-from-6",level:4},{value:"Defined in",id:"defined-in-10",level:4},{value:"isDefault",id:"isdefault",level:3},{value:"Inherited from",id:"inherited-from-7",level:4},{value:"Defined in",id:"defined-in-11",level:4},{value:"outputName",id:"outputname",level:3},{value:"Inherited from",id:"inherited-from-8",level:4},{value:"Defined in",id:"defined-in-12",level:4},{value:"Methods",id:"methods",level:2},{value:"fromTypedConfig",id:"fromtypedconfig",level:3},{value:"Type parameters",id:"type-parameters",level:4},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Inherited from",id:"inherited-from-9",level:4},{value:"Defined in",id:"defined-in-13",level:4},{value:"parseDetails",id:"parsedetails",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-2",level:4},{value:"Overrides",id:"overrides-1",level:4},{value:"Defined in",id:"defined-in-14",level:4},{value:"qualifiedNames",id:"qualifiednames",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-3",level:4},{value:"Overrides",id:"overrides-2",level:4},{value:"Defined in",id:"defined-in-15",level:4},{value:"getOutputName",id:"getoutputname",level:3},{value:"Returns",id:"returns-4",level:4},{value:"Inherited from",id:"inherited-from-10",level:4},{value:"Defined in",id:"defined-in-16",level:4},{value:"helpString",id:"helpstring",level:3},{value:"Returns",id:"returns-5",level:4},{value:"Inherited from",id:"inherited-from-11",level:4},{value:"Defined in",id:"defined-in-17",level:4},{value:"isMatch",id:"ismatch",level:3},{value:"Parameters",id:"parameters-4",level:4},{value:"Returns",id:"returns-6",level:4},{value:"Inherited from",id:"inherited-from-12",level:4},{value:"Defined in",id:"defined-in-18",level:4}];function h(e){const s={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/massarg/docs/api/modules/option",children:"option"}),".MassargFlag"]}),"\n",(0,i.jsx)(s.p,{children:"A boolean option that can be passed to a command."}),"\n",(0,i.jsx)(s.p,{children:"A flag is an option that is either present or not. It can be used to toggle\na boolean value, or to indicate that a command should be run in a different\nmode."}),"\n",(0,i.jsxs)(s.p,{children:["A flag can be negated by using ",(0,i.jsx)(s.code,{children:"negatable: true"}),". By default, the negated name is the same\nas the option name, prefixed by ",(0,i.jsx)(s.code,{children:"no-"}),", and each of the aliases will be uppercased.\nFor example, ",(0,i.jsx)(s.code,{children:"--verbose"})," and ",(0,i.jsx)(s.code,{children:"--no-verbose"}),", or ",(0,i.jsx)(s.code,{children:"-v"})," and ",(0,i.jsx)(s.code,{children:"-V"}),".\nThis behavior can be overridden by the ",(0,i.jsx)(s.code,{children:"negatedName"})," and ",(0,i.jsx)(s.code,{children:"negatedAliases"})," options."]}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"Example"})})}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-ts",children:"massarg.flag({\n  name: 'verbose',\n  aliases: ['v'],\n  description: 'Enable verbose logging',\n  defaultValue: false,\n})\n"})}),"\n",(0,i.jsx)(s.h2,{id:"hierarchy",children:"Hierarchy"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption",children:(0,i.jsx)(s.code,{children:"MassargOption"})}),"<",(0,i.jsx)(s.code,{children:"boolean"}),">"]}),"\n",(0,i.jsxs)(s.p,{children:["\u21b3 ",(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"MassargFlag"})})]}),"\n",(0,i.jsxs)(s.p,{children:["\u21b3\u21b3 ",(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargHelpFlag",children:(0,i.jsx)(s.code,{children:"MassargHelpFlag"})})]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(s.h2,{id:"constructors",children:"Constructors"}),"\n",(0,i.jsx)(s.h3,{id:"constructor",children:"constructor"}),"\n",(0,i.jsxs)(s.p,{children:["\u2022 ",(0,i.jsx)(s.strong,{children:"new MassargFlag"}),"(",(0,i.jsx)(s.code,{children:"options"}),"): ",(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargFlag",children:(0,i.jsx)(s.code,{children:"MassargFlag"})})]}),"\n",(0,i.jsx)(s.h4,{id:"parameters",children:"Parameters"}),"\n",(0,i.jsxs)(s.table,{children:[(0,i.jsx)(s.thead,{children:(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.th,{style:{textAlign:"left"},children:"Name"}),(0,i.jsx)(s.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,i.jsxs)(s.tbody,{children:[(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"options"})}),(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"Object"})})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"options.name"})}),(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"string"})})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"options.description"})}),(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"string"})})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"options.aliases"})}),(0,i.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,i.jsx)(s.code,{children:"string"}),"[]"]})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"options.defaultValue"})}),(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"any"})})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"options.array"})}),(0,i.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,i.jsx)(s.code,{children:"undefined"})," | ",(0,i.jsx)(s.code,{children:"boolean"})]})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"options.required"})}),(0,i.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,i.jsx)(s.code,{children:"undefined"})," | ",(0,i.jsx)(s.code,{children:"boolean"})]})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"options.hidden"})}),(0,i.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,i.jsx)(s.code,{children:"undefined"})," | ",(0,i.jsx)(s.code,{children:"boolean"})]})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"options.outputName"})}),(0,i.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,i.jsx)(s.code,{children:"undefined"})," | ",(0,i.jsx)(s.code,{children:"string"})]})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"options.negatable"})}),(0,i.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,i.jsx)(s.code,{children:"undefined"})," | ",(0,i.jsx)(s.code,{children:"boolean"})]})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"options.negationName"})}),(0,i.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,i.jsx)(s.code,{children:"undefined"})," | ",(0,i.jsx)(s.code,{children:"string"})]})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"options.negationAliases"})}),(0,i.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,i.jsx)(s.code,{children:"undefined"})," | ",(0,i.jsx)(s.code,{children:"string"}),"[]"]})]})]})]}),"\n",(0,i.jsx)(s.h4,{id:"returns",children:"Returns"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargFlag",children:(0,i.jsx)(s.code,{children:"MassargFlag"})})}),"\n",(0,i.jsx)(s.h4,{id:"overrides",children:"Overrides"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption",children:"MassargOption"}),".",(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption#constructor",children:"constructor"})]}),"\n",(0,i.jsx)(s.h4,{id:"defined-in",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L367",children:"src/option.ts:367"})}),"\n",(0,i.jsx)(s.h2,{id:"properties",children:"Properties"}),"\n",(0,i.jsx)(s.h3,{id:"negatable",children:"negatable"}),"\n",(0,i.jsxs)(s.p,{children:["\u2022 ",(0,i.jsx)(s.strong,{children:"negatable"}),": ",(0,i.jsx)(s.code,{children:"boolean"})]}),"\n",(0,i.jsxs)(s.p,{children:["Whether this flag may be negated using ",(0,i.jsx)(s.code,{children:"negationName"})," or ",(0,i.jsx)(s.code,{children:"negationAliases"}),"."]}),"\n",(0,i.jsx)(s.h4,{id:"defined-in-1",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L361",children:"src/option.ts:361"})}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"negationname",children:"negationName"}),"\n",(0,i.jsxs)(s.p,{children:["\u2022 ",(0,i.jsx)(s.strong,{children:"negationName"}),": ",(0,i.jsx)(s.code,{children:"string"})]}),"\n",(0,i.jsx)(s.p,{children:"The negation name of this flag, which can be used with the full option notation."}),"\n",(0,i.jsx)(s.h4,{id:"defined-in-2",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L363",children:"src/option.ts:363"})}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"negationaliases",children:"negationAliases"}),"\n",(0,i.jsxs)(s.p,{children:["\u2022 ",(0,i.jsx)(s.strong,{children:"negationAliases"}),": ",(0,i.jsx)(s.code,{children:"string"}),"[]"]}),"\n",(0,i.jsx)(s.p,{children:"The negation aliases of this flag, which can be used with the shorthand option notation."}),"\n",(0,i.jsx)(s.h4,{id:"defined-in-3",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L365",children:"src/option.ts:365"})}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"name",children:"name"}),"\n",(0,i.jsxs)(s.p,{children:["\u2022 ",(0,i.jsx)(s.strong,{children:"name"}),": ",(0,i.jsx)(s.code,{children:"string"})]}),"\n",(0,i.jsx)(s.h4,{id:"inherited-from",children:"Inherited from"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption",children:"MassargOption"}),".",(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption#name",children:"name"})]}),"\n",(0,i.jsx)(s.h4,{id:"defined-in-4",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L177",children:"src/option.ts:177"})}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"description",children:"description"}),"\n",(0,i.jsxs)(s.p,{children:["\u2022 ",(0,i.jsx)(s.strong,{children:"description"}),": ",(0,i.jsx)(s.code,{children:"string"})]}),"\n",(0,i.jsx)(s.h4,{id:"inherited-from-1",children:"Inherited from"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption",children:"MassargOption"}),".",(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption#description",children:"description"})]}),"\n",(0,i.jsx)(s.h4,{id:"defined-in-5",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L178",children:"src/option.ts:178"})}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"defaultvalue",children:"defaultValue"}),"\n",(0,i.jsxs)(s.p,{children:["\u2022 ",(0,i.jsx)(s.code,{children:"Optional"})," ",(0,i.jsx)(s.strong,{children:"defaultValue"}),": ",(0,i.jsx)(s.code,{children:"boolean"})]}),"\n",(0,i.jsx)(s.h4,{id:"inherited-from-2",children:"Inherited from"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption",children:"MassargOption"}),".",(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption#defaultvalue",children:"defaultValue"})]}),"\n",(0,i.jsx)(s.h4,{id:"defined-in-6",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L179",children:"src/option.ts:179"})}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"aliases",children:"aliases"}),"\n",(0,i.jsxs)(s.p,{children:["\u2022 ",(0,i.jsx)(s.strong,{children:"aliases"}),": ",(0,i.jsx)(s.code,{children:"string"}),"[]"]}),"\n",(0,i.jsx)(s.h4,{id:"inherited-from-3",children:"Inherited from"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption",children:"MassargOption"}),".",(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption#aliases",children:"aliases"})]}),"\n",(0,i.jsx)(s.h4,{id:"defined-in-7",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L180",children:"src/option.ts:180"})}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"parse",children:"parse"}),"\n",(0,i.jsxs)(s.p,{children:["\u2022 ",(0,i.jsx)(s.strong,{children:"parse"}),": ",(0,i.jsx)(s.a,{href:"/massarg/docs/api/modules/option#parser",children:(0,i.jsx)(s.code,{children:"Parser"})}),"<",(0,i.jsx)(s.a,{href:"../modules/command.md#argsobject",children:(0,i.jsx)(s.code,{children:"ArgsObject"})}),", ",(0,i.jsx)(s.code,{children:"boolean"}),">"]}),"\n",(0,i.jsx)(s.h4,{id:"inherited-from-4",children:"Inherited from"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption",children:"MassargOption"}),".",(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption#parse",children:"parse"})]}),"\n",(0,i.jsx)(s.h4,{id:"defined-in-8",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L181",children:"src/option.ts:181"})}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"isarray",children:"isArray"}),"\n",(0,i.jsxs)(s.p,{children:["\u2022 ",(0,i.jsx)(s.strong,{children:"isArray"}),": ",(0,i.jsx)(s.code,{children:"boolean"})]}),"\n",(0,i.jsx)(s.p,{children:"Whether this option can be used multiple times. Any passed values will end up in an array\ninstead of each usage overwriting the existing value."}),"\n",(0,i.jsx)(s.h4,{id:"inherited-from-5",children:"Inherited from"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption",children:"MassargOption"}),".",(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption#isarray",children:"isArray"})]}),"\n",(0,i.jsx)(s.h4,{id:"defined-in-9",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L186",children:"src/option.ts:186"})}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"isrequired",children:"isRequired"}),"\n",(0,i.jsxs)(s.p,{children:["\u2022 ",(0,i.jsx)(s.strong,{children:"isRequired"}),": ",(0,i.jsx)(s.code,{children:"boolean"})]}),"\n",(0,i.jsx)(s.p,{children:"Whether this option is required. Failing to specify this option will throw an error."}),"\n",(0,i.jsx)(s.h4,{id:"inherited-from-6",children:"Inherited from"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption",children:"MassargOption"}),".",(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption#isrequired",children:"isRequired"})]}),"\n",(0,i.jsx)(s.h4,{id:"defined-in-10",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L188",children:"src/option.ts:188"})}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"isdefault",children:"isDefault"}),"\n",(0,i.jsxs)(s.p,{children:["\u2022 ",(0,i.jsx)(s.strong,{children:"isDefault"}),": ",(0,i.jsx)(s.code,{children:"boolean"})]}),"\n",(0,i.jsx)(s.h4,{id:"inherited-from-7",children:"Inherited from"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption",children:"MassargOption"}),".",(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption#isdefault",children:"isDefault"})]}),"\n",(0,i.jsx)(s.h4,{id:"defined-in-11",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L189",children:"src/option.ts:189"})}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"outputname",children:"outputName"}),"\n",(0,i.jsxs)(s.p,{children:["\u2022 ",(0,i.jsx)(s.code,{children:"Optional"})," ",(0,i.jsx)(s.strong,{children:"outputName"}),": ",(0,i.jsx)(s.code,{children:"string"})]}),"\n",(0,i.jsx)(s.h4,{id:"inherited-from-8",children:"Inherited from"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption",children:"MassargOption"}),".",(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption#outputname",children:"outputName"})]}),"\n",(0,i.jsx)(s.h4,{id:"defined-in-12",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L190",children:"src/option.ts:190"})}),"\n",(0,i.jsx)(s.h2,{id:"methods",children:"Methods"}),"\n",(0,i.jsx)(s.h3,{id:"fromtypedconfig",children:"fromTypedConfig"}),"\n",(0,i.jsxs)(s.p,{children:["\u25b8 ",(0,i.jsx)(s.strong,{children:"fromTypedConfig"}),"<",(0,i.jsx)(s.code,{children:"T"}),", ",(0,i.jsx)(s.code,{children:"A"}),">(",(0,i.jsx)(s.code,{children:"config"}),"): ",(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption",children:(0,i.jsx)(s.code,{children:"MassargOption"})}),"<",(0,i.jsx)(s.code,{children:"T"}),", ",(0,i.jsx)(s.a,{href:"/massarg/docs/api/modules/command#argsobject",children:(0,i.jsx)(s.code,{children:"ArgsObject"})}),">"]}),"\n",(0,i.jsxs)(s.p,{children:["Create a typed option from a configuration. Currently supports ",(0,i.jsx)(s.code,{children:"number"})," options which\nare automatically transformed from ",(0,i.jsx)(s.code,{children:"string"})," to ",(0,i.jsx)(s.code,{children:"number"}),"."]}),"\n",(0,i.jsx)(s.h4,{id:"type-parameters",children:"Type parameters"}),"\n",(0,i.jsxs)(s.table,{children:[(0,i.jsx)(s.thead,{children:(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.th,{style:{textAlign:"left"},children:"Name"}),(0,i.jsx)(s.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,i.jsxs)(s.tbody,{children:[(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"T"})}),(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"unknown"})})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"A"})}),(0,i.jsxs)(s.td,{style:{textAlign:"left"},children:["extends ",(0,i.jsx)(s.a,{href:"/massarg/docs/api/modules/command#argsobject",children:(0,i.jsx)(s.code,{children:"ArgsObject"})})," = ",(0,i.jsx)(s.a,{href:"/massarg/docs/api/modules/command#argsobject",children:(0,i.jsx)(s.code,{children:"ArgsObject"})})]})]})]})]}),"\n",(0,i.jsx)(s.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,i.jsxs)(s.table,{children:[(0,i.jsx)(s.thead,{children:(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.th,{style:{textAlign:"left"},children:"Name"}),(0,i.jsx)(s.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,i.jsxs)(s.tbody,{children:[(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"config"})}),(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"Object"})})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"config.name"})}),(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"string"})})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"config.description"})}),(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"string"})})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"config.aliases"})}),(0,i.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,i.jsx)(s.code,{children:"string"}),"[]"]})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"config.type"})}),(0,i.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,i.jsx)(s.code,{children:"undefined"})," | ",(0,i.jsx)(s.code,{children:'"number"'})]})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"config.defaultValue"})}),(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"any"})})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"config.array"})}),(0,i.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,i.jsx)(s.code,{children:"undefined"})," | ",(0,i.jsx)(s.code,{children:"boolean"})]})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"config.required"})}),(0,i.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,i.jsx)(s.code,{children:"undefined"})," | ",(0,i.jsx)(s.code,{children:"boolean"})]})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"config.isDefault"})}),(0,i.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,i.jsx)(s.code,{children:"undefined"})," | ",(0,i.jsx)(s.code,{children:"boolean"})]})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"config.hidden"})}),(0,i.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,i.jsx)(s.code,{children:"undefined"})," | ",(0,i.jsx)(s.code,{children:"boolean"})]})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"config.outputName"})}),(0,i.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,i.jsx)(s.code,{children:"undefined"})," | ",(0,i.jsx)(s.code,{children:"string"})]})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"config.parse"})}),(0,i.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,i.jsx)(s.code,{children:"undefined"})," | ",(0,i.jsx)(s.a,{href:"/massarg/docs/api/modules/option#parser",children:(0,i.jsx)(s.code,{children:"Parser"})}),"<",(0,i.jsx)(s.code,{children:"A"}),", ",(0,i.jsx)(s.code,{children:"T"}),">"]})]})]})]}),"\n",(0,i.jsx)(s.h4,{id:"returns-1",children:"Returns"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption",children:(0,i.jsx)(s.code,{children:"MassargOption"})}),"<",(0,i.jsx)(s.code,{children:"T"}),", ",(0,i.jsx)(s.a,{href:"/massarg/docs/api/modules/command#argsobject",children:(0,i.jsx)(s.code,{children:"ArgsObject"})}),">"]}),"\n",(0,i.jsx)(s.h4,{id:"inherited-from-9",children:"Inherited from"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption",children:"MassargOption"}),".",(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption#fromtypedconfig",children:"fromTypedConfig"})]}),"\n",(0,i.jsx)(s.h4,{id:"defined-in-13",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L209",children:"src/option.ts:209"})}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"parsedetails",children:"parseDetails"}),"\n",(0,i.jsxs)(s.p,{children:["\u25b8 ",(0,i.jsx)(s.strong,{children:"parseDetails"}),"(",(0,i.jsx)(s.code,{children:"argv"}),", ",(0,i.jsx)(s.code,{children:"_options"}),", ",(0,i.jsx)(s.code,{children:"prefixes"}),"): ",(0,i.jsx)(s.code,{children:"ArgvValue"}),"<",(0,i.jsx)(s.code,{children:"boolean"}),">"]}),"\n",(0,i.jsx)(s.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,i.jsxs)(s.table,{children:[(0,i.jsx)(s.thead,{children:(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.th,{style:{textAlign:"left"},children:"Name"}),(0,i.jsx)(s.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,i.jsxs)(s.tbody,{children:[(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"argv"})}),(0,i.jsxs)(s.td,{style:{textAlign:"left"},children:[(0,i.jsx)(s.code,{children:"string"}),"[]"]})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"_options"})}),(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.a,{href:"/massarg/docs/api/modules/command#argsobject",children:(0,i.jsx)(s.code,{children:"ArgsObject"})})})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"prefixes"})}),(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.a,{href:"/massarg/docs/api/modules/option#prefixes",children:(0,i.jsx)(s.code,{children:"Prefixes"})})})]})]})]}),"\n",(0,i.jsx)(s.h4,{id:"returns-2",children:"Returns"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.code,{children:"ArgvValue"}),"<",(0,i.jsx)(s.code,{children:"boolean"}),">"]}),"\n",(0,i.jsx)(s.h4,{id:"overrides-1",children:"Overrides"}),"\n",(0,i.jsx)(s.p,{children:"MassargOption.parseDetails"}),"\n",(0,i.jsx)(s.h4,{id:"defined-in-14",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L377",children:"src/option.ts:377"})}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"qualifiednames",children:"qualifiedNames"}),"\n",(0,i.jsxs)(s.p,{children:["\u25b8 ",(0,i.jsx)(s.strong,{children:"qualifiedNames"}),"(",(0,i.jsx)(s.code,{children:"prefixes"}),"): ",(0,i.jsx)(s.a,{href:"/massarg/docs/api/modules/option#qualifiednames",children:(0,i.jsx)(s.code,{children:"QualifiedNames"})})]}),"\n",(0,i.jsx)(s.p,{children:"Return the finalized names that will cause this option to match."}),"\n",(0,i.jsx)(s.h4,{id:"parameters-3",children:"Parameters"}),"\n",(0,i.jsxs)(s.table,{children:[(0,i.jsx)(s.thead,{children:(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.th,{style:{textAlign:"left"},children:"Name"}),(0,i.jsx)(s.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,i.jsx)(s.tbody,{children:(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"prefixes"})}),(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.a,{href:"/massarg/docs/api/modules/option#prefixes",children:(0,i.jsx)(s.code,{children:"Prefixes"})})})]})})]}),"\n",(0,i.jsx)(s.h4,{id:"returns-3",children:"Returns"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"/massarg/docs/api/modules/option#qualifiednames",children:(0,i.jsx)(s.code,{children:"QualifiedNames"})})}),"\n",(0,i.jsx)(s.h4,{id:"overrides-2",children:"Overrides"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption",children:"MassargOption"}),".",(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption#qualifiednames",children:"qualifiedNames"})]}),"\n",(0,i.jsx)(s.h4,{id:"defined-in-15",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L418",children:"src/option.ts:418"})}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"getoutputname",children:"getOutputName"}),"\n",(0,i.jsxs)(s.p,{children:["\u25b8 ",(0,i.jsx)(s.strong,{children:"getOutputName"}),"(): ",(0,i.jsx)(s.code,{children:"string"})]}),"\n",(0,i.jsx)(s.p,{children:"Returns the key which this option outputs to in the final object."}),"\n",(0,i.jsx)(s.h4,{id:"returns-4",children:"Returns"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.code,{children:"string"})}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.strong,{children:(0,i.jsx)(s.code,{children:"Default"})})}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-ts",children:"The camelCase version of this option's name.\n\nCan be overridden with {@link outputName}.\n"})}),"\n",(0,i.jsx)(s.h4,{id:"inherited-from-10",children:"Inherited from"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption",children:"MassargOption"}),".",(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption#getoutputname",children:"getOutputName"})]}),"\n",(0,i.jsx)(s.h4,{id:"defined-in-16",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L226",children:"src/option.ts:226"})}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"helpstring",children:"helpString"}),"\n",(0,i.jsxs)(s.p,{children:["\u25b8 ",(0,i.jsx)(s.strong,{children:"helpString"}),"(): ",(0,i.jsx)(s.code,{children:"string"})]}),"\n",(0,i.jsx)(s.p,{children:"Get the help string for this option"}),"\n",(0,i.jsx)(s.h4,{id:"returns-5",children:"Returns"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.code,{children:"string"})}),"\n",(0,i.jsx)(s.h4,{id:"inherited-from-11",children:"Inherited from"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption",children:"MassargOption"}),".",(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption#helpstring",children:"helpString"})]}),"\n",(0,i.jsx)(s.h4,{id:"defined-in-17",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L260",children:"src/option.ts:260"})}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"ismatch",children:"isMatch"}),"\n",(0,i.jsxs)(s.p,{children:["\u25b8 ",(0,i.jsx)(s.strong,{children:"isMatch"}),"(",(0,i.jsx)(s.code,{children:"arg"}),", ",(0,i.jsx)(s.code,{children:"prefixes"}),"): ",(0,i.jsx)(s.code,{children:"boolean"})]}),"\n",(0,i.jsx)(s.p,{children:"Returns true if the flag (including any prefixes) matches the name or aliases"}),"\n",(0,i.jsx)(s.h4,{id:"parameters-4",children:"Parameters"}),"\n",(0,i.jsxs)(s.table,{children:[(0,i.jsx)(s.thead,{children:(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.th,{style:{textAlign:"left"},children:"Name"}),(0,i.jsx)(s.th,{style:{textAlign:"left"},children:"Type"})]})}),(0,i.jsxs)(s.tbody,{children:[(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"arg"})}),(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"string"})})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.code,{children:"prefixes"})}),(0,i.jsx)(s.td,{style:{textAlign:"left"},children:(0,i.jsx)(s.a,{href:"/massarg/docs/api/modules/option#prefixes",children:(0,i.jsx)(s.code,{children:"Prefixes"})})})]})]})]}),"\n",(0,i.jsx)(s.h4,{id:"returns-6",children:"Returns"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.code,{children:"boolean"})}),"\n",(0,i.jsx)(s.h4,{id:"inherited-from-12",children:"Inherited from"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption",children:"MassargOption"}),".",(0,i.jsx)(s.a,{href:"/massarg/docs/api/classes/option.MassargOption#ismatch",children:"isMatch"})]}),"\n",(0,i.jsx)(s.h4,{id:"defined-in-18",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/chenasraf/massarg/blob/e3893ec69c5e159bd7a65ca4e58c42535214e3a5/src/option.ts#L266",children:"src/option.ts:266"})})]})}function o(e={}){const{wrapper:s}={...(0,r.R)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},7468:(e,s,n)=>{n.d(s,{R:()=>l,x:()=>t});var i=n(758);const r={},d=i.createContext(r);function l(e){const s=i.useContext(d);return i.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function t(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),i.createElement(d.Provider,{value:s},e.children)}}}]);