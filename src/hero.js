function FlowHeadline(){
 const {reduced}=Re();
 return o.jsxs("span",{className:"flow-headline"+(reduced?" still":""),children:[
 o.jsx("span",{children:"Start"}),
 o.jsxs("span",{className:"flow-film","aria-hidden":"true",children:[o.jsx("span",{className:"flow-film-color"}),o.jsx("img",{src:"/assets/poster.png",alt:"",className:"flow-film-image"})]}),
 o.jsx("span",{children:"talking."})]});
}
