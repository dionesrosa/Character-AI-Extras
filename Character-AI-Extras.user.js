// ==UserScript==
// @name         Character.AI Extras
// @namespace    https://github.com/dionesrosa
// @version      0.1
// @description  Ajustes especificos para o Character.ai
// @author       Diones Souza
// @license      MIT
// @icon         https://character.ai/favicon.ico
// @homepageURL  https://github.com/dionesrosa/Character-AI-Extras
// @supportURL   https://github.com/dionesrosa/Character-AI-Extras/issues
// @updateURL    https://raw.githubusercontent.com/dionesrosa/Character-AI-Extras/master/Character-AI-Extras.user.js
// @downloadURL  https://raw.githubusercontent.com/dionesrosa/Character-AI-Extras/master/Character-AI-Extras.user.js
// @match        *://character.ai/*
// @run-at       document-idle
// @grant        unsafeWindow
// @grant        GM_addStyle
// @noframes
// ==/UserScript==

(function () {
    'use strict';

    // --- FUNÇÕES DE UTILIDADE (HELPERS) ---
    const consultaSegura = (seletor, raiz = document) => { try { return raiz.querySelector(seletor); } catch (e) { return null; } };
    const consultaTodosSegura = (seletor, raiz = document) => { try { return Array.from(raiz.querySelectorAll(seletor)); } catch (e) { return []; } };

    function logAviso(...args) { console.warn('[C.AI-Extras]', ...args); }

    // Aplica modificações de CSS e comportamento visual.
    function modificarCSS() {
        try {
            consultaTodosSegura('button').forEach(btn => {
                if (btn.textContent.includes('Ocultar anúncios')) {
                    btn.closest('div.w-full')?.style.setProperty('display', 'none', 'important');
                }
            });
        } catch (erro) {
            console.error('Erro em modificarCSS', erro);
        }
    }

    // Observador de Mutações para detectar a adição de elementos (menu de contexto, barra de seleção).
    const observador = new MutationObserver((mutacoes) => {
        // Aplica estilos CSS
        modificarCSS();
    });

    // Inicia a observação no documento
    observador.observe(document.body, { childList: true, subtree: true });

    // Aplica CSS inicial
    window.addEventListener('load', modificarCSS);
    document.addEventListener('readystatechange', () => { if (document.readyState === 'complete') modificarCSS(); });
})();