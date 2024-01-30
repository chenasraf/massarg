"use strict";(self.webpackChunkmassarg_docs=self.webpackChunkmassarg_docs||[]).push([[597],{7842:(n,e,a)=>{a.r(e),a.d(e,{assets:()=>l,contentTitle:()=>o,default:()=>m,frontMatter:()=>t,metadata:()=>r,toc:()=>d});var s=a(1527),i=a(8672);const t={id:"index",title:"massarg",sidebar_label:"Readme",sidebar_position:0,custom_edit_url:null},o="massarg",r={id:"api/index",title:"massarg",description:"Massarg is a modern, flexible, powerful, and simple-to-use command/argument parser for JS",source:"@site/docs/api/index.md",sourceDirName:"api",slug:"/api/",permalink:"/massarg/docs/api/",draft:!1,unlisted:!1,editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"index",title:"massarg",sidebar_label:"Readme",sidebar_position:0,custom_edit_url:null},sidebar:"api",next:{title:"Exports",permalink:"/massarg/docs/api/modules"}},l={},d=[{value:"Features",id:"features",level:2},{value:"Usage",id:"usage",level:2},{value:"Quick Start",id:"quick-start",level:2},{value:"Install",id:"install",level:3},{value:"Import",id:"import",level:3},{value:"Usage",id:"usage-1",level:3},{value:"Documentation",id:"documentation",level:2},{value:"Contributing",id:"contributing",level:2}];function c(n){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.h1,{id:"massarg",children:"massarg"}),"\n",(0,s.jsx)(e.p,{children:"Massarg is a modern, flexible, powerful, and simple-to-use command/argument parser for JS\napplications, allowing you to create complex but easy applications that consume command-line\narguments and commands."}),"\n",(0,s.jsxs)(e.p,{children:["It allows you to both parse argument options and flags, as well as hierarchal subcommands, both of\nwhich can be parsed into an ",(0,s.jsx)(e.strong,{children:"automatic help command or flag"})," that displays all the information\neasily, with customizable styles, and content."]}),"\n",(0,s.jsx)(e.p,{children:"You should only focus on actually writing the functionality of your CLI, and not waste it on writing\na way to parse the chain of commands, flags or options."}),"\n",(0,s.jsx)(e.p,{children:"And it should look good too, right?"}),"\n",(0,s.jsx)(e.p,{children:(0,s.jsx)(e.img,{src:"https://github.com/chenasraf/massarg/assets/167217/37dc8d4f-8e14-4040-9986-1d3113314731",alt:"Previw of shell help output"})}),"\n",(0,s.jsx)(e.h2,{id:"features",children:"Features"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"Primary command to be run without args"}),"\n",(0,s.jsx)(e.li,{children:"Commands to be run from arg"}),"\n",(0,s.jsx)(e.li,{children:"Options with flexible parsing"}),"\n",(0,s.jsx)(e.li,{children:"Required options"}),"\n",(0,s.jsx)(e.li,{children:"Options with multiple values"}),"\n",(0,s.jsx)(e.li,{children:"Nameless options"}),"\n",(0,s.jsxs)(e.li,{children:["Automatically generated help text:","\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"Customizable colors"}),"\n",(0,s.jsx)(e.li,{children:"Customizable header and footer text"}),"\n",(0,s.jsx)(e.li,{children:"Customizable usage examples"}),"\n",(0,s.jsx)(e.li,{children:"Automatic text alignment"}),"\n",(0,s.jsx)(e.li,{children:"Add run examples for your args"}),"\n",(0,s.jsx)(e.li,{children:"Shows default value and type next to description"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:"TypeScript-first package: You will always have strong types"}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"usage",children:"Usage"}),"\n",(0,s.jsx)(e.h2,{id:"quick-start",children:"Quick Start"}),"\n",(0,s.jsx)(e.h3,{id:"install",children:"Install"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-shell",children:"# pnpm\npnpm install massarg\n# npm\nnpm install massarg\n# yarn\nyarn add massarg\n"})}),"\n",(0,s.jsx)(e.h3,{id:"import",children:"Import"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-ts",children:"import massarg from 'massarg'\n"})}),"\n",(0,s.jsx)(e.h3,{id:"usage-1",children:"Usage"}),"\n",(0,s.jsxs)(e.p,{children:["Call the default export function ",(0,s.jsx)(e.code,{children:"massarg"}),", or create a new instance manually using ",(0,s.jsx)(e.code,{children:"new Massarg()"}),",\nand then you can start chaining commands. Use ",(0,s.jsx)(e.code,{children:".parse()"})," to do the final parsing and run the\ncommands and options."]}),"\n",(0,s.jsxs)(e.p,{children:["Each function and option is documented. See\n",(0,s.jsx)(e.a,{href:"https://chenasraf.github.io/massarg",children:"the full documentation"})," for details."]}),"\n",(0,s.jsx)(e.p,{children:"JSDoc comments are also provided."}),"\n",(0,s.jsx)(e.p,{children:"Here is an example with some commonly used examples to get you started."}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-ts",children:"const parser = massarg({\n  name: 'my-cli',\n  description: \"Does really amazing stuff, you wouldn't believe!\",\n}) // or: new Massarg()\n  // The main command - runs when no commands are specified. If not provided, an error is thrown for\n  // required arguments.\n  .main((options) => console.log('main command', options))\n  // A subcommand example\n  .command({\n    name: 'foo',\n    description: 'a sub command',\n    aliases: ['f'],\n    optionPrefix: '--',\n    aliasPrefix: '-',\n    run: (options) => console.log('foo command'), // The function to run\n  })\n  // A subcommand example, which contains its own set of options or sub commands. This is infinitely\n  // nestible.\n  .command(\n    massarg({\n      name: 'bar',\n      description: 'another sub command',\n      aliases: ['s'],\n      run: (options) => console.log('bar command', options),\n    }).option({\n      name: 'file',\n      description: 'Filename to use',\n      aliases: ['f'],\n      parse: (filename) => path.resolve(process.cwd(), filename),\n    }),\n  )\n  // A CLI option - argument with a value\n  .option({\n    name: 'my-string',\n    description: 'A string argument',\n    aliases: ['s'],\n  })\n  // A CLI flg - boolean argument with no value\n  .flag({\n    name: 'flag',\n    description: 'a flag that will be related to any command (main or sub)',\n    aliases: ['f'],\n    negatble: true,\n    negateName: 'no-flag', // Override the default negation name\n    negateAliases: ['F'], // Override the default negation aliases\n  })\n  // Usage examples for your CLI. Use this to describe various common usages or quirks.\n  .example({\n    description: 'Run the sub command',\n    input: 'my-bin --flag sub',\n    output: 'Sub command: flag is true',\n  })\n  // Configuration of the automated help section\n  .help({\n    bindCommand: true,\n    footerText: `Copyright \xa9 ${new Date().getFullYear()} Me, Myself and I`,\n    titleStyle: {\n      bold: true,\n      color: 'brightWhite',\n    },\n  })\n"})}),"\n",(0,s.jsx)(e.h2,{id:"documentation",children:"Documentation"}),"\n",(0,s.jsxs)(e.p,{children:["The full documentation can be found here:\n",(0,s.jsx)(e.a,{href:"https://chenasraf.github.io/massarg",children:"Massarg Documentation"})]}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://chenasraf.github.io/massarg/docs/api/classes/massarg.Massarg",children:"Massarg"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://chenasraf.github.io/massarg/docs/api/classes/option.MassargOption",children:"MassargOption"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://chenasraf.github.io/massarg/docs/api/classes/option.MassargFlag",children:"MassargFlag"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://chenasraf.github.io/massarg/docs/api/classes/example.MassargExample",children:"MassargExample"})}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"contributing",children:"Contributing"}),"\n",(0,s.jsx)(e.p,{children:"I am developing this package on my free time, so any support, whether code, issues, or just stars is\nvery helpful to sustaining its life. If you are feeling incredibly generous and would like to donate\njust a small amount to help sustain this project, I would be very very thankful!"}),"\n",(0,s.jsx)("a",{href:"https://ko-fi.com/casraf",target:"_blank",children:(0,s.jsx)("img",{height:"36",src:"https://cdn.ko-fi.com/cdn/kofi1.png?v=3",alt:"Buy Me a Coffee at ko-fi.com"})}),"\n",(0,s.jsx)(e.p,{children:"I welcome any issues or pull requests on GitHub. If you find a bug, or would like a new feature,\ndon't hesitate to open an appropriate issue and I will do my best to reply promptly."})]})}function m(n={}){const{wrapper:e}={...(0,i.a)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(c,{...n})}):c(n)}},8672:(n,e,a)=>{a.d(e,{Z:()=>r,a:()=>o});var s=a(959);const i={},t=s.createContext(i);function o(n){const e=s.useContext(t);return s.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function r(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:o(n.components),s.createElement(t.Provider,{value:e},n.children)}}}]);