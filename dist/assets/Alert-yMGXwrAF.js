import{e as M,_ as l,j as s,f as b,x as h,w as L,r as N,b as T}from"./index-CdkbwK6B.js";import{d as W,g as H,a as U,s as j,P as V,c as Z,e as D}from"./Box-DAti2-1c.js";import{r as q,m as G,a as J}from"./Button-DNkXxOpl.js";import{c as C}from"./createSvgIcon-Dch7dBPN.js";import{I as K}from"./IconButton--_e1gMNA.js";const Q=["className","elementType","ownerState","externalForwardedProps","getSlotOwnerState","internalForwardedProps"],X=["component","slots","slotProps"],Y=["component"];function R(o,e){const{className:r,elementType:t,ownerState:a,externalForwardedProps:p,getSlotOwnerState:m,internalForwardedProps:d}=e,S=M(e,Q),{component:u,slots:g={[o]:void 0},slotProps:A={[o]:void 0}}=p,w=M(p,X),f=g[o]||t,v=q(A[o],a),i=G(l({className:r},S,{externalForwardedProps:o==="root"?w:void 0,externalSlotProps:v})),{props:{component:y},internalRef:O}=i,P=M(i.props,Y),$=W(O,v==null?void 0:v.ref,e.ref),n=m?m(P):{},c=l({},a,n),x=o==="root"?y||u:y,I=J(f,l({},o==="root"&&!u&&!g[o]&&d,o!=="root"&&!g[o]&&d,P,x&&{as:x},{ref:$}),c);return Object.keys(n).forEach(z=>{delete I[z]}),[f,I]}function oo(o){return U("MuiAlert",o)}const k=H("MuiAlert",["root","action","icon","message","filled","colorSuccess","colorInfo","colorWarning","colorError","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]),to=C(s.jsx("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined"),eo=C(s.jsx("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined"),so=C(s.jsx("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline"),ro=C(s.jsx("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined"),no=C(s.jsx("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close"),lo=["action","children","className","closeText","color","components","componentsProps","icon","iconMapping","onClose","role","severity","slotProps","slots","variant"],ao=o=>{const{variant:e,color:r,severity:t,classes:a}=o,p={root:["root",`color${b(r||t)}`,`${e}${b(r||t)}`,`${e}`],icon:["icon"],message:["message"],action:["action"]};return D(p,oo,a)},io=j(V,{name:"MuiAlert",slot:"Root",overridesResolver:(o,e)=>{const{ownerState:r}=o;return[e.root,e[r.variant],e[`${r.variant}${b(r.color||r.severity)}`]]}})(({theme:o})=>{const e=o.palette.mode==="light"?h:L,r=o.palette.mode==="light"?L:h;return l({},o.typography.body2,{backgroundColor:"transparent",display:"flex",padding:"6px 16px",variants:[...Object.entries(o.palette).filter(([,t])=>t.main&&t.light).map(([t])=>({props:{colorSeverity:t,variant:"standard"},style:{color:o.vars?o.vars.palette.Alert[`${t}Color`]:e(o.palette[t].light,.6),backgroundColor:o.vars?o.vars.palette.Alert[`${t}StandardBg`]:r(o.palette[t].light,.9),[`& .${k.icon}`]:o.vars?{color:o.vars.palette.Alert[`${t}IconColor`]}:{color:o.palette[t].main}}})),...Object.entries(o.palette).filter(([,t])=>t.main&&t.light).map(([t])=>({props:{colorSeverity:t,variant:"outlined"},style:{color:o.vars?o.vars.palette.Alert[`${t}Color`]:e(o.palette[t].light,.6),border:`1px solid ${(o.vars||o).palette[t].light}`,[`& .${k.icon}`]:o.vars?{color:o.vars.palette.Alert[`${t}IconColor`]}:{color:o.palette[t].main}}})),...Object.entries(o.palette).filter(([,t])=>t.main&&t.dark).map(([t])=>({props:{colorSeverity:t,variant:"filled"},style:l({fontWeight:o.typography.fontWeightMedium},o.vars?{color:o.vars.palette.Alert[`${t}FilledColor`],backgroundColor:o.vars.palette.Alert[`${t}FilledBg`]}:{backgroundColor:o.palette.mode==="dark"?o.palette[t].dark:o.palette[t].main,color:o.palette.getContrastText(o.palette[t].main)})}))]})}),co=j("div",{name:"MuiAlert",slot:"Icon",overridesResolver:(o,e)=>e.icon})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),po=j("div",{name:"MuiAlert",slot:"Message",overridesResolver:(o,e)=>e.message})({padding:"8px 0",minWidth:0,overflow:"auto"}),E=j("div",{name:"MuiAlert",slot:"Action",overridesResolver:(o,e)=>e.action})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),_={success:s.jsx(to,{fontSize:"inherit"}),warning:s.jsx(eo,{fontSize:"inherit"}),error:s.jsx(so,{fontSize:"inherit"}),info:s.jsx(ro,{fontSize:"inherit"})},Co=N.forwardRef(function(e,r){const t=T({props:e,name:"MuiAlert"}),{action:a,children:p,className:m,closeText:d="Close",color:S,components:u={},componentsProps:g={},icon:A,iconMapping:w=_,onClose:f,role:v="alert",severity:i="success",slotProps:y={},slots:O={},variant:P="standard"}=t,$=M(t,lo),n=l({},t,{color:S,severity:i,variant:P,colorSeverity:S||i}),c=ao(n),x={slots:l({closeButton:u.CloseButton,closeIcon:u.CloseIcon},O),slotProps:l({},g,y)},[I,z]=R("closeButton",{elementType:K,externalForwardedProps:x,ownerState:n}),[B,F]=R("closeIcon",{elementType:no,externalForwardedProps:x,ownerState:n});return s.jsxs(io,l({role:v,elevation:0,ownerState:n,className:Z(c.root,m),ref:r},$,{children:[A!==!1?s.jsx(co,{ownerState:n,className:c.icon,children:A||w[i]||_[i]}):null,s.jsx(po,{ownerState:n,className:c.message,children:p}),a!=null?s.jsx(E,{ownerState:n,className:c.action,children:a}):null,a==null&&f?s.jsx(E,{ownerState:n,className:c.action,children:s.jsx(I,l({size:"small","aria-label":d,title:d,color:"inherit",onClick:f},z,{children:s.jsx(B,l({fontSize:"small"},F))}))}):null]}))});export{Co as A,no as C,R as u};