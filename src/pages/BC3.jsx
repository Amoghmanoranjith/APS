import React from "react";
import bc3 from "/assets/bc3.excalidraw.svg"; // Update with actual image path
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function BusinessCase3() {
    return (
        <div className="prose lg:prose-xl max-w-4xl mx-auto px-4 py-8 dark:prose-invert">
            <h1 className="mb-4 font-extrabold text-4xl">
                Median Age Estimation using Munro-Paterson Algorithm
            </h1>
            <br />
            <div className="w-full max-w-3xl mx-auto mb-8">
                <img
                    src={bc3}
                    alt="Munro-Paterson Median Algorithm Diagram"
                    className="w-full h-auto"
                    style={{ maxHeight: "400px", objectFit: "contain" }}
                />
            </div>

            <section className="mb-8">
                <h2 className="mb-2 font-extrabold text-2xl">Motivation</h2>
                <p>
                    Understanding the <strong>median age</strong> of viewers allows creators to tailor content more effectively. Unlike total views or average age, the median provides a robust measure that is less sensitive to outliers.
                </p>
                <p>
                    Real-time calculation is not necessary. A batch-processing architecture with 30–45s latency is acceptable, enabling a memory-efficient design using the <strong>Munro-Paterson algorithm</strong> for streaming median computation.
                </p>
            </section>

            <hr className="my-8 border-gray-300 dark:border-gray-600" />

            <section className="mb-8">
                <h2 className="mb-2 font-extrabold text-2xl">System Design</h2>
                <ul className="list-disc list-inside">
                    <li>Views arrive tagged with <InlineMath math="(video\_id, age)" /> in real-time.</li>
                    <li>Each batch is sent every 30 seconds to an analytics engine.</li>
                    <li>The engine computes the median using the Munro-Paterson algorithm on the age stream.</li>
                    <li>The computed median is written to a key-value store (e.g., Redis or PostgreSQL) indexed by <InlineMath math="video\_id" />.</li>
                    <li>Results are displayed in the creator dashboard with slight delay.</li>
                </ul>
            </section>

            <hr className="my-8 border-gray-300 dark:border-gray-600" />

            <section className="mb-8">
                <h2 className="mb-2 font-extrabold text-2xl">Algorithm: Munro-Paterson Median</h2>
                <p>
                    The Munro-Paterson algorithm is designed for finding order statistics (like the median) using <strong>limited memory</strong> and multiple passes over data. In practice, we maintain two heaps for online estimation:
                </p>
                <ul className="list-disc list-inside">
                    <li>Max-heap for the lower half of ages.</li>
                    <li>Min-heap for the upper half of ages.</li>
                </ul>
                <br/>
                <pre className="p-4 rounded overflow-x-auto" style={{ backgroundColor: "#000", color: "#fff" }}>
{`Algorithm : Online Median using Two Heaps

Initialize:
    maxHeap ← empty   // stores lower half
    minHeap ← empty   // stores upper half

Process(age):
    if maxHeap is empty or age ≤ maxHeap.top:
        maxHeap.insert(age)
    else:
        minHeap.insert(age)

    // Balance
    if |maxHeap| > |minHeap| + 1:
        move top of maxHeap to minHeap
    else if |minHeap| > |maxHeap|:
        move top of minHeap to maxHeap

Output:
    if sizes equal:
        median ← (maxHeap.top + minHeap.top) / 2
    else:
        median ← maxHeap.top`}
                </pre>

            </section>

            <hr className="my-8 border-gray-300 dark:border-gray-600" />

            <section className="mb-8">
                <h2 className="mb-2 font-extrabold text-2xl">Efficiency Analysis</h2>
                <ul className="list-disc list-inside">
                <li>
                    This allows streaming computation in <InlineMath math="O(\log n)" /> per insertion and <InlineMath math="O(1)" /> median retrieval.
                </li>
                    <li><strong>Memory-efficient:</strong> No need to store full age list, just heaps.</li>
                    <li><strong>Latency-tolerant:</strong> Suitable for batching every 30–45 seconds.</li>
                    <li><strong>Robust:</strong> Median age is more resistant to extreme values than the mean.</li>
                    <li><strong>Interpretable:</strong> Median values directly map to user-facing age groups (e.g., 18–24).</li>
                    <li><strong>Low-latency insights:</strong> Creator dashboards refresh every minute.</li>
                </ul>
            </section>
        </div>
    );
}
