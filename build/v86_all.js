(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b2) => (typeof require !== "undefined" ? require : a)[b2]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // runtime:v86-prebuilt
  var V86 = globalThis.V86;

  // src/const.js
  var LOG_ALL = -1;
  var LOG_CPU = 2;
  var LOG_FPU = 4;
  var LOG_MEM = 8;
  var LOG_DMA = 16;
  var LOG_IO = 32;
  var LOG_PS2 = 64;
  var LOG_PIC = 128;
  var LOG_VGA = 256;
  var LOG_PIT = 512;
  var LOG_MOUSE = 1024;
  var LOG_PCI = 2048;
  var LOG_BIOS = 4096;
  var LOG_FLOPPY = 8192;
  var LOG_SERIAL = 16384;
  var LOG_DISK = 32768;
  var LOG_RTC = 65536;
  var LOG_ACPI = 262144;
  var LOG_APIC = 524288;
  var LOG_NET = 1048576;
  var LOG_VIRTIO = 2097152;
  var LOG_9P = 4194304;
  var LOG_SB16 = 8388608;
  var LOG_FETCH = 16777216;
  var LOG_MODEM = 33554432;
  var LOG_NAMES = [
    [1, ""],
    [LOG_CPU, "CPU"],
    [LOG_DISK, "DISK"],
    [LOG_FPU, "FPU"],
    [LOG_MEM, "MEM"],
    [LOG_DMA, "DMA"],
    [LOG_IO, "IO"],
    [LOG_PS2, "PS2"],
    [LOG_PIC, "PIC"],
    [LOG_VGA, "VGA"],
    [LOG_PIT, "PIT"],
    [LOG_MOUSE, "MOUS"],
    [LOG_PCI, "PCI"],
    [LOG_BIOS, "BIOS"],
    [LOG_FLOPPY, "FLOP"],
    [LOG_SERIAL, "SERI"],
    [LOG_RTC, "RTC"],
    [LOG_ACPI, "ACPI"],
    [LOG_APIC, "APIC"],
    [LOG_NET, "NET"],
    [LOG_VIRTIO, "VIO"],
    [LOG_9P, "9P"],
    [LOG_SB16, "SB16"],
    [LOG_FETCH, "FETC"],
    [LOG_MODEM, "MODM"]
  ];
  var FLAG_IOPL = 1 << 12 | 1 << 13;
  var FLAG_NT = 1 << 14;
  var FLAG_RF = 1 << 16;
  var FLAG_VM = 1 << 17;
  var FLAG_AC = 1 << 18;
  var FLAG_VIF = 1 << 19;
  var FLAG_VIP = 1 << 20;
  var FLAG_ID = 1 << 21;
  var FLAGS_DEFAULT = 1 << 1;
  var MMAP_BLOCK_BITS = 17;
  var MMAP_BLOCK_SIZE = 1 << MMAP_BLOCK_BITS;
  var CR0_PG = 1 << 31;
  var CR4_PAE = 1 << 5;

  // src/log.js
  if (false) {
    globalThis.DEBUG = true;
  }
  var LOG_TO_FILE = false;
  var LOG_LEVEL = LOG_ALL & ~LOG_PS2 & ~LOG_PIT & ~LOG_VIRTIO & ~LOG_9P & ~LOG_PIC & ~LOG_DMA & ~LOG_SERIAL & ~LOG_NET & ~LOG_FLOPPY & ~LOG_DISK & ~LOG_VGA & ~LOG_SB16;
  var log_data = [];
  function do_the_log(message) {
    if (LOG_TO_FILE) {
      log_data.push(message, "\n");
    } else {
      console.log(message);
    }
  }
  var dbg_log = (function() {
    if (true) {
      return function() {
      };
    }
    const dbg_names = LOG_NAMES.reduce(function(a, x) {
      a[x[0]] = x[1];
      return a;
    }, {});
    var log_last_message = "";
    var log_message_repetitions = 0;
    function dbg_log_(stuff, level) {
      if (true) return;
      level = level || 1;
      if (level & LOG_LEVEL) {
        var level_name = dbg_names[level] || "", message = "[" + pads(level_name, 4) + "] " + stuff;
        if (message === log_last_message) {
          log_message_repetitions++;
          if (log_message_repetitions < 2048) {
            return;
          }
        }
        var now = /* @__PURE__ */ new Date();
        var time_str = pad0(now.getHours(), 2) + ":" + pad0(now.getMinutes(), 2) + ":" + pad0(now.getSeconds(), 2) + "+" + pad0(now.getMilliseconds(), 3) + " ";
        if (log_message_repetitions) {
          if (log_message_repetitions === 1) {
            do_the_log(time_str + log_last_message);
          } else {
            do_the_log("Previous message repeated " + log_message_repetitions + " times");
          }
          log_message_repetitions = 0;
        }
        do_the_log(time_str + message);
        log_last_message = message;
      }
    }
    return dbg_log_;
  })();
  function dbg_assert(cond, msg, level) {
    if (true) return;
    if (!cond) {
      dbg_assert_failed(msg);
    }
  }
  function dbg_assert_failed(msg) {
    debugger;
    console.trace();
    if (msg) {
      throw "Assert failed: " + msg;
    } else {
      throw "Assert failed";
    }
  }

  // src/lib.js
  function pads(str, len) {
    str = str || str === 0 ? str + "" : "";
    return str.padEnd(len, " ");
  }
  function pad0(str, len) {
    str = str || str === 0 ? str + "" : "";
    return str.padStart(len, "0");
  }
  function hex_dump(buffer) {
    function hex(n, len) {
      return pad0(n.toString(16).toUpperCase(), len);
    }
    const result = [];
    let offset = 0;
    for (; offset + 15 < buffer.length; offset += 16) {
      let line2 = hex(offset, 5) + "   ";
      for (let j = 0; j < 16; j++) {
        line2 += hex(buffer[offset + j], 2) + " ";
      }
      line2 += "  ";
      for (let j = 0; j < 16; j++) {
        const x = buffer[offset + j];
        line2 += x >= 33 && x !== 34 && x !== 92 && x <= 126 ? String.fromCharCode(x) : ".";
      }
      result.push(line2);
    }
    let line = hex(offset, 5) + "   ";
    for (; offset < buffer.length; offset++) {
      line += hex(buffer[offset], 2) + " ";
    }
    const remainder = offset & 15;
    line += "   ".repeat(16 - remainder);
    line += "  ";
    for (let j = 0; j < remainder; j++) {
      const x = buffer[offset + j];
      line += x >= 33 && x !== 34 && x !== 92 && x <= 126 ? String.fromCharCode(x) : ".";
    }
    result.push(line);
    return "\n" + result.join("\n") + "\n";
  }
  var get_rand_int;
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const rand_data = new Int32Array(1);
    get_rand_int = function() {
      crypto.getRandomValues(rand_data);
      return rand_data[0];
    };
  } else if (false) {
    const crypto2 = (void 0)("crypto");
    get_rand_int = function() {
      return crypto2.randomBytes(4)["readInt32LE"](0);
    };
  } else if (false) {
    null.then((crypto2) => {
      get_rand_int = function() {
        return crypto2["randomBytes"](4)["readInt32LE"](0);
      };
    });
  } else {
    dbg_assert(false, "Unsupported platform: No cryptographic random values");
  }
  var int_log2;
  if (typeof Math.clz32 === "function" && Math.clz32(0) === 32 && Math.clz32(74565) === 15 && Math.clz32(-1) === 0) {
    int_log2 = function(x) {
      dbg_assert(x > 0);
      return 31 - Math.clz32(x);
    };
  } else {
    int_log2_table = new Int8Array(256);
    for (i = 0, b = -2; i < 256; i++) {
      if (!(i & i - 1))
        b++;
      int_log2_table[i] = b;
    }
    int_log2 = function(x) {
      x >>>= 0;
      dbg_assert(x > 0);
      var tt = x >>> 16;
      if (tt) {
        var t = tt >>> 8;
        if (t) {
          return 24 + int_log2_table[t];
        } else {
          return 16 + int_log2_table[tt];
        }
      } else {
        var t = x >>> 8;
        if (t) {
          return 8 + int_log2_table[t];
        } else {
          return int_log2_table[x];
        }
      }
    };
  }
  var int_log2_table;
  var i;
  var b;
  var round_up_to_next_power_of_2 = function(x) {
    dbg_assert(x >= 0);
    return x <= 1 ? 1 : 1 << 1 + int_log2(x - 1);
  };
  if (false) {
    dbg_assert(int_log2(1) === 0);
    dbg_assert(int_log2(2) === 1);
    dbg_assert(int_log2(7) === 2);
    dbg_assert(int_log2(8) === 3);
    dbg_assert(int_log2(123456789) === 26);
    dbg_assert(round_up_to_next_power_of_2(0) === 1);
    dbg_assert(round_up_to_next_power_of_2(1) === 1);
    dbg_assert(round_up_to_next_power_of_2(2) === 2);
    dbg_assert(round_up_to_next_power_of_2(7) === 8);
    dbg_assert(round_up_to_next_power_of_2(8) === 8);
    dbg_assert(round_up_to_next_power_of_2(123456789) === 134217728);
  }
  function FloatQueue(size) {
    this.size = size;
    this.data = new Float32Array(size);
    this.start = 0;
    this.end = 0;
    this.length = 0;
    dbg_assert((size & size - 1) === 0);
  }
  FloatQueue.prototype.push = function(item) {
    if (this.length === this.size) {
      this.start = this.start + 1 & this.size - 1;
    } else {
      this.length++;
    }
    this.data[this.end] = item;
    this.end = this.end + 1 & this.size - 1;
  };
  FloatQueue.prototype.shift = function() {
    if (!this.length) {
      return void 0;
    } else {
      var item = this.data[this.start];
      this.start = this.start + 1 & this.size - 1;
      this.length--;
      return item;
    }
  };
  FloatQueue.prototype.shift_block = function(count) {
    var slice = new Float32Array(count);
    if (count > this.length) {
      count = this.length;
    }
    var slice_end = this.start + count;
    var partial = this.data.subarray(this.start, slice_end);
    slice.set(partial);
    if (slice_end >= this.size) {
      slice_end -= this.size;
      slice.set(this.data.subarray(0, slice_end), partial.length);
    }
    this.start = slice_end;
    this.length -= count;
    return slice;
  };
  FloatQueue.prototype.peek = function() {
    if (!this.length) {
      return void 0;
    } else {
      return this.data[this.start];
    }
  };
  FloatQueue.prototype.clear = function() {
    this.start = 0;
    this.end = 0;
    this.length = 0;
  };
  function CircularQueue(size) {
    this.data = [];
    this.index = 0;
    this.size = size;
  }
  CircularQueue.prototype.add = function(item) {
    this.data[this.index] = item;
    this.index = (this.index + 1) % this.size;
  };
  CircularQueue.prototype.toArray = function() {
    return [].slice.call(this.data, this.index).concat([].slice.call(this.data, 0, this.index));
  };
  CircularQueue.prototype.clear = function() {
    this.data = [];
    this.index = 0;
  };
  CircularQueue.prototype.set = function(new_data) {
    this.data = new_data;
    this.index = 0;
  };
  function dump_file(ab, name) {
    if (!Array.isArray(ab)) {
      ab = [ab];
    }
    var blob = new Blob(ab);
    download(blob, name);
  }
  function download(file_or_blob, name) {
    var a = document.createElement("a");
    a["download"] = name;
    a.href = window.URL.createObjectURL(file_or_blob);
    a.dataset["downloadurl"] = ["application/octet-stream", a["download"], a.href].join(":");
    if (document.createEvent) {
      var ev = document.createEvent("MouseEvent");
      ev.initMouseEvent(
        "click",
        true,
        true,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      a.dispatchEvent(ev);
    } else {
      a.click();
    }
    window.URL.revokeObjectURL(a.href);
  }
  var Bitmap = function(length_or_buffer) {
    if (typeof length_or_buffer === "number") {
      this.view = new Uint8Array(length_or_buffer + 7 >> 3);
    } else if (length_or_buffer instanceof ArrayBuffer) {
      this.view = new Uint8Array(length_or_buffer);
    } else {
      dbg_assert(false, "Bitmap: Invalid argument");
    }
  };
  Bitmap.prototype.set = function(index, value) {
    const bit_index = index & 7;
    const byte_index = index >> 3;
    const bit_mask = 1 << bit_index;
    this.view[byte_index] = value ? this.view[byte_index] | bit_mask : this.view[byte_index] & ~bit_mask;
  };
  Bitmap.prototype.get = function(index) {
    const bit_index = index & 7;
    const byte_index = index >> 3;
    return this.view[byte_index] >> bit_index & 1;
  };
  Bitmap.prototype.get_buffer = function() {
    return this.view.buffer;
  };
  var load_file;
  var get_file_size;
  if (typeof XMLHttpRequest === "undefined" || false) {
    let fs;
    const get_fs = async function() {
      if (false) {
        return (void 0)("fs")["promises"];
      }
      return import("node:fs/promises");
    };
    load_file = async function(filename, options, n_tries) {
      if (!fs) {
        fs = await get_fs();
      }
      if (options.range) {
        dbg_assert(!options.as_json);
        const fd = await fs["open"](filename, "r");
        const length = options.range.length;
        const buffer = Buffer.allocUnsafe(length);
        try {
          const result = await fd["read"]({
            buffer,
            position: options.range.start
          });
          dbg_assert(result.bytesRead === length);
        } finally {
          await fd["close"]();
        }
        options.done && options.done(new Uint8Array(buffer));
      } else {
        const o = {
          encoding: options.as_json ? "utf-8" : null
        };
        const data = await fs["readFile"](filename, o);
        const result = options.as_json ? JSON.parse(data) : new Uint8Array(data).buffer;
        options.done(result);
      }
    };
    get_file_size = async function(path) {
      if (!fs) {
        fs = await get_fs();
      }
      const stat = await fs["stat"](path);
      return stat.size;
    };
  } else {
    load_file = async function(filename, options, n_tries) {
      var http = new XMLHttpRequest();
      const abort = () => http.abort();
      if (options.signal) {
        if (options.signal.aborted) return;
        options.signal.addEventListener("abort", abort, { once: true });
      }
      http.open(options.method || "get", filename, true);
      if (options.as_json) {
        http.responseType = "json";
      } else {
        http.responseType = "arraybuffer";
      }
      if (options.headers) {
        var header_names = Object.keys(options.headers);
        for (var i2 = 0; i2 < header_names.length; i2++) {
          var name = header_names[i2];
          http.setRequestHeader(name, options.headers[name]);
        }
      }
      if (options.range) {
        const start = options.range.start;
        const end = start + options.range.length - 1;
        http.setRequestHeader("Range", "bytes=" + start + "-" + end);
        http.setRequestHeader("X-Accept-Encoding", "identity");
        http.onreadystatechange = function() {
          if (http.status === 200) {
            console.error("Server sent full file in response to ranged request, aborting", { filename });
            http.abort();
          }
        };
      }
      http.onload = function(e) {
        if (options.signal) options.signal.removeEventListener("abort", abort);
        if (http.readyState === 4) {
          if (http.status !== 200 && http.status !== 206) {
            console.error("Loading the image " + filename + " failed (status %d)", http.status);
            if (http.status >= 500 && http.status < 600) {
              retry();
            }
          } else if (http.response) {
            if (options.range) {
              const enc = http.getResponseHeader("Content-Encoding");
              if (enc && enc !== "identity") {
                console.error("Server sent Content-Encoding in response to ranged request", { filename, enc });
              }
            }
            options.done && options.done(http.response, http);
          }
        }
      };
      http.onerror = function(e) {
        if (options.signal) options.signal.removeEventListener("abort", abort);
        console.error("Loading the image " + filename + " failed", e);
        retry();
      };
      if (options.progress) {
        http.onprogress = function(e) {
          options.progress(e);
        };
      }
      http.send(null);
      function retry() {
        const number_of_tries = n_tries || 0;
        const timeout = [1, 1, 2, 3, 5, 8, 13, 21][number_of_tries] || 34;
        setTimeout(() => {
          load_file(filename, options, number_of_tries + 1);
        }, 1e3 * timeout);
      }
    };
    get_file_size = async function(url) {
      return new Promise((resolve, reject) => {
        load_file(url, {
          done: (buffer, http) => {
            var header = http.getResponseHeader("Content-Range") || "";
            var match = header.match(/\/(\d+)\s*$/);
            if (match) {
              resolve(+match[1]);
            } else {
              const error = new Error("`Range: bytes=...` header not supported (Got `" + header + "`)");
              reject(error);
            }
          },
          headers: {
            Range: "bytes=0-0",
            "X-Accept-Encoding": "identity"
          }
        });
      });
    };
  }
  var CHARMAPS = {
    cp437: " \u263A\u263B\u2665\u2666\u2663\u2660\u2022\u25D8\u25CB\u25D9\u2642\u2640\u266A\u266B\u263C\u25BA\u25C4\u2195\u203C\xB6\xA7\u25AC\u21A8\u2191\u2193\u2192\u2190\u221F\u2194\u25B2\u25BC !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\u2302\xC7\xFC\xE9\xE2\xE4\xE0\xE5\xE7\xEA\xEB\xE8\xEF\xEE\xEC\xC4\xC5\xC9\xE6\xC6\xF4\xF6\xF2\xFB\xF9\xFF\xD6\xDC\xA2\xA3\xA5\u20A7\u0192\xE1\xED\xF3\xFA\xF1\xD1\xAA\xBA\xBF\u2310\xAC\xBD\xBC\xA1\xAB\xBB\u2591\u2592\u2593\u2502\u2524\u2561\u2562\u2556\u2555\u2563\u2551\u2557\u255D\u255C\u255B\u2510\u2514\u2534\u252C\u251C\u2500\u253C\u255E\u255F\u255A\u2554\u2569\u2566\u2560\u2550\u256C\u2567\u2568\u2564\u2565\u2559\u2558\u2552\u2553\u256B\u256A\u2518\u250C\u2588\u2584\u258C\u2590\u2580\u03B1\xDF\u0393\u03C0\u03A3\u03C3\xB5\u03C4\u03A6\u0398\u03A9\u03B4\u221E\u03C6\u03B5\u2229\u2261\xB1\u2265\u2264\u2320\u2321\xF7\u2248\xB0\u2219\xB7\u221A\u207F\xB2\u25A0 ",
    cp858: "\xC7\xFC\xE9\xE2\xE4\xE0\xE5\xE7\xEA\xEB\xE8\xEF\xEE\xEC\xC4\xC5\xC9\xE6\xC6\xF4\xF6\xF2\xFB\xF9\xFF\xD6\xDC\xF8\xA3\xD8\xD7\u0192\xE1\xED\xF3\xFA\xF1\xD1\xAA\xBA\xBF\xAE\xAC\xBD\xBC\xA1\xAB\xBB\u2591\u2592\u2593\u2502\u2524\xC1\xC2\xC0\xA9\u2563\u2551\u2557\u255D\xA2\xA5\u2510\u2514\u2534\u252C\u251C\u2500\u253C\xE3\xC3\u255A\u2554\u2569\u2566\u2560\u2550\u256C\xA4\xF0\xD0\xCA\xCB\xC8\u20AC\xCD\xCE\xCF\u2518\u250C\u2588\u2584\xA6\xCC\u2580\xD3\xDF\xD4\xD2\xF5\xD5\xB5\xFE\xDE\xDA\xDB\xD9\xFD\xDD\xAF\xB4\xAD\xB1\u2017\xBE\xB6\xA7\xF7\xB8\xB0\xA8\xB7\xB9\xB3\xB2\u25A0 "
  };
  CHARMAPS.cp858 = CHARMAPS.cp437.slice(0, 128) + CHARMAPS.cp858;
  CHARMAPS.ascii = CHARMAPS.cp437.split("").map((c, i2) => i2 > 31 && i2 < 128 ? c : ".").join("");

  // src/buffer.js
  var BLOCK_SIZE = 256;
  var ASYNC_SAFE = false;
  function SyncBuffer(buffer) {
    dbg_assert(buffer instanceof ArrayBuffer);
    this.buffer = buffer;
    this.byteLength = buffer.byteLength;
    this.onload = void 0;
    this.onprogress = void 0;
  }
  SyncBuffer.prototype.load = function() {
    this.onload && this.onload({ buffer: this.buffer });
  };
  SyncBuffer.prototype.get = function(start, len, fn) {
    dbg_assert(start + len <= this.byteLength);
    fn(new Uint8Array(this.buffer, start, len));
  };
  SyncBuffer.prototype.get_and_cache = function(start, len, fn) {
    this.get(start, len, fn);
  };
  SyncBuffer.prototype.get_from_cache = function(start, len) {
    dbg_assert(start + len <= this.byteLength);
    return new Uint8Array(this.buffer, start, len);
  };
  SyncBuffer.prototype.set = function(start, slice, fn) {
    dbg_assert(start + slice.byteLength <= this.byteLength);
    new Uint8Array(this.buffer, start, slice.byteLength).set(slice);
    fn();
  };
  SyncBuffer.prototype.get_buffer = function(fn) {
    fn(this.buffer);
  };
  SyncBuffer.prototype.get_state = function() {
    const state = [];
    state[0] = this.byteLength;
    state[1] = new Uint8Array(this.buffer);
    return state;
  };
  SyncBuffer.prototype.set_state = function(state) {
    this.byteLength = state[0];
    this.buffer = state[1].slice().buffer;
  };
  function AsyncXHRBuffer(filename, size, fixed_chunk_size) {
    this.filename = filename;
    this.byteLength = size;
    this.block_cache = /* @__PURE__ */ new Map();
    this.block_cache_is_write = /* @__PURE__ */ new Set();
    this.fixed_chunk_size = fixed_chunk_size;
    this.cache_reads = !!fixed_chunk_size;
    this.onload = void 0;
    this.onprogress = void 0;
  }
  AsyncXHRBuffer.prototype.load = async function() {
    if (this.byteLength !== void 0) {
      this.onload && this.onload(/* @__PURE__ */ Object.create(null));
      return;
    }
    const size = await get_file_size(this.filename);
    this.byteLength = size;
    this.onload && this.onload(/* @__PURE__ */ Object.create(null));
  };
  AsyncXHRBuffer.prototype.get_from_cache = function(offset, len) {
    var number_of_blocks = len / BLOCK_SIZE;
    var block_index = offset / BLOCK_SIZE;
    for (var i2 = 0; i2 < number_of_blocks; i2++) {
      var block = this.block_cache.get(block_index + i2);
      if (!block) {
        return;
      }
    }
    if (number_of_blocks === 1) {
      return this.block_cache.get(block_index);
    } else {
      var result = new Uint8Array(len);
      for (var i2 = 0; i2 < number_of_blocks; i2++) {
        result.set(this.block_cache.get(block_index + i2), i2 * BLOCK_SIZE);
      }
      return result;
    }
  };
  AsyncXHRBuffer.prototype.get = function(offset, len, fn, options) {
    dbg_assert(offset + len <= this.byteLength);
    dbg_assert(offset % BLOCK_SIZE === 0);
    dbg_assert(len % BLOCK_SIZE === 0);
    dbg_assert(len);
    var block = this.get_from_cache(offset, len);
    if (block) {
      if (ASYNC_SAFE) {
        setTimeout(fn.bind(this, block), 0);
      } else {
        fn(block);
      }
      return;
    }
    var requested_start = offset;
    var requested_length = len;
    if (this.fixed_chunk_size) {
      requested_start = offset - offset % this.fixed_chunk_size;
      requested_length = Math.ceil((offset - requested_start + len) / this.fixed_chunk_size) * this.fixed_chunk_size;
    }
    load_file(this.filename, {
      done: function done(buffer) {
        var block2 = new Uint8Array(buffer);
        this.handle_read(requested_start, requested_length, block2);
        if (requested_start === offset && requested_length === len) {
          fn(block2);
        } else {
          fn(block2.subarray(offset - requested_start, offset - requested_start + len));
        }
      }.bind(this),
      range: { start: requested_start, length: requested_length },
      signal: options?.signal
    });
  };
  AsyncXHRBuffer.prototype.get_and_cache = function(offset, len, fn, options) {
    this.get(offset, len, function(block) {
      const start_block = offset / BLOCK_SIZE;
      const block_count = len / BLOCK_SIZE;
      for (let i2 = 0; i2 < block_count; i2++) {
        if (!this.block_cache.has(start_block + i2)) {
          this.block_cache.set(start_block + i2, block.slice(i2 * BLOCK_SIZE, (i2 + 1) * BLOCK_SIZE));
        }
      }
      fn(block);
    }.bind(this), options);
  };
  AsyncXHRBuffer.prototype.set = function(start, data, fn) {
    var len = data.length;
    dbg_assert(start + data.byteLength <= this.byteLength);
    dbg_assert(start % BLOCK_SIZE === 0);
    dbg_assert(len % BLOCK_SIZE === 0);
    dbg_assert(len);
    var start_block = start / BLOCK_SIZE;
    var block_count = len / BLOCK_SIZE;
    for (var i2 = 0; i2 < block_count; i2++) {
      var block = this.block_cache.get(start_block + i2);
      if (block === void 0) {
        const data_slice = data.slice(i2 * BLOCK_SIZE, (i2 + 1) * BLOCK_SIZE);
        this.block_cache.set(start_block + i2, data_slice);
      } else {
        const data_slice = data.subarray(i2 * BLOCK_SIZE, (i2 + 1) * BLOCK_SIZE);
        dbg_assert(block.byteLength === data_slice.length);
        block.set(data_slice);
      }
      this.block_cache_is_write.add(start_block + i2);
    }
    fn();
  };
  AsyncXHRBuffer.prototype.handle_read = function(offset, len, block) {
    var start_block = offset / BLOCK_SIZE;
    var block_count = len / BLOCK_SIZE;
    for (var i2 = 0; i2 < block_count; i2++) {
      const cached_block = this.block_cache.get(start_block + i2);
      if (cached_block) {
        block.set(cached_block, i2 * BLOCK_SIZE);
      } else if (this.cache_reads) {
        this.block_cache.set(start_block + i2, block.slice(i2 * BLOCK_SIZE, (i2 + 1) * BLOCK_SIZE));
      }
    }
  };
  AsyncXHRBuffer.prototype.get_buffer = function(fn) {
    fn();
  };
  AsyncXHRBuffer.prototype.get_state = function() {
    const state = [];
    const block_cache = [];
    for (const [index, block] of this.block_cache) {
      dbg_assert(isFinite(index));
      if (this.block_cache_is_write.has(index)) {
        block_cache.push([index, block]);
      }
    }
    state[0] = block_cache;
    return state;
  };
  AsyncXHRBuffer.prototype.set_state = function(state) {
    const block_cache = state[0];
    this.block_cache.clear();
    this.block_cache_is_write.clear();
    for (const [index, block] of block_cache) {
      dbg_assert(isFinite(index));
      this.block_cache.set(index, block);
      this.block_cache_is_write.add(index);
    }
  };
  function AsyncXHRPartfileBuffer(filename, size, fixed_chunk_size, partfile_alt_format, zstd_decompress) {
    const parts = filename.match(/\.[^\.]+(\.zst)?$/);
    this.extension = parts ? parts[0] : "";
    this.basename = filename.substring(0, filename.length - this.extension.length);
    this.is_zstd = this.extension.endsWith(".zst");
    if (!this.basename.endsWith("/")) {
      this.basename += "-";
    }
    this.block_cache = /* @__PURE__ */ new Map();
    this.block_cache_is_write = /* @__PURE__ */ new Set();
    this.byteLength = size;
    this.fixed_chunk_size = fixed_chunk_size;
    this.partfile_alt_format = !!partfile_alt_format;
    this.zstd_decompress = zstd_decompress;
    this.cache_reads = !!fixed_chunk_size;
    this.onload = void 0;
    this.onprogress = void 0;
  }
  AsyncXHRPartfileBuffer.prototype.load = function() {
    if (this.byteLength !== void 0) {
      this.onload && this.onload(/* @__PURE__ */ Object.create(null));
      return;
    }
    dbg_assert(false);
    this.onload && this.onload(/* @__PURE__ */ Object.create(null));
  };
  AsyncXHRPartfileBuffer.prototype.get = function(offset, len, fn, options) {
    dbg_assert(offset + len <= this.byteLength);
    dbg_assert(offset % BLOCK_SIZE === 0);
    dbg_assert(len % BLOCK_SIZE === 0);
    dbg_assert(len);
    const block = this.get_from_cache(offset, len);
    if (block) {
      if (ASYNC_SAFE) {
        setTimeout(fn.bind(this, block), 0);
      } else {
        fn(block);
      }
      return;
    }
    if (this.fixed_chunk_size) {
      const start_index = Math.floor(offset / this.fixed_chunk_size);
      const m_offset = offset - start_index * this.fixed_chunk_size;
      dbg_assert(m_offset >= 0);
      const total_count = Math.ceil((m_offset + len) / this.fixed_chunk_size);
      const blocks = new Uint8Array(total_count * this.fixed_chunk_size);
      let finished = 0;
      for (let i2 = 0; i2 < total_count; i2++) {
        const offset2 = (start_index + i2) * this.fixed_chunk_size;
        const part_filename = this.partfile_alt_format ? (
          // matches output of gnu split:
          //   split -b 512 -a8 -d --additional-suffix .img w95.img w95-
          this.basename + (start_index + i2 + "").padStart(8, "0") + this.extension
        ) : this.basename + offset2 + "-" + (offset2 + this.fixed_chunk_size) + this.extension;
        const block2 = this.get_from_cache(offset2, this.fixed_chunk_size);
        if (block2) {
          blocks.set(block2, i2 * this.fixed_chunk_size);
          finished++;
          if (finished === total_count) {
            fn(blocks.subarray(m_offset, m_offset + len));
          }
        } else {
          load_file(part_filename, {
            done: async function done(buffer) {
              let block3 = new Uint8Array(buffer);
              if (this.is_zstd) {
                const decompressed = await this.zstd_decompress(this.fixed_chunk_size, block3);
                block3 = new Uint8Array(decompressed);
              }
              blocks.set(block3, i2 * this.fixed_chunk_size);
              this.handle_read((start_index + i2) * this.fixed_chunk_size, this.fixed_chunk_size | 0, block3);
              finished++;
              if (finished === total_count) {
                fn(blocks.subarray(m_offset, m_offset + len));
              }
            }.bind(this),
            signal: options?.signal
          });
        }
      }
    } else {
      const part_filename = this.basename + offset + "-" + (offset + len) + this.extension;
      load_file(part_filename, {
        done: function done(buffer) {
          dbg_assert(buffer.byteLength === len);
          var block2 = new Uint8Array(buffer);
          this.handle_read(offset, len, block2);
          fn(block2);
        }.bind(this),
        signal: options?.signal
      });
    }
  };
  AsyncXHRPartfileBuffer.prototype.get_from_cache = AsyncXHRBuffer.prototype.get_from_cache;
  AsyncXHRPartfileBuffer.prototype.get_and_cache = AsyncXHRBuffer.prototype.get_and_cache;
  AsyncXHRPartfileBuffer.prototype.set = AsyncXHRBuffer.prototype.set;
  AsyncXHRPartfileBuffer.prototype.handle_read = AsyncXHRBuffer.prototype.handle_read;
  AsyncXHRPartfileBuffer.prototype.get_state = AsyncXHRBuffer.prototype.get_state;
  AsyncXHRPartfileBuffer.prototype.set_state = AsyncXHRBuffer.prototype.set_state;
  function SyncFileBuffer(file) {
    this.file = file;
    this.byteLength = file.size;
    if (file.size > 1 << 30) {
      console.warn("SyncFileBuffer: Allocating buffer of " + (file.size >> 20) + " MB ...");
    }
    this.buffer = new ArrayBuffer(file.size);
    this.onload = void 0;
    this.onprogress = void 0;
  }
  SyncFileBuffer.prototype.load = function() {
    this.load_next(0);
  };
  SyncFileBuffer.prototype.load_next = function(start) {
    const PART_SIZE = 4 << 20;
    var filereader = new FileReader();
    filereader.onload = function(e) {
      var buffer = new Uint8Array(e.target.result);
      new Uint8Array(this.buffer, start).set(buffer);
      this.load_next(start + PART_SIZE);
    }.bind(this);
    if (this.onprogress) {
      this.onprogress({
        loaded: start,
        total: this.byteLength,
        lengthComputable: true
      });
    }
    if (start < this.byteLength) {
      var end = Math.min(start + PART_SIZE, this.byteLength);
      var slice = this.file.slice(start, end);
      filereader.readAsArrayBuffer(slice);
    } else {
      this.file = void 0;
      this.onload && this.onload({ buffer: this.buffer });
    }
  };
  SyncFileBuffer.prototype.get = SyncBuffer.prototype.get;
  SyncFileBuffer.prototype.get_and_cache = SyncBuffer.prototype.get_and_cache;
  SyncFileBuffer.prototype.get_from_cache = SyncBuffer.prototype.get_from_cache;
  SyncFileBuffer.prototype.set = SyncBuffer.prototype.set;
  SyncFileBuffer.prototype.get_buffer = SyncBuffer.prototype.get_buffer;
  SyncFileBuffer.prototype.get_state = SyncBuffer.prototype.get_state;
  SyncFileBuffer.prototype.set_state = SyncBuffer.prototype.set_state;
  function AsyncFileBuffer(file) {
    this.file = file;
    this.byteLength = file.size;
    this.block_cache = /* @__PURE__ */ new Map();
    this.block_cache_is_write = /* @__PURE__ */ new Set();
    this.onload = void 0;
    this.onprogress = void 0;
  }
  AsyncFileBuffer.prototype.load = function() {
    this.onload && this.onload(/* @__PURE__ */ Object.create(null));
  };
  AsyncFileBuffer.prototype.get = function(offset, len, fn) {
    dbg_assert(offset % BLOCK_SIZE === 0);
    dbg_assert(len % BLOCK_SIZE === 0);
    dbg_assert(len);
    var block = this.get_from_cache(offset, len);
    if (block) {
      fn(block);
      return;
    }
    var fr = new FileReader();
    fr.onload = function(e) {
      var buffer = e.target.result;
      var block2 = new Uint8Array(buffer);
      this.handle_read(offset, len, block2);
      fn(block2);
    }.bind(this);
    fr.readAsArrayBuffer(this.file.slice(offset, offset + len));
  };
  AsyncFileBuffer.prototype.get_from_cache = AsyncXHRBuffer.prototype.get_from_cache;
  AsyncFileBuffer.prototype.get_and_cache = AsyncXHRBuffer.prototype.get_and_cache;
  AsyncFileBuffer.prototype.set = AsyncXHRBuffer.prototype.set;
  AsyncFileBuffer.prototype.handle_read = AsyncXHRBuffer.prototype.handle_read;
  AsyncFileBuffer.prototype.get_state = AsyncXHRBuffer.prototype.get_state;
  AsyncFileBuffer.prototype.set_state = AsyncXHRBuffer.prototype.set_state;
  AsyncFileBuffer.prototype.get_buffer = function(fn) {
    fn();
  };
  AsyncFileBuffer.prototype.get_as_file = function(name) {
    var parts = [];
    var existing_blocks = Array.from(this.block_cache.keys()).sort(function(x, y) {
      return x - y;
    });
    var current_offset = 0;
    for (var i2 = 0; i2 < existing_blocks.length; i2++) {
      var block_index = existing_blocks[i2];
      var block = this.block_cache.get(block_index);
      var start = block_index * BLOCK_SIZE;
      dbg_assert(start >= current_offset);
      if (start !== current_offset) {
        parts.push(this.file.slice(current_offset, start));
        current_offset = start;
      }
      parts.push(block);
      current_offset += block.length;
    }
    if (current_offset !== this.file.size) {
      parts.push(this.file.slice(current_offset));
    }
    var file = new File(parts, name);
    dbg_assert(file.size === this.file.size);
    return file;
  };

  // src/iso9660.js
  var BLOCK_SIZE2 = 2 * 1024;
  var FILE_FLAGS_HIDDEN = 1 << 0;
  var FILE_FLAGS_DIRECTORY = 1 << 1;
  var FILE_FLAGS_ASSOCIATED_FILE = 1 << 2;
  var FILE_FLAGS_HAS_EXTENDED_ATTRIBUTE_RECORD = 1 << 3;
  var FILE_FLAGS_HAS_PERMISSIONS = 1 << 4;
  var FILE_FLAGS_NOT_FINAL = 1 << 7;
  var SYSTEM_ID = "V86";
  var VOLUME_ID = "CDROM";
  function generate(files) {
    const te = new TextEncoder();
    const date = /* @__PURE__ */ new Date();
    const write8 = (b2, v) => {
      b2.buffer[b2.offset++] = v;
    };
    const write_le16 = (b2, v) => {
      b2.buffer[b2.offset++] = v;
      b2.buffer[b2.offset++] = v >> 8;
    };
    const write_le32 = (b2, v) => {
      b2.buffer[b2.offset++] = v;
      b2.buffer[b2.offset++] = v >> 8;
      b2.buffer[b2.offset++] = v >> 16;
      b2.buffer[b2.offset++] = v >> 24;
    };
    const write_be16 = (b2, v) => {
      b2.buffer[b2.offset++] = v >> 8;
      b2.buffer[b2.offset++] = v;
    };
    const write_be32 = (b2, v) => {
      b2.buffer[b2.offset++] = v >> 24;
      b2.buffer[b2.offset++] = v >> 16;
      b2.buffer[b2.offset++] = v >> 8;
      b2.buffer[b2.offset++] = v;
    };
    const write_lebe16 = (b2, v) => {
      write_le16(b2, v);
      write_be16(b2, v);
    };
    const write_lebe32 = (b2, v) => {
      write_le32(b2, v);
      write_be32(b2, v);
    };
    const fill = (b2, len, v) => {
      b2.buffer.fill(v, b2.offset, b2.offset += len);
    };
    const write_ascii = (b2, v) => {
      b2.offset += te.encodeInto(v, b2.buffer.subarray(b2.offset)).written;
    };
    const write_padded_ascii = (b2, len, v) => {
      b2.offset += te.encodeInto(v.padEnd(len), b2.buffer.subarray(b2.offset)).written;
    };
    const write_dummy_date_ascii = (b2) => {
      fill(b2, 16, 32);
      write8(b2, 0);
    };
    const write_date_compact = (b2) => {
      write8(b2, date.getUTCFullYear() - 1900);
      write8(b2, 1 + date.getUTCMonth());
      write8(b2, date.getUTCDate());
      write8(b2, date.getUTCHours());
      write8(b2, date.getUTCMinutes());
      write8(b2, date.getUTCSeconds());
      write8(b2, 0);
    };
    const skip = (b2, len) => {
      b2.offset += len;
    };
    const write_utf16be = (b2, v) => {
      for (let i2 = 0; i2 < v.length; i2++) write_be16(b2, v.charCodeAt(i2));
      return v.length * 2;
    };
    const write_padded_utf16be = (b2, len, v) => write_utf16be(b2, v.padEnd(len / 2));
    const write_record = (b2, name, flags, is_special, lba, len, joliet) => {
      const START = b2.offset;
      const NAME_OFFSET = 33;
      let name_len = 0;
      if (joliet) {
        name = sanitise_filename_joliet(name);
        let name_buffer = {
          buffer: b2.buffer,
          offset: START + NAME_OFFSET
        };
        name_len = write_utf16be(name_buffer, name);
      } else {
        if (!is_special) name = sanitise_filename(name) + ";1";
        name_len = te.encodeInto(name, b2.buffer.subarray(b2.offset + NAME_OFFSET)).written;
      }
      const pad = name_len & 1 ? 0 : 1;
      const len_field = 33 + name_len + pad;
      dbg_assert(len_field < 256);
      write8(b2, len_field);
      write8(b2, 0);
      write_lebe32(b2, lba);
      write_lebe32(b2, len);
      write_date_compact(b2);
      write8(b2, flags);
      write8(b2, 0);
      write8(b2, 0);
      write_lebe16(b2, 1);
      write8(b2, name_len);
      dbg_assert(b2.offset === START + NAME_OFFSET);
      skip(b2, name_len + pad);
      dbg_assert(b2.offset === START + len_field);
    };
    const write_special_directory_record = (b2, name, lba, len) => write_record(b2, name, FILE_FLAGS_DIRECTORY, true, lba, len, false);
    const write_file_record = (b2, name, lba, len, joliet) => write_record(b2, name, 0, false, lba, len, joliet);
    function round_byte_size_to_block_size(n) {
      return 1 + Math.floor((n - 1) / BLOCK_SIZE2);
    }
    dbg_assert(round_byte_size_to_block_size(0) === 0);
    dbg_assert(round_byte_size_to_block_size(1) === 1);
    dbg_assert(round_byte_size_to_block_size(BLOCK_SIZE2 - 1) === 1);
    dbg_assert(round_byte_size_to_block_size(BLOCK_SIZE2) === 1);
    dbg_assert(round_byte_size_to_block_size(BLOCK_SIZE2 + 1) === 2);
    dbg_assert(round_byte_size_to_block_size(2 * BLOCK_SIZE2) === 2);
    dbg_assert(round_byte_size_to_block_size(2 * BLOCK_SIZE2 + 1) === 3);
    dbg_assert(round_byte_size_to_block_size(10 * BLOCK_SIZE2 + 1) === 11);
    function to_msdos_filename(name) {
      const dot = name.lastIndexOf(".");
      if (dot === -1) return name.substr(0, 8);
      return name.substr(0, Math.min(8, dot)) + "." + name.substr(dot + 1, 3);
    }
    dbg_assert(to_msdos_filename("abcdefghijkl.qwerty") === "abcdefgh.qwe");
    dbg_assert(to_msdos_filename("abcdefghijkl") === "abcdefgh");
    function sanitise_filename(name) {
      return to_msdos_filename(name.toUpperCase().replace(/[^A-Z0-9_.]/g, ""));
    }
    function sanitise_filename_joliet(name) {
      return name.replace(/[*\/:;?\\]/g, "");
    }
    const SYSTEM_AREA_SIZE = 16 * BLOCK_SIZE2;
    const PRIMARY_VOLUME_LBA = 16;
    const SUPPLEMENTARY_VOLUME_LBA = 17;
    const VOLUME_SET_TERMINATOR_LBA = 18;
    const LE_PATH_TABLE_LBA = 19;
    const LE_PATH_TABLE_JOLIET_LBA = 20;
    const BE_PATH_TABLE_LBA = 21;
    const BE_PATH_TABLE_JOLIET_LBA = 22;
    const ROOT_DIRECTORY_LBA = 23;
    const ROOT_DIRECTORY_JOLIET_LBA = 24;
    const LE_PATH_TABLE_SIZE = BLOCK_SIZE2;
    const BE_PATH_TABLE_SIZE = BLOCK_SIZE2;
    const ROOT_DIRECTORY_SIZE = BLOCK_SIZE2;
    const write_volume_descriptor = (is_supplementary) => {
      const VD_OFFSET = (is_supplementary ? SUPPLEMENTARY_VOLUME_LBA : PRIMARY_VOLUME_LBA) * BLOCK_SIZE2;
      write8(buffer, is_supplementary ? 2 : 1);
      write_ascii(buffer, "CD001");
      write8(buffer, 1);
      write8(buffer, 0);
      if (is_supplementary) {
        write_padded_utf16be(buffer, 32, SYSTEM_ID);
        write_padded_utf16be(buffer, 32, VOLUME_ID);
      } else {
        write_padded_ascii(buffer, 32, SYSTEM_ID);
        write_padded_ascii(buffer, 32, VOLUME_ID);
      }
      skip(buffer, 8);
      write_lebe32(buffer, N_LBAS);
      if (is_supplementary) {
        write_ascii(buffer, "%/C");
        skip(buffer, 29);
      } else {
        skip(buffer, 32);
      }
      dbg_assert(buffer.offset === VD_OFFSET + 120);
      write_lebe16(buffer, 1);
      write_lebe16(buffer, 1);
      dbg_assert(buffer.offset === VD_OFFSET + 128);
      write_lebe16(buffer, BLOCK_SIZE2);
      write_lebe32(buffer, 10);
      write_le32(buffer, is_supplementary ? LE_PATH_TABLE_JOLIET_LBA : LE_PATH_TABLE_LBA);
      write_le32(buffer, 0);
      write_be32(buffer, is_supplementary ? BE_PATH_TABLE_JOLIET_LBA : BE_PATH_TABLE_LBA);
      write_be32(buffer, 0);
      dbg_assert(buffer.offset === VD_OFFSET + 156);
      write_special_directory_record(buffer, "\0", is_supplementary ? ROOT_DIRECTORY_JOLIET_LBA : ROOT_DIRECTORY_LBA, 2048);
      dbg_assert(buffer.offset === VD_OFFSET + 190);
      fill(buffer, 128, 32);
      fill(buffer, 128, 32);
      fill(buffer, 128, 32);
      fill(buffer, 128, 32);
      fill(buffer, 37, 32);
      fill(buffer, 37, 32);
      fill(buffer, 37, 32);
      dbg_assert(buffer.offset === VD_OFFSET + 813);
      write_dummy_date_ascii(buffer);
      write_dummy_date_ascii(buffer);
      write_dummy_date_ascii(buffer);
      write_dummy_date_ascii(buffer);
      write8(buffer, 1);
      dbg_assert(buffer.offset === VD_OFFSET + 882);
      write8(buffer, 0);
      skip(buffer, 512);
      skip(buffer, 653);
    };
    const write_path_table = (start_lba, root_lba, is_le) => {
      buffer.offset = start_lba * BLOCK_SIZE2;
      write8(buffer, 1);
      write8(buffer, 0);
      if (is_le) {
        write_le32(buffer, root_lba);
        write_le16(buffer, 1);
      } else {
        write_be32(buffer, root_lba);
        write_be16(buffer, 1);
      }
      write_ascii(buffer, "\0");
    };
    let next_file_lba = 25;
    const iso_files = files.map(({ name, contents }) => {
      const lba = next_file_lba;
      next_file_lba += round_byte_size_to_block_size(contents.length);
      return { name, contents, lba };
    });
    const write_root_directory = (start_lba, joliet) => {
      write_special_directory_record(buffer, "\0", start_lba, 2048);
      write_special_directory_record(buffer, "", start_lba, 2048);
      for (const { name, contents, lba } of iso_files) {
        write_file_record(buffer, joliet ? name : to_msdos_filename(name), lba, contents.length, joliet);
      }
    };
    const N_LBAS = next_file_lba;
    const total_size = N_LBAS * BLOCK_SIZE2;
    const buffer = {
      buffer: new Uint8Array(total_size),
      offset: SYSTEM_AREA_SIZE
    };
    dbg_assert(buffer.offset === PRIMARY_VOLUME_LBA * BLOCK_SIZE2);
    write_volume_descriptor(false);
    dbg_assert(buffer.offset === SUPPLEMENTARY_VOLUME_LBA * BLOCK_SIZE2);
    write_volume_descriptor(true);
    dbg_assert(buffer.offset === VOLUME_SET_TERMINATOR_LBA * BLOCK_SIZE2);
    write8(buffer, 255);
    write_ascii(buffer, "CD001");
    write8(buffer, 1);
    write_path_table(LE_PATH_TABLE_LBA, ROOT_DIRECTORY_LBA, true);
    dbg_assert(buffer.offset < LE_PATH_TABLE_LBA * BLOCK_SIZE2 + LE_PATH_TABLE_SIZE);
    write_path_table(LE_PATH_TABLE_JOLIET_LBA, ROOT_DIRECTORY_JOLIET_LBA, true);
    dbg_assert(buffer.offset < LE_PATH_TABLE_JOLIET_LBA * BLOCK_SIZE2 + LE_PATH_TABLE_SIZE);
    write_path_table(BE_PATH_TABLE_LBA, ROOT_DIRECTORY_LBA, false);
    dbg_assert(buffer.offset < BE_PATH_TABLE_LBA * BLOCK_SIZE2 + BE_PATH_TABLE_SIZE);
    write_path_table(BE_PATH_TABLE_JOLIET_LBA, ROOT_DIRECTORY_JOLIET_LBA, false);
    dbg_assert(buffer.offset < BE_PATH_TABLE_JOLIET_LBA * BLOCK_SIZE2 + BE_PATH_TABLE_SIZE);
    buffer.offset = ROOT_DIRECTORY_LBA * BLOCK_SIZE2;
    write_root_directory(ROOT_DIRECTORY_LBA, false);
    dbg_assert(buffer.offset < ROOT_DIRECTORY_LBA * BLOCK_SIZE2 + ROOT_DIRECTORY_SIZE);
    buffer.offset = ROOT_DIRECTORY_JOLIET_LBA * BLOCK_SIZE2;
    write_root_directory(ROOT_DIRECTORY_JOLIET_LBA, true);
    dbg_assert(buffer.offset < ROOT_DIRECTORY_JOLIET_LBA * BLOCK_SIZE2 + ROOT_DIRECTORY_SIZE);
    for (let { contents, lba } of iso_files) {
      buffer.buffer.set(contents, lba * BLOCK_SIZE2);
    }
    return buffer.buffer;
  }

  // src/browser/memory-painter-core.js
  function geometry(byteLength) {
    if (!Number.isSafeInteger(byteLength) || byteLength <= 0) throw new RangeError("Invalid RAM size");
    return { byteLength, side: Math.ceil(Math.sqrt(Math.ceil(byteLength / 3))) };
  }
  function addressOf(g, x, y) {
    return (y * g.side + x) * 3;
  }
  function stamp(g, write, cx, cy, diameter, rgb) {
    diameter = Math.max(1, Math.min(256, Math.trunc(diameter) || 1));
    const left = cx - Math.floor(diameter / 2), top = cy - Math.floor(diameter / 2);
    const centerX = left + (diameter - 1) / 2, centerY = top + (diameter - 1) / 2;
    let count = 0;
    for (let y = Math.max(0, top); y < Math.min(g.side, top + diameter); y++) {
      const extent = Math.sqrt(Math.max(0, (diameter / 2) ** 2 - (y - centerY) ** 2));
      const x0 = Math.max(0, Math.ceil(centerX - extent));
      const x1 = Math.min(g.side - 1, Math.floor(centerX + extent));
      const address = addressOf(g, x0, y);
      const length = Math.min((x1 - x0 + 1) * 3, g.byteLength - address);
      if (length <= 0) continue;
      const bytes = new Uint8Array(length);
      for (let i2 = 0; i2 < length; i2++) bytes[i2] = rgb[i2 % 3];
      write(bytes, address);
      count += length;
    }
    return count;
  }
  function renderViewport(g, ram, rgba, width, height, scale, ox, oy) {
    const columns = new Int32Array(width);
    for (let x = 0; x < width; x++) columns[x] = Math.floor((x + 0.5 - ox) / scale);
    for (let y = 0, p = 0; y < height; y++) {
      const sy = Math.floor((y + 0.5 - oy) / scale), row = sy * g.side;
      for (let x = 0; x < width; x++, p += 4) {
        const sx = columns[x], address = (row + sx) * 3;
        if (sy < 0 || sy >= g.side || sx < 0 || sx >= g.side) {
          rgba[p] = rgba[p + 1] = rgba[p + 2] = 221;
        } else if (address >= g.byteLength) {
          rgba[p] = rgba[p + 1] = rgba[p + 2] = (sx + sy) % 8 < 4 ? 100 : 160;
        } else {
          rgba[p] = ram[address];
          rgba[p + 1] = ram[address + 1] ?? 0;
          rgba[p + 2] = ram[address + 2] ?? 0;
        }
        rgba[p + 3] = 255;
      }
    }
  }

  // src/browser/memory-target.js
  function createMemoryTarget(emulator, mode) {
    const cpu = emulator.v86.cpu;
    if (mode === "ram") return {
      key: "ram",
      kind: "RAM",
      byteLength: cpu.memory_size[0],
      read: (offset, length) => emulator.read_memory(offset, length),
      write: (bytes2, offset) => emulator.write_memory(bytes2, offset),
      flush() {
      }
    };
    const vga = cpu.devices.vga;
    const svga = vga.svga_enabled;
    const bytes = svga ? vga.svga_memory : vga.vga_memory;
    let dirty = false;
    return {
      key: svga ? "svga" : "vga",
      kind: svga ? "SVGA" : "VGA",
      byteLength: bytes.length,
      read: (offset, length) => bytes.subarray(offset, offset + length),
      write(data, offset) {
        bytes.set(data, offset);
        dirty = true;
      },
      flush() {
        if (!dirty) return;
        if (svga) cpu.svga_mark_dirty();
        else if (vga.graphical_mode) vga.complete_replot();
        else {
          vga.set_font_bitmap(true);
          vga.complete_redraw();
        }
        dirty = false;
      }
    };
  }

  // src/browser/memory-changes.js
  var PAGE_SIZE = 65536;
  var MemoryChanges = class {
    constructor(byteLength) {
      this.byteLength = byteLength;
      this.seen = new Uint8Array(Math.ceil(byteLength / PAGE_SIZE));
      this.pages = /* @__PURE__ */ new Map();
      this.cursor = 0;
      this.latest = null;
    }
    recordWrite(before, after, offset) {
      for (let i2 = 0; i2 < after.length; i2++) if (before[i2] !== after[i2]) this.latest = offset + i2;
    }
    scan(read, maxPages = 16, budgetMs = 2, now = () => performance.now()) {
      const start = now();
      for (let count = 0; count < Math.min(maxPages, this.seen.length); count++) {
        const page = this.cursor, offset = page * PAGE_SIZE;
        const current = read(offset, Math.min(PAGE_SIZE, this.byteLength - offset));
        const previous = this.pages.get(page);
        const words = new Uint32Array(current.buffer, current.byteOffset, current.length >>> 2);
        const oldWords = previous && new Uint32Array(previous.buffer, previous.byteOffset, previous.length >>> 2);
        let nonzero = false, last = -1;
        for (let i2 = 0; i2 < words.length; i2++) {
          const value = words[i2], old = oldWords ? oldWords[i2] : 0;
          nonzero || (nonzero = value !== 0);
          if (value !== old) {
            for (let j = i2 * 4; j < i2 * 4 + 4; j++) if (current[j] !== (previous?.[j] ?? 0)) last = j;
            if (oldWords) oldWords[i2] = value;
          }
        }
        for (let i2 = words.length * 4; i2 < current.length; i2++) {
          nonzero || (nonzero = current[i2] !== 0);
          if (current[i2] !== (previous?.[i2] ?? 0)) last = i2;
          if (previous) previous[i2] = current[i2];
        }
        if (last >= 0 && this.seen[page]) this.latest = offset + last;
        if (!nonzero) this.pages.delete(page);
        else if (!previous) this.pages.set(page, current.slice());
        this.seen[page] = 1;
        this.cursor = (page + 1) % this.seen.length;
        if (now() - start >= budgetMs) break;
      }
      return this.latest;
    }
  };

  // src/browser/memory-png.js
  var crcTable = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
    crcTable[n] = c >>> 0;
  }
  function chunk(type, data) {
    const result = new Uint8Array(data.length + 12), view = new DataView(result.buffer);
    view.setUint32(0, data.length);
    for (let i2 = 0; i2 < 4; i2++) result[4 + i2] = type.charCodeAt(i2);
    result.set(data, 8);
    let crc = 4294967295;
    for (let i2 = 4; i2 < result.length - 4; i2++) crc = crcTable[(crc ^ result[i2]) & 255] ^ crc >>> 8;
    view.setUint32(result.length - 4, (crc ^ 4294967295) >>> 0);
    return result;
  }
  async function memoryPNG(read, byteLength, kind) {
    const { side } = geometry(byteLength), header = new Uint8Array(13), view = new DataView(header.buffer);
    view.setUint32(0, side);
    view.setUint32(4, side);
    header[8] = 8;
    header[9] = 2;
    const text = new TextEncoder();
    const pieces = [
      new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]),
      chunk("IHDR", header),
      chunk("tEXt", text.encode("MemoryBytes\0" + byteLength)),
      chunk("tEXt", text.encode("MemoryKind\0" + kind))
    ];
    const stream = new CompressionStream("deflate"), writer = stream.writable.getWriter(), reader = stream.readable.getReader();
    const consume = (async () => {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        pieces.push(chunk("IDAT", value));
      }
    })();
    consume.catch(() => {
    });
    try {
      const rowBytes = side * 3;
      for (let y = 0; y < side; y++) {
        const row = new Uint8Array(rowBytes + 1), offset = y * rowBytes;
        if (offset < byteLength) row.set(read(offset, Math.min(rowBytes, byteLength - offset)), 1);
        await writer.write(row);
        if (y % 64 === 63) await new Promise((resolve) => setTimeout(resolve, 0));
      }
      await writer.close();
      await consume;
    } catch (error) {
      await Promise.allSettled([writer.abort(error), reader.cancel(error)]);
      throw error;
    }
    pieces.push(chunk("IEND", new Uint8Array()));
    return new Blob(pieces, { type: "image/png" });
  }

  // src/browser/memory-painter.js
  function attachMemoryPainter(emulator) {
    if (!document.getElementById("memory_controls")) return;
    const guestScreen = document.getElementById("screen_container");
    const bench = document.createElement("div");
    bench.id = "memory_workbench";
    guestScreen.before(bench);
    const guest = document.createElement("div");
    guest.id = "memory_guest";
    bench.append(guest);
    guest.append(guestScreen);
    const panel = document.createElement("section");
    panel.id = "memory_painter";
    panel.innerHTML = '<canvas id="mp_canvas" aria-label="Guest memory"></canvas>';
    bench.append(panel);
    const $2 = (id) => document.getElementById("mp_" + id);
    const canvas = $2("canvas"), ctx = canvas.getContext("2d", { alpha: false });
    let g, image, scale = 1, ox = 0, oy = 0, drag, pending = false, total = 0;
    let frameCount = 0, frameStart = performance.now();
    let target;
    let changes;
    let exporting = false;
    const ramView = () => {
      const next = createMemoryTarget(emulator, $2("source").value);
      const size = next.byteLength;
      const changed = target?.key !== next.key || g?.byteLength !== size;
      target?.flush();
      target = next;
      if (changed) {
        g = geometry(size);
        fit();
        changes = new MemoryChanges(size);
        $2("latest").disabled = true;
        drag = void 0;
        $2("kind").textContent = target.kind;
        canvas.setAttribute("aria-label", target.kind);
        $2("ram").textContent = `${(size / 1048576).toLocaleString()} MiB`;
        $2("dimensions").textContent = `${g.side} \xD7 ${g.side}`;
      }
      return target.read(0, size);
    };
    function fit() {
      if (!g) return;
      scale = Math.min(canvas.width, canvas.height) / g.side;
      ox = (canvas.width - g.side * scale) / 2;
      oy = (canvas.height - g.side * scale) / 2;
    }
    function queue() {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        draw();
      });
    }
    function draw() {
      if (document.hidden || !canvas.width || !canvas.height) return;
      const start = performance.now(), ram = ramView();
      if (!image || image.width !== canvas.width || image.height !== canvas.height) image = ctx.createImageData(canvas.width, canvas.height);
      renderViewport(g, ram, image.data, canvas.width, canvas.height, scale, ox, oy);
      ctx.putImageData(image, 0, 0);
      if (scale >= 8) {
        ctx.beginPath();
        ctx.strokeStyle = "#8888";
        ctx.lineWidth = 1;
        for (let x = Math.max(0, Math.ceil(-ox / scale)); x <= Math.min(g.side, (canvas.width - ox) / scale); x++) {
          ctx.moveTo(ox + x * scale, Math.max(0, oy));
          ctx.lineTo(ox + x * scale, Math.min(canvas.height, oy + g.side * scale));
        }
        for (let y = Math.max(0, Math.ceil(-oy / scale)); y <= Math.min(g.side, (canvas.height - oy) / scale); y++) {
          ctx.moveTo(Math.max(0, ox), oy + y * scale);
          ctx.lineTo(Math.min(canvas.width, ox + g.side * scale), oy + y * scale);
        }
        ctx.stroke();
      }
      $2("zoom").textContent = `${Math.round(scale * 100)}%`;
      $2("time").textContent = (performance.now() - start).toFixed(1);
      frameCount++;
    }
    new ResizeObserver(() => {
      canvas.width = Math.round(canvas.clientWidth);
      canvas.height = Math.round(canvas.clientHeight);
      fit();
      queue();
    }).observe(canvas);
    $2("fit").onclick = () => {
      fit();
      queue();
    };
    $2("actual").onclick = () => {
      ox = canvas.width / 2 - (canvas.width / 2 - ox) / scale;
      oy = canvas.height / 2 - (canvas.height / 2 - oy) / scale;
      scale = 1;
      queue();
    };
    $2("go").onclick = () => {
      ramView();
      const value = $2("address").value.trim(), address = /^(0x[0-9a-f]+|\d+)$/i.test(value) ? Number(value) : NaN;
      if (!Number.isSafeInteger(address) || address < 0 || address >= g.byteLength) {
        $2("inspect").textContent = "Out of range";
        return;
      }
      jump(address);
    };
    function jump(address) {
      const n = Math.floor(address / 3);
      scale = Math.max(scale, 8);
      ox = canvas.width / 2 - (n % g.side + 0.5) * scale;
      oy = canvas.height / 2 - (Math.floor(n / g.side) + 0.5) * scale;
      $2("address").value = "0x" + address.toString(16);
      queue();
    }
    $2("latest").onclick = () => {
      if (changes.latest !== null) jump(changes.latest);
    };
    function point(e) {
      const r = canvas.getBoundingClientRect();
      return { x: (e.clientX - r.left) * canvas.width / r.width, y: (e.clientY - r.top) * canvas.height / r.height };
    }
    function pixel(p) {
      return { x: Math.floor((p.x - ox) / scale), y: Math.floor((p.y - oy) / scale) };
    }
    function inside(p) {
      return g && p.x >= 0 && p.y >= 0 && p.x < g.side && p.y < g.side && addressOf(g, p.x, p.y) < g.byteLength;
    }
    function paint(p) {
      if (exporting) return;
      const next = createMemoryTarget(emulator, $2("source").value);
      if (g.byteLength !== next.byteLength || target.key !== next.key) {
        ramView();
        return;
      }
      if (!inside(p)) return;
      const rgb = $2("color").value.match(/[0-9a-f]{2}/gi).map((v) => parseInt(v, 16));
      total += stamp(g, (bytes, address) => {
        changes.recordWrite(target.read(address, bytes.length), bytes, address);
        target.write(bytes, address);
      }, p.x, p.y, Number($2("size").value), rgb);
    }
    canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      const p = point(e), next = Math.max(5e-3, Math.min(64, scale * Math.exp(-e.deltaY * 2e-3)));
      ox = p.x - (p.x - ox) * next / scale;
      oy = p.y - (p.y - oy) * next / scale;
      scale = next;
      queue();
    }, { passive: false });
    canvas.addEventListener("pointerdown", (e) => {
      if (e.button !== 0 && e.button !== 1) return;
      e.preventDefault();
      ramView();
      const p = point(e), q = pixel(p);
      if ($2("tool").value === "pick" && e.button === 0) {
        if (inside(q)) {
          const a = addressOf(g, q.x, q.y), b2 = target.read(a, Math.min(3, g.byteLength - a));
          $2("color").value = "#" + Array.from({ length: 3 }, (_, i2) => (b2[i2] ?? 0).toString(16).padStart(2, "0")).join("");
        }
        return;
      }
      drag = { p, q, pan: e.button === 1 || $2("tool").value === "pan" };
      canvas.setPointerCapture(e.pointerId);
      if (!drag.pan) paint(q);
      target.flush();
      queue();
    });
    canvas.addEventListener("pointermove", (e) => {
      ramView();
      const p = point(e), q = pixel(p);
      if (inside(q)) {
        const a = addressOf(g, q.x, q.y), b2 = target.read(a, Math.min(3, g.byteLength - a));
        $2("inspect").textContent = `0x${a.toString(16).padStart(8, "0")} RGB(${Array.from(b2).join(", ")})`;
      } else $2("inspect").textContent = "-";
      if (!drag) return;
      if (drag.pan) {
        ox += p.x - drag.p.x;
        oy += p.y - drag.p.y;
      } else {
        const clamp = (v) => Math.max(-256, Math.min(g.side + 256, v));
        const start = { x: clamp(drag.q.x), y: clamp(drag.q.y) }, end2 = { x: clamp(q.x), y: clamp(q.y) };
        const dx = end2.x - start.x, dy = end2.y - start.y, spacing = Math.max(1, Math.floor((Number($2("size").value) || 1) / 4));
        const steps = Math.ceil(Math.max(Math.abs(dx), Math.abs(dy)) / spacing);
        for (let i2 = 1; i2 <= steps; i2++) paint({ x: Math.round(start.x + dx * i2 / steps), y: Math.round(start.y + dy * i2 / steps) });
      }
      if (drag) {
        drag.p = p;
        drag.q = q;
      }
      target.flush();
      $2("written").textContent = total.toLocaleString();
      queue();
    });
    const end = () => {
      drag = void 0;
      $2("written").textContent = total.toLocaleString();
      queue();
    };
    for (const name of ["pointerup", "pointercancel", "lostpointercapture"]) canvas.addEventListener(name, end);
    document.addEventListener("pointerdown", (e) => {
      if (panel.contains(e.target) || document.getElementById("memory_controls").contains(e.target)) {
        document.activeElement?.blur();
        emulator.keyboard_set_enabled(false);
      } else if (guestScreen.contains(e.target) || document.pointerLockElement) emulator.keyboard_set_enabled(true);
    }, true);
    $2("live").onchange = () => {
      if ($2("live").checked) queue();
    };
    $2("source").onchange = () => {
      ramView();
      queue();
    };
    async function screenshot(mode) {
      if (exporting) return;
      exporting = true;
      const controls = Array.from(document.querySelectorAll("#runtime_options button, #runtime_options input, #runtime_options select"), (element) => [element, element.disabled]);
      controls.forEach(([element]) => {
        element.disabled = true;
      });
      const wasRunning = emulator.is_running();
      let stopped = false;
      try {
        if (wasRunning) {
          await emulator.stop();
          stopped = true;
        }
        target.flush();
        const source = createMemoryTarget(emulator, mode);
        const blob = await memoryPNG(source.read, source.byteLength, source.kind);
        const url = URL.createObjectURL(blob), link = document.createElement("a");
        link.href = url;
        link.download = `${source.kind.toLowerCase()}-${Date.now()}.png`;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 6e4);
      } catch (error) {
        $2("inspect").textContent = "PNG export failed";
        $2("inspect").title = error.message;
      } finally {
        if (stopped) emulator.run();
        controls.forEach(([element, disabled]) => {
          element.disabled = disabled;
        });
        exporting = false;
      }
    }
    $2("screenshot_ram").onclick = () => screenshot("ram");
    $2("screenshot_vram").onclick = () => screenshot("vram");
    setInterval(() => {
      const next = createMemoryTarget(emulator, $2("source").value);
      if (g.byteLength !== next.byteLength || target.key !== next.key) {
        ramView();
        queue();
      }
      if ($2("live").checked && !document.hidden) queue();
      const now = performance.now();
      if (now - frameStart >= 1e3) {
        $2("fps").textContent = (frameCount * 1e3 / (now - frameStart)).toFixed(1);
        frameCount = 0;
        frameStart = now;
      }
    }, 200);
    ramView();
    queue();
    function trackChanges() {
      if (!document.hidden) {
        const next = createMemoryTarget(emulator, $2("source").value);
        if (target.key !== next.key || g.byteLength !== next.byteLength) ramView();
        changes.scan(target.read);
        $2("latest").disabled = changes.latest === null;
      }
      setTimeout(trackChanges, 32);
    }
    setTimeout(trackChanges, 32);
  }

  // src/browser/memory-mouse-lock.js
  function createMouseLock(emulator, output, doc = document, now = () => performance.now()) {
    let pending = false, locked = false, retryAt = 0, automatic = true;
    const message = (text) => {
      if (output) output.textContent = text;
    };
    doc.addEventListener("pointerlockchange", () => {
      const acquired = !!doc.pointerLockElement;
      if (locked && !acquired) {
        retryAt = now() + 1500;
        automatic = false;
        emulator.bus.send("mouse-click", [false, false, false]);
      }
      locked = acquired;
      message(acquired ? "Captured" : "Released");
    });
    return async function request(explicit = false) {
      if (!emulator.is_running() || doc.pointerLockElement || pending) return;
      if (now() < retryAt) {
        message("Waiting");
        return;
      }
      if (!explicit && !automatic) return;
      pending = true;
      try {
        await emulator.lock_mouse();
      } catch (_) {
        automatic = false;
        retryAt = now() + 1500;
        message("Blocked");
      } finally {
        pending = false;
      }
    };
  }

  // src/browser/main.js
  var ON_LOCALHOST = !location.hostname.endsWith("copy.sh");
  var DEFAULT_NETWORKING_PROXIES = ["wss://relay.widgetry.org/", "ws://localhost:8080/"];
  var DEFAULT_MEMORY_SIZE = 128;
  var DEFAULT_VGA_MEMORY_SIZE = 8;
  var DEFAULT_BOOT_ORDER = 0;
  var DEFAULT_MTU = 1500;
  var DEFAULT_NIC_TYPE = "ne2k";
  var MAX_ARRAY_BUFFER_SIZE_MB = 2e3;
  function query_append() {
    const version = $("version");
    return version ? "?" + version.textContent : "";
  }
  function set_title(text) {
    document.title = text + " - v86" + (false ? " - debug" : "");
    const description = document.querySelector("meta[name=description]");
    description && (description.content = "Running " + text);
  }
  function bool_arg(x) {
    return !!x && x !== "0";
  }
  function format_timestamp(time) {
    if (time < 60) {
      return time + "s";
    } else if (time < 3600) {
      return (time / 60 | 0) + "m " + pad0(time % 60, 2) + "s";
    } else {
      return (time / 3600 | 0) + "h " + pad0((time / 60 | 0) % 60, 2) + "m " + pad0(time % 60, 2) + "s";
    }
  }
  function read_file(file) {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result);
      fr.onerror = (e) => reject(e);
      fr.readAsArrayBuffer(file);
    });
  }
  var progress_ticks = 0;
  function show_progress(e) {
    const el = $("loading");
    el.style.display = "block";
    const file_name = e.file_name.split("?", 1)[0];
    if (file_name.endsWith(".wasm")) {
      const parts = file_name.split("/");
      el.textContent = "Fetching " + parts[parts.length - 1] + " ...";
      return;
    }
    if (e.file_index === e.file_count - 1 && e.loaded >= e.total - 2048) {
      el.textContent = "Done downloading. Starting now ...";
      return;
    }
    let line = "Downloading images ";
    if (typeof e.file_index === "number" && e.file_count) {
      line += "[" + (e.file_index + 1) + "/" + e.file_count + "] ";
    }
    if (e.total && typeof e.loaded === "number") {
      var per100 = Math.floor(e.loaded / e.total * 100);
      per100 = Math.min(100, Math.max(0, per100));
      var per50 = Math.floor(per100 / 2);
      line += per100 + "% [";
      line += "#".repeat(per50);
      line += " ".repeat(50 - per50) + "]";
    } else {
      line += ".".repeat(progress_ticks++ % 50);
    }
    el.textContent = line;
  }
  function $(id) {
    return document.getElementById(id);
  }
  var elements_to_restore = [
    "memory_size",
    "video_memory_size",
    "networking_proxy",
    "disable_audio",
    "enable_acpi",
    "boot_order"
  ];
  for (const item of elements_to_restore) {
    try {
      window.localStorage.removeItem(item);
    } catch (e) {
    }
  }
  function onload() {
    if (!window.WebAssembly) {
      alert("Your browser is not supported because it doesn't support WebAssembly");
      return;
    }
    $("start_emulation").onclick = function(e) {
      start_emulation(null, null);
      $("start_emulation").blur();
      e.preventDefault();
    };
    if (false) {
      debug_onload();
    }
    if (false) {
      $("relay_url").value = "ws://localhost:8080/";
    }
    const query_args = new URLSearchParams(location.search);
    const host = query_args.get("cdn") || "images/";
    const oses = [
      {
        "id": "helenos",
        "memory_size": 268435456,
        "cdrom": {
          "url": host + "HelenOS-0.14.1-ia32.iso",
          "size": 25792512,
          "async": false
        },
        "name": "HelenOS",
        "homepage": "http://www.helenos.org/"
      },
      {
        "id": "msdos",
        "hda": {
          "url": host + "msdos622/.img",
          "size": 67108864,
          "async": true,
          "fixed_chunk_size": 262144,
          "use_parts": true
        },
        "name": "MS-DOS 6.22"
      },
      {
        "id": "msdos4",
        "fda": {
          "url": host + "msdos4.img",
          "size": 1474560
        },
        "name": "MS-DOS 4"
      },
      {
        "id": "freedos",
        "fda": {
          "url": host + "freedos722.img",
          "size": 737280
        },
        "name": "FreeDOS"
      },
      {
        "id": "doof",
        "fda": {
          "url": host + "doof-1440.img",
          "size": 1474560
        },
        "name": "DOOF",
        "homepage": "https://github.com/fragglet/squashware"
      },
      {
        "id": "quantixos",
        "cdrom": {
          "url": host + "quantixos.iso",
          "size": 11784192,
          "async": false
        },
        "name": "QuantixOS",
        "homepage": "https://github.com/MrGilli/QuantixOS"
      },
      {
        "id": "chip4504",
        "fda": {
          "url": host + "chip4504.img",
          "size": 1474560
        },
        "name": "Chip4504",
        "homepage": "https://github.com/RelativisticMechanic/chip4504"
      },
      {
        "id": "chimaeraos",
        "hda": {
          "url": host + "chimaeraos.img",
          "size": 34120704,
          "async": false
        },
        "name": "Chimaera OS",
        "homepage": "https://chimaeraos.org/"
      },
      {
        "id": "xcom",
        "fda": {
          "url": host + "xcom144.img",
          "size": 1474560
        },
        "name": "Freedos with Xcom",
        "homepage": "http://xcom.infora.hu/index.html"
      },
      {
        "id": "86dos",
        "fda": {
          "url": host + "pc86dos.img",
          "size": 163840
        },
        "name": "86-DOS",
        "homepage": "https://www.os2museum.com/wp/pc-86-dos/"
      },
      {
        "id": "oberon",
        "hda": {
          "url": host + "oberon.img",
          "size": 25165824,
          "async": false
        },
        "name": "Oberon"
      },
      {
        "id": "gentleos16",
        "fda": {
          "url": host + "gentleos16-fd1440.img",
          "size": 1474560
        },
        "name": "GentleOS/16",
        "homepage": "https://github.com/luke8086/gentleos"
      },
      {
        "id": "gentleos32",
        "hda": {
          "url": host + "gentleos32-disk.img",
          "size": 8388608,
          "async": false
        },
        "name": "GentleOS/32",
        "homepage": "https://github.com/luke8086/gentleos32"
      },
      {
        "id": "windows1",
        "fda": {
          "url": host + "windows101.img",
          "size": 1474560
        },
        "name": "Windows 1.01"
      },
      {
        "id": "windows2",
        "hda": {
          "url": host + "windows2.img",
          "size": 4177920,
          "async": false
        },
        "name": "Windows 2.03"
      },
      {
        "id": "linux26",
        "cdrom": {
          "url": host + "linux.iso",
          "size": 6547456,
          "async": false
        },
        "name": "Linux"
      },
      {
        "id": "linux3",
        "cdrom": {
          "url": host + "linux3.iso",
          "size": 8638464,
          "async": false
        },
        "name": "Linux"
      },
      {
        "id": "linux4",
        "cdrom": {
          "url": host + "linux4.iso",
          "size": 7731200,
          "async": false
        },
        "name": "Linux",
        "filesystem": {}
      },
      {
        "id": "buildroot",
        "bzimage": {
          "url": host + "buildroot-bzimage.bin",
          "size": 5166352,
          "async": false
        },
        "name": "Buildroot Linux",
        "filesystem": {},
        "cmdline": "tsc=reliable mitigations=off random.trust_cpu=on",
        "mouse_disabled_default": true
      },
      {
        "id": "buildroot6",
        "bzimage": {
          "url": host + "buildroot-bzimage68.bin",
          "size": 10068480,
          "async": false
        },
        "name": "Buildroot Linux 6.8",
        "filesystem": {},
        "cmdline": "tsc=reliable mitigations=off random.trust_cpu=on"
      },
      {
        "id": "xpud",
        "cdrom": {
          "url": host + "xpud-0.9.2.iso",
          "size": 67108864,
          "async": false
        },
        "name": "xPUD",
        "memory_size": 268435456
      },
      {
        "id": "elks",
        "hda": {
          "url": host + "elks-hd32-fat.img",
          "size": 32514048,
          "async": false
        },
        "name": "ELKS",
        "homepage": "https://github.com/ghaerr/elks"
      },
      {
        "id": "nodeos",
        "bzimage": {
          "url": host + "nodeos-kernel.bin",
          "size": 14452e3,
          "async": false
        },
        "name": "NodeOS",
        "cmdline": "tsc=reliable mitigations=off random.trust_cpu=on"
      },
      {
        "id": "dsl",
        "memory_size": 268435456,
        "cdrom": {
          "url": host + "dsl-4.11.rc2.iso",
          "size": 52824064,
          "async": false
        },
        "name": "Damn Small Linux",
        "homepage": "http://www.damnsmalllinux.org/"
      },
      {
        "id": "xwoaf",
        "memory_size": 268435456,
        "cdrom": {
          "url": host + "xwoaf_rebuild4.iso",
          "size": 2205696,
          "async": false
        },
        "name": "xwoaf",
        "homepage": "https://pupngo.dk/xwinflpy/xwoaf_rebuild.html"
      },
      {
        "id": "kolibrios",
        "fda": {
          "url": host + "kolibri.img",
          "size": 1474560
        },
        "name": "KolibriOS",
        "homepage": "https://kolibrios.org/en/"
      },
      {
        "id": "kolibrios-fallback",
        "fda": {
          "url": host + "kolibri.img",
          "size": 1474560
        },
        "name": "KolibriOS"
      },
      {
        "id": "mu",
        "hda": {
          "url": host + "mu-shell.img",
          "size": 10321920,
          "async": false
        },
        "memory_size": 268435456,
        "name": "Mu",
        "homepage": "https://github.com/akkartik/mu",
        "mouse_disabled_default": true
      },
      {
        "id": "crazierl",
        "multiboot": {
          "url": host + "crazierl-elf-2026.img",
          "size": 919492,
          "async": false
        },
        "initrd": {
          "url": host + "crazierl-initrd-2026.img",
          "size": 20960021,
          "async": false
        },
        "acpi": true,
        "net_device_type": "virtio",
        "cmdline": "kernel /libexec/ld-elf32.so.1",
        "memory_size": 134217728,
        "name": "Crazierl"
      },
      {
        "id": "solos",
        "fda": {
          "url": host + "os8.img",
          "size": 1474560
        },
        "name": "Sol OS",
        "homepage": "http://oby.ro/os/"
      },
      {
        "id": "bootchess",
        "fda": {
          "url": host + "bootchess.img",
          "size": 1474560
        },
        "name": "BootChess",
        "homepage": "http://www.pouet.net/prod.php?which=64962"
      },
      {
        "id": "bootbasic",
        "fda": {
          "url": host + "bootbasic.img",
          "size": 512
        },
        "name": "bootBASIC",
        "homepage": "https://github.com/nanochess/bootBASIC"
      },
      {
        "id": "bootlogo",
        "fda": {
          "url": host + "bootlogo.img",
          "size": 512
        },
        "name": "bootLogo",
        "homepage": "https://github.com/nanochess/bootLogo"
      },
      {
        "id": "pillman",
        "fda": {
          "url": host + "pillman.img",
          "size": 512
        },
        "name": "Pillman",
        "homepage": "https://github.com/nanochess/Pillman"
      },
      {
        "id": "invaders",
        "fda": {
          "url": host + "invaders.img",
          "size": 512
        },
        "name": "Invaders",
        "homepage": "https://github.com/nanochess/Invaders"
      },
      {
        "id": "bootos",
        "fda": {
          "url": host + "bootos-all.img",
          "size": 368640
        },
        "name": "bootOS",
        "homepage": "https://github.com/nanochess/bootOS"
      },
      {
        "id": "sectorlisp",
        "fda": {
          "url": host + "sectorlisp-friendly.bin",
          "size": 512
        },
        "name": "SectorLISP",
        "homepage": "https://justine.lol/sectorlisp2/"
      },
      {
        "id": "sectorforth",
        "fda": {
          "url": host + "sectorforth.img",
          "size": 512
        },
        "name": "sectorforth",
        "homepage": "https://github.com/cesarblum/sectorforth"
      },
      {
        "id": "floppybird",
        "fda": {
          "url": host + "floppybird.img",
          "size": 1474560
        },
        "name": "Floppy Bird",
        "homepage": "http://mihail.co/floppybird"
      },
      {
        "id": "stillalive",
        "fda": {
          "url": host + "stillalive-os.img",
          "size": 368640
        },
        "name": "Still Alive",
        "homepage": "https://github.com/maniekx86/stillalive-os"
      },
      {
        "id": "hello-v86",
        "fda": {
          "url": host + "hello-v86.img",
          "size": 512
        },
        "name": "Hello v86"
      },
      {
        "id": "tetros",
        "fda": {
          "url": host + "tetros.img",
          "size": 512
        },
        "name": "TetrOS",
        "homepage": "https://github.com/daniel-e/tetros"
      },
      {
        "id": "dino",
        "fda": {
          "url": host + "bootdino.img",
          "size": 512
        },
        "name": "dino",
        "homepage": "https://github.com/franeklubi/dino"
      },
      {
        "id": "bootrogue",
        "fda": {
          "url": host + "bootrogue.img",
          "size": 512
        },
        "name": "bootRogue",
        "homepage": "https://github.com/nanochess/bootRogue"
      },
      {
        "id": "duskos",
        "hda": {
          "url": host + "duskos.img",
          "async": false,
          "size": 8388608
        },
        "name": "Dusk OS",
        "homepage": "http://duskos.org/"
      },
      {
        "id": "windows30-old",
        "memory_size": 67108864,
        "cdrom": {
          "url": host + "Win30.iso",
          "size": 7774208,
          "async": false
        },
        "name": "Windows 3.0"
      },
      {
        "id": "windows30",
        "memory_size": 134217728,
        "hda": {
          "url": host + "windows30.img",
          "size": 25165824,
          "async": false
        },
        "name": "Windows 3.0"
      },
      {
        "id": "windows31",
        "memory_size": 67108864,
        "hda": {
          "url": host + "win31.img",
          "async": false,
          "size": 34463744
        },
        "name": "Windows 3.1"
      },
      {
        "id": "tilck",
        "memory_size": 134217728,
        "hda": {
          "url": host + "tilck.img",
          "async": false,
          "size": 37748736
        },
        "name": "Tilck",
        "homepage": "https://github.com/vvaltchev/tilck"
      },
      {
        "id": "littlekernel",
        "multiboot": {
          "url": host + "littlekernel-multiboot.img",
          "async": false,
          "size": 969580
        },
        "name": "Little Kernel",
        "homepage": "https://github.com/littlekernel/lk"
      },
      {
        "id": "sanos",
        "memory_size": 134217728,
        "hda": {
          "url": host + "sanos-flp.img",
          "async": false,
          "size": 1474560
        },
        "name": "Sanos",
        "homepage": "http://www.jbox.dk/sanos/"
      },
      {
        "id": "skift",
        "cdrom": {
          "url": host + "skift-20200910.iso",
          "size": 64452608,
          "async": false
        },
        "name": "Skift",
        "homepage": "https://skiftos.org/"
      },
      {
        "id": "snowdrop",
        "fda": {
          "url": host + "snowdrop.img",
          "size": 1474560
        },
        "name": "Snowdrop",
        "homepage": "http://www.sebastianmihai.com/snowdrop/"
      },
      {
        "id": "openwrt",
        "hda": {
          "url": host + "openwrt-18.06.1-x86-legacy-combined-squashfs.img",
          "size": 19846474,
          "async": false
        },
        "name": "OpenWrt"
      },
      {
        "id": "qnx",
        "fda": {
          "url": host + "qnx-demo-network-4.05.img",
          "size": 1474560
        },
        "name": "QNX 4.05"
      },
      {
        "id": "9legacy",
        "memory_size": 536870912,
        "hda": {
          "url": host + "9legacy.img",
          "async": false,
          "size": 16e6
        },
        "name": "9legacy",
        "homepage": "http://www.9legacy.org/"
      },
      {
        "id": "mobius",
        "fda": {
          "url": host + "mobius-fd-release5.img",
          "size": 1474560
        },
        "name": "Mobius"
      },
      {
        "id": "android",
        "memory_size": 536870912,
        "cdrom": {
          "url": host + "android-x86-1.6-r2/.iso",
          "size": 54661120,
          "async": true,
          "fixed_chunk_size": 1048576,
          "use_parts": true
        },
        "name": "Android"
      },
      {
        "id": "tinycore",
        "memory_size": 268435456,
        "hda": {
          "url": host + "TinyCore-11.0.iso",
          "size": 19922944,
          "async": false
        },
        "name": "Tinycore",
        "homepage": "http://www.tinycorelinux.net/"
      },
      {
        "id": "slitaz",
        "memory_size": 536870912,
        "hda": {
          "url": host + "slitaz-rolling-2024.iso",
          "size": 56573952,
          "async": false
        },
        "name": "SliTaz",
        "homepage": "https://slitaz.org/"
      },
      {
        "id": "freenos",
        "memory_size": 268435456,
        "cdrom": {
          "url": host + "FreeNOS-1.0.3.iso",
          "async": false,
          "size": 11014144
        },
        "name": "FreeNOS",
        "acpi": true,
        "homepage": "http://www.freenos.org/"
      },
      {
        "id": "nopeos",
        "cdrom": {
          "url": host + "nopeos-0.1.iso",
          "size": 532480,
          "async": false
        },
        "name": "Nope OS",
        "homepage": "https://github.com/d99kris/nopeos"
      },
      {
        "id": "soso",
        "cdrom": {
          "url": host + "soso.iso",
          "size": 22546432,
          "async": false
        },
        "name": "Soso",
        "homepage": "https://github.com/ozkl/soso"
      },
      {
        "id": "pcmos",
        "fda": {
          "url": host + "PCMOS386-9-user-patched.img",
          "size": 1474560
        },
        "name": "PC-MOS/386",
        "homepage": "https://github.com/roelandjansen/pcmos386v501"
      },
      {
        "id": "jx",
        "fda": {
          "url": host + "jx-demo.img",
          "size": 1474560
        },
        "name": "JX",
        "homepage": "https://www4.cs.fau.de/Projects/JX/index.html"
      },
      {
        "id": "house",
        "fda": {
          "url": host + "hOp-0.8.img",
          "size": 1474560
        },
        "name": "House",
        "homepage": "https://programatica.cs.pdx.edu/House/"
      },
      {
        "id": "bleskos",
        "name": "BleskOS",
        "cdrom": {
          "url": host + "bleskos_2024u32.iso",
          "size": 1835008,
          "async": false
        },
        "homepage": "https://github.com/VendelinSlezak/BleskOS"
      },
      {
        "id": "boneos",
        "name": "BoneOS",
        "cdrom": {
          "url": host + "BoneOS.iso",
          "size": 11429888,
          "async": false
        },
        "homepage": "https://amanuel.io/projects/BoneOS/"
      },
      {
        "id": "mikeos",
        "name": "MikeOS",
        "cdrom": {
          "url": host + "mikeos.iso",
          "size": 3311616,
          "async": false
        },
        "homepage": "https://mikeos.sourceforge.net/"
      },
      {
        "id": "bluejay",
        "name": "Blue Jay",
        "fda": {
          "url": host + "bj050.img",
          "size": 1474560
        },
        "homepage": "https://archiveos.org/blue-jay/"
      },
      {
        "id": "t3xforth",
        "name": "T3XFORTH",
        "fda": {
          "url": host + "t3xforth.img",
          "size": 1474560
        },
        "homepage": "https://t3x.org/t3xforth/"
      },
      {
        "id": "nanoshell",
        "name": "NanoShell",
        "cdrom": {
          "url": host + "nanoshell.iso",
          "size": 6785024,
          "async": false
        },
        "homepage": "https://github.com/iProgramMC/NanoShellOS"
      },
      {
        "id": "catk",
        "name": "CatK",
        "cdrom": {
          "url": host + "catkernel.iso",
          "size": 11968512,
          "async": false
        },
        "homepage": "https://catk.neocities.org/"
      },
      {
        "id": "mcp",
        "name": "M/CP",
        "fda": {
          "url": host + "mcp2.img",
          "size": 512
        },
        "homepage": "https://github.com/ybuzoku/MCP"
      },
      {
        "id": "ibm-exploring",
        "name": "Exploring The IBM Personal Computer",
        "fda": {
          "url": host + "ibm-exploring.img",
          "size": 368640
        }
      },
      {
        "id": "leetos",
        "name": "lEEt/OS",
        "fda": {
          "url": host + "leetos.img",
          "size": 1474560
        },
        "homepage": "http://sininenankka.dy.fi/leetos/index.php"
      },
      {
        "id": "newos",
        "name": "NewOS",
        "fda": {
          "url": host + "newos-flp.img",
          "size": 1474560,
          "async": false
        },
        "homepage": "https://newos.org/"
      },
      {
        "id": "newos-notion",
        "hda": {
          "url": host + "newos-notion.img",
          "size": 4128768,
          "async": false
        },
        "memory_size": 134217728,
        "name": "NewOS Notion",
        "homepage": "http://notion.muelln-kommune.net/newos.html"
      },
      {
        "id": "dancy",
        "name": "Dancy",
        "cdrom": {
          "url": host + "dancy.iso",
          "size": 10485760,
          "async": false
        },
        "homepage": "https://github.com/Tiihala/Dancy"
      },
      {
        "id": "os64",
        "name": "OS64",
        "cdrom": {
          "url": host + "os64boot.iso",
          "size": 5580800,
          "async": false
        },
        "homepage": "https://os64.blogspot.com/"
      },
      {
        "id": "ipxe",
        "name": "iPXE",
        "cdrom": {
          "url": host + "ipxe.iso",
          "size": 4194304,
          "async": false
        },
        "homepage": "https://ipxe.org/"
      },
      {
        "id": "netboot.xyz",
        "name": "netboot.xyz",
        "cdrom": {
          "url": host + "netboot.xyz.iso",
          "size": 2398208,
          "async": false
        },
        "homepage": "https://netboot.xyz/",
        "net_device_type": "virtio"
      },
      {
        "id": "squeaknos",
        "name": "SqueakNOS",
        "cdrom": {
          "url": host + "SqueakNOS.iso",
          "size": 61171712,
          "async": false
        },
        "memory_size": 536870912,
        "homepage": "https://squeaknos.blogspot.com/"
      },
      {
        "id": "prettyos",
        "name": "PrettyOS",
        "fda": {
          "url": host + "prettyos.img",
          "size": 1474560,
          "async": false
        },
        "homepage": "https://www.prettyos.de/Image.html"
      },
      {
        "id": "vanadium",
        "name": "Vanadium OS",
        "cdrom": {
          "url": host + "vanadiumos.iso",
          "size": 8388608,
          "async": false
        },
        "homepage": "https://www.durlej.net/software.html"
      },
      {
        "id": "xenus",
        "name": "XENUS",
        "hda": {
          "url": host + "xenushdd.img",
          "size": 52428800,
          "async": false
        },
        "homepage": "https://www.durlej.net/xenus/"
      },
      {
        "id": "mojo",
        "name": "Mojo OS",
        "cdrom": {
          "url": host + "mojo-0.2.2.iso",
          "size": 4048896,
          "async": false
        },
        "homepage": "https://archiveos.org/mojoos/"
      },
      {
        "id": "asuro",
        "name": "Asuro",
        "cdrom": {
          "url": host + "asuro.iso",
          "size": 5361664,
          "async": false
        },
        "homepage": "https://asuro.xyz/"
      }
    ];
    if (false) {
      const tests = [
        "realmode",
        // All tests below require an APIC
        "cmpxchg8b",
        "port80",
        "setjmp",
        "sieve",
        "hypercall",
        // crashes
        "init",
        // stops execution
        "msr",
        // TODO: Expects 64 bit msrs
        "smap",
        // test stops, SMAP not enabled
        "tsc_adjust",
        // TODO: IA32_TSC_ADJUST
        "tsc",
        // TODO: rdtscp
        "rmap_chain",
        // crashes
        "memory",
        // missing mfence (uninteresting)
        "taskswitch",
        // TODO: Jump
        "taskswitch2",
        // TODO: Call TSS
        "eventinj",
        // Missing #nt
        "ioapic",
        "apic"
      ];
      for (const test of tests) {
        oses.push({
          name: "Test case: " + test,
          id: "test-" + test,
          memory_size: 128 * 1024 * 1024,
          multiboot: { url: "tests/kvm-unit-tests/x86/" + test + ".flat" }
        });
      }
    }
    const profile = query_args.get("profile");
    if (!profile && true) {
      const link2 = document.createElement("link");
      link2.rel = "prefetch";
      link2.href = "build/v86.wasm" + query_append();
      document.head.appendChild(link2);
    }
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = "build/xterm.js";
    document.head.appendChild(link);
    for (const os of oses) {
      if (profile === os.id) {
        start_emulation(os, query_args);
        return;
      }
      const element = $("start_" + os.id);
      if (element) {
        element.onclick = (e) => {
          if (!e.ctrlKey) {
            e.preventDefault();
            element.blur();
            start_emulation(os, null);
          }
        };
      }
    }
    if (profile === "custom") {
      if (query_args.has("hda.url") || query_args.has("cdrom.url") || query_args.has("fda.url")) {
        start_emulation(null, query_args);
        return;
      }
    }
    if (query_args.has("m")) $("memory_size").value = query_args.get("m");
    if (query_args.has("vram")) $("vga_memory_size").value = query_args.get("vram");
    if (query_args.has("relay_url")) $("relay_url").value = query_args.get("relay_url");
    if (query_args.has("mute")) $("disable_audio").checked = bool_arg(query_args.get("mute"));
    if (query_args.has("acpi")) $("acpi").checked = bool_arg(query_args.get("acpi"));
    if (query_args.has("boot_order")) $("boot_order").value = query_args.get("boot_order");
    if (query_args.has("net_device_type")) $("net_device_type").value = query_args.get("net_device_type");
    if (query_args.has("mtu")) $("mtu").value = query_args.get("mtu");
    if (query_args.has("modem")) $("modem").value = query_args.get("modem");
    $("mtu_ui").style.display = $("net_device_type").value === "virtio" ? "table-row" : "none";
    $("net_device_type").onchange = function() {
      $("mtu_ui").style.display = $("net_device_type").value === "virtio" ? "table-row" : "none";
      $("net_device_type").blur();
    };
    for (const dev of ["fda", "fdb"]) {
      const toggle = $(dev + "_toggle_empty_disk");
      if (!toggle) continue;
      toggle.onclick = function(e) {
        e.preventDefault();
        const select = document.createElement("select");
        select.id = dev + "_empty_size";
        for (const n_sect of [320, 360, 400, 640, 720, 800, 1440, 2400, 2880, 3444, 5760, 7680]) {
          const n_bytes = n_sect * 512, kb = 1024, MB = kb * 1e3;
          const option = document.createElement("option");
          if (n_bytes < MB) {
            option.textContent = n_bytes / kb + " kB";
          } else {
            option.textContent = (n_bytes / MB).toFixed(2) + " MB";
          }
          if (n_sect === 2880) {
            option.selected = true;
          }
          option.value = n_bytes;
          select.appendChild(option);
        }
        const parent = toggle.parentNode;
        parent.innerHTML = "";
        parent.append("Empty disk of ", select);
      };
    }
    for (const dev of ["hda", "hdb"]) {
      const toggle = $(dev + "_toggle_empty_disk");
      if (!toggle) continue;
      toggle.onclick = function(e) {
        e.preventDefault();
        const input = document.createElement("input");
        input.id = dev + "_empty_size";
        input.type = "number";
        input.min = "0";
        input.max = String(MAX_ARRAY_BUFFER_SIZE_MB);
        input.step = "100";
        input.value = "100";
        const parent = toggle.parentNode;
        parent.innerHTML = "";
        parent.append("Empty disk of ", input, " MB");
      };
    }
    const os_info = Array.from(document.querySelectorAll("#oses a.tr")).map((element) => {
      const [_, size_raw, unit] = element.children[1].textContent.match(/([\d\.]+)\+? (\w+)/);
      let size = +size_raw;
      if (unit === "MB") size *= 1024 * 1024;
      else if (unit === "KB") size *= 1024;
      return {
        element,
        size,
        graphical: element.children[2].firstChild.className === "gui_icon",
        family: element.children[3].textContent.replace(/-like/, ""),
        arch: element.children[4].textContent,
        status: element.children[5].textContent,
        source: element.children[6].textContent,
        languages: new Set(element.children[7].textContent.split(", ")),
        medium: element.children[8].textContent
      };
    });
    const known_filter = [
      [
        // Family:
        { id: "linux", condition: (os) => os.family === "Linux" },
        { id: "bsd", condition: (os) => os.family === "BSD" },
        { id: "windows", condition: (os) => os.family === "Windows" },
        { id: "unix", condition: (os) => os.family === "Unix" },
        { id: "dos", condition: (os) => os.family === "DOS" },
        { id: "custom", condition: (os) => os.family === "Custom" }
      ],
      [
        // UI:
        { id: "graphical", condition: (os) => os.graphical },
        { id: "text", condition: (os) => !os.graphical }
      ],
      [
        // Medium:
        { id: "floppy", condition: (os) => os.medium === "Floppy" },
        { id: "cd", condition: (os) => os.medium === "CD" },
        { id: "hd", condition: (os) => os.medium === "HD" }
      ],
      [
        // Size:
        { id: "bootsector", condition: (os) => os.size <= 512 },
        { id: "lt5mb", condition: (os) => os.size <= 5 * 1024 * 1024 },
        { id: "gt5mb", condition: (os) => os.size > 5 * 1024 * 1024 }
      ],
      [
        // Status:
        { id: "modern", condition: (os) => os.status === "Modern" },
        { id: "historic", condition: (os) => os.status === "Historic" }
      ],
      [
        // License:
        { id: "opensource", condition: (os) => os.source === "Open-source" },
        { id: "proprietary", condition: (os) => os.source === "Proprietary" }
      ],
      [
        // Arch:
        { id: "16bit", condition: (os) => os.arch === "16-bit" },
        { id: "32bit", condition: (os) => os.arch === "32-bit" }
      ],
      [
        // Lang:
        { id: "asm", condition: (os) => os.languages.has("ASM") },
        { id: "c", condition: (os) => os.languages.has("C") },
        { id: "cpp", condition: (os) => os.languages.has("C++") },
        { id: "other_lang", condition: (os) => ["ASM", "C", "C++"].every((lang) => !os.languages.has(lang)) }
      ]
    ];
    const defined_filter = [];
    for (const known_category of known_filter) {
      const category = known_category.filter((filter) => {
        const element = document.getElementById(`filter_${filter.id}`);
        if (element) {
          element.onchange = update_filters;
          filter.element = element;
        }
        return element;
      });
      if (category.length) {
        defined_filter.push(category);
      }
    }
    function update_filters() {
      const conjunction = [];
      for (const category of defined_filter) {
        const disjunction = category.filter((filter) => filter.element.checked);
        if (disjunction.length) {
          conjunction.push(disjunction);
        }
      }
      for (const os of os_info) {
        os.element.style.display = conjunction.every((disjunction) => disjunction.some((filter) => filter.condition(os))) ? "" : "none";
      }
    }
    if ($("reset_filters")) {
      $("reset_filters").onclick = function() {
        for (const element of document.querySelectorAll("#filter input[type=checkbox]")) {
          element.checked = false;
        }
        update_filters();
      };
    }
    function set_proxy_value(id, value) {
      const elem = $(id);
      if (elem) {
        elem.onclick = () => $("relay_url").value = value;
      }
    }
    set_proxy_value("network_none", "");
    set_proxy_value("network_inbrowser", "inbrowser");
    set_proxy_value("network_fetch", "fetch");
    set_proxy_value("network_relay", "wss://relay.widgetry.org/");
    set_proxy_value("network_wisp", "wisps://wisp.mercurywork.shop/v86/");
  }
  window.addEventListener("load", onload, false);
  window.addEventListener("load", function() {
    setTimeout(function() {
      window.addEventListener("popstate", onpopstate);
    }, 0);
  });
  if (document.readyState === "complete") {
    onload();
  }
  function start_emulation(profile, query_args) {
    $("boot_options").style.display = "none";
    const new_query_args = /* @__PURE__ */ new Map();
    new_query_args.set("profile", profile?.id || "custom");
    const settings = {};
    if (profile) {
      if (profile.state) {
        $("reset").style.display = "none";
      }
      set_title(profile.name);
      settings.initial_state = profile.state;
      settings.filesystem = profile.filesystem;
      settings.fda = profile.fda;
      settings.fdb = profile.fdb;
      settings.cdrom = profile.cdrom;
      settings.hda = profile.hda;
      settings.hdb = profile.hdb;
      settings.multiboot = profile.multiboot;
      settings.bzimage = profile.bzimage;
      settings.initrd = profile.initrd;
      settings.cmdline = profile.cmdline;
      settings.bzimage_initrd_from_filesystem = profile.bzimage_initrd_from_filesystem;
      settings.mac_address_translation = profile.mac_address_translation;
      settings.cpuid_level = profile.cpuid_level;
      settings.acpi = profile.acpi;
      settings.memory_size = profile.memory_size;
      settings.vga_memory_size = profile.vga_memory_size;
      settings.boot_order = profile.boot_order;
      settings.net_device_type = profile.net_device_type;
      settings.modem = profile.modem;
      if (profile.homepage) {
        $("description").style.display = "block";
        const link = document.createElement("a");
        link.href = profile.homepage;
        link.textContent = profile.name;
        link.target = "_blank";
        $("description").append(document.createTextNode("Running "), link);
      }
    }
    if (query_args) {
      if (!settings.initial_state) {
        let chunk_size = parseInt(query_args.get("chunk_size"), 10);
        if (chunk_size >= 0) {
          chunk_size = Math.min(4 * 1024 * 1024, Math.max(512, chunk_size));
          chunk_size = round_up_to_next_power_of_2(chunk_size);
        } else {
          chunk_size = 256 * 1024;
        }
        if (query_args.has("hda.url")) {
          settings.hda = {
            size: parseInt(query_args.get("hda.size"), 10) || void 0,
            // TODO: synchronous if small?
            url: query_args.get("hda.url"),
            fixed_chunk_size: chunk_size,
            async: true
          };
        } else if (query_args.has("hda.empty")) {
          const empty_size = parseInt(query_args.get("hda.empty"), 10);
          if (empty_size > 0) {
            settings.hda = { buffer: new ArrayBuffer(empty_size) };
          }
        }
        if (query_args.has("hdb.url")) {
          settings.hdb = {
            size: parseInt(query_args.get("hdb.size"), 10) || void 0,
            // TODO: synchronous if small?
            url: query_args.get("hdb.url"),
            fixed_chunk_size: chunk_size,
            async: true
          };
        } else if (query_args.has("hdb.empty")) {
          const empty_size = parseInt(query_args.get("hdb.empty"), 10);
          if (empty_size > 0) {
            settings.hdb = { buffer: new ArrayBuffer(empty_size) };
          }
        }
        if (query_args.has("cdrom.url")) {
          settings.cdrom = {
            size: parseInt(query_args.get("cdrom.size"), 10) || void 0,
            url: query_args.get("cdrom.url"),
            fixed_chunk_size: chunk_size,
            async: true
          };
        }
        if (query_args.has("fda.url")) {
          settings.fda = {
            size: parseInt(query_args.get("fda.size"), 10) || void 0,
            url: query_args.get("fda.url"),
            async: false
          };
        }
        const m = parseInt(query_args.get("m"), 10);
        if (m > 0) {
          settings.memory_size = Math.max(16, m) * 1024 * 1024;
        }
        const vram = parseInt(query_args.get("vram"), 10);
        if (vram > 0) {
          settings.vga_memory_size = vram * 1024 * 1024;
        }
        settings.acpi = query_args.has("acpi") ? bool_arg(query_args.get("acpi")) : settings.acpi;
        settings.use_bochs_bios = query_args.get("bios") === "bochs";
        settings.net_device_type = query_args.get("net_device_type") || settings.net_device_type;
        settings.mtu = parseInt(query_args.get("mtu"), 10) || void 0;
      }
      settings.relay_url = query_args.get("relay_url");
      settings.disable_jit = bool_arg(query_args.get("disable_jit"));
      settings.disable_audio = bool_arg(query_args.get("mute"));
      if (query_args.has("modem")) {
        const modem = parseInt(query_args.get("modem"), 10);
        if (!Number.isNaN(modem) && modem >= 0 && modem < 4) {
          settings.modem = { uart: modem };
        }
      }
    }
    if (!settings.relay_url) {
      settings.relay_url = $("relay_url").value;
      if (!DEFAULT_NETWORKING_PROXIES.includes(settings.relay_url)) new_query_args.set("relay_url", settings.relay_url);
    }
    if (settings.relay_url.startsWith("fetch:")) {
      settings.cors_proxy = settings.relay_url.slice(6);
      settings.relay_url = "fetch";
    }
    settings.disable_audio = $("disable_audio").checked || settings.disable_audio;
    if (settings.disable_audio) new_query_args.set("mute", "1");
    if (!settings.initial_state) {
      const bios = $("bios").files[0];
      if (bios) {
        settings.bios = { buffer: bios };
      }
      const vga_bios = $("vga_bios").files[0];
      if (vga_bios) {
        settings.vga_bios = { buffer: vga_bios };
      }
      const fda = $("fda_image")?.files[0];
      if (fda) {
        settings.fda = { buffer: fda };
      }
      const fda_empty_size = +$("fda_empty_size")?.value;
      if (fda_empty_size) {
        settings.fda = { buffer: new ArrayBuffer(fda_empty_size) };
      }
      const fdb = $("fdb_image")?.files[0];
      if (fdb) {
        settings.fdb = { buffer: fdb };
      }
      const fdb_empty_size = +$("fdb_empty_size")?.value;
      if (fdb_empty_size) {
        settings.fdb = { buffer: new ArrayBuffer(fdb_empty_size) };
      }
      const cdrom = $("cdrom_image").files[0];
      if (cdrom) {
        settings.cdrom = { buffer: cdrom };
      }
      const hda = $("hda_image")?.files[0];
      if (hda) {
        settings.hda = { buffer: hda };
      }
      const hda_empty_size = +$("hda_empty_size")?.value;
      if (hda_empty_size) {
        const size = Math.max(1, Math.min(MAX_ARRAY_BUFFER_SIZE_MB, hda_empty_size)) * 1024 * 1024;
        settings.hda = { buffer: new ArrayBuffer(size) };
        new_query_args.set("hda.empty", String(size));
      }
      const hdb = $("hdb_image")?.files[0];
      if (hdb) {
        settings.hdb = { buffer: hdb };
      }
      const hdb_empty_size = +$("hdb_empty_size")?.value;
      if (hdb_empty_size) {
        const size = Math.max(1, Math.min(MAX_ARRAY_BUFFER_SIZE_MB, hdb_empty_size)) * 1024 * 1024;
        settings.hdb = { buffer: new ArrayBuffer(size) };
        new_query_args.set("hdb.empty", String(size));
      }
      const multiboot = $("multiboot_image")?.files[0];
      if (multiboot) {
        settings.multiboot = { buffer: multiboot };
      }
      const bzimage = $("bzimage").files[0];
      if (bzimage) {
        settings.bzimage = { buffer: bzimage };
      }
      const initrd = $("initrd").files[0];
      if (initrd) {
        settings.initrd = { buffer: initrd };
      }
      const title = multiboot?.name || hda?.name || cdrom?.name || hdb?.name || fda?.name || bios?.name;
      if (title) {
        set_title(title);
      }
      const MB = 1024 * 1024;
      const memory_size = parseInt($("memory_size").value, 10) || DEFAULT_MEMORY_SIZE;
      if (!settings.memory_size || memory_size !== DEFAULT_MEMORY_SIZE) {
        settings.memory_size = memory_size * MB;
      }
      if (memory_size !== DEFAULT_MEMORY_SIZE) new_query_args.set("m", String(memory_size));
      const vga_memory_size = parseInt($("vga_memory_size").value, 10) || DEFAULT_VGA_MEMORY_SIZE;
      if (!settings.vga_memory_size || vga_memory_size !== DEFAULT_VGA_MEMORY_SIZE) {
        settings.vga_memory_size = vga_memory_size * MB;
      }
      if (vga_memory_size !== DEFAULT_VGA_MEMORY_SIZE) new_query_args.set("vram", String(vga_memory_size));
      const boot_order = parseInt($("boot_order").value, 16) || DEFAULT_BOOT_ORDER;
      if (!settings.boot_order || boot_order !== DEFAULT_BOOT_ORDER) {
        settings.boot_order = boot_order;
      }
      if (settings.boot_order !== DEFAULT_BOOT_ORDER) new_query_args.set("boot_order", settings.boot_order.toString(16));
      if (settings.acpi === void 0) {
        settings.acpi = $("acpi").checked;
        if (settings.acpi) new_query_args.set("acpi", "1");
      }
      const BIOSPATH = "bios/";
      if (!settings.bios) {
        settings.bios = { url: BIOSPATH + (false ? "seabios-debug.bin" : "seabios.bin") };
      }
      if (!settings.vga_bios) {
        settings.vga_bios = { url: BIOSPATH + (false ? "vgabios-debug.bin" : "vgabios.bin") };
      }
      if (settings.use_bochs_bios) {
        settings.bios = { url: BIOSPATH + "bochs-bios.bin" };
        settings.vga_bios = { url: BIOSPATH + "bochs-vgabios.bin" };
      }
      const nic_type = $("net_device_type").value || DEFAULT_NIC_TYPE;
      if (!settings.net_device_type || nic_type !== DEFAULT_NIC_TYPE) {
        settings.net_device_type = nic_type;
      }
      if (settings.net_device_type !== DEFAULT_NIC_TYPE) new_query_args.set("net_device_type", settings.net_device_type);
      const mtu = parseInt($("mtu").value, 10) || DEFAULT_MTU;
      if (!settings.mtu || mtu !== DEFAULT_MTU) {
        settings.mtu = mtu;
      }
      if (settings.mtu !== DEFAULT_MTU) new_query_args.set("mtu", settings.mtu.toString());
      const modem = parseInt($("modem").value, 10);
      if (!Number.isNaN(modem) && modem >= 0 && modem < 4) {
        settings.modem = { uart: modem };
        new_query_args.set("modem", modem.toString());
      }
    }
    if (!query_args) {
      push_state(new_query_args);
    }
    const emulator = new V86({
      wasm_path: "build/" + (false ? "v86-debug.wasm" : "v86.wasm") + query_append(),
      screen: {
        container: $("screen_container"),
        use_graphical_text: false
      },
      net_device: {
        type: settings.net_device_type || DEFAULT_NIC_TYPE,
        relay_url: settings.relay_url,
        cors_proxy: settings.cors_proxy,
        mtu: settings.mtu
      },
      modem: settings.modem,
      autostart: true,
      memory_size: settings.memory_size,
      vga_memory_size: settings.vga_memory_size,
      boot_order: settings.boot_order,
      bios: settings.bios,
      vga_bios: settings.vga_bios,
      fda: settings.fda,
      fdb: settings.fdb,
      hda: settings.hda,
      hdb: settings.hdb,
      cdrom: settings.cdrom,
      multiboot: settings.multiboot,
      bzimage: settings.bzimage,
      initrd: settings.initrd,
      cmdline: settings.cmdline,
      bzimage_initrd_from_filesystem: settings.bzimage_initrd_from_filesystem,
      acpi: settings.acpi,
      disable_jit: settings.disable_jit,
      initial_state: settings.initial_state,
      filesystem: settings.filesystem || {},
      disable_speaker: settings.disable_audio,
      mac_address_translation: settings.mac_address_translation,
      cpuid_level: settings.cpuid_level
    });
    if (false) window.emulator = emulator;
    emulator.add_listener("emulator-ready", function() {
      if (false) {
        debug_start(emulator);
      }
      if (emulator.v86.cpu.wm.exports["profiler_is_enabled"]()) {
        const CLEAR_STATS = false;
        const panel = document.createElement("pre");
        document.body.appendChild(panel);
        setInterval(function() {
          if (!emulator.is_running()) {
            return;
          }
          panel.textContent = emulator.get_instruction_stats();
          CLEAR_STATS && emulator.v86.cpu.clear_opstats();
        }, CLEAR_STATS ? 5e3 : 1e3);
      }
      if (["dsl", "helenos", "android", "android4", "redox", "beos", "9legacy"].includes(profile?.id)) {
        setTimeout(() => {
          emulator.keyboard_send_text(profile.id === "9legacy" ? "1\n" : "\n");
        }, 3e3);
      }
      attachMemoryPainter(emulator);
      init_ui(profile, settings, emulator);
      if (query_args?.has("c")) {
        setTimeout(function() {
          emulator.keyboard_send_text(query_args.get("c") + "\n");
        }, 25);
      }
      if (query_args?.has("s")) {
        setTimeout(function() {
          emulator.serial0_send(query_args.get("s") + "\n");
        }, 25);
      }
      if (query_args?.has("theatre") && bool_arg(query_args?.get("theatre"))) {
        $("toggle_theatre").click();
      }
    });
    emulator.add_listener("emulator-loaded", function() {
      if (!emulator.v86.cpu.devices.cdrom) {
        $("change_cdrom_image").style.display = "none";
      }
    });
    emulator.add_listener("download-progress", function(e) {
      show_progress(e);
    });
    emulator.add_listener("download-error", function(e) {
      const el = $("loading");
      el.style.display = "block";
      el.textContent = `Loading ${e.file_name} failed. Check your connection and reload the page to try again.`;
    });
  }
  function init_ui(profile, settings, emulator) {
    $("loading").style.display = "none";
    $("runtime_options").style.display = "block";
    $("runtime_infos").style.display = "block";
    $("screen_container").style.display = "block";
    var filesystem_is_enabled = false;
    if (settings.filesystem) {
      filesystem_is_enabled = true;
      init_filesystem_panel(emulator);
    } else {
      emulator.add_listener("9p-attach", function() {
        filesystem_is_enabled = true;
        init_filesystem_panel(emulator);
      });
    }
    $("run").onclick = function() {
      if (emulator.is_running()) {
        $("run").textContent = "Run";
        emulator.stop();
      } else {
        $("run").textContent = "Pause";
        emulator.run();
      }
      $("run").blur();
    };
    $("exit").onclick = function() {
      emulator.destroy();
      const params = new URLSearchParams(location.search);
      params.delete("profile");
      location.href = location.pathname + format_query_args(params);
    };
    $("lock_mouse").onclick = function() {
      if (!mouse_is_enabled) {
        $("toggle_mouse").onclick();
      }
      requestMouseLock(true);
      $("lock_mouse").blur();
    };
    var mouse_is_enabled = true;
    const requestMouseLock = createMouseLock(emulator, $("mouse_lock_status"));
    $("toggle_mouse").onclick = function() {
      mouse_is_enabled = !mouse_is_enabled;
      emulator.mouse_set_enabled(mouse_is_enabled);
      $("toggle_mouse").textContent = (mouse_is_enabled ? "Dis" : "En") + "able mouse";
      $("toggle_mouse").blur();
    };
    if (profile?.mouse_disabled_default) {
      $("toggle_mouse").onclick();
    }
    var theatre_mode = false;
    var theatre_ui = true;
    var theatre_zoom_to_fit = false;
    function zoom_to_fit() {
      emulator.screen_set_scale(1, 1);
      const emulator_screen = $("screen_container").getBoundingClientRect();
      const emulator_screen_width = emulator_screen.width;
      const emulator_screen_height = emulator_screen.height;
      const guest_viewport2 = $("memory_guest");
      const viewport_screen_width = !theatre_mode && guest_viewport2 ? guest_viewport2.clientWidth : window.innerWidth;
      const viewport_screen_height = !theatre_mode && guest_viewport2 ? Math.max(120, window.innerHeight - guest_viewport2.getBoundingClientRect().top - 12) : window.innerHeight;
      if (emulator_screen_width > 0 && emulator_screen_height > 0) {
        const n = Math.min(viewport_screen_width / emulator_screen_width, viewport_screen_height / emulator_screen_height);
        emulator.screen_set_scale(n, n);
      }
    }
    function enable_theatre_ui(enabled) {
      theatre_ui = enabled;
      $("runtime_options").style.display = theatre_ui ? "block" : "none";
      $("runtime_infos").style.display = theatre_ui ? "block" : "none";
      $("filesystem_panel").style.display = filesystem_is_enabled && theatre_ui ? "block" : "none";
      $("toggle_ui").textContent = (theatre_ui ? "Hide" : "Show") + " UI";
    }
    function enable_zoom_to_fit(enabled) {
      theatre_zoom_to_fit = enabled;
      $("scale").disabled = theatre_zoom_to_fit;
      if (theatre_zoom_to_fit) {
        window.addEventListener("resize", zoom_to_fit, true);
        emulator.add_listener("screen-set-size", zoom_to_fit);
        zoom_to_fit();
      } else {
        window.removeEventListener("resize", zoom_to_fit, true);
        emulator.remove_listener("screen-set-size", zoom_to_fit);
        const n = parseFloat($("scale").value) || 1;
        emulator.screen_set_scale(n, n);
      }
      $("toggle_zoom_to_fit").textContent = (theatre_zoom_to_fit ? "Dis" : "En") + "able zoom to fit";
    }
    function enable_theatre_mode(enabled) {
      theatre_mode = enabled;
      if (!theatre_ui) {
        enable_theatre_ui(true);
      }
      for (const el of ["screen_container", "runtime_options", "runtime_infos", "filesystem_panel"]) {
        $(el).classList.toggle("theatre_" + el);
      }
      $("theatre_background").style.display = theatre_mode ? "block" : "none";
      $("toggle_zoom_to_fit").style.display = "inline";
      $("toggle_ui").style.display = theatre_mode ? "block" : "none";
      document.body.style.overflow = theatre_mode ? "hidden" : "visible";
      $("toggle_theatre").textContent = (theatre_mode ? "Dis" : "En") + "able theatre mode";
      if (theatre_zoom_to_fit) zoom_to_fit();
    }
    $("toggle_ui").onclick = function() {
      enable_theatre_ui(!theatre_ui);
      $("toggle_ui").blur();
    };
    $("toggle_theatre").onclick = function() {
      enable_theatre_mode(!theatre_mode);
      $("toggle_theatre").blur();
    };
    $("toggle_zoom_to_fit").onclick = function() {
      enable_zoom_to_fit(!theatre_zoom_to_fit);
      $("toggle_zoom_to_fit").blur();
    };
    const guest_viewport = $("memory_guest");
    if (guest_viewport) {
      let previous_width = -1;
      new ResizeObserver(() => {
        const width = guest_viewport.clientWidth;
        if (width !== previous_width) {
          previous_width = width;
          if (theatre_zoom_to_fit) zoom_to_fit();
        }
      }).observe(guest_viewport);
      enable_zoom_to_fit(true);
    }
    var last_tick = 0;
    var running_time = 0;
    var last_instr_counter = 0;
    var interval = null;
    var os_uses_mouse = false;
    var os_uses_absolute_mouse = false;
    var total_instructions = 0;
    function update_info() {
      var now = Date.now();
      var instruction_counter = emulator.get_instruction_counter();
      if (instruction_counter < last_instr_counter) {
        last_instr_counter -= 4294967296;
      }
      var last_ips = instruction_counter - last_instr_counter;
      last_instr_counter = instruction_counter;
      total_instructions += last_ips;
      var delta_time = now - last_tick;
      if (delta_time) {
        running_time += delta_time;
        last_tick = now;
        $("speed").textContent = (last_ips / 1e3 / delta_time).toFixed(1);
        $("avg_speed").textContent = (total_instructions / 1e3 / running_time).toFixed(1);
        $("running_time").textContent = format_timestamp(running_time / 1e3 | 0);
      }
    }
    emulator.add_listener("emulator-started", function() {
      last_tick = Date.now();
      interval = setInterval(update_info, 1e3);
    });
    emulator.add_listener("emulator-stopped", function() {
      update_info();
      if (interval !== null) {
        clearInterval(interval);
      }
    });
    var stats_9p = {
      read: 0,
      write: 0,
      files: []
    };
    emulator.add_listener("9p-read-start", function(args) {
      const file = args[0];
      stats_9p.files.push(file);
      $("info_filesystem").style.display = "block";
      $("info_filesystem_status").textContent = "Loading ...";
      $("info_filesystem_last_file").textContent = file;
    });
    emulator.add_listener("9p-read-end", function(args) {
      stats_9p.read += args[1];
      $("info_filesystem_bytes_read").textContent = stats_9p.read;
      const file = args[0];
      stats_9p.files = stats_9p.files.filter((f) => f !== file);
      if (stats_9p.files[0]) {
        $("info_filesystem_last_file").textContent = stats_9p.files[0];
      } else {
        $("info_filesystem_status").textContent = "Idle";
      }
    });
    emulator.add_listener("9p-write-end", function(args) {
      stats_9p.write += args[1];
      $("info_filesystem_bytes_written").textContent = stats_9p.write;
      if (!stats_9p.files[0]) {
        $("info_filesystem_last_file").textContent = args[0];
      }
    });
    var stats_storage = {
      read: 0,
      read_sectors: 0,
      write: 0,
      write_sectors: 0
    };
    $("ide_type").textContent = settings.cdrom ? " (CD-ROM)" : " (hard disk)";
    emulator.add_listener("ide-read-start", function() {
      $("info_storage").style.display = "block";
      $("info_storage_status").textContent = "Loading ...";
    });
    emulator.add_listener("ide-read-end", function(args) {
      stats_storage.read += args[1];
      stats_storage.read_sectors += args[2];
      $("info_storage_status").textContent = "Idle";
      $("info_storage_bytes_read").textContent = stats_storage.read;
      $("info_storage_sectors_read").textContent = stats_storage.read_sectors;
    });
    emulator.add_listener("ide-write-end", function(args) {
      stats_storage.write += args[1];
      stats_storage.write_sectors += args[2];
      $("info_storage_bytes_written").textContent = stats_storage.write;
      $("info_storage_sectors_written").textContent = stats_storage.write_sectors;
    });
    var stats_net = {
      bytes_transmitted: 0,
      bytes_received: 0
    };
    emulator.add_listener("eth-receive-end", function(args) {
      stats_net.bytes_received += args[0];
      $("info_network").style.display = "block";
      $("info_network_bytes_received").textContent = stats_net.bytes_received;
    });
    emulator.add_listener("eth-transmit-end", function(args) {
      stats_net.bytes_transmitted += args[0];
      $("info_network").style.display = "block";
      $("info_network_bytes_transmitted").textContent = stats_net.bytes_transmitted;
    });
    emulator.add_listener("mouse-enable", function(is_enabled) {
      os_uses_mouse = is_enabled;
      $("info_mouse_enabled").textContent = is_enabled ? "Yes" : "No";
    });
    emulator.add_listener("vmware-absolute-mouse", function(is_enabled) {
      os_uses_absolute_mouse = is_enabled;
    });
    emulator.add_listener("screen-set-size", function(args) {
      const [w, h2, bpp] = args;
      $("info_res").textContent = w + "x" + h2 + (bpp ? "x" + bpp : "");
      $("info_vga_mode").textContent = bpp ? "Graphical" : "Text";
    });
    $("reset").onclick = function() {
      emulator.restart();
      $("reset").blur();
    };
    add_image_download_button(settings.hda, () => emulator.v86.cpu.devices.ide.primary.master.buffer, "hda");
    add_image_download_button(settings.hdb, () => emulator.v86.cpu.devices.ide.primary.slave.buffer, "hdb");
    add_image_download_button(settings.fda, () => emulator.v86.cpu.devices.fdc.drives[0].buffer, "fda");
    add_image_download_button(settings.fdb, () => emulator.v86.cpu.devices.fdc.drives[1].buffer, "fdb");
    add_image_download_button(settings.cdrom, () => emulator.v86.cpu.devices.cdrom.buffer, "cdrom");
    function add_image_download_button(obj, get_buffer, type) {
      var elem = $("get_" + type + "_image");
      if (!obj || obj.async) {
        elem.style.display = "none";
      }
      elem.onclick = function(e) {
        const buffer = get_buffer();
        const filename = buffer.file && buffer.file.name || (profile?.id || "v86") + "-" + type + (type === "cdrom" ? ".iso" : ".img");
        if (buffer.get_as_file) {
          var file = buffer.get_as_file(filename);
          download(file, filename);
        } else {
          buffer.get_buffer(function(b2) {
            if (b2) {
              dump_file(b2, filename);
            } else {
              alert("The file could not be loaded. Maybe it's too big?");
            }
          });
        }
        elem.blur();
      };
    }
    function pick_file(multiple) {
      return new Promise((resolve) => {
        const file_input = document.createElement("input");
        file_input.type = "file";
        file_input.multiple = multiple;
        file_input.onchange = function() {
          resolve(file_input.files);
        };
        file_input.oncancel = function() {
          resolve([]);
        };
        file_input.click();
      });
    }
    $("change_fda_image").textContent = settings.fda ? "Eject floppy image" : "Insert floppy image";
    $("change_fda_image").ondragover = function(e) {
      e.preventDefault();
    };
    async function insert_fda(files) {
      const file = files[0];
      if (file) {
        await emulator.set_fda({ buffer: file });
        $("change_fda_image").textContent = "Eject floppy image";
        $("get_fda_image").style.display = "block";
      }
    }
    $("change_fda_image").ondrop = function(e) {
      e.preventDefault();
      if (emulator.get_disk_fda()) {
        emulator.eject_fda();
      }
      insert_fda(e.dataTransfer.files);
    };
    $("change_fda_image").onclick = async function() {
      if (emulator.get_disk_fda()) {
        emulator.eject_fda();
        $("change_fda_image").textContent = "Insert floppy image";
        $("get_fda_image").style.display = "none";
      } else {
        const files = await pick_file(false);
        insert_fda(files);
      }
      $("change_fda_image").blur();
    };
    $("change_fdb_image").textContent = settings.fdb ? "Eject second floppy image" : "Insert second floppy image";
    $("change_fdb_image").ondragover = function(e) {
      e.preventDefault();
    };
    async function insert_fdb(files) {
      const file = files[0];
      if (file) {
        await emulator.set_fdb({ buffer: file });
        $("change_fdb_image").textContent = "Eject second floppy image";
        $("get_fdb_image").style.display = "block";
      }
    }
    $("change_fdb_image").ondrop = function(e) {
      e.preventDefault();
      if (emulator.get_disk_fdb()) {
        emulator.eject_fdb();
      }
      insert_fdb(e.dataTransfer.files);
    };
    $("change_fdb_image").onclick = async function() {
      if (emulator.get_disk_fdb()) {
        emulator.eject_fdb();
        $("change_fdb_image").textContent = "Insert second floppy image";
        $("get_fdb_image").style.display = "none";
      } else {
        const files = await pick_file(false);
        insert_fdb(files);
      }
      $("change_fdb_image").blur();
    };
    $("change_cdrom_image").textContent = settings.cdrom ? "Eject CD image" : "Insert CD image";
    $("change_cdrom_image").ondragover = function(e) {
      e.preventDefault();
    };
    async function insert_cdrom(files) {
      let buffer;
      if (files.length === 1 && /\.(iso(9660|img)?|cdr)$/i.test(files[0].name)) {
        buffer = files[0];
      } else if (files.length) {
        const files2 = [];
        for (const file of files) {
          files2.push({
            name: file.name,
            contents: new Uint8Array(await read_file(file))
          });
        }
        buffer = generate(files2).buffer;
      }
      if (buffer) {
        await emulator.set_cdrom({ buffer });
        $("change_cdrom_image").textContent = "Eject CD image";
        $("get_cdrom_image").style.display = "block";
      }
    }
    $("change_cdrom_image").ondrop = function(e) {
      e.preventDefault();
      if (emulator.v86.cpu.devices.cdrom.has_disk()) {
        emulator.eject_cdrom();
      }
      insert_cdrom(e.dataTransfer.files);
    };
    $("change_cdrom_image").onclick = async function() {
      if (emulator.v86.cpu.devices.cdrom.has_disk()) {
        emulator.eject_cdrom();
        $("change_cdrom_image").textContent = "Insert CD image";
        $("get_cdrom_image").style.display = "none";
      } else {
        const files = await pick_file(true);
        insert_cdrom(files);
      }
      $("change_cdrom_image").blur();
    };
    $("memory_dump").onclick = function() {
      const mem8 = emulator.v86.cpu.mem8;
      dump_file(new Uint8Array(mem8.buffer, mem8.byteOffset, mem8.length), "v86memory.bin");
      $("memory_dump").blur();
    };
    $("capture_network_traffic").onclick = function() {
      this.textContent = "0 packets";
      let capture = [];
      function do_capture(direction, data) {
        capture.push({ direction, time: performance.now() / 1e3, hex_dump: hex_dump(data) });
        $("capture_network_traffic").textContent = capture.length + " packets";
      }
      emulator.emulator_bus.register("net0-receive", do_capture.bind(this, "I"));
      emulator.add_listener("net0-send", do_capture.bind(this, "O"));
      this.onclick = function() {
        const capture_raw = capture.map(({ direction, time, hex_dump: hex_dump2 }) => {
          return direction + " " + time.toFixed(6) + hex_dump2 + "\n";
        }).join("");
        dump_file(capture_raw, "traffic.hex");
        capture = [];
        this.textContent = "0 packets";
      };
    };
    $("save_state").onclick = async function() {
      const result = await emulator.save_state();
      dump_file(result, "v86state.bin");
      $("save_state").blur();
    };
    $("load_state").onclick = async function() {
      $("load_state").blur();
      const files = await pick_file(false);
      const file = files[0];
      if (!file) {
        return;
      }
      const was_running = emulator.is_running();
      if (was_running) {
        await emulator.stop();
      }
      const filereader = new FileReader();
      filereader.onload = async function(e) {
        try {
          await emulator.restore_state(e.target.result);
        } catch (err) {
          alert("Something bad happened while restoring the state:\n" + err + "\n\nNote that the current configuration must be the same as the original");
          throw err;
        }
        if (was_running) {
          emulator.run();
        }
      };
      filereader.readAsArrayBuffer(file);
    };
    $("ctrlaltdel").onclick = function() {
      emulator.keyboard_send_scancodes([
        29,
        // ctrl
        56,
        // alt
        83,
        // delete
        // break codes
        29 | 128,
        56 | 128,
        83 | 128
      ]);
      $("ctrlaltdel").blur();
    };
    $("alttab").onclick = function() {
      emulator.keyboard_send_scancodes([
        56,
        // alt
        15
        // tab
      ]);
      setTimeout(function() {
        emulator.keyboard_send_scancodes([
          56 | 128,
          15 | 128
        ]);
      }, 100);
      $("alttab").blur();
    };
    $("scale").onchange = function() {
      var n = parseFloat(this.value);
      if (n || n > 0) {
        emulator.screen_set_scale(n, n);
      }
    };
    $("fullscreen").onclick = function() {
      emulator.screen_go_fullscreen();
    };
    $("screen_container").onclick = function(e) {
      if (emulator.is_running() && emulator.speaker_adapter?.audio_context?.state === "suspended") {
        emulator.speaker_adapter.audio_context.resume();
      }
      if (mouse_is_enabled) {
        requestMouseLock(false);
      }
      if (window.getSelection().isCollapsed) {
        const phone_keyboard2 = document.getElementsByClassName("phone_keyboard")[0];
        phone_keyboard2.style.top = window.scrollY + e.clientY + 20 + "px";
        phone_keyboard2.style.left = window.scrollX + e.clientX + "px";
        phone_keyboard2.value = "";
        phone_keyboard2.focus();
      }
    };
    const phone_keyboard = document.getElementsByClassName("phone_keyboard")[0];
    phone_keyboard.setAttribute("autocorrect", "off");
    phone_keyboard.setAttribute("autocapitalize", "off");
    phone_keyboard.setAttribute("spellcheck", "false");
    phone_keyboard.tabIndex = 0;
    $("take_screenshot").onclick = function() {
      const image = emulator.screen_make_screenshot();
      try {
        const w = window.open("");
        w.document.write(image.outerHTML);
      } catch (e) {
      }
      $("take_screenshot").blur();
    };
    if (emulator.speaker_adapter) {
      let is_muted = false;
      $("mute").onclick = function() {
        if (is_muted) {
          emulator.speaker_adapter.mixer.set_volume(1, void 0);
          is_muted = false;
          $("mute").textContent = "Mute";
        } else {
          emulator.speaker_adapter.mixer.set_volume(0, void 0);
          is_muted = true;
          $("mute").textContent = "Unmute";
        }
        $("mute").blur();
      };
    } else {
      $("mute").remove();
    }
    window.addEventListener("keydown", ctrl_w_rescue, false);
    window.addEventListener("keyup", ctrl_w_rescue, false);
    window.addEventListener("blur", ctrl_w_rescue, false);
    function ctrl_w_rescue(e) {
      if (e.ctrlKey) {
        window.onbeforeunload = function() {
          window.onbeforeunload = null;
          return "CTRL-W cannot be sent to the emulator.";
        };
      } else {
        window.onbeforeunload = null;
      }
    }
    const script = document.createElement("script");
    script.src = "build/xterm.js";
    script.async = true;
    script.onload = function() {
      emulator.set_serial_container_xtermjs($("terminal"));
      emulator.serial_adapter.term.write("This is the serial console. Whatever you type or paste here will be sent to COM1");
    };
    document.body.appendChild(script);
  }
  function init_filesystem_panel(emulator) {
    $("filesystem_panel").style.display = "block";
    $("filesystem_send_file").onchange = function() {
      Array.prototype.forEach.call(this.files, function(file) {
        var loader = new SyncFileBuffer(file);
        loader.onload = function() {
          loader.get_buffer(async function(buffer) {
            await emulator.create_file("/" + file.name, new Uint8Array(buffer));
          });
        };
        loader.load();
      }, this);
      this.value = "";
      this.blur();
    };
    $("filesystem_get_file").onkeypress = async function(e) {
      if (e.which !== 13) {
        return;
      }
      this.disabled = true;
      let result;
      try {
        result = await emulator.read_file(this.value);
      } catch (err) {
        console.log(err);
      }
      this.disabled = false;
      if (result) {
        var filename = this.value.replace(/\/$/, "").split("/");
        filename = filename[filename.length - 1] || "root";
        dump_file(result, filename);
        this.value = "";
      } else {
        alert("Can't read file");
      }
    };
  }
  function onpopstate(e) {
    location.reload();
  }
  function format_query_args(params) {
    const entries = Array.from(params.entries());
    if (entries.length) {
      return "?" + entries.map(([key, value]) => key + "=" + value.replace(/[?&=#+]/g, encodeURIComponent)).join("&");
    } else {
      return "";
    }
  }
  function push_state(params) {
    if (window.history.pushState) {
      const search = format_query_args(params);
      window.history.pushState({ search }, "", search);
    }
  }
})();

