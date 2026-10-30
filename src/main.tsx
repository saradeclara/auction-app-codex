import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

type AuctionCategory = 'Art' | 'Collectibles' | 'Electronics' | 'Fashion' | 'Furniture' | 'Watches';

interface Auction {
  id: string;
  title: string;
  maker: string;
  bid: number;
  bids: number;
  time: string;
  image: string;
  category: AuctionCategory;
  tag?: string;
}

const auctions: Auction[] = [
  { id: 'modern-chair', title: 'Eames Lounge Chair & Ottoman', maker: 'Herman Miller · 2016', bid: 2850, bids: 14, time: '02h 18m', image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=85', category: 'Furniture', tag: 'Featured' },
  { id: 'leica-m3', title: 'Leica M3 Double Stroke', maker: '1955 · Chrome finish', bid: 3200, bids: 8, time: '03h 42m', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85', category: 'Collectibles' },
  { id: 'rolex-datejust', title: 'Rolex Datejust 36', maker: 'Ref. 16234 · 1998', bid: 4750, bids: 21, time: '05h 10m', image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85', category: 'Watches', tag: 'Reserve met' },
  { id: 'vasarely', title: 'Untitled Op Art Screenprint', maker: 'Victor Vasarely · 1973', bid: 890, bids: 6, time: '06h 25m', image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=85', category: 'Art' },
  { id: 'turntable', title: 'Technics SL-1200MK2', maker: 'Direct-drive turntable · 1986', bid: 560, bids: 11, time: '08h 02m', image: 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?auto=format&fit=crop&w=900&q=85', category: 'Electronics' },
  { id: 'hermes-scarf', title: 'Hermès Silk Carré Scarf', maker: '"Les Clefs" · 90 cm', bid: 220, bids: 4, time: '1d 02h', image: 'https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=900&q=85', category: 'Fashion' },
  { id: 'teak-credenza', title: 'Danish Teak Credenza', maker: 'Mid-century · c. 1965', bid: 1240, bids: 9, time: '1d 04h', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85', category: 'Furniture' },
  { id: 'jaguar-print', title: 'Jaguar E-Type Blueprint', maker: 'Archival giclée · numbered', bid: 175, bids: 3, time: '1d 06h', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=85', category: 'Art' },
];

const formatMoney = (value: number) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(value);

function Logo() { return <a className="logo" href="#/">M<span>·</span>A</a>; }
function Header() { return <><div className="announcement">The Autumn Edit is live <span>—</span> discover exceptional objects</div><header><Logo /><nav><a href="#/">Browse auctions</a><a href="#/">How it works</a><a href="#/">Sell with us</a></nav><div className="header-actions"><button className="search-btn" aria-label="Search">⌕</button><button className="heart" aria-label="Saved items">♡<i>2</i></button><button className="sign-in">Sign in</button></div></header></> }

function Card({ item }: { item: Auction }) { return <a href={`#/auction/${item.id}`} className="auction-card"><div className="image-wrap"><img src={item.image} alt={item.title}/>{item.tag && <span className="pill">{item.tag}</span>}<button className="card-heart" onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); e.currentTarget.classList.toggle('active') }}>♡</button></div><div className="card-copy"><div className="card-topline"><span>{item.category}</span><span className="time">● {item.time}</span></div><h3>{item.title}</h3><p>{item.maker}</p><div className="bid-row"><div><small>Current bid</small><strong>{formatMoney(item.bid)}</strong></div><span>{item.bids} bids</span></div></div></a> }

function Home() {
  const [category, setCategory] = useState('All lots');
  const [sort, setSort] = useState('Ending soon');
  const [query, setQuery] = useState('');
  const categories: Array<'All lots' | AuctionCategory> = ['All lots', 'Art', 'Furniture', 'Watches', 'Collectibles', 'Fashion', 'Electronics'];
  const displayed = useMemo(() => auctions.filter(a => (category === 'All lots' || a.category === category) && a.title.toLowerCase().includes(query.toLowerCase())).sort((a,b) => sort === 'Price: high to low' ? b.bid-a.bid : 0), [category, query, sort]);
  return <><Header /><main><section className="hero"><div className="hero-text"><p className="eyebrow">Curated auctions, weekly</p><h1>Objects worth<br/><em>competing</em> for.</h1><p className="intro">A considered marketplace for the rare, the beautiful, and the genuinely useful.</p><a className="dark-btn" href="#lots">Explore lots <span>↗</span></a></div><div className="hero-photo"><img src="https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1600&q=90" alt="Sculptural vase on a table"/><div className="hero-stamp"><b>04</b><span>days left in<br/>the autumn edit</span></div></div></section><section className="filters" id="lots"><div className="tabs">{categories.map(c => <button key={c} className={category === c ? 'selected':''} onClick={() => setCategory(c)}>{c}</button>)}</div><div className="filter-actions"><label className="mini-search"><span>⌕</span><input value={query} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setQuery(e.target.value)} placeholder="Search lots"/></label><select value={sort} onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>setSort(e.target.value)}><option>Ending soon</option><option>Price: high to low</option></select></div></section><section className="listing-head"><div><p className="eyebrow">Live now</p><h2>Lots closing soon</h2></div><span>{displayed.length} lots</span></section><section className="grid">{displayed.map(item => <Card key={item.id} item={item}/>)}</section></main><footer><Logo/><p>Exceptional objects, thoughtfully sourced.</p><span>© 2026 Meridian Auctions</span></footer></>;
}

function AuctionPage({ item }: { item: Auction }) {
  const [amount, setAmount] = useState(item.bid + 50);
  const [placed, setPlaced] = useState(false);
  return <><Header/><main className="detail"><div className="breadcrumb"><a href="#/">All auctions</a><span>/</span><a href="#/">{item.category}</a><span>/</span><b>{item.title}</b></div><div className="detail-grid"><section className="product"><div className="detail-image"><img src={item.image} alt={item.title}/><button className="card-heart">♡</button></div><div className="thumbs"><button className="active-thumb"><img src={item.image} alt=""/></button><button className="empty-thumb">+</button></div></section><aside className="bid-panel"><p className="eyebrow">Lot 0248 · {item.category}</p><h1>{item.title}</h1><p className="maker">{item.maker}</p><div className="divider"/><div className="auction-meta"><div><small>Current bid</small><strong>{formatMoney(placed ? amount : item.bid)}</strong><span>{item.bids + (placed ? 1 : 0)} bids</span></div><div className="ends"><small>Ends in</small><strong>{item.time}</strong><span>Today, 18:42 BST</span></div></div><div className="bid-box"><label>Your maximum bid</label><div><span>£</span><input type="number" value={amount} min={item.bid + 50} step="50" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setAmount(Number(e.target.value))}/></div><small>Minimum next bid: {formatMoney(item.bid + 50)}</small><button className="place-bid" onClick={()=>setPlaced(true)}>{placed ? 'Bid placed ✓' : 'Place bid'}</button></div><p className="note">By placing a bid, you agree to our buyer’s premium and terms of sale.</p></aside></div><section className="description"><div><p className="eyebrow">The details</p><h2>A classic, with a story.</h2></div><div><p>Carefully inspected and selected by our specialists, this piece shows the character and considered design that makes it genuinely collectible.</p><p>Condition is commensurate with age. Please review the images and request a condition report before bidding.</p><dl><div><dt>Condition</dt><dd>Excellent</dd></div><div><dt>Location</dt><dd>London, UK</dd></div><div><dt>Authenticity</dt><dd>Verified by Meridian</dd></div></dl></div></section></main></>;
}

function App() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const syncRoute = () => setHash(window.location.hash);
    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);

  const id = hash.match(/^#\/auction\/(.+)$/)?.[1];
  const item = auctions.find((auction) => auction.id === id);
  return item ? <AuctionPage item={item}/> : <Home/>;
}
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element is missing.');
createRoot(rootElement).render(<App/>);
