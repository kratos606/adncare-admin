import{_ as g,r as l,b as x,e as y,j as t,a as p,B as u}from"./index-CdkbwK6B.js";import{g as C,a as f,s as S,c as j,e as b,B as v,T as n}from"./Box-DAti2-1c.js";import{B}from"./Badge-cVd510n2.js";import{G as h}from"./Grid-DnHPB7Lp.js";import{C as A,a as U}from"./CardContent-BifUW2wJ.js";import{B as k}from"./Button-DNkXxOpl.js";function w(e){return f("MuiCardActions",e)}C("MuiCardActions",["root","spacing"]);const E=["disableSpacing","className"],R=e=>{const{classes:r,disableSpacing:a}=e;return b({root:["root",!a&&"spacing"]},w,r)},M=S("div",{name:"MuiCardActions",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:a}=e;return[r.root,!a.disableSpacing&&r.spacing]}})(({ownerState:e})=>g({display:"flex",alignItems:"center",padding:8},!e.disableSpacing&&{"& > :not(style) ~ :not(style)":{marginLeft:8}})),_=l.forwardRef(function(r,a){const o=x({props:r,name:"MuiCardActions"}),{disableSpacing:c=!1,className:i}=o,d=y(o,E),s=g({},o,{disableSpacing:c}),m=R(s);return t.jsx(M,g({className:j(m.root,i),ownerState:s,ref:a},d))}),D=()=>{const[e,r]=l.useState([]),[a,o]=l.useState(0),c=async()=>{try{const s=await p.get(`${u}/contact-submissions`);r(s.data)}catch(s){console.error("Error fetching submissions:",s)}},i=async()=>{try{const s=await p.get(`${u}/contact-submissions/unread-count`);o(s.data.unread_count)}catch(s){console.error("Error fetching unread count:",s)}},d=async s=>{try{await p.patch(`${u}/contact-submissions/${s}/mark-seen`),c(),i()}catch(m){console.error("Error marking as seen:",m)}};return l.useEffect(()=>{c(),i()},[]),t.jsxs(v,{children:[t.jsx(n,{variant:"h4",component:"h1",gutterBottom:!0,children:"Contact Submissions"}),t.jsx(B,{badgeContent:a,color:"primary",style:{marginBottom:"1rem"},children:t.jsx(n,{variant:"subtitle1",children:"Unread Submissions"})}),t.jsx(h,{container:!0,spacing:3,children:e.map(s=>t.jsx(h,{item:!0,xs:12,sm:6,md:4,children:t.jsxs(A,{variant:"outlined",children:[t.jsxs(U,{children:[t.jsx(n,{variant:"h6",component:"div",children:s.name}),t.jsxs(n,{color:"textSecondary",gutterBottom:!0,children:[s.email," | ",s.phone]}),t.jsx(n,{variant:"body2",color:"textSecondary",style:{marginTop:"1rem"},children:s.message}),t.jsx(n,{variant:"caption",color:"primary",style:{marginTop:"1rem",display:"block"},children:s.seen?"Seen":"Unread"})]}),t.jsx(_,{children:!s.seen&&t.jsx(k,{variant:"contained",color:"primary",onClick:()=>d(s.id),children:"Mark as Seen"})})]})},s.id))})]})};export{D as default};