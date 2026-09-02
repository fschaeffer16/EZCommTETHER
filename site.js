(function(){
  const menu=document.querySelector('.menu-btn'), nav=document.querySelector('.mainnav');
  if(menu&&nav) menu.addEventListener('click',()=>nav.classList.toggle('open'));
  const rail=document.querySelector('.rail'), railBtn=document.querySelector('.mobile-rail-trigger');
  if(rail&&railBtn) railBtn.addEventListener('click',()=>rail.classList.toggle('open'));
  document.querySelectorAll('.rail a,.mainnav a').forEach(a=>a.addEventListener('click',()=>{nav&&nav.classList.remove('open'); if(innerWidth<901) rail&&rail.classList.remove('open')}));

  const signup=document.querySelector('[data-signup-form]');
  if(signup){
    signup.addEventListener('submit',async e=>{
      e.preventDefault();
      const s=signup.querySelector('[data-status]');
      const data=Object.fromEntries(new FormData(signup).entries());
      const email=(data.email||'').trim();
      if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){if(s)s.textContent='Please enter a valid email.';return}
      if(s)s.textContent='Saving…';
      try{
        const r=await fetch('/api/waitlist',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
          name:data.name||'',email,how:'email',source:data.source||'site-registration',about:`role=${data.role||''}; organization=${data.organization||''}`
        })});
        const j=await r.json();
        if(s)s.textContent=j&&j.ok?'You’re registered. We’ll keep you posted.':'Please try again.';
      }catch(_){if(s)s.textContent='Could not connect. Please try again.'}
    });
  }

  const prof=document.querySelector('[data-prof-form]');
  if(prof){
    prof.addEventListener('submit',async e=>{
      e.preventDefault();
      const s=prof.querySelector('[data-status]');
      const data=Object.fromEntries(new FormData(prof).entries());
      if(s)s.textContent='Sending…';
      try{
        const r=await fetch('/api/professional-inquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
        const j=await r.json();
        if(s)s.textContent=j&&j.ok?'Thank you. We received your inquiry.':'Please try again.';
      }catch(_){if(s)s.textContent='Could not connect. Please try again.'}
    });
  }

  const demoRoot=document.querySelector('[data-demo]');
  if(demoRoot){
    const steps=[
      {img:'walk-home.jpg',title:'Start with the things they say all day',text:'Quick phrases and the home board keep familiar communication close. The pictures are the buttons.'},
      {img:'walk-hurt.jpg',title:'Hurt turns the body into a communication surface',text:'A user can point to the body part that hurts, then move into follow-up questions instead of needing the right word first.'},
      {img:'walk-school.jpg',title:'School can use the people they actually know',text:'Teachers, staff and other familiar people can become recognizable visual cues instead of generic categories.'},
      {img:'walk-sentence.jpg',title:'Phrase-first does not mean phrase-only',text:'Sentence Build and the ABC speller keep the traditional AAC path available when the user wants or needs it.'},
      {img:'walk-family.jpg',title:'Their people. Their language.',text:'Family and friends can be represented with photos, avatars or other visual cues that make sense to the user.'},
      {img:'walk-settings.jpg',title:'The system conforms to the child',text:'Caregivers can customize phrases and visuals around the way their family actually communicates.'},
      {img:'walk-sos.jpg',title:'SOS Family Alert — demonstrated safely',text:'The public demo shows the flow but never sends an alert. EZvoxa does not call 911 and is not a monitored emergency service.'}
    ];
    let i=0;
    const img=demoRoot.querySelector('[data-demo-img]'), title=demoRoot.querySelector('[data-demo-title]'), text=demoRoot.querySelector('[data-demo-text]');
    const buttons=[...demoRoot.querySelectorAll('[data-step]')];
    function render(n){
      i=Math.max(0,Math.min(steps.length-1,n)); const d=steps[i];
      img.src=d.img; title.textContent=d.title; text.textContent=d.text;
      buttons.forEach((b,idx)=>b.classList.toggle('active',idx===i));
    }
    buttons.forEach((b,idx)=>b.addEventListener('click',()=>render(idx)));
    demoRoot.querySelector('[data-next]')?.addEventListener('click',()=>render(i+1));
    demoRoot.querySelector('[data-back]')?.addEventListener('click',()=>render(i-1));
    render(0);
    demoRoot.querySelectorAll('[data-sandbox]').forEach(b=>b.addEventListener('click',()=>{
      const idx=Number(b.dataset.sandbox);
      render(idx);
      demoRoot.scrollIntoView({behavior:'smooth',block:'start'});
    }));
  }
})();