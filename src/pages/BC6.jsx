import React from "react";
import bc3 from "/assets/bc6.excalidraw.svg"; // Update path accordingly
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function BusinessCase6() {
    return (
        <div className="prose lg:prose-xl max-w-4xl mx-auto px-4 py-8 dark:prose-invert">
            <h1 className="mb-4 font-extrabold text-4xl">
                View Density Analysis using Sweep Line Algorithm
            </h1>
            <br />
            <div className="w-full max-w-3xl mx-auto mb-8">
                <img
                    src={bc3}
                    alt="Sweep Line Algorithm Diagram"
                    className="w-full h-auto"
                    style={{ maxHeight: "400px", objectFit: "contain" }}
                />
            </div>

            <section className="mb-8">
                <h2 className="mb-2 font-extrabold text-2xl">Motivation</h2>
                <p>
                    To enhance content recommendations and monetization strategies, it is valuable to understand which specific segments of a video are most watched. Traditional view counts offer only coarse-grained analytics. We introduce a sweep line-based technique to track fine-grained viewage distribution using segment boundaries as input.
                </p>
                <p>
                    Each view is represented as a time interval <InlineMath math="[l, r]" />, and the algorithm processes these efficiently in linear time to determine hot segments every 30 seconds.
                </p>
            </section>

            <hr className="my-8 border-gray-300 dark:border-gray-600" />

            <section className="mb-8">
                <h2 className="mb-2 font-extrabold text-2xl">System Design</h2>
                <ul className="list-disc list-inside">
                    <li>User views are reported with <InlineMath math="(l, r)" /> timestamps marking the watch interval.</li>
                    <li>A sweep array increments at <InlineMath math="l" /> and decrements at <InlineMath math="r" />.</li>
                    <li>A prefix sum array is computed every 30 seconds to determine the number of active viewers at each segment.</li>
                    <li>Both arrays are maintained in O(1) update time per view.</li>
                    <li>Final view density is stored in Redis or an OLAP engine for downstream analytics.</li>
                </ul>
            </section>

            <hr className="my-8 border-gray-300 dark:border-gray-600" />

            <section className="mb-8">
                <h2 className="mb-2 font-extrabold text-2xl">Algorithm: Sweep Line</h2>
                <p><strong>Core Idea:</strong> Use differential arrays to track the start and end of views, then compute viewage per video through the prefix sum array.</p>
                <br></br>
                <pre className="p-4 rounded overflow-x-auto" style={{ backgroundColor: "#000", color: "#fff" }}>
                    {`Algorithm : Segment-wise View Count using Sweep Line

Input:
    view_segments: array of (l, r) for all users
    max_time: total duration of video in seconds
    interval: segment size (e.g., 30s)

Initialize:
    sweep[max_time + 2] ← 0
    prefix[max_time + 2] ← 0

for each (l, r) in view_segments do
    sweep[l] ← sweep[l] + 1
    sweep[r] ← sweep[r] - 1

prefix[0] ← sweep[0]
for i = 1 to max_time do
    prefix[i] ← prefix[i - 1] + sweep[i]

`}
                </pre>
            </section>

            <hr className="my-8 border-gray-300 dark:border-gray-600" />

            <section className="mb-8">
                <h2 className="mb-2 font-extrabold text-2xl">Efficiency Analysis</h2>
                <ul className="list-disc list-inside">
                    
                    <li>This approach ensures <strong>O(n)</strong> complexity for <InlineMath math="n" /> views </li>
                    <li><strong>Streaming-compatible:</strong> Updates occur in O(1) for each incoming view.</li>
                    <li><strong>Accurate segmentation:</strong> Can detect popular moments like highlights or ads skips.</li>
                    <li><strong>Space-efficient:</strong> Two linear arrays, no per-user state needed.</li>
                    <li><strong>Integration:</strong> Results can directly feed recommendation engines or thumbnail selectors.</li>
                </ul>
            </section>
        </div>
    );
}
