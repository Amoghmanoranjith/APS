import React from "react";
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import bc4 from "/assets/bc4.svg"; // Update with actual image path

export default function BusinessCase4() {
    return (
        <div className="prose lg:prose-xl max-w-4xl mx-auto px-4 py-8 dark:prose-invert">
            <h1 className="mb-4 font-extrabold text-4xl">
                Real-Time Viewer Analytics using Fenwick Trees
            </h1>

            <br />
            <br />
            <div className="w-full max-w-3xl mx-auto mb-8">
                            <img
                                src={bc4}
                                alt="Fenwick tree"
                                className="w-full h-auto"
                                style={{ maxHeight: "400px", objectFit: "contain" }}
                            />
                        </div>
            <br />
            <br />
            

            <section className="mb-8">
                <h2 className="mb-2 font-extrabold text-2xl">Motivation</h2>
                <p>
                    Video creators want insights into when their audience is most active. Identifying viewer engagement peaks during different times of day can drive strategic decisions such as content scheduling and monetization.
                </p>
                <p>
                    However, traditional full-batch analytics introduce delay and resource overhead. Instead, we use <strong>Fenwick Trees</strong> (Binary Indexed Trees) to track viewer activity in real-time with efficient updates and range queries.
                </p>
            </section>

            <hr className="my-8 border-gray-300 dark:border-gray-600" />

            <section className="mb-8">
                <h2 className="mb-2 font-extrabold text-2xl">Problem Statement</h2>
                <p>
                    Given real-time viewer engagement logs, allow the creator to:
                </p>
                <ul className="list-disc list-inside">
                    <li>Query the total number of views in any time window, e.g., 8:00–10:00 AM.</li>
                    <li>Dynamically update engagement data as new views arrive.</li>
                    <li>Maintain sublinear space and query/update time.</li>
                </ul>
            </section>

            <hr className="my-8 border-gray-300 dark:border-gray-600" />

            <section className="mb-8">
                <h2 className="mb-2 font-extrabold text-2xl">System Design</h2>
                <ul className="list-disc list-inside">
                    <li><strong>Kafka</strong> ingests real-time viewer logs (timestamped video views).</li>
                    <li><strong>Flink</strong> processes incoming view events and classifies them into discrete 5-minute intervals.</li>
                    <li>A <strong>Fenwick Tree</strong> array is maintained where each index corresponds to a fixed time bucket.</li>
                    <li><strong>Redis</strong> stores the current Fenwick Tree snapshot to support persistent, low-latency query APIs.</li>
                    <li><strong>Frontend Dashboard</strong> triggers range sum queries and displays peak hours using the tree.</li>
                </ul>
            </section>

            <hr className="my-8 border-gray-300 dark:border-gray-600" />

            <section className="mb-8">
                <h2 className="mb-2 font-extrabold text-2xl">Algorithm: Fenwick Tree (Binary Indexed Tree)</h2>
                <p>
                    A Fenwick Tree supports prefix sum queries and point updates in logarithmic time.
                </p>

                <p><strong>Key Operations:</strong></p>
                <ul className="list-disc list-inside">
                    <li><InlineMath math="update(i, x)" />: add <InlineMath math="x" /> views to time index <InlineMath math="i" /></li>
                    <li><InlineMath math="query(i)" />: return total views from index 1 to <InlineMath math="i" /></li>
                    <li><InlineMath math="range(l, r) = query(r) - query(l-1)" /></li>
                </ul>

                <p><strong>Pseudocode:</strong></p>
                <pre className="p-4 rounded overflow-x-auto" style={{ backgroundColor: "#000", color: "#fff" }}>
{`Initialize: tree[1..n] ← 0

Function update(i, delta):
    while i <= n:
        tree[i] ← tree[i] + delta
        i ← i + (i & -i)

Function query(i):
    result ← 0
    while i > 0:
        result ← result + tree[i]
        i ← i - (i & -i)
    return result

Function range(l, r):
    return query(r) - query(l - 1)
`}
                </pre>
            </section>

            <hr className="my-8 border-gray-300 dark:border-gray-600" />

            <section className="mb-8">
                <h2 className="mb-2 font-extrabold text-2xl">Efficiency Analysis</h2>
                <ul className="list-disc list-inside">
                    <li><strong>Time complexity:</strong> <InlineMath math="O(\log n)" /> per update and query.</li>
                    <li><strong>Space efficiency:</strong> Uses <InlineMath math="O(n)" /> space for <InlineMath math="n" /> time buckets.</li>
                    <li><strong>Streaming-friendly:</strong> Easy to integrate with real-time Flink streams.</li>
                    <li><strong>Scalability:</strong> Can be sharded per creator or video ID for horizontal scaling.</li>
                    <li><strong>Accuracy:</strong> Exact counts (unlike probabilistic sketches), which are critical for billing or monetization insights.</li>
                </ul>
            </section>
        </div>
    );
}
