import{r as P,f as t,b as ar,e as tr,_ as b,j as M}from"./index-CjDFkInu.js";import{g as nr,a as ir,s as F,c as U,e as sr}from"./Box-D2ePpQu4.js";import{u as A}from"./Button-BdfboGMk.js";const k=o=>{const a=P.useRef({});return P.useEffect(()=>{a.current=o}),a.current};function er(o){const{badgeContent:a,invisible:r=!1,max:n=99,showZero:i=!1}=o,c=k({badgeContent:a,max:n});let e=r;r===!1&&a===0&&!i&&(e=!0);const{badgeContent:s,max:g=n}=e?c:o,p=s&&Number(s)>g?`${g}+`:s;return{badgeContent:s,invisible:e,max:g,displayValue:p}}function lr(o){return ir("MuiBadge",o)}const l=nr("MuiBadge",["root","badge","dot","standard","anchorOriginTopRight","anchorOriginBottomRight","anchorOriginTopLeft","anchorOriginBottomLeft","invisible","colorError","colorInfo","colorPrimary","colorSecondary","colorSuccess","colorWarning","overlapRectangular","overlapCircular","anchorOriginTopLeftCircular","anchorOriginTopLeftRectangular","anchorOriginTopRightCircular","anchorOriginTopRightRectangular","anchorOriginBottomLeftCircular","anchorOriginBottomLeftRectangular","anchorOriginBottomRightCircular","anchorOriginBottomRightRectangular"]),cr=["anchorOrigin","className","classes","component","components","componentsProps","children","overlap","color","invisible","max","badgeContent","slots","slotProps","showZero","variant"],O=10,x=4,gr=o=>{const{color:a,anchorOrigin:r,invisible:n,overlap:i,variant:c,classes:e={}}=o,s={root:["root"],badge:["badge",c,n&&"invisible",`anchorOrigin${t(r.vertical)}${t(r.horizontal)}`,`anchorOrigin${t(r.vertical)}${t(r.horizontal)}${t(i)}`,`overlap${t(i)}`,a!=="default"&&`color${t(a)}`]};return sr(s,lr,e)},pr=F("span",{name:"MuiBadge",slot:"Root",overridesResolver:(o,a)=>a.root})({position:"relative",display:"inline-flex",verticalAlign:"middle",flexShrink:0}),dr=F("span",{name:"MuiBadge",slot:"Badge",overridesResolver:(o,a)=>{const{ownerState:r}=o;return[a.badge,a[r.variant],a[`anchorOrigin${t(r.anchorOrigin.vertical)}${t(r.anchorOrigin.horizontal)}${t(r.overlap)}`],r.color!=="default"&&a[`color${t(r.color)}`],r.invisible&&a.invisible]}})(({theme:o})=>{var a;return{display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center",alignContent:"center",alignItems:"center",position:"absolute",boxSizing:"border-box",fontFamily:o.typography.fontFamily,fontWeight:o.typography.fontWeightMedium,fontSize:o.typography.pxToRem(12),minWidth:O*2,lineHeight:1,padding:"0 6px",height:O*2,borderRadius:O,zIndex:1,transition:o.transitions.create("transform",{easing:o.transitions.easing.easeInOut,duration:o.transitions.duration.enteringScreen}),variants:[...Object.keys(((a=o.vars)!=null?a:o).palette).filter(r=>{var n,i;return((n=o.vars)!=null?n:o).palette[r].main&&((i=o.vars)!=null?i:o).palette[r].contrastText}).map(r=>({props:{color:r},style:{backgroundColor:(o.vars||o).palette[r].main,color:(o.vars||o).palette[r].contrastText}})),{props:{variant:"dot"},style:{borderRadius:x,height:x*2,minWidth:x*2,padding:0}},{props:({ownerState:r})=>r.anchorOrigin.vertical==="top"&&r.anchorOrigin.horizontal==="right"&&r.overlap==="rectangular",style:{top:0,right:0,transform:"scale(1) translate(50%, -50%)",transformOrigin:"100% 0%",[`&.${l.invisible}`]:{transform:"scale(0) translate(50%, -50%)"}}},{props:({ownerState:r})=>r.anchorOrigin.vertical==="bottom"&&r.anchorOrigin.horizontal==="right"&&r.overlap==="rectangular",style:{bottom:0,right:0,transform:"scale(1) translate(50%, 50%)",transformOrigin:"100% 100%",[`&.${l.invisible}`]:{transform:"scale(0) translate(50%, 50%)"}}},{props:({ownerState:r})=>r.anchorOrigin.vertical==="top"&&r.anchorOrigin.horizontal==="left"&&r.overlap==="rectangular",style:{top:0,left:0,transform:"scale(1) translate(-50%, -50%)",transformOrigin:"0% 0%",[`&.${l.invisible}`]:{transform:"scale(0) translate(-50%, -50%)"}}},{props:({ownerState:r})=>r.anchorOrigin.vertical==="bottom"&&r.anchorOrigin.horizontal==="left"&&r.overlap==="rectangular",style:{bottom:0,left:0,transform:"scale(1) translate(-50%, 50%)",transformOrigin:"0% 100%",[`&.${l.invisible}`]:{transform:"scale(0) translate(-50%, 50%)"}}},{props:({ownerState:r})=>r.anchorOrigin.vertical==="top"&&r.anchorOrigin.horizontal==="right"&&r.overlap==="circular",style:{top:"14%",right:"14%",transform:"scale(1) translate(50%, -50%)",transformOrigin:"100% 0%",[`&.${l.invisible}`]:{transform:"scale(0) translate(50%, -50%)"}}},{props:({ownerState:r})=>r.anchorOrigin.vertical==="bottom"&&r.anchorOrigin.horizontal==="right"&&r.overlap==="circular",style:{bottom:"14%",right:"14%",transform:"scale(1) translate(50%, 50%)",transformOrigin:"100% 100%",[`&.${l.invisible}`]:{transform:"scale(0) translate(50%, 50%)"}}},{props:({ownerState:r})=>r.anchorOrigin.vertical==="top"&&r.anchorOrigin.horizontal==="left"&&r.overlap==="circular",style:{top:"14%",left:"14%",transform:"scale(1) translate(-50%, -50%)",transformOrigin:"0% 0%",[`&.${l.invisible}`]:{transform:"scale(0) translate(-50%, -50%)"}}},{props:({ownerState:r})=>r.anchorOrigin.vertical==="bottom"&&r.anchorOrigin.horizontal==="left"&&r.overlap==="circular",style:{bottom:"14%",left:"14%",transform:"scale(1) translate(-50%, 50%)",transformOrigin:"0% 100%",[`&.${l.invisible}`]:{transform:"scale(0) translate(-50%, 50%)"}}},{props:{invisible:!0},style:{transition:o.transitions.create("transform",{easing:o.transitions.easing.easeInOut,duration:o.transitions.duration.leavingScreen})}}]}}),hr=P.forwardRef(function(a,r){var n,i,c,e,s,g;const p=ar({props:a,name:"MuiBadge"}),{anchorOrigin:y={vertical:"top",horizontal:"right"},className:E,component:V,components:$={},componentsProps:R={},children:H,overlap:C="rectangular",color:B="default",invisible:S=!1,max:Z=99,badgeContent:z,slots:d,slotProps:v,showZero:_=!1,variant:u="standard"}=p,q=tr(p,cr),{badgeContent:T,invisible:G,max:J,displayValue:K}=er({max:Z,invisible:S,badgeContent:z,showZero:_}),Q=k({anchorOrigin:y,color:B,overlap:C,variant:u,badgeContent:z}),N=G||T==null&&u!=="dot",{color:X=B,overlap:Y=C,anchorOrigin:w=y,variant:j=u}=N?Q:p,D=j!=="dot"?K:void 0,f=b({},p,{badgeContent:T,invisible:N,max:J,displayValue:D,showZero:_,anchorOrigin:w,color:X,overlap:Y,variant:j}),I=gr(f),L=(n=(i=d==null?void 0:d.root)!=null?i:$.Root)!=null?n:pr,W=(c=(e=d==null?void 0:d.badge)!=null?e:$.Badge)!=null?c:dr,h=(s=v==null?void 0:v.root)!=null?s:R.root,m=(g=v==null?void 0:v.badge)!=null?g:R.badge,rr=A({elementType:L,externalSlotProps:h,externalForwardedProps:q,additionalProps:{ref:r,as:V},ownerState:f,className:U(h==null?void 0:h.className,I.root,E)}),or=A({elementType:W,externalSlotProps:m,ownerState:f,className:U(I.badge,m==null?void 0:m.className)});return M.jsxs(L,b({},rr,{children:[H,M.jsx(W,b({},or,{children:D}))]}))});export{hr as B,k as u};