import{r as d,b as C,e as u,_ as n,j as p}from"./index-CjDFkInu.js";import{g as m,a as f,s as x,P as M,c as v,e as R}from"./Box-D2ePpQu4.js";function g(s){return f("MuiCard",s)}m("MuiCard",["root"]);const y=["className","raised"],N=s=>{const{classes:t}=s;return R({root:["root"]},g,t)},U=x(M,{name:"MuiCard",slot:"Root",overridesResolver:(s,t)=>t.root})(()=>({overflow:"hidden"})),E=d.forwardRef(function(t,e){const o=C({props:t,name:"MuiCard"}),{className:c,raised:r=!1}=o,i=u(o,y),a=n({},o,{raised:r}),l=N(a);return p.jsx(U,n({className:v(l.root,c),elevation:r?8:void 0,ref:e,ownerState:a},i))});function h(s){return f("MuiCardContent",s)}m("MuiCardContent",["root"]);const j=["className","component"],w=s=>{const{classes:t}=s;return R({root:["root"]},h,t)},_=x("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(s,t)=>t.root})(()=>({padding:16,"&:last-child":{paddingBottom:24}})),S=d.forwardRef(function(t,e){const o=C({props:t,name:"MuiCardContent"}),{className:c,component:r="div"}=o,i=u(o,j),a=n({},o,{component:r}),l=w(a);return p.jsx(_,n({as:r,className:v(l.root,c),ownerState:a,ref:e},i))});export{E as C,S as a};