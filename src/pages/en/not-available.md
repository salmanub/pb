---
layout: "layouts/base.njk"
title: "Page not available in English"
description: "This page is not yet available in English, but you can view it in other languages"
permalink: "/en/not-available/"
eleventyExcludeFromCollections: true
---

<main class="mt-[120px] min-h-screen">
    <div class="container mx-auto px-4 py-16 md:py-24">
        <div class="max-w-2xl mx-auto text-center">
            <div class="w-16 h-16 bg-cyan-100 rounded-full mx-auto flex items-center justify-center mb-8">
                <svg class="w-8 h-8 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
            </div>
            <h1 class="text-3xl md:text-4xl font-light text-slate-800 mb-6">
                Sorry, this page is not yet available in English
            </h1>
            <p class="text-lg text-slate-600 mb-8">
                We're working on translating all our content. In the meantime, you can view this page in:
            </p>
            <div class="space-y-4" id="available-languages">
                <!-- Available language links will be inserted here dynamically -->
            </div>
            <div class="mt-12 pt-8 border-t border-slate-200">
                <a href="/en/" class="inline-flex items-center justify-center px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors">
                    <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                    </svg>
                    Back to home
                </a>
            </div>
        </div>
    </div>
</main>
