import React from "react";
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import bcMo from "/assets/bcMo.excalidraw.svg"; // Update path accordingly

export default function BusinessCaseMo() {
    return (
        <div className="prose lg:prose-xl max-w-4xl mx-auto px-4 py-8 dark:prose-invert">
            <h1 className="mb-4 font-extrabold text-4xl">
                Efficient Offline Query Processing using Mo's Algorithm
            </h1>

            <br />
            <br />
            <div className="w-full max-w-3xl mx-auto mb-8">
                <img
                    src={bcMo}
                    alt="Mo's Algorithm Query Sorting and Processing"
                    className="w-full h-auto"
                    style={{ maxHeight: "400px", objectFit: "contain" }}
                />
            </div>
            <br />
            <br />

            <section className="mb-8">
                <h2 className="mb-2 font-extrabold text-2xl">Motivation</h2>
                <p>
                    Many applications require answering multiple range queries on large arrays efficiently, such as frequency counts, distinct element counts, or sums in subranges.
                </p>
                <p>
                    Processing each query independently can be costly, especially when queries overlap. <strong>Mo's algorithm</strong> offers a way to reorder queries to minimize data structure updates and achieve sublinear amortized complexity.
                </p>
            </section>

            <hr className="my-8 border-gray-300 dark:border-gray-600" />

            <section className="mb-8">
                <h2 className="mb-2 font-extrabold text-2xl">Problem Statement</h2>
                <p>
                    Given an array and multiple queries asking for information on subranges <InlineMath math="[L, R]" />, efficiently process all queries offline to minimize total runtime.
                </p>
                <ul className="list-disc list-inside">
                    <li>Queries are known in advance (offline).</li>
                    <li>Each query asks for a property (e.g., count distinct) on a subrange.</li>
                    <li>Goal: answer all queries efficiently, minimizing redundant recalculations.</li>
                </ul>
            </section>

            <hr className="my-8 border-gray-300 dark:border-gray-600" />

            <section className="mb-8">
                <h2 className="mb-2 font-extrabold text-2xl">System Design</h2>
                <ul className="list-disc list-inside">
                    <li>Preprocess all queries to assign each a block number based on the left index using <InlineMath math="\text{block_size} = \sqrt{n}" />.</li>
                    <li>Sort queries by:
                        <ul className="list-disc list-inside ml-6">
                            <li>Block number of <InlineMath math="L" /></li>
                            <li>Within the same block, by <InlineMath math="R" /></li>
                        </ul>
                    </li>
                    <li>Process queries in this order to reduce movement of range pointers.</li>
                    <li>Maintain a frequency data structure to add/remove elements as range pointers move.</li>
                </ul>
            </section>

            <hr className="my-8 border-gray-300 dark:border-gray-600" />

            <section className="mb-8">
                <h2 className="mb-2 font-extrabold text-2xl">Algorithm: Mo's Algorithm</h2>
                <p>
                    Mo's algorithm sorts queries to minimize the number of add/remove operations on a data structure maintaining the current subrange.
                </p>
                <p><strong>Definitions:</strong></p>
                <ul className="list-disc list-inside">
                    <li><InlineMath math="n" />: array size</li>
                    <li><InlineMath math="q" />: number of queries</li>
                    <li><InlineMath math="block\_size = \lfloor \sqrt{n} \rfloor" /></li>
                </ul>

                <p><strong>Query Sorting:</strong></p>
                <BlockMath math={
                    String.raw`(L_i, R_i) \rightarrow \left( \left\lfloor \frac{L_i}{block\_size} \right\rfloor, R_i \right)`
                } />
                <p>Sort queries first by block number of <InlineMath math="L_i" />, then by <InlineMath math="R_i" />.</p>

                <p><strong>Pseudocode:</strong></p>
                <pre className="p-4 rounded overflow-x-auto" style={{ backgroundColor: "#000", color: "#fff" }}>
{`block_size = floor(sqrt(n))

Sort queries by:
    (L // block_size, R)

Initialize currentL = 0, currentR = -1

for each query in sorted order:
    while currentR < R:
        currentR += 1
        add(arr[currentR])
    while currentR > R:
        remove(arr[currentR])
        currentR -= 1
    while currentL < L:
        remove(arr[currentL])
        currentL += 1
    while currentL > L:
        currentL -= 1
        add(arr[currentL])
    answer the query using current data structure
`}
                </pre>
            </section>

            <hr className="my-8 border-gray-300 dark:border-gray-600" />

            <section className="mb-8">
                <h2 className="mb-2 font-extrabold text-2xl">Efficiency Analysis</h2>
                <ul className="list-disc list-inside">
                    <li><strong>Time complexity:</strong> <InlineMath math="O((n + q) \sqrt{n})" /> for <InlineMath math="n" /> elements and <InlineMath math="q" /> queries.</li>
                    <li><strong>Memory:</strong> <InlineMath math="O(n)" /> to store frequency and supporting data structures.</li>
                    <li><strong>Amortized updates:</strong> Reduced updates between queries due to sorting.</li>
                    <li><strong>Offline processing:</strong> Queries must be known before processing.</li>
                    <li><strong>Use cases:</strong> Range frequency, distinct count, sum queries where incremental updates are possible.</li>
                </ul>
            </section>
        </div>
    );
}
