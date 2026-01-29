"use client";

import { useState, useEffect } from "react";
import { CookieIcon, CloseIcon } from "./Icons";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (!cookiesAccepted) {
      // Delay showing the banner for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookiesAccepted", "false");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 transition-transform duration-500 ease-out ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="container-xl">
        <div className="cookie-banner rounded-2xl p-5 md:p-6 shadow-2xl max-w-4xl mx-auto relative">
          {/* Close button */}
          <button
            type="button"
            onClick={handleDecline}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <CloseIcon />
          </button>

          <div className="flex flex-col md:flex-row md:items-start gap-4">
            {/* Cookie icon */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-[#5f6acb] bg-opacity-20 flex items-center justify-center">
                <CookieIcon className="text-[#5f6acb]" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 pr-8">
              <h3 className="text-lg font-semibold text-white mb-2">
                Мы используем файлы cookie
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Мы используем файлы cookie для улучшения работы сайта и анализа
                трафика.
                <br />
                Нажимая «Принять все», вы соглашаетесь с использованием файлов
                cookie.
              </p>

              {/* Details section */}
              {showDetails && (
                <div className="mt-4 p-4 bg-[#0e1520] rounded-lg border border-[#313948] fade-in">
                  <p className="text-sm text-gray-400">
                    <strong className="text-white">
                      Обязательные cookie:
                    </strong>{" "}
                    Необходимы для работы сайта.
                    <br />
                    <strong className="text-white">
                      Аналитические cookie:
                    </strong>{" "}
                    Помогают понять, как пользователи взаимодействуют с сайтом.
                    <br />
                    <strong className="text-white">
                      Маркетинговые cookie:
                    </strong>{" "}
                    Используются для показа персонализированной рекламы.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-5 pt-5 border-t border-[#313948]">
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {showDetails ? "Скрыть детали" : "Показать детали"}
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleDecline}
                className="px-5 py-2.5 text-sm font-medium text-white border border-[#313948] rounded-lg hover:border-gray-500 transition-colors"
              >
                Отклонить
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="px-5 py-2.5 text-sm font-medium text-[#0e1520] bg-[#17b4a1] rounded-lg hover:bg-[#15a392] transition-colors btn-animate"
              >
                Принять все
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
