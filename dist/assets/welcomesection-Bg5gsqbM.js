import{j as e,r as x,a as y,B as A}from"./index-CjDFkInu.js";import{c as q}from"./createSvgIcon-Wb5NpHkq.js";import{C as I}from"./Container-B_fH668b.js";import{T as h,B as F,P as T}from"./Box-D2ePpQu4.js";import{G as c}from"./Grid-pV-4WZ8a.js";import{T as i}from"./TextField-2R_2fVAW.js";import{I as S}from"./IconButton-CeC_4U9q.js";import{B as w}from"./Button-BdfboGMk.js";import{S as $}from"./Snackbar-CuilL5fl.js";import{A as z}from"./Alert-JAYxnSnU.js";import"./useThemeProps-CDXnS6-V.js";import"./List-BiWVhqcH.js";const W=q(e.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m5 11h-4v4h-2v-4H7v-2h4V7h2v4h4z"}),"AddCircle"),B=q(e.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m5 11H7v-2h10z"}),"RemoveCircle"),Q=()=>{const[s,a]=x.useState({welcome_title:"",welcome_description:"",welcome_stitle:"",welcome_sdescription:"",cta_title:"",cta_description:"",bullets:[""],cta_button:"",counter:[""]}),[k,D]=x.useState(!0),[t,_]=x.useState({}),[b,p]=x.useState({open:!1,message:"",severity:"success"});x.useEffect(()=>{y.get(`${A}/welcome-section`).then(o=>{if(o.data.status==="success"){const r=o.data.data;a({welcome_title:r.welcome_title||"",welcome_description:r.welcome_description||"",welcome_stitle:r.welcome_stitle||"",welcome_sdescription:r.welcome_sdescription||"",cta_title:r.cta_title||"",cta_description:r.cta_description||"",bullets:r.bullets?JSON.parse(r.bullets):[""],cta_button:r.cta_button||"",counter:r.counter?JSON.parse(r.counter):[""]})}}).catch(o=>{console.error("Error fetching welcome section:",o),p({open:!0,message:"Error fetching welcome section data.",severity:"error"})}).finally(()=>{D(!1)})},[]);const m=o=>{const{name:r,value:l}=o.target;a({...s,[r]:l})},j=(o,r,l,u)=>{if(u==="counter"&&l==="count"){const n=Math.min(Number(r),99999),d=[...s.counter];d[o]={...d[o],[l]:n},a({...s,counter:d})}else if(u==="counter"){const n=[...s.counter];n[o]={...n[o],[l]:r},a({...s,counter:n})}else{const n=[...s[u||l]];n[o]=r,a({...s,[u||l]:n})}},v=o=>{a(o==="counter"?{...s,counter:[...s.counter,{count:"",label:""}]}:{...s,[o]:[...s[o],""]})},f=(o,r)=>{const l=s[r].filter((u,n)=>n!==o);a({...s,[r]:l})},E=o=>{o.preventDefault(),_({});const r={...s,bullets:s.bullets,counter:s.counter};console.log(r),y.post(`${A}/welcome-section`,r).then(l=>{l.data.status==="success"?p({open:!0,message:"Welcome section updated successfully!",severity:"success"}):(p({open:!0,message:"There was an error updating the welcome section.",severity:"error"}),l.data.errors&&_(l.data.errors))}).catch(l=>{console.error("Error updating welcome section:",l),p({open:!0,message:"There was an error updating the welcome section.",severity:"error"}),l.response&&l.response.data.errors&&_(l.response.data.errors)})},C=(o,r)=>{r!=="clickaway"&&p({...b,open:!1})};return k?e.jsx(I,{children:e.jsx(h,{variant:"h6",children:"Loading..."})}):e.jsxs(F,{children:[e.jsx(h,{variant:"h4",gutterBottom:!0,children:"Update Welcome Section"}),e.jsx("form",{onSubmit:E,children:e.jsxs(c,{container:!0,spacing:2,children:[e.jsx(c,{item:!0,xs:12,children:e.jsx(i,{label:"Welcome Title",name:"welcome_title",value:s.welcome_title,onChange:m,fullWidth:!0,required:!0,error:!!t.welcome_title,helperText:t.welcome_title?t.welcome_title[0]:""})}),e.jsx(c,{item:!0,xs:12,children:e.jsx(i,{label:"Welcome Description",name:"welcome_description",value:s.welcome_description,onChange:m,fullWidth:!0,multiline:!0,rows:4,required:!0,error:!!t.welcome_description,helperText:t.welcome_description?t.welcome_description[0]:""})}),e.jsx(c,{item:!0,xs:12,children:e.jsx(i,{label:"Welcome Sub-Title",name:"welcome_stitle",value:s.welcome_stitle,onChange:m,fullWidth:!0,required:!0,error:!!t.welcome_stitle,helperText:t.welcome_stitle?t.welcome_stitle[0]:""})}),e.jsx(c,{item:!0,xs:12,children:e.jsx(i,{label:"Welcome Sub-Description",name:"welcome_sdescription",value:s.welcome_sdescription,onChange:m,fullWidth:!0,multiline:!0,rows:4,required:!0,error:!!t.welcome_sdescription,helperText:t.welcome_sdescription?t.welcome_sdescription[0]:""})}),e.jsx(c,{item:!0,xs:12,children:e.jsx(i,{label:"CTA Title",name:"cta_title",value:s.cta_title,onChange:m,fullWidth:!0,required:!0,error:!!t.cta_title,helperText:t.cta_title?t.cta_title[0]:""})}),e.jsx(c,{item:!0,xs:12,children:e.jsx(i,{label:"CTA Description",name:"cta_description",value:s.cta_description,onChange:m,fullWidth:!0,multiline:!0,rows:4,required:!0,error:!!t.cta_description,helperText:t.cta_description?t.cta_description[0]:""})}),e.jsxs(c,{item:!0,xs:12,children:[e.jsx(h,{variant:"h6",children:"Bullets"}),s.bullets.map((o,r)=>e.jsx(T,{style:{padding:"1rem",marginBottom:"1rem"},variant:"outlined",children:e.jsxs(c,{container:!0,alignItems:"center",spacing:1,children:[e.jsx(c,{item:!0,xs:11,children:e.jsx(i,{label:`Bullet ${r+1}`,value:o,onChange:l=>j(r,l.target.value,"bullets"),fullWidth:!0,required:!0,error:t.bullets&&Array.isArray(t.bullets)&&!!t.bullets[r],helperText:t.bullets&&Array.isArray(t.bullets)&&t.bullets[r]?t.bullets[r]:""})}),e.jsx(c,{item:!0,xs:1,children:e.jsx(S,{onClick:()=>f(r,"bullets"),disabled:s.bullets.length===1,children:e.jsx(B,{color:"error"})})})]})},r)),e.jsx(w,{variant:"contained",color:"primary",startIcon:e.jsx(W,{}),onClick:()=>v("bullets"),children:"Add Bullet"}),t.bullets&&typeof t.bullets=="string"&&e.jsx(h,{variant:"body2",color:"error",children:t.bullets})]}),e.jsx(c,{item:!0,xs:12,children:e.jsx(i,{label:"CTA Button Text",name:"cta_button",value:s.cta_button,onChange:m,fullWidth:!0,required:!0,error:!!t.cta_button,helperText:t.cta_button?t.cta_button[0]:""})}),e.jsxs(c,{item:!0,xs:12,children:[e.jsx(h,{variant:"h6",children:"Counters"}),s.counter.map((o,r)=>{var l,u,n,d;return e.jsx(T,{style:{padding:"1rem",marginBottom:"1rem"},variant:"outlined",children:e.jsxs(c,{container:!0,alignItems:"center",spacing:1,children:[e.jsx(c,{item:!0,xs:5,children:e.jsx(i,{label:`Count ${r+1}`,value:o==null?void 0:o.count,onChange:g=>j(r,g.target.value,"count","counter"),fullWidth:!0,required:!0,type:"number",error:t.counter&&Array.isArray(t.counter)&&!!((l=t.counter[r])!=null&&l.count),helperText:t.counter&&Array.isArray(t.counter)&&((u=t.counter[r])!=null&&u.count)?t.counter[r].count:""})}),e.jsx(c,{item:!0,xs:5,children:e.jsx(i,{label:`Label ${r+1}`,value:o==null?void 0:o.label,onChange:g=>j(r,g.target.value,"label","counter"),fullWidth:!0,required:!0,error:t.counter&&Array.isArray(t.counter)&&!!((n=t.counter[r])!=null&&n.label),helperText:t.counter&&Array.isArray(t.counter)&&((d=t.counter[r])!=null&&d.label)?t.counter[r].label:""})}),e.jsx(c,{item:!0,xs:1,children:e.jsx(S,{onClick:()=>f(r,"counter"),disabled:s.counter.length===1,children:e.jsx(B,{color:"error"})})})]})},r)}),e.jsx(w,{variant:"contained",color:"primary",startIcon:e.jsx(W,{}),onClick:()=>v("counter"),children:"Add Counter"}),t.counter&&typeof t.counter=="string"&&e.jsx(h,{variant:"body2",color:"error",children:t.counter})]}),e.jsx(c,{item:!0,xs:12,children:e.jsx(w,{type:"submit",variant:"contained",color:"success",size:"large",children:"Update Welcome Section"})})]})}),e.jsx($,{open:b.open,autoHideDuration:6e3,onClose:C,anchorOrigin:{vertical:"bottom",horizontal:"right"},children:e.jsx(z,{onClose:C,severity:b.severity,sx:{width:"100%"},children:b.message})})]})};export{Q as default};