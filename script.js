// RavenArc — site interactions
(function () {
  // Sticky nav + mobile menu
  const nav = document.getElementById('nav');
  const menuBtn = document.getElementById('menuBtn');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.textContent = open ? 'CLOSE' : 'MENU';
    menuBtn.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('#mobileMenu a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    menuBtn.textContent = 'MENU';
    menuBtn.setAttribute('aria-expanded', 'false');
  }));

  // Perspectives — edit this list to publish new articles.
  // Put images in /images and set "image" to the file name.
  // Add url: 'articles/name.html' once an article page exists; without it the card is not a link.
  const ARTICLES = [
    { topic: 'Strategy', type: 'Essay', title: 'The cost of the decision you haven\u2019t made', dek: 'Postponed choices are the largest unmeasured line item on most balance sheets.', url: 'perspectives/cost-of-the-decision-you-havent-made.html', image: 'article-1.jpg' },
    { topic: 'AI & Operating Model', type: 'Briefing', title: 'AI is an operating-model question first', dek: 'Why the winners are redesigning decision rights before they deploy models.', url: 'perspectives/ai-is-an-operating-model-question-first.html', image: 'article-2.jpg' },
    { topic: 'Boardroom', type: 'Guide', title: 'Five questions before approving a transformation', dek: 'A short diagnostic for directors facing a multi-year change programme.', url: 'perspectives/five-questions-before-approving-a-transformation.html', image: 'article-3.jpg' },
    { topic: 'Growth', type: 'Research', title: 'Where mid-market growth will come from next', dek: 'Adjacencies, pricing power and the quiet advantage of focus.', image: 'article-4.jpg' },
    { topic: 'Strategy', type: 'Essay', title: 'Scenario planning that leaders actually use', dek: 'Fewer scenarios, sharper signposts, and pre-agreed triggers for action.', image: 'article-5.jpg' },
    { topic: 'AI & Operating Model', type: 'Case note', title: 'From pilots to profit in eighteen months', dek: 'What separates the few AI programmes that reach the P&L.', image: 'article-6.jpg' }
  ];
  const TOPICS = ['All', 'Strategy', 'AI & Operating Model', 'Growth', 'Boardroom'];
  const filtersEl = document.getElementById('filters');
  const articlesEl = document.getElementById('articles');
  let topic = 'All';

  function renderArticles() {
    const list = topic === 'All' ? ARTICLES.slice(0, 3) : ARTICLES.filter(a => a.topic === topic);
    articlesEl.innerHTML = list.map((a, i) => `
      <${a.url ? `a href="${a.url}"` : 'div'} class="article" style="animation-delay:${i * 80}ms">
        <div class="media" style="background-image:url('images/${a.image}')"></div>
        <div class="article-meta"><span>${a.topic.toUpperCase()}</span><span>${a.type.toUpperCase()}</span></div>
        <div class="article-title">${a.title}</div>
        <div class="article-dek">${a.dek}</div>
      </${a.url ? 'a' : 'div'}>`).join('');
    filtersEl.querySelectorAll('.filter').forEach(b => b.classList.toggle('active', b.dataset.topic === topic));
  }
  filtersEl.innerHTML = TOPICS.map(t => `<button class="filter" role="tab" data-topic="${t}">${t}</button>`).join('');
  filtersEl.addEventListener('click', e => {
    const b = e.target.closest('.filter');
    if (!b) return;
    topic = b.dataset.topic;
    renderArticles();
  });
  renderArticles();

  // Capabilities
  const CAPS = [
    { name: 'Corporate strategy', question: 'Where should we compete, and where should we deliberately not?', desc: 'We help leadership teams make portfolio and positioning choices with clear logic, clear trade-offs, and conviction they can defend to the board.', work: ['Portfolio strategy', 'Long-range planning', 'Scenario design', 'Board advisory'] },
    { name: 'Growth & markets', question: 'Where is the next profitable pool of growth, and how fast can we reach it?', desc: 'We size markets from first principles, test demand with real customers, and build the case for the moves worth making.', work: ['Market entry', 'Pricing', 'Commercial excellence', 'Adjacencies'] },
    { name: 'Marketing analytics', question: 'Which marketing spend is actually driving growth, and where should the next dollar go?', desc: 'We measure what marketing really contributes, from customer value to channel returns, and turn the answer into budget and pricing decisions leaders can defend.', work: ['Marketing mix modelling', 'Customer lifetime value', 'Pricing and promotion analytics', 'Budget allocation'] },
    { name: 'AI & operating model', question: 'How must the organisation change for AI to create value, not just activity?', desc: 'We redesign decision rights, workflows and talent so that technology investment reaches the P&L instead of stalling in pilots.', work: ['AI strategy', 'Operating model design', 'Decision rights', 'Capability building'] },
    { name: 'Transformation', question: 'How do we change the business without losing it along the way?', desc: 'We turn ambition into a sequenced plan with measurable milestones, and we stay close enough to make sure it lands.', work: ['Performance improvement', 'Cost transformation', 'Programme leadership'] },
    { name: 'Supply chain', question: 'Is our supply chain built for the cost, risk and service levels the strategy now demands?', desc: 'We model the network end to end, from sourcing and footprint to inventory and logistics, and make the trade-offs between cost, resilience and service explicit.', work: ['Network and footprint design', 'Sourcing strategy', 'Inventory optimisation', 'Supply chain resilience'] },
    { name: 'M&A & investment', question: 'Is this the right deal at the right price, and can we make it work?', desc: 'Our commercial diligence and integration work is grounded in the same analytics that support every recommendation we make.', work: ['Commercial due diligence', 'Value creation plans', 'Post-merger integration'] }
  ];
  const capList = document.getElementById('capList');
  const capPanel = document.getElementById('capPanel');
  capList.innerHTML = CAPS.map((c, i) => `
    <button class="cap-btn" role="tab" data-i="${i}">
      <span class="cap-num">${String(i + 1).padStart(2, '0')}</span>
      <span class="cap-name">${c.name}</span>
      <span class="cap-arrow">→</span>
    </button>`).join('');
  function setCap(i) {
    const c = CAPS[i];
    capList.querySelectorAll('.cap-btn').forEach((b, j) => {
      b.classList.toggle('active', j === i);
      b.setAttribute('aria-selected', j === i);
    });
    document.getElementById('capQuestion').textContent = c.question;
    document.getElementById('capDesc').textContent = c.desc;
    document.getElementById('capWork').innerHTML = c.work.map(w => `<span>${w}</span>`).join('');
    capPanel.classList.remove('fade'); void capPanel.offsetWidth; capPanel.classList.add('fade');
  }
  capList.addEventListener('click', e => {
    const b = e.target.closest('.cap-btn');
    if (b) setCap(+b.dataset.i);
  });
  setCap(0);

  // Scroll reveal
  const targets = document.querySelectorAll('main > section:not(.hero) h2, .prose, .case, .person, .arc-layer, .values > div, .cap-panel');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { threshold: 0.12 });
    targets.forEach(t => { t.classList.add('reveal'); io.observe(t); });
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();
