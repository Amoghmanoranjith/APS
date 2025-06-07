import React from "react";
import bc from "/assets/bc2.excalidraw.svg"; // Adjust path accordingly
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function BusinessCase2() {
    return (
        <div className="prose lg:prose-xl max-w-4xl mx-auto px-4 py-8 dark:prose-invert">
            <h1 className="mb-4 font-extrabold text-4xl">
                Efficient Estimation of Hashtag Trends in Video Streams
            </h1>
            <br />
            <br />
            <div className="w-full max-w-3xl mx-auto mb-8">
                <img
                    src={bc}
                    alt="Count-Min Sketch Pipeline Diagram"
                    className="w-full h-auto"
                    style={{ maxHeight: "400px", objectFit: "contain" }}
                />
            </div>

            <br />
            <br />

            <section className="mb-8">
                <h2 className="mb-2 font-extrabold text-2xl">Motivation</h2>
                <p>
                    Video content in modern platforms is often accompanied by hashtags, which drive discovery,
                    personalization, and monetization. Identifying trending hashtags in real time enables better
                    content curation, ad targeting, and dynamic recommendations.
                </p>
                <p>
                    Instead of relying solely on backend batch analytics, this case explores the feasibility of
                    estimating hashtag frequency using <strong>streaming analytics pipelines</strong> and lightweight
                    data structures — minimizing memory usage while providing real-time insights.
                </p>
            </section>

            <hr className="my-8 border-gray-300 dark:border-gray-600" />

            <section className="mb-8">
                <h2 className="mb-2 font-extrabold text-2xl">System Design</h2>
                <ul className="list-disc list-inside">
                    <li><strong>Kafka</strong> acts as the ingestion layer, collecting raw view logs from edge nodes.</li>
                    <li><strong>Flink</strong> performs two key streaming jobs:
                        <ul className="list-disc list-inside ml-6">
                            <li>View de-duplication to ensure accurate engagement tracking.</li>
                            <li>Extraction and counting of hashtags from video metadata.</li>
                        </ul>
                    </li>
                    <li>A dedicated <strong>hashtag frequency estimator pipeline</strong> applies the Count-Min Sketch (CMS) algorithm to track the frequency of hashtags.</li>
                    <li><strong>Redis</strong> is used to:
                        <ul className="list-disc list-inside ml-6">
                            <li>Store view counts for monetization systems.</li>
                            <li>Expose top hashtag frequencies for analytics dashboards and real-time APIs.</li>
                        </ul>
                    </li>
                </ul>
            </section>

            <hr className="my-8 border-gray-300 dark:border-gray-600" />

            <section className="mb-8">
                <h2 className="mb-2 font-extrabold text-2xl">Algorithm: Count-Min Sketch</h2>
                <p>
                    Count-Min Sketch is a probabilistic data structure that approximates the frequency of items
                    in a data stream using multiple hash functions and a 2D array of counters.
                </p>
                <p><strong>Parameters:</strong></p>
                <ul className="list-disc list-inside">
                    <li><InlineMath math="w" />: number of columns = <InlineMath math="\lceil e/\varepsilon \rceil" /></li>
                    <li><InlineMath math="d" />: number of hash functions = <InlineMath math="\lceil \ln(1/\delta) \rceil" /></li>
                </ul>

                <p><strong>Update Operation:</strong> For each incoming hashtag <InlineMath math="h" />:</p>
                <ul className="list-disc list-inside ml-6">
                    <li>Apply <InlineMath math="d" /> independent hash functions.</li>
                    <li>Increment the respective counters at <InlineMath math="(i, h_i(h))" /> in the sketch.</li>
                </ul>

                <p><strong>Query:</strong> The estimated frequency <InlineMath math="\hat{f}(h)" /> is given by:</p>
                <BlockMath math="\hat{f}(h) = \min_{i=1}^d \text{CMS}[i][h_i(h)]" />
                <p>This ensures an overestimate with error bounded by <InlineMath math="\varepsilon N" /> with probability <InlineMath math="1 - \delta" />.</p>
                <br></br>
                <p><strong>Pseudocode:</strong></p>
                <pre className="p-4 rounded overflow-x-auto" style={{ backgroundColor: "#000", color: "#fff" }}>
                    {`Algorithm : Count-Min Sketch Frequency Estimation

Input:
    h: incoming hashtag
    CMS: d × w count array
    h_1, ..., h_d: d pairwise-independent hash functions

Procedure Update(h):
    for i = 1 to d do
        CMS[i][h_i(h)] ← CMS[i][h_i(h)] + 1

Procedure Estimate(h):
    min_count ← ∞
    for i = 1 to d do
        min_count ← min(min_count, CMS[i][h_i(h)])
    return min_count`}
                </pre>
            </section>


            <hr className="my-8 border-gray-300 dark:border-gray-600" />

            <section className="mb-8">
                <h2 className="mb-2 font-extrabold text-2xl">Efficiency Analysis</h2>
                <ul className="list-disc list-inside">
                    <li><strong>Memory-efficient:</strong> Requires <InlineMath math="O(1/\varepsilon \cdot \log(1/\delta))" /> space regardless of stream length.</li>
                    <li><strong>Streaming-compatible:</strong> One-pass algorithm; perfect for real-time pipelines like Flink.</li>
                    <li><strong>Fast update/query:</strong> Each operation is <InlineMath math="O(\log(1/\delta))" /> time.</li>
                    <li><strong>Scalable:</strong> Can be parallelized across Flink workers with minimal coordination.</li>
                </ul>
            </section>
        </div>
    );
}
