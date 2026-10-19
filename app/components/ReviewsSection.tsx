import React from "react";
import { StarIcon } from "./Icons";

export default function ReviewsSection() {
  const reviews = [
    {
      id: 1,
      rating: "5.0",
      quote:
        "Excellent service and very professional staff. Everything was explained clearly and my car was ready on time.",
      name: "Ahmed Khan",
      vehicle: "Toyota Corolla (2021) · Maintenance",
      avatarLetter: "A",
    },
    {
      id: 2,
      rating: "5.0",
      quote:
        "Very reliable workshop. They diagnosed the issue quickly and completed the repair professionally.",
      name: "James Wilson",
      vehicle: "Honda Civic (2020) · Engine Diagnostics",
      avatarLetter: "J",
    },
    {
      id: 3,
      rating: "5.0",
      quote:
        "Clean workshop, friendly staff, and excellent workmanship. Highly recommended.",
      name: "Daniel Smith",
      vehicle: "BMW 3 Series (2019) · Full Service",
      avatarLetter: "D",
    },
  ];

  return (
    <section className="w-full py-16 bg-slate-50/60 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2 block">
            Customer Reviews
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            What Our Customers Say
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Real feedback from vehicle owners who visited AutoPro.
          </p>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="flex flex-col justify-between bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow"
            >
              <div>
                {/* 5 Stars + 5.0 */}
                <div className="flex items-center gap-1.5 mb-4">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </div>
                  <span className="text-xs font-bold text-slate-900">{rev.rating}</span>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              {/* Author & Vehicle */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                  {rev.avatarLetter}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">
                    {rev.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {rev.vehicle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
