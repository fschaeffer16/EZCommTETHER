const menu=document.querySelector('.menu-btn');
const nav=document.querySelector('.mainnav');
if(menu&&nav){menu.addEventListener('click',()=>nav.classList.toggle('open'));}
document.querySelectorAll('.mainnav a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));

const demoButtons=[...document.querySelectorAll('[data-demo]')];
const demoImage=document.querySelector('#demoImage');
const demoTitle=document.querySelector('#demoTitle');
const demoText=document.querySelector('#demoText');
const demoData={
 home:['walk-home.jpg','Home board','Large visual tiles and quick phrases keep everyday communication close.'],
 hurt:['walk-hurt.jpg','Hurt','Tap the body area that hurts, then continue through follow-up prompts.'],
 school:['walk-school.jpg','School & people','Use familiar people and recognizable visual cues.'],
 sentence:['walk-sentence.jpg','Sentence Build','Traditional sentence building remains available when it is useful.'],
 family:['walk-family.jpg','Family','Customize the system around real people and relationships.'],
 sos:['walk-sos.jpg','SOS Family Alert','A narrated demonstration of the family-alert flow. It is not a monitored emergency service.']
};
demoButtons.forEach(b=>b.addEventListener('click',()=>{const d=demoData[b.dataset.demo];if(!d)return;demoButtons.forEach(x=>x.classList.remove('active'));b.classList.add('active');if(demoImage)demoImage.src=d[0];if(demoTitle)demoTitle.textContent=d[1];if(demoText)demoText.textContent=d[2];}));

// Registration and professional inquiry forms post to our server (same store as Family Sync).
(function(){
  var BASE='/app';
  function wire(sel,path,build){
    document.querySelectorAll(sel).forEach(function(f){
      var status=f.querySelector('[data-status]');
      f.addEventListener('submit',function(e){
        e.preventDefault();
        var data={};[].slice.call(f.elements).forEach(function(el){if(el.name)data[el.name]=el.value;});
        var body=build(data);
        if(status)status.textContent='Sending…';
        var btn=f.querySelector('button[type=submit]');if(btn)btn.disabled=true;
        fetch(BASE+path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
          .then(function(r){return r.json();})
          .then(function(j){
            if(j&&j.ok){if(status)status.textContent=j.already?'You are already on the list. Thank you.':'Received. Thank you.';f.reset();}
            else{if(status)status.textContent=(j&&j.error==='bad_email')?'That email address does not look right.':'Something went wrong on our side. Please try again later.';if(btn)btn.disabled=false;}
          })
          .catch(function(){if(status)status.textContent='Could not reach our server. Please check your connection and try again.';if(btn)btn.disabled=false;});
      });
    });
  }
  wire('[data-signup-form]','/api/waitlist',function(d){return{name:d.name,email:d.email,how:'email',about:[d.role,d.organization].filter(Boolean).join(', '),source:d.source||'community-registration'};});
  wire('[data-prof-form]','/api/professional-inquiry',function(d){return{name:d.name,email:d.email,role:d.role,organization:d.organization,message:(d.interest?'Interest: '+d.interest+'\n':'')+(d.message||''),source:'professionals'};});
})();
