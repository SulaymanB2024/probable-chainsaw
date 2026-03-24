'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';

interface TickerData {
  price: string;
  volume_24h: string;
  low_24h: string;
  high_24h: string;
}

interface Order {
  price: number;
  size: number;
  total: number;
}

export default function LiveMarkets() {
  const [ticker, setTicker] = useState<TickerData | null>(null);
  const [bids, setBids] = useState<Order[]>([]);
  const [asks, setAsks] = useState<Order[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Connect to Coinbase Pro public WebSocket
    const ws = new WebSocket('wss://ws-feed.exchange.coinbase.com');
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      ws.send(JSON.stringify({
        type: 'subscribe',
        product_ids: ['BTC-USD'],
        channels: ['ticker', 'level2_batch']
      }));
    };

    let localBids: Record<string, number> = {};
    let localAsks: Record<string, number> = {};

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'ticker') {
        setTicker({
          price: parseFloat(data.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
          volume_24h: parseFloat(data.volume_24h).toLocaleString('en-US', { maximumFractionDigits: 0 }),
          low_24h: parseFloat(data.low_24h).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
          high_24h: parseFloat(data.high_24h).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        });
      }

      if (data.type === 'snapshot') {
        data.bids.forEach(([price, size]: [string, string]) => {
          localBids[price] = parseFloat(size);
        });
        data.asks.forEach(([price, size]: [string, string]) => {
          localAsks[price] = parseFloat(size);
        });
        updateOrderBook(localBids, localAsks);
      }

      if (data.type === 'l2update') {
        data.changes.forEach(([side, price, size]: [string, string, string]) => {
          const numSize = parseFloat(size);
          if (side === 'buy') {
            if (numSize === 0) delete localBids[price];
            else localBids[price] = numSize;
          } else {
            if (numSize === 0) delete localAsks[price];
            else localAsks[price] = numSize;
          }
        });
        updateOrderBook(localBids, localAsks);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
          type: 'unsubscribe',
          product_ids: ['BTC-USD'],
          channels: ['ticker', 'level2_batch']
        }));
      }
      ws.close();
    };
  }, []);

  const updateOrderBook = (bidsMap: Record<string, number>, asksMap: Record<string, number>) => {
    // Sort and take top 10
    const sortedBids = Object.entries(bidsMap)
      .map(([price, size]) => ({ price: parseFloat(price), size }))
      .sort((a, b) => b.price - a.price)
      .slice(0, 10);

    const sortedAsks = Object.entries(asksMap)
      .map(([price, size]) => ({ price: parseFloat(price), size }))
      .sort((a, b) => a.price - b.price)
      .slice(0, 10)
      .reverse(); // Reverse asks so lowest is at the bottom (closest to spread)

    // Calculate cumulative totals
    let bidTotal = 0;
    const finalBids = sortedBids.map(b => {
      bidTotal += b.size;
      return { ...b, total: bidTotal };
    });

    let askTotal = 0;
    // For asks, we want the total to accumulate from the lowest price (bottom of the list) upwards
    // Since we reversed it, the lowest price is at index 9.
    const finalAsks = [...sortedAsks].reverse().map(a => {
      askTotal += a.size;
      return { ...a, total: askTotal };
    }).reverse();

    setBids(finalBids);
    setAsks(finalAsks);
  };

  return (
    <div className="w-full font-mono text-xs md:text-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-black/10 dark:border-white/10 pb-4 gap-4">
        <div>
          <h3 className="text-xl md:text-2xl font-sans tracking-tight mb-1">BTC-USD</h3>
          <div className="flex items-center gap-2 text-black/50 dark:text-white/50">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span>{isConnected ? 'LIVE' : 'CONNECTING...'}</span>
          </div>
        </div>
        {ticker && (
          <div className="text-left md:text-right">
            <div className="text-2xl md:text-4xl font-light tracking-tighter">${ticker.price}</div>
            <div className="text-black/50 dark:text-white/50 mt-1">VOL: {ticker.volume_24h} BTC</div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        {/* Order Book */}
        <div className="bg-black/5 dark:bg-white/5 p-4 rounded-sm overflow-x-auto">
          <div className="min-w-[300px]">
            <div className="grid grid-cols-3 text-black/40 dark:text-white/40 mb-4 pb-2 border-b border-black/10 dark:border-white/10">
              <div>PRICE (USD)</div>
              <div className="text-right">SIZE (BTC)</div>
              <div className="text-right">TOTAL</div>
            </div>
            
            <div className="flex flex-col gap-1 mb-4">
              {asks.map((ask, i) => (
                <div key={`ask-${ask.price}-${i}`} className="grid grid-cols-3 text-black/50 dark:text-white/50 relative group py-0.5 tabular-nums">
                  <div className="absolute right-0 top-0 bottom-0 bg-black/5 dark:bg-white/5 -z-10 transition-all duration-300" style={{ width: `${Math.min(100, (ask.total / 10) * 100)}%` }} />
                  <div>{ask.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <div className="text-right">{ask.size.toFixed(4)}</div>
                  <div className="text-right">{ask.total.toFixed(4)}</div>
                </div>
              ))}
            </div>

            <div className="text-center py-3 text-black/40 dark:text-white/40 border-y border-black/10 dark:border-white/10 mb-4 font-mono text-[10px] tracking-[0.2em] flex justify-between items-center">
              <span>[ SPREAD ]</span>
              <span className="tabular-nums">${asks.length > 0 && bids.length > 0 ? (asks[9].price - bids[0].price).toFixed(2) : '0.00'}</span>
            </div>

            <div className="flex flex-col gap-1">
              {bids.map((bid, i) => (
                <div key={`bid-${bid.price}-${i}`} className="grid grid-cols-3 text-black dark:text-white relative group py-0.5 tabular-nums">
                  <div className="absolute right-0 top-0 bottom-0 bg-black/10 dark:bg-white/10 -z-10 transition-all duration-300" style={{ width: `${Math.min(100, (bid.total / 10) * 100)}%` }} />
                  <div>{bid.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <div className="text-right">{bid.size.toFixed(4)}</div>
                  <div className="text-right">{bid.total.toFixed(4)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Stats */}
        <div className="flex flex-col justify-between">
          <div>
            <h4 className="text-black/40 dark:text-white/40 mb-4 uppercase tracking-widest">24H Statistics</h4>
            {ticker ? (
              <div className="space-y-4">
                <div className="flex justify-between border-b border-black/10 dark:border-white/10 pb-2">
                  <span>High</span>
                  <span>${ticker.high_24h}</span>
                </div>
                <div className="flex justify-between border-b border-black/10 dark:border-white/10 pb-2">
                  <span>Low</span>
                  <span>${ticker.low_24h}</span>
                </div>
                <div className="flex justify-between border-b border-black/10 dark:border-white/10 pb-2">
                  <span>Volume</span>
                  <span>{ticker.volume_24h} BTC</span>
                </div>
              </div>
            ) : (
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-black/10 dark:bg-white/10 rounded w-full" />
                <div className="h-6 bg-black/10 dark:bg-white/10 rounded w-full" />
                <div className="h-6 bg-black/10 dark:bg-white/10 rounded w-full" />
              </div>
            )}
          </div>
          
          <div className="mt-8 p-4 border border-black/10 dark:border-white/10 rounded-sm">
            <p className="text-black/50 dark:text-white/50 leading-relaxed">
              This data is streamed in real-time via WebSocket from the Coinbase Pro API. 
              The order book maintains a live L2 state, calculating cumulative depth on the fly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
