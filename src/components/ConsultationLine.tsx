import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

// A single unbroken stroke: arrival, client, document, adviser, onward journey.
const consultationPath = `M 30 365
  C 95 365 110 365 150 365
  C 163 307 189 242 236 231
  C 272 221 301 245 320 270
  C 298 247 273 224 248 222
  C 214 218 197 193 201 150
  C 202 96 238 62 281 69
  C 317 73 339 99 334 118
  C 308 92 276 86 252 103
  C 231 117 225 155 230 176
  C 235 194 252 186 253 164
  C 255 145 273 144 276 165
  C 278 181 265 184 263 172
  C 258 153 266 130 280 129
  C 300 126 302 149 313 151
  C 323 157 316 139 324 133
  C 334 129 336 129 333 117
  C 343 127 341 149 344 164
  C 346 178 365 182 359 191
  L 346 198 C 343 217 344 239 325 239
  C 308 239 287 226 286 214
  C 286 202 299 208 302 222
  C 307 244 296 257 290 262
  C 280 270 251 242 230 243
  C 181 246 176 310 178 347
  C 180 393 219 415 254 433
  C 291 452 282 477 263 483
  C 243 490 270 463 285 457
  C 318 443 338 468 373 465
  C 414 462 457 431 481 408
  C 499 390 495 370 482 362
  C 469 351 450 363 430 365
  C 408 368 387 358 391 344
  C 396 330 412 326 429 330
  L 451 337 C 461 344 437 347 418 342
  L 501 270 L 574 303 L 510 365
  C 495 379 474 390 445 390
  C 410 390 372 363 359 329
  C 348 301 350 273 332 265
  C 314 259 312 278 322 296
  C 336 328 363 324 392 326
  L 704 333 C 736 334 756 341 745 349
  C 729 358 720 334 700 344
  C 688 349 676 359 670 368
  C 666 378 687 366 700 361
  C 714 357 684 375 688 378
  L 739 366 C 716 375 699 383 715 385
  L 884 385 C 906 385 913 371 900 357
  C 885 341 887 319 889 293
  C 891 248 901 225 925 226
  C 958 226 973 262 971 305
  C 970 337 958 367 950 375
  C 940 389 927 382 921 367
  C 901 324 896 272 879 250
  C 864 232 847 230 836 238
  C 809 254 806 315 802 336
  C 798 365 815 377 823 370
  C 824 361 800 351 775 357
  C 829 337 821 295 833 259
  C 838 246 856 220 866 208
  C 876 196 876 177 882 159
  C 891 135 876 129 865 140
  C 854 148 847 140 841 129
  C 830 112 812 108 797 120
  C 783 131 784 154 783 164
  C 779 177 776 189 780 194
  L 788 191 C 786 215 789 219 814 223
  C 834 226 845 222 842 213
  C 837 198 824 221 830 242
  C 836 264 848 264 851 253
  C 868 218 885 211 908 212
  C 930 211 935 199 932 176
  C 930 132 909 97 875 90
  C 844 82 815 93 791 110
  C 776 123 780 137 797 126
  C 831 99 857 99 882 117
  C 908 137 910 169 914 192
  C 918 217 940 217 956 239
  C 982 275 989 343 991 389
  C 993 414 965 425 923 422
  C 881 419 821 407 802 393
  C 791 385 804 382 815 395
  C 836 419 870 448 899 465
  C 930 483 962 474 965 448
  C 969 419 975 407 990 419
  C 1019 442 1052 428 1070 406
  C 1090 381 1100 365 1130 365`;

export default function ConsultationLine() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: .25 });
  const reduced = useReducedMotion();
  const visible = inView || reduced;
  return (
    <section ref={ref} className="consultation-line-section" aria-labelledby="consultation-title">
      <div className="consultation-copy">
        <p className="section-index">Every matter starts with a conversation</p>
        <h2 id="consultation-title">A clear path.<br /><em>From start to finish.</em></h2>
        <Link to="/contact">Let’s talk <span aria-hidden="true">↗</span></Link>
      </div>
      <svg className="consultation-art" viewBox="0 0 1160 510" role="img" aria-label="A continuous line drawing of a client and solicitor discussing a document, connected by a line with a dot at each end">
        <motion.circle cx="30" cy="365" r="6" fill="currentColor" initial={false} animate={{ opacity: visible ? 1 : 0 }} />
        <motion.path d={consultationPath} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" initial={reduced ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: visible ? 1 : 0, opacity: visible ? 1 : 0 }} transition={{ pathLength: { duration: reduced ? 0 : 6, ease: "easeInOut" }, opacity: { duration: .2 } }} />
        <motion.circle cx="1130" cy="365" r="6" fill="currentColor" initial={false} animate={{ opacity: visible ? 1 : 0 }} transition={{ delay: reduced ? 0 : 6, duration: .3 }} />
      </svg>
    </section>
  );
}
