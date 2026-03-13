
              (function(){
                if (typeof document !== 'undefined' && !document.getElementById('seven-days-injected-styles')) {
                  var style = document.createElement('style');
                  style.id = 'seven-days-injected-styles';
                  style.textContent = "";
                  document.head.appendChild(style);
                }
              })();
//#region node_modules/@vue/shared/dist/shared.esm-bundler.js
/* @__NO_SIDE_EFFECTS__ */
function e(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
var t = {}, n = [], r = () => {}, i = () => !1, a = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), o = (e) => e.startsWith("onUpdate:"), s = Object.assign, c = (e, t) => {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}, l = Object.prototype.hasOwnProperty, u = (e, t) => l.call(e, t), d = Array.isArray, f = (e) => x(e) === "[object Map]", p = (e) => x(e) === "[object Set]", m = (e) => x(e) === "[object Date]", h = (e) => typeof e == "function", g = (e) => typeof e == "string", _ = (e) => typeof e == "symbol", v = (e) => typeof e == "object" && !!e, y = (e) => (v(e) || h(e)) && h(e.then) && h(e.catch), b = Object.prototype.toString, x = (e) => b.call(e), S = (e) => x(e).slice(8, -1), C = (e) => x(e) === "[object Object]", w = (e) => g(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, ee = /* @__PURE__ */ e(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), te = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, ne = /-\w/g, T = te((e) => e.replace(ne, (e) => e.slice(1).toUpperCase())), re = /\B([A-Z])/g, ie = te((e) => e.replace(re, "-$1").toLowerCase()), ae = te((e) => e.charAt(0).toUpperCase() + e.slice(1)), E = te((e) => e ? `on${ae(e)}` : ""), D = (e, t) => !Object.is(e, t), O = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, k = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, oe = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, A = (e) => {
	let t = g(e) ? Number(e) : NaN;
	return isNaN(t) ? e : t;
}, se, ce = () => se ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
function le(e) {
	if (d(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = g(r) ? fe(r) : le(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	} else if (g(e) || v(e)) return e;
}
var ue = /;(?![^(]*\))/g, j = /:([^]+)/, de = /\/\*[^]*?\*\//g;
function fe(e) {
	let t = {};
	return e.replace(de, "").split(ue).forEach((e) => {
		if (e) {
			let n = e.split(j);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function M(e) {
	let t = "";
	if (g(e)) t = e;
	else if (d(e)) for (let n = 0; n < e.length; n++) {
		let r = M(e[n]);
		r && (t += r + " ");
	}
	else if (v(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
var pe = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", me = /* @__PURE__ */ e(pe);
pe + "";
function he(e) {
	return !!e || e === "";
}
function ge(e, t) {
	if (e.length !== t.length) return !1;
	let n = !0;
	for (let r = 0; n && r < e.length; r++) n = _e(e[r], t[r]);
	return n;
}
function _e(e, t) {
	if (e === t) return !0;
	let n = m(e), r = m(t);
	if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
	if (n = _(e), r = _(t), n || r) return e === t;
	if (n = d(e), r = d(t), n || r) return n && r ? ge(e, t) : !1;
	if (n = v(e), r = v(t), n || r) {
		if (!n || !r || Object.keys(e).length !== Object.keys(t).length) return !1;
		for (let n in e) {
			let r = e.hasOwnProperty(n), i = t.hasOwnProperty(n);
			if (r && !i || !r && i || !_e(e[n], t[n])) return !1;
		}
	}
	return String(e) === String(t);
}
function ve(e, t) {
	return e.findIndex((e) => _e(e, t));
}
var ye = (e) => !!(e && e.__v_isRef === !0), N = (e) => g(e) ? e : e == null ? "" : d(e) || v(e) && (e.toString === b || !h(e.toString)) ? ye(e) ? N(e.value) : JSON.stringify(e, be, 2) : String(e), be = (e, t) => ye(t) ? be(e, t.value) : f(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[xe(t, r) + " =>"] = n, e), {}) } : p(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => xe(e)) } : _(t) ? xe(t) : v(t) && !d(t) && !C(t) ? String(t) : t, xe = (e, t = "") => _(e) ? `Symbol(${e.description ?? t})` : e, P, Se = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.__v_skip = !0, this.parent = P, !e && P && (this.index = (P.scopes ||= []).push(this) - 1);
	}
	get active() {
		return this._active;
	}
	pause() {
		if (this._active) {
			this._isPaused = !0;
			let e, t;
			if (this.scopes) for (e = 0, t = this.scopes.length; e < t; e++) this.scopes[e].pause();
			for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].pause();
		}
	}
	resume() {
		if (this._active && this._isPaused) {
			this._isPaused = !1;
			let e, t;
			if (this.scopes) for (e = 0, t = this.scopes.length; e < t; e++) this.scopes[e].resume();
			for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].resume();
		}
	}
	run(e) {
		if (this._active) {
			let t = P;
			try {
				return P = this, e();
			} finally {
				P = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = P, P = this);
	}
	off() {
		this._on > 0 && --this._on === 0 && (P = this.prevScope, this.prevScope = void 0);
	}
	stop(e) {
		if (this._active) {
			this._active = !1;
			let t, n;
			for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
			for (this.effects.length = 0, t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
			if (this.cleanups.length = 0, this.scopes) {
				for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].stop(!0);
				this.scopes.length = 0;
			}
			if (!this.detached && this.parent && !e) {
				let e = this.parent.scopes.pop();
				e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index);
			}
			this.parent = void 0;
		}
	}
};
function Ce() {
	return P;
}
var F, we = /* @__PURE__ */ new WeakSet(), Te = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, P && P.active && P.effects.push(this);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, we.has(this) && (we.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || I(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, Ve(this), je(this);
		let e = F, t = Le;
		F = this, Le = !0;
		try {
			return this.fn();
		} finally {
			Me(this), F = e, Le = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) Fe(e);
			this.deps = this.depsTail = void 0, Ve(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? we.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		Ne(this) && this.run();
	}
	get dirty() {
		return Ne(this);
	}
}, Ee = 0, De, Oe;
function I(e, t = !1) {
	if (e.flags |= 8, t) {
		e.next = Oe, Oe = e;
		return;
	}
	e.next = De, De = e;
}
function ke() {
	Ee++;
}
function Ae() {
	if (--Ee > 0) return;
	if (Oe) {
		let e = Oe;
		for (Oe = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; De;) {
		let t = De;
		for (De = void 0; t;) {
			let n = t.next;
			if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
				t.trigger();
			} catch (t) {
				e ||= t;
			}
			t = n;
		}
	}
	if (e) throw e;
}
function je(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Me(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), Fe(r), Ie(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function Ne(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Pe(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function Pe(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === He) || (e.globalVersion = He, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Ne(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = F, r = Le;
	F = e, Le = !0;
	try {
		je(e);
		let n = e.fn(e._value);
		(t.version === 0 || D(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		F = n, Le = r, Me(e), e.flags &= -3;
	}
}
function Fe(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) Fe(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function Ie(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var Le = !0, Re = [];
function ze() {
	Re.push(Le), Le = !1;
}
function Be() {
	let e = Re.pop();
	Le = e === void 0 ? !0 : e;
}
function Ve(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = F;
		F = void 0;
		try {
			t();
		} finally {
			F = e;
		}
	}
}
var He = 0, Ue = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, We = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!F || !Le || F === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== F) t = this.activeLink = new Ue(F, this), F.deps ? (t.prevDep = F.depsTail, F.depsTail.nextDep = t, F.depsTail = t) : F.deps = F.depsTail = t, Ge(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = F.depsTail, t.nextDep = void 0, F.depsTail.nextDep = t, F.depsTail = t, F.deps === t && (F.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, He++, this.notify(e);
	}
	notify(e) {
		ke();
		try {
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			Ae();
		}
	}
};
function Ge(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) Ge(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
var Ke = /* @__PURE__ */ new WeakMap(), qe = /* @__PURE__ */ Symbol(""), Je = /* @__PURE__ */ Symbol(""), Ye = /* @__PURE__ */ Symbol("");
function L(e, t, n) {
	if (Le && F) {
		let t = Ke.get(e);
		t || Ke.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new We()), r.map = t, r.key = n), r.track();
	}
}
function Xe(e, t, n, r, i, a) {
	let o = Ke.get(e);
	if (!o) {
		He++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (ke(), t === "clear") o.forEach(s);
	else {
		let i = d(e), a = i && w(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === Ye || !_(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(Ye)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(qe)), f(e) && s(o.get(Je)));
				break;
			case "delete":
				i || (s(o.get(qe)), f(e) && s(o.get(Je)));
				break;
			case "set":
				f(e) && s(o.get(qe));
				break;
		}
	}
	Ae();
}
function Ze(e) {
	let t = /* @__PURE__ */ R(e);
	return t === e ? t : (L(t, "iterate", Ye), /* @__PURE__ */ Lt(e) ? t : t.map(Bt));
}
function Qe(e) {
	return L(e = /* @__PURE__ */ R(e), "iterate", Ye), e;
}
function $e(e, t) {
	return /* @__PURE__ */ It(e) ? Vt(/* @__PURE__ */ Ft(e) ? Bt(t) : t) : Bt(t);
}
var et = {
	__proto__: null,
	[Symbol.iterator]() {
		return tt(this, Symbol.iterator, (e) => $e(this, e));
	},
	concat(...e) {
		return Ze(this).concat(...e.map((e) => d(e) ? Ze(e) : e));
	},
	entries() {
		return tt(this, "entries", (e) => (e[1] = $e(this, e[1]), e));
	},
	every(e, t) {
		return rt(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return rt(this, "filter", e, t, (e) => e.map((e) => $e(this, e)), arguments);
	},
	find(e, t) {
		return rt(this, "find", e, t, (e) => $e(this, e), arguments);
	},
	findIndex(e, t) {
		return rt(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return rt(this, "findLast", e, t, (e) => $e(this, e), arguments);
	},
	findLastIndex(e, t) {
		return rt(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return rt(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return at(this, "includes", e);
	},
	indexOf(...e) {
		return at(this, "indexOf", e);
	},
	join(e) {
		return Ze(this).join(e);
	},
	lastIndexOf(...e) {
		return at(this, "lastIndexOf", e);
	},
	map(e, t) {
		return rt(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return ot(this, "pop");
	},
	push(...e) {
		return ot(this, "push", e);
	},
	reduce(e, ...t) {
		return it(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return it(this, "reduceRight", e, t);
	},
	shift() {
		return ot(this, "shift");
	},
	some(e, t) {
		return rt(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return ot(this, "splice", e);
	},
	toReversed() {
		return Ze(this).toReversed();
	},
	toSorted(e) {
		return Ze(this).toSorted(e);
	},
	toSpliced(...e) {
		return Ze(this).toSpliced(...e);
	},
	unshift(...e) {
		return ot(this, "unshift", e);
	},
	values() {
		return tt(this, "values", (e) => $e(this, e));
	}
};
function tt(e, t, n) {
	let r = Qe(e), i = r[t]();
	return r !== e && !/* @__PURE__ */ Lt(e) && (i._next = i.next, i.next = () => {
		let e = i._next();
		return e.done || (e.value = n(e.value)), e;
	}), i;
}
var nt = Array.prototype;
function rt(e, t, n, r, i, a) {
	let o = Qe(e), s = o !== e && !/* @__PURE__ */ Lt(e), c = o[t];
	if (c !== nt[t]) {
		let t = c.apply(e, a);
		return s ? Bt(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, $e(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function it(e, t, n, r) {
	let i = Qe(e), a = i !== e && !/* @__PURE__ */ Lt(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = $e(e, t)), n.call(this, t, $e(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? $e(e, c) : c;
}
function at(e, t, n) {
	let r = /* @__PURE__ */ R(e);
	L(r, "iterate", Ye);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ Rt(n[0]) ? (n[0] = /* @__PURE__ */ R(n[0]), r[t](...n)) : i;
}
function ot(e, t, n = []) {
	ze(), ke();
	let r = (/* @__PURE__ */ R(e))[t].apply(e, n);
	return Ae(), Be(), r;
}
var st = /* @__PURE__ */ e("__proto__,__v_isRef,__isVue"), ct = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(_));
function lt(e) {
	_(e) || (e = String(e));
	let t = /* @__PURE__ */ R(this);
	return L(t, "has", e), t.hasOwnProperty(e);
}
var ut = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? Ot : Dt : i ? Et : Tt).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = d(e);
		if (!r) {
			let e;
			if (a && (e = et[t])) return e;
			if (t === "hasOwnProperty") return lt;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ z(e) ? e : n);
		if ((_(t) ? ct.has(t) : st(t)) || (r || L(e, "get", t), i)) return o;
		if (/* @__PURE__ */ z(o)) {
			let e = a && w(t) ? o : o.value;
			return r && v(e) ? /* @__PURE__ */ Nt(e) : e;
		}
		return v(o) ? r ? /* @__PURE__ */ Nt(o) : /* @__PURE__ */ jt(o) : o;
	}
}, dt = class extends ut {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = d(e) && w(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ It(i);
			if (!/* @__PURE__ */ Lt(n) && !/* @__PURE__ */ It(n) && (i = /* @__PURE__ */ R(i), n = /* @__PURE__ */ R(n)), !a && /* @__PURE__ */ z(i) && !/* @__PURE__ */ z(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : u(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ z(e) ? e : r);
		return e === /* @__PURE__ */ R(r) && (o ? D(n, i) && Xe(e, "set", t, n, i) : Xe(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = u(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && Xe(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return (!_(t) || !ct.has(t)) && L(e, "has", t), n;
	}
	ownKeys(e) {
		return L(e, "iterate", d(e) ? "length" : qe), Reflect.ownKeys(e);
	}
}, ft = class extends ut {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return !0;
	}
	deleteProperty(e, t) {
		return !0;
	}
}, pt = /* @__PURE__ */ new dt(), mt = /* @__PURE__ */ new ft(), ht = /* @__PURE__ */ new dt(!0), gt = (e) => e, _t = (e) => Reflect.getPrototypeOf(e);
function vt(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ R(i), o = f(a), c = e === "entries" || e === Symbol.iterator && o, l = e === "keys" && o, u = i[e](...r), d = n ? gt : t ? Vt : Bt;
		return !t && L(a, "iterate", l ? Je : qe), s(Object.create(u), { next() {
			let { value: e, done: t } = u.next();
			return t ? {
				value: e,
				done: t
			} : {
				value: c ? [d(e[0]), d(e[1])] : d(e),
				done: t
			};
		} });
	};
}
function yt(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function bt(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ R(r), a = /* @__PURE__ */ R(n);
			e || (D(n, a) && L(i, "get", n), L(i, "get", a));
			let { has: o } = _t(i), s = t ? gt : e ? Vt : Bt;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && L(/* @__PURE__ */ R(t), "iterate", qe), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ R(n), i = /* @__PURE__ */ R(t);
			return e || (D(t, i) && L(r, "has", t), L(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ R(a), s = t ? gt : e ? Vt : Bt;
			return !e && L(o, "iterate", qe), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return s(n, e ? {
		add: yt("add"),
		set: yt("set"),
		delete: yt("delete"),
		clear: yt("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ R(this), r = _t(n), i = /* @__PURE__ */ R(e), a = !t && !/* @__PURE__ */ Lt(e) && !/* @__PURE__ */ It(e) ? i : e;
			return r.has.call(n, a) || D(e, a) && r.has.call(n, e) || D(i, a) && r.has.call(n, i) || (n.add(a), Xe(n, "add", a, a)), this;
		},
		set(e, n) {
			!t && !/* @__PURE__ */ Lt(n) && !/* @__PURE__ */ It(n) && (n = /* @__PURE__ */ R(n));
			let r = /* @__PURE__ */ R(this), { has: i, get: a } = _t(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ R(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? D(n, s) && Xe(r, "set", e, n, s) : Xe(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ R(this), { has: n, get: r } = _t(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ R(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && Xe(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ R(this), t = e.size !== 0, n = e.clear();
			return t && Xe(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = vt(r, e, t);
	}), n;
}
function xt(e, t) {
	let n = bt(e, t);
	return (t, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? t : Reflect.get(u(n, r) && r in t ? n : t, r, i);
}
var St = { get: /* @__PURE__ */ xt(!1, !1) }, Ct = { get: /* @__PURE__ */ xt(!1, !0) }, wt = { get: /* @__PURE__ */ xt(!0, !1) }, Tt = /* @__PURE__ */ new WeakMap(), Et = /* @__PURE__ */ new WeakMap(), Dt = /* @__PURE__ */ new WeakMap(), Ot = /* @__PURE__ */ new WeakMap();
function kt(e) {
	switch (e) {
		case "Object":
		case "Array": return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet": return 2;
		default: return 0;
	}
}
function At(e) {
	return e.__v_skip || !Object.isExtensible(e) ? 0 : kt(S(e));
}
/* @__NO_SIDE_EFFECTS__ */
function jt(e) {
	return /* @__PURE__ */ It(e) ? e : Pt(e, !1, pt, St, Tt);
}
/* @__NO_SIDE_EFFECTS__ */
function Mt(e) {
	return Pt(e, !1, ht, Ct, Et);
}
/* @__NO_SIDE_EFFECTS__ */
function Nt(e) {
	return Pt(e, !0, mt, wt, Dt);
}
function Pt(e, t, n, r, i) {
	if (!v(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
	let a = At(e);
	if (a === 0) return e;
	let o = i.get(e);
	if (o) return o;
	let s = new Proxy(e, a === 2 ? r : n);
	return i.set(e, s), s;
}
/* @__NO_SIDE_EFFECTS__ */
function Ft(e) {
	return /* @__PURE__ */ It(e) ? /* @__PURE__ */ Ft(e.__v_raw) : !!(e && e.__v_isReactive);
}
/* @__NO_SIDE_EFFECTS__ */
function It(e) {
	return !!(e && e.__v_isReadonly);
}
/* @__NO_SIDE_EFFECTS__ */
function Lt(e) {
	return !!(e && e.__v_isShallow);
}
/* @__NO_SIDE_EFFECTS__ */
function Rt(e) {
	return e ? !!e.__v_raw : !1;
}
/* @__NO_SIDE_EFFECTS__ */
function R(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ R(t) : e;
}
function zt(e) {
	return !u(e, "__v_skip") && Object.isExtensible(e) && k(e, "__v_skip", !0), e;
}
var Bt = (e) => v(e) ? /* @__PURE__ */ jt(e) : e, Vt = (e) => v(e) ? /* @__PURE__ */ Nt(e) : e;
/* @__NO_SIDE_EFFECTS__ */
function z(e) {
	return e ? e.__v_isRef === !0 : !1;
}
/* @__NO_SIDE_EFFECTS__ */
function B(e) {
	return Ht(e, !1);
}
function Ht(e, t) {
	return /* @__PURE__ */ z(e) ? e : new Ut(e, t);
}
var Ut = class {
	constructor(e, t) {
		this.dep = new We(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ R(e), this._value = t ? e : Bt(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Lt(e) || /* @__PURE__ */ It(e);
		e = n ? e : /* @__PURE__ */ R(e), D(e, t) && (this._rawValue = e, this._value = n ? e : Bt(e), this.dep.trigger());
	}
};
function Wt(e) {
	return /* @__PURE__ */ z(e) ? e.value : e;
}
var Gt = {
	get: (e, t, n) => t === "__v_raw" ? e : Wt(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ z(i) && !/* @__PURE__ */ z(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function Kt(e) {
	return /* @__PURE__ */ Ft(e) ? e : new Proxy(e, Gt);
}
var qt = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new We(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = He - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && F !== this) return I(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return Pe(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter && this.setter(e);
	}
};
/* @__NO_SIDE_EFFECTS__ */
function Jt(e, t, n = !1) {
	let r, i;
	return h(e) ? r = e : (r = e.get, i = e.set), new qt(r, i, n);
}
var Yt = {}, Xt = /* @__PURE__ */ new WeakMap(), Zt = void 0;
function Qt(e, t = !1, n = Zt) {
	if (n) {
		let t = Xt.get(n);
		t || Xt.set(n, t = []), t.push(e);
	}
}
function $t(e, n, i = t) {
	let { immediate: a, deep: o, once: s, scheduler: l, augmentJob: u, call: f } = i, p = (e) => o ? e : /* @__PURE__ */ Lt(e) || o === !1 || o === 0 ? en(e, 1) : en(e), m, g, _, v, y = !1, b = !1;
	if (/* @__PURE__ */ z(e) ? (g = () => e.value, y = /* @__PURE__ */ Lt(e)) : /* @__PURE__ */ Ft(e) ? (g = () => p(e), y = !0) : d(e) ? (b = !0, y = e.some((e) => /* @__PURE__ */ Ft(e) || /* @__PURE__ */ Lt(e)), g = () => e.map((e) => {
		if (/* @__PURE__ */ z(e)) return e.value;
		if (/* @__PURE__ */ Ft(e)) return p(e);
		if (h(e)) return f ? f(e, 2) : e();
	})) : g = h(e) ? n ? f ? () => f(e, 2) : e : () => {
		if (_) {
			ze();
			try {
				_();
			} finally {
				Be();
			}
		}
		let t = Zt;
		Zt = m;
		try {
			return f ? f(e, 3, [v]) : e(v);
		} finally {
			Zt = t;
		}
	} : r, n && o) {
		let e = g, t = o === !0 ? Infinity : o;
		g = () => en(e(), t);
	}
	let x = Ce(), S = () => {
		m.stop(), x && x.active && c(x.effects, m);
	};
	if (s && n) {
		let e = n;
		n = (...t) => {
			e(...t), S();
		};
	}
	let C = b ? Array(e.length).fill(Yt) : Yt, w = (e) => {
		if (!(!(m.flags & 1) || !m.dirty && !e)) if (n) {
			let e = m.run();
			if (o || y || (b ? e.some((e, t) => D(e, C[t])) : D(e, C))) {
				_ && _();
				let t = Zt;
				Zt = m;
				try {
					let t = [
						e,
						C === Yt ? void 0 : b && C[0] === Yt ? [] : C,
						v
					];
					C = e, f ? f(n, 3, t) : n(...t);
				} finally {
					Zt = t;
				}
			}
		} else m.run();
	};
	return u && u(w), m = new Te(g), m.scheduler = l ? () => l(w, !1) : w, v = (e) => Qt(e, !1, m), _ = m.onStop = () => {
		let e = Xt.get(m);
		if (e) {
			if (f) f(e, 4);
			else for (let t of e) t();
			Xt.delete(m);
		}
	}, n ? a ? w(!0) : C = m.run() : l ? l(w.bind(null, !0), !0) : m.run(), S.pause = m.pause.bind(m), S.resume = m.resume.bind(m), S.stop = S, S;
}
function en(e, t = Infinity, n) {
	if (t <= 0 || !v(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ z(e)) en(e.value, t, n);
	else if (d(e)) for (let r = 0; r < e.length; r++) en(e[r], t, n);
	else if (p(e) || f(e)) e.forEach((e) => {
		en(e, t, n);
	});
	else if (C(e)) {
		for (let r in e) en(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && en(e[r], t, n);
	}
	return e;
}
//#endregion
//#region node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
function tn(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		rn(e, t, n);
	}
}
function nn(e, t, n, r) {
	if (h(e)) {
		let i = tn(e, t, n, r);
		return i && y(i) && i.catch((e) => {
			rn(e, t, n);
		}), i;
	}
	if (d(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(nn(e[a], t, n, r));
		return i;
	}
}
function rn(e, n, r, i = !0) {
	let a = n ? n.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: s } = n && n.appContext.config || t;
	if (n) {
		let t = n.parent, i = n.proxy, a = `https://vuejs.org/error-reference/#runtime-${r}`;
		for (; t;) {
			let n = t.ec;
			if (n) {
				for (let t = 0; t < n.length; t++) if (n[t](e, i, a) === !1) return;
			}
			t = t.parent;
		}
		if (o) {
			ze(), tn(o, null, 10, [
				e,
				i,
				a
			]), Be();
			return;
		}
	}
	an(e, r, a, i, s);
}
function an(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var on = [], sn = -1, cn = [], ln = null, un = 0, dn = /* @__PURE__ */ Promise.resolve(), fn = null;
function pn(e) {
	let t = fn || dn;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function mn(e) {
	let t = sn + 1, n = on.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = on[r], a = bn(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function hn(e) {
	if (!(e.flags & 1)) {
		let t = bn(e), n = on[on.length - 1];
		!n || !(e.flags & 2) && t >= bn(n) ? on.push(e) : on.splice(mn(t), 0, e), e.flags |= 1, gn();
	}
}
function gn() {
	fn ||= dn.then(xn);
}
function _n(e) {
	d(e) ? cn.push(...e) : ln && e.id === -1 ? ln.splice(un + 1, 0, e) : e.flags & 1 || (cn.push(e), e.flags |= 1), gn();
}
function vn(e, t, n = sn + 1) {
	for (; n < on.length; n++) {
		let t = on[n];
		if (t && t.flags & 2) {
			if (e && t.id !== e.uid) continue;
			on.splice(n, 1), n--, t.flags & 4 && (t.flags &= -2), t(), t.flags & 4 || (t.flags &= -2);
		}
	}
}
function yn(e) {
	if (cn.length) {
		let e = [...new Set(cn)].sort((e, t) => bn(e) - bn(t));
		if (cn.length = 0, ln) {
			ln.push(...e);
			return;
		}
		for (ln = e, un = 0; un < ln.length; un++) {
			let e = ln[un];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		ln = null, un = 0;
	}
}
var bn = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function xn(e) {
	try {
		for (sn = 0; sn < on.length; sn++) {
			let e = on[sn];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), tn(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; sn < on.length; sn++) {
			let e = on[sn];
			e && (e.flags &= -2);
		}
		sn = -1, on.length = 0, yn(e), fn = null, (on.length || cn.length) && xn(e);
	}
}
var Sn = null, Cn = null;
function wn(e) {
	let t = Sn;
	return Sn = e, Cn = e && e.type.__scopeId || null, t;
}
function Tn(e, t = Sn, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && Ui(-1);
		let i = wn(t), a;
		try {
			a = e(...n);
		} finally {
			wn(i), r._d && Ui(1);
		}
		return a;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function V(e, n) {
	if (Sn === null) return e;
	let r = Ca(Sn), i = e.dirs ||= [];
	for (let e = 0; e < n.length; e++) {
		let [a, o, s, c = t] = n[e];
		a && (h(a) && (a = {
			mounted: a,
			updated: a
		}), a.deep && en(o), i.push({
			dir: a,
			instance: r,
			value: o,
			oldValue: void 0,
			arg: s,
			modifiers: c
		}));
	}
	return e;
}
function En(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (ze(), nn(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), Be());
	}
}
function Dn(e, t) {
	if (Y) {
		let n = Y.provides, r = Y.parent && Y.parent.provides;
		r === n && (n = Y.provides = Object.create(r)), n[e] = t;
	}
}
function On(e, t, n = !1) {
	let r = ca();
	if (r || Kr) {
		let i = Kr ? Kr._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && h(t) ? t.call(r && r.proxy) : t;
	}
}
var kn = /* @__PURE__ */ Symbol.for("v-scx"), An = () => On(kn);
function jn(e, t, n) {
	return Mn(e, t, n);
}
function Mn(e, n, i = t) {
	let { immediate: a, deep: o, flush: c, once: l } = i, u = s({}, i), d = n && a || !n && c !== "post", f;
	if (ma) {
		if (c === "sync") {
			let e = An();
			f = e.__watcherHandles ||= [];
		} else if (!d) {
			let e = () => {};
			return e.stop = r, e.resume = r, e.pause = r, e;
		}
	}
	let p = Y;
	u.call = (e, t, n) => nn(e, p, t, n);
	let m = !1;
	c === "post" ? u.scheduler = (e) => {
		Ci(e, p && p.suspense);
	} : c !== "sync" && (m = !0, u.scheduler = (e, t) => {
		t ? e() : hn(e);
	}), u.augmentJob = (e) => {
		n && (e.flags |= 4), m && (e.flags |= 2, p && (e.id = p.uid, e.i = p));
	};
	let h = $t(e, n, u);
	return ma && (f ? f.push(h) : d && h()), h;
}
function Nn(e, t, n) {
	let r = this.proxy, i = g(e) ? e.includes(".") ? Pn(r, e) : () => r[e] : e.bind(r, r), a;
	h(t) ? a = t : (a = t.handler, n = t);
	let o = da(this), s = Mn(i, a.bind(r), n);
	return o(), s;
}
function Pn(e, t) {
	let n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t;
	};
}
var Fn = /* @__PURE__ */ Symbol("_vte"), In = (e) => e.__isTeleport, Ln = /* @__PURE__ */ Symbol("_leaveCb"), Rn = /* @__PURE__ */ Symbol("_enterCb");
function zn() {
	let e = {
		isMounted: !1,
		isLeaving: !1,
		isUnmounting: !1,
		leavingVNodes: /* @__PURE__ */ new Map()
	};
	return pr(() => {
		e.isMounted = !0;
	}), gr(() => {
		e.isUnmounting = !0;
	}), e;
}
var Bn = [Function, Array], Vn = {
	mode: String,
	appear: Boolean,
	persisted: Boolean,
	onBeforeEnter: Bn,
	onEnter: Bn,
	onAfterEnter: Bn,
	onEnterCancelled: Bn,
	onBeforeLeave: Bn,
	onLeave: Bn,
	onAfterLeave: Bn,
	onLeaveCancelled: Bn,
	onBeforeAppear: Bn,
	onAppear: Bn,
	onAfterAppear: Bn,
	onAppearCancelled: Bn
}, Hn = (e) => {
	let t = e.subTree;
	return t.component ? Hn(t.component) : t;
}, Un = {
	name: "BaseTransition",
	props: Vn,
	setup(e, { slots: t }) {
		let n = ca(), r = zn();
		return () => {
			let i = t.default && Zn(t.default(), !0);
			if (!i || !i.length) return;
			let a = Wn(i), o = /* @__PURE__ */ R(e), { mode: s } = o;
			if (r.isLeaving) return Jn(a);
			let c = Yn(a);
			if (!c) return Jn(a);
			let l = qn(c, o, r, n, (e) => l = e);
			c.type !== Li && Xn(c, l);
			let u = n.subTree && Yn(n.subTree);
			if (u && u.type !== Li && !qi(u, c) && Hn(n).type !== Li) {
				let e = qn(u, o, r, n);
				if (Xn(u, e), s === "out-in" && c.type !== Li) return r.isLeaving = !0, e.afterLeave = () => {
					r.isLeaving = !1, n.job.flags & 8 || n.update(), delete e.afterLeave, u = void 0;
				}, Jn(a);
				s === "in-out" && c.type !== Li ? e.delayLeave = (e, t, n) => {
					let i = Kn(r, u);
					i[String(u.key)] = u, e[Ln] = () => {
						t(), e[Ln] = void 0, delete l.delayedLeave, u = void 0;
					}, l.delayedLeave = () => {
						n(), delete l.delayedLeave, u = void 0;
					};
				} : u = void 0;
			} else u &&= void 0;
			return a;
		};
	}
};
function Wn(e) {
	let t = e[0];
	if (e.length > 1) {
		for (let n of e) if (n.type !== Li) {
			t = n;
			break;
		}
	}
	return t;
}
var Gn = Un;
function Kn(e, t) {
	let { leavingVNodes: n } = e, r = n.get(t.type);
	return r || (r = /* @__PURE__ */ Object.create(null), n.set(t.type, r)), r;
}
function qn(e, t, n, r, i) {
	let { appear: a, mode: o, persisted: s = !1, onBeforeEnter: c, onEnter: l, onAfterEnter: u, onEnterCancelled: f, onBeforeLeave: p, onLeave: m, onAfterLeave: h, onLeaveCancelled: g, onBeforeAppear: _, onAppear: v, onAfterAppear: y, onAppearCancelled: b } = t, x = String(e.key), S = Kn(n, e), C = (e, t) => {
		e && nn(e, r, 9, t);
	}, w = (e, t) => {
		let n = t[1];
		C(e, t), d(e) ? e.every((e) => e.length <= 1) && n() : e.length <= 1 && n();
	}, ee = {
		mode: o,
		persisted: s,
		beforeEnter(t) {
			let r = c;
			if (!n.isMounted) if (a) r = _ || c;
			else return;
			t[Ln] && t[Ln](!0);
			let i = S[x];
			i && qi(e, i) && i.el[Ln] && i.el[Ln](), C(r, [t]);
		},
		enter(t) {
			if (S[x] === e) return;
			let r = l, i = u, o = f;
			if (!n.isMounted) if (a) r = v || l, i = y || u, o = b || f;
			else return;
			let s = !1;
			t[Rn] = (e) => {
				s || (s = !0, C(e ? o : i, [t]), ee.delayedLeave && ee.delayedLeave(), t[Rn] = void 0);
			};
			let c = t[Rn].bind(null, !1);
			r ? w(r, [t, c]) : c();
		},
		leave(t, r) {
			let i = String(e.key);
			if (t[Rn] && t[Rn](!0), n.isUnmounting) return r();
			C(p, [t]);
			let a = !1;
			t[Ln] = (n) => {
				a || (a = !0, r(), C(n ? g : h, [t]), t[Ln] = void 0, S[i] === e && delete S[i]);
			};
			let o = t[Ln].bind(null, !1);
			S[i] = e, m ? w(m, [t, o]) : o();
		},
		clone(e) {
			let a = qn(e, t, n, r, i);
			return i && i(a), a;
		}
	};
	return ee;
}
function Jn(e) {
	if (ar(e)) return e = $i(e), e.children = null, e;
}
function Yn(e) {
	if (!ar(e)) return In(e.type) && e.children ? Wn(e.children) : e;
	if (e.component) return e.component.subTree;
	let { shapeFlag: t, children: n } = e;
	if (n) {
		if (t & 16) return n[0];
		if (t & 32 && h(n.default)) return n.default();
	}
}
function Xn(e, t) {
	e.shapeFlag & 6 && e.component ? (e.transition = t, Xn(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Zn(e, t = !1, n) {
	let r = [], i = 0;
	for (let a = 0; a < e.length; a++) {
		let o = e[a], s = n == null ? o.key : String(n) + String(o.key == null ? a : o.key);
		o.type === U ? (o.patchFlag & 128 && i++, r = r.concat(Zn(o.children, t, s))) : (t || o.type !== Li) && r.push(s == null ? o : $i(o, { key: s }));
	}
	if (i > 1) for (let e = 0; e < r.length; e++) r[e].patchFlag = -2;
	return r;
}
/* @__NO_SIDE_EFFECTS__ */
function Qn(e, t) {
	return h(e) ? s({ name: e.name }, t, { setup: e }) : e;
}
function $n(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function er(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var tr = /* @__PURE__ */ new WeakMap();
function nr(e, n, r, a, o = !1) {
	if (d(e)) {
		e.forEach((e, t) => nr(e, n && (d(n) ? n[t] : n), r, a, o));
		return;
	}
	if (ir(a) && !o) {
		a.shapeFlag & 512 && a.type.__asyncResolved && a.component.subTree.component && nr(e, n, r, a.component.subTree);
		return;
	}
	let s = a.shapeFlag & 4 ? Ca(a.component) : a.el, l = o ? null : s, { i: f, r: p } = e, m = n && n.r, _ = f.refs === t ? f.refs = {} : f.refs, v = f.setupState, y = /* @__PURE__ */ R(v), b = v === t ? i : (e) => er(_, e) ? !1 : u(y, e), x = (e, t) => !(t && er(_, t));
	if (m != null && m !== p) {
		if (rr(n), g(m)) _[m] = null, b(m) && (v[m] = null);
		else if (/* @__PURE__ */ z(m)) {
			let e = n;
			x(m, e.k) && (m.value = null), e.k && (_[e.k] = null);
		}
	}
	if (h(p)) tn(p, f, 12, [l, _]);
	else {
		let t = g(p), n = /* @__PURE__ */ z(p);
		if (t || n) {
			let i = () => {
				if (e.f) {
					let n = t ? b(p) ? v[p] : _[p] : x(p) || !e.k ? p.value : _[e.k];
					if (o) d(n) && c(n, s);
					else if (d(n)) n.includes(s) || n.push(s);
					else if (t) _[p] = [s], b(p) && (v[p] = _[p]);
					else {
						let t = [s];
						x(p, e.k) && (p.value = t), e.k && (_[e.k] = t);
					}
				} else t ? (_[p] = l, b(p) && (v[p] = l)) : n && (x(p, e.k) && (p.value = l), e.k && (_[e.k] = l));
			};
			if (l) {
				let t = () => {
					i(), tr.delete(e);
				};
				t.id = -1, tr.set(e, t), Ci(t, r);
			} else rr(e), i();
		}
	}
}
function rr(e) {
	let t = tr.get(e);
	t && (t.flags |= 8, tr.delete(e));
}
ce().requestIdleCallback, ce().cancelIdleCallback;
var ir = (e) => !!e.type.__asyncLoader, ar = (e) => e.type.__isKeepAlive;
function or(e, t) {
	cr(e, "a", t);
}
function sr(e, t) {
	cr(e, "da", t);
}
function cr(e, t, n = Y) {
	let r = e.__wdc ||= () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent;
		}
		return e();
	};
	if (ur(t, r, n), n) {
		let e = n.parent;
		for (; e && e.parent;) ar(e.parent.vnode) && lr(r, t, n, e), e = e.parent;
	}
}
function lr(e, t, n, r) {
	let i = ur(t, e, r, !0);
	_r(() => {
		c(r[t], i);
	}, n);
}
function ur(e, t, n = Y, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			ze();
			let i = da(n), a = nn(t, n, e, r);
			return i(), Be(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var dr = (e) => (t, n = Y) => {
	(!ma || e === "sp") && ur(e, (...e) => t(...e), n);
}, fr = dr("bm"), pr = dr("m"), mr = dr("bu"), hr = dr("u"), gr = dr("bum"), _r = dr("um"), vr = dr("sp"), yr = dr("rtg"), br = dr("rtc");
function xr(e, t = Y) {
	ur("ec", e, t);
}
var Sr = /* @__PURE__ */ Symbol.for("v-ndc");
function H(e, t, n, r) {
	let i, a = n && n[r], o = d(e);
	if (o || g(e)) {
		let n = o && /* @__PURE__ */ Ft(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ Lt(e), s = /* @__PURE__ */ It(e), e = Qe(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? Vt(Bt(e[n])) : Bt(e[n]) : e[n], n, void 0, a && a[n]);
	} else if (typeof e == "number") {
		i = Array(e);
		for (let n = 0; n < e; n++) i[n] = t(n + 1, n, void 0, a && a[n]);
	} else if (v(e)) if (e[Symbol.iterator]) i = Array.from(e, (e, n) => t(e, n, void 0, a && a[n]));
	else {
		let n = Object.keys(e);
		i = Array(n.length);
		for (let r = 0, o = n.length; r < o; r++) {
			let o = n[r];
			i[r] = t(e[o], o, r, a && a[r]);
		}
	}
	else i = [];
	return n && (n[r] = i), i;
}
var Cr = (e) => e ? pa(e) ? Ca(e) : Cr(e.parent) : null, wr = /* @__PURE__ */ s(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => Cr(e.parent),
	$root: (e) => Cr(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => Nr(e),
	$forceUpdate: (e) => e.f ||= () => {
		hn(e.update);
	},
	$nextTick: (e) => e.n ||= pn.bind(e.proxy),
	$watch: (e) => Nn.bind(e)
}), Tr = (e, n) => e !== t && !e.__isScriptSetup && u(e, n), Er = {
	get({ _: e }, n) {
		if (n === "__v_skip") return !0;
		let { ctx: r, setupState: i, data: a, props: o, accessCache: s, type: c, appContext: l } = e;
		if (n[0] !== "$") {
			let e = s[n];
			if (e !== void 0) switch (e) {
				case 1: return i[n];
				case 2: return a[n];
				case 4: return r[n];
				case 3: return o[n];
			}
			else if (Tr(i, n)) return s[n] = 1, i[n];
			else if (a !== t && u(a, n)) return s[n] = 2, a[n];
			else if (u(o, n)) return s[n] = 3, o[n];
			else if (r !== t && u(r, n)) return s[n] = 4, r[n];
			else Or && (s[n] = 0);
		}
		let d = wr[n], f, p;
		if (d) return n === "$attrs" && L(e.attrs, "get", ""), d(e);
		if ((f = c.__cssModules) && (f = f[n])) return f;
		if (r !== t && u(r, n)) return s[n] = 4, r[n];
		if (p = l.config.globalProperties, u(p, n)) return p[n];
	},
	set({ _: e }, n, r) {
		let { data: i, setupState: a, ctx: o } = e;
		return Tr(a, n) ? (a[n] = r, !0) : i !== t && u(i, n) ? (i[n] = r, !0) : u(e.props, n) || n[0] === "$" && n.slice(1) in e ? !1 : (o[n] = r, !0);
	},
	has({ _: { data: e, setupState: n, accessCache: r, ctx: i, appContext: a, props: o, type: s } }, c) {
		let l;
		return !!(r[c] || e !== t && c[0] !== "$" && u(e, c) || Tr(n, c) || u(o, c) || u(i, c) || u(wr, c) || u(a.config.globalProperties, c) || (l = s.__cssModules) && l[c]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? u(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
};
function Dr(e) {
	return d(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
var Or = !0;
function kr(e) {
	let t = Nr(e), n = e.proxy, i = e.ctx;
	Or = !1, t.beforeCreate && jr(t.beforeCreate, e, "bc");
	let { data: a, computed: o, methods: s, watch: c, provide: l, inject: u, created: f, beforeMount: p, mounted: m, beforeUpdate: g, updated: _, activated: y, deactivated: b, beforeDestroy: x, beforeUnmount: S, destroyed: C, unmounted: w, render: ee, renderTracked: te, renderTriggered: ne, errorCaptured: T, serverPrefetch: re, expose: ie, inheritAttrs: ae, components: E, directives: D, filters: O } = t;
	if (u && Ar(u, i, null), s) for (let e in s) {
		let t = s[e];
		h(t) && (i[e] = t.bind(n));
	}
	if (a) {
		let t = a.call(n, n);
		v(t) && (e.data = /* @__PURE__ */ jt(t));
	}
	if (Or = !0, o) for (let e in o) {
		let t = o[e], a = X({
			get: h(t) ? t.bind(n, n) : h(t.get) ? t.get.bind(n, n) : r,
			set: !h(t) && h(t.set) ? t.set.bind(n) : r
		});
		Object.defineProperty(i, e, {
			enumerable: !0,
			configurable: !0,
			get: () => a.value,
			set: (e) => a.value = e
		});
	}
	if (c) for (let e in c) Mr(c[e], i, n, e);
	if (l) {
		let e = h(l) ? l.call(n) : l;
		Reflect.ownKeys(e).forEach((t) => {
			Dn(t, e[t]);
		});
	}
	f && jr(f, e, "c");
	function k(e, t) {
		d(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (k(fr, p), k(pr, m), k(mr, g), k(hr, _), k(or, y), k(sr, b), k(xr, T), k(br, te), k(yr, ne), k(gr, S), k(_r, w), k(vr, re), d(ie)) if (ie.length) {
		let t = e.exposed ||= {};
		ie.forEach((e) => {
			Object.defineProperty(t, e, {
				get: () => n[e],
				set: (t) => n[e] = t,
				enumerable: !0
			});
		});
	} else e.exposed ||= {};
	ee && e.render === r && (e.render = ee), ae != null && (e.inheritAttrs = ae), E && (e.components = E), D && (e.directives = D), re && $n(e);
}
function Ar(e, t, n = r) {
	d(e) && (e = Rr(e));
	for (let n in e) {
		let r = e[n], i;
		i = v(r) ? "default" in r ? On(r.from || n, r.default, !0) : On(r.from || n) : On(r), /* @__PURE__ */ z(i) ? Object.defineProperty(t, n, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		}) : t[n] = i;
	}
}
function jr(e, t, n) {
	nn(d(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Mr(e, t, n, r) {
	let i = r.includes(".") ? Pn(n, r) : () => n[r];
	if (g(e)) {
		let n = t[e];
		h(n) && jn(i, n);
	} else if (h(e)) jn(i, e.bind(n));
	else if (v(e)) if (d(e)) e.forEach((e) => Mr(e, t, n, r));
	else {
		let r = h(e.handler) ? e.handler.bind(n) : t[e.handler];
		h(r) && jn(i, r, e);
	}
}
function Nr(e) {
	let t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: a, config: { optionMergeStrategies: o } } = e.appContext, s = a.get(t), c;
	return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach((e) => Pr(c, e, o, !0)), Pr(c, t, o)), v(t) && a.set(t, c), c;
}
function Pr(e, t, n, r = !1) {
	let { mixins: i, extends: a } = t;
	a && Pr(e, a, n, !0), i && i.forEach((t) => Pr(e, t, n, !0));
	for (let i in t) if (!(r && i === "expose")) {
		let r = Fr[i] || n && n[i];
		e[i] = r ? r(e[i], t[i]) : t[i];
	}
	return e;
}
var Fr = {
	data: Ir,
	props: Vr,
	emits: Vr,
	methods: Br,
	computed: Br,
	beforeCreate: zr,
	created: zr,
	beforeMount: zr,
	mounted: zr,
	beforeUpdate: zr,
	updated: zr,
	beforeDestroy: zr,
	beforeUnmount: zr,
	destroyed: zr,
	unmounted: zr,
	activated: zr,
	deactivated: zr,
	errorCaptured: zr,
	serverPrefetch: zr,
	components: Br,
	directives: Br,
	watch: Hr,
	provide: Ir,
	inject: Lr
};
function Ir(e, t) {
	return t ? e ? function() {
		return s(h(e) ? e.call(this, this) : e, h(t) ? t.call(this, this) : t);
	} : t : e;
}
function Lr(e, t) {
	return Br(Rr(e), Rr(t));
}
function Rr(e) {
	if (d(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function zr(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function Br(e, t) {
	return e ? s(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Vr(e, t) {
	return e ? d(e) && d(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : s(/* @__PURE__ */ Object.create(null), Dr(e), Dr(t ?? {})) : t;
}
function Hr(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = s(/* @__PURE__ */ Object.create(null), e);
	for (let r in t) n[r] = zr(e[r], t[r]);
	return n;
}
function Ur() {
	return {
		app: null,
		config: {
			isNativeTag: i,
			performance: !1,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {}
		},
		mixins: [],
		components: {},
		directives: {},
		provides: /* @__PURE__ */ Object.create(null),
		optionsCache: /* @__PURE__ */ new WeakMap(),
		propsCache: /* @__PURE__ */ new WeakMap(),
		emitsCache: /* @__PURE__ */ new WeakMap()
	};
}
var Wr = 0;
function Gr(e, t) {
	return function(n, r = null) {
		h(n) || (n = s({}, n)), r != null && !v(r) && (r = null);
		let i = Ur(), a = /* @__PURE__ */ new WeakSet(), o = [], c = !1, l = i.app = {
			_uid: Wr++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: Ea,
			get config() {
				return i.config;
			},
			set config(e) {},
			use(e, ...t) {
				return a.has(e) || (e && h(e.install) ? (a.add(e), e.install(l, ...t)) : h(e) && (a.add(e), e(l, ...t))), l;
			},
			mixin(e) {
				return i.mixins.includes(e) || i.mixins.push(e), l;
			},
			component(e, t) {
				return t ? (i.components[e] = t, l) : i.components[e];
			},
			directive(e, t) {
				return t ? (i.directives[e] = t, l) : i.directives[e];
			},
			mount(a, o, s) {
				if (!c) {
					let u = l._ceVNode || Xi(n, r);
					return u.appContext = i, s === !0 ? s = "svg" : s === !1 && (s = void 0), o && t ? t(u, a) : e(u, a, s), c = !0, l._container = a, a.__vue_app__ = l, Ca(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				c && (nn(o, l._instance, 16), e(null, l._container), delete l._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, l;
			},
			runWithContext(e) {
				let t = Kr;
				Kr = l;
				try {
					return e();
				} finally {
					Kr = t;
				}
			}
		};
		return l;
	};
}
var Kr = null, qr = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${T(t)}Modifiers`] || e[`${ie(t)}Modifiers`];
function Jr(e, n, ...r) {
	if (e.isUnmounted) return;
	let i = e.vnode.props || t, a = r, o = n.startsWith("update:"), s = o && qr(i, n.slice(7));
	s && (s.trim && (a = r.map((e) => g(e) ? e.trim() : e)), s.number && (a = r.map(oe)));
	let c, l = i[c = E(n)] || i[c = E(T(n))];
	!l && o && (l = i[c = E(ie(n))]), l && nn(l, e, 6, a);
	let u = i[c + "Once"];
	if (u) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[c]) return;
		e.emitted[c] = !0, nn(u, e, 6, a);
	}
}
var Yr = /* @__PURE__ */ new WeakMap();
function Xr(e, t, n = !1) {
	let r = n ? Yr : t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {}, c = !1;
	if (!h(e)) {
		let r = (e) => {
			let n = Xr(e, t, !0);
			n && (c = !0, s(o, n));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !a && !c ? (v(e) && r.set(e, null), null) : (d(a) ? a.forEach((e) => o[e] = null) : s(o, a), v(e) && r.set(e, o), o);
}
function Zr(e, t) {
	return !e || !a(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), u(e, t[0].toLowerCase() + t.slice(1)) || u(e, ie(t)) || u(e, t));
}
function Qr(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: s, attrs: c, emit: l, render: u, renderCache: d, props: f, data: p, setupState: m, ctx: h, inheritAttrs: g } = e, _ = wn(e), v, y;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			v = ea(u.call(t, e, d, f, m, p, h)), y = c;
		} else {
			let e = t;
			v = ea(e.length > 1 ? e(f, {
				attrs: c,
				slots: s,
				emit: l
			}) : e(f, null)), y = t.props ? c : $r(c);
		}
	} catch (t) {
		zi.length = 0, rn(t, e, 1), v = Xi(Li);
	}
	let b = v;
	if (y && g !== !1) {
		let e = Object.keys(y), { shapeFlag: t } = b;
		e.length && t & 7 && (a && e.some(o) && (y = ei(y, a)), b = $i(b, y, !1, !0));
	}
	return n.dirs && (b = $i(b, null, !1, !0), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && Xn(b, n.transition), v = b, wn(_), v;
}
var $r = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || a(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, ei = (e, t) => {
	let n = {};
	for (let r in e) (!o(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
	return n;
};
function ti(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? ni(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (ri(o, r, n) && !Zr(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? o ? ni(r, o, l) : !0 : !!o;
	return !1;
}
function ni(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (ri(t, e, a) && !Zr(n, a)) return !0;
	}
	return !1;
}
function ri(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && v(r) && v(i) ? !_e(r, i) : r !== i;
}
function ii({ vnode: e, parent: t }, n) {
	for (; t;) {
		let r = t.subTree;
		if (r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e) (e = t.vnode).el = n, t = t.parent;
		else break;
	}
}
var ai = {}, oi = () => Object.create(ai), si = (e) => Object.getPrototypeOf(e) === ai;
function ci(e, t, n, r = !1) {
	let i = {}, a = oi();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), ui(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	n ? e.props = r ? i : /* @__PURE__ */ Mt(i) : e.type.props ? e.props = i : e.props = a, e.attrs = a;
}
function li(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ R(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (Zr(e.emitsOptions, o)) continue;
				let d = t[o];
				if (c) if (u(a, o)) d !== a[o] && (a[o] = d, l = !0);
				else {
					let t = T(o);
					i[t] = di(c, s, t, d, e, !1);
				}
				else d !== a[o] && (a[o] = d, l = !0);
			}
		}
	} else {
		ui(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) (!t || !u(t, a) && ((r = ie(a)) === a || !u(t, r))) && (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = di(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) (!t || !u(t, e)) && (delete a[e], l = !0);
	}
	l && Xe(e.attrs, "set", "");
}
function ui(e, n, r, i) {
	let [a, o] = e.propsOptions, s = !1, c;
	if (n) for (let t in n) {
		if (ee(t)) continue;
		let l = n[t], d;
		a && u(a, d = T(t)) ? !o || !o.includes(d) ? r[d] = l : (c ||= {})[d] = l : Zr(e.emitsOptions, t) || (!(t in i) || l !== i[t]) && (i[t] = l, s = !0);
	}
	if (o) {
		let n = /* @__PURE__ */ R(r), i = c || t;
		for (let t = 0; t < o.length; t++) {
			let s = o[t];
			r[s] = di(a, n, s, i[s], e, !u(i, s));
		}
	}
	return s;
}
function di(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = u(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && h(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = da(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === ie(n)) && (r = !0));
	}
	return r;
}
var fi = /* @__PURE__ */ new WeakMap();
function pi(e, r, i = !1) {
	let a = i ? fi : r.propsCache, o = a.get(e);
	if (o) return o;
	let c = e.props, l = {}, f = [], p = !1;
	if (!h(e)) {
		let t = (e) => {
			p = !0;
			let [t, n] = pi(e, r, !0);
			s(l, t), n && f.push(...n);
		};
		!i && r.mixins.length && r.mixins.forEach(t), e.extends && t(e.extends), e.mixins && e.mixins.forEach(t);
	}
	if (!c && !p) return v(e) && a.set(e, n), n;
	if (d(c)) for (let e = 0; e < c.length; e++) {
		let n = T(c[e]);
		mi(n) && (l[n] = t);
	}
	else if (c) for (let e in c) {
		let t = T(e);
		if (mi(t)) {
			let n = c[e], r = l[t] = d(n) || h(n) ? { type: n } : s({}, n), i = r.type, a = !1, o = !0;
			if (d(i)) for (let e = 0; e < i.length; ++e) {
				let t = i[e], n = h(t) && t.name;
				if (n === "Boolean") {
					a = !0;
					break;
				} else n === "String" && (o = !1);
			}
			else a = h(i) && i.name === "Boolean";
			r[0] = a, r[1] = o, (a || u(r, "default")) && f.push(t);
		}
	}
	let m = [l, f];
	return v(e) && a.set(e, m), m;
}
function mi(e) {
	return e[0] !== "$" && !ee(e);
}
var hi = (e) => e === "_" || e === "_ctx" || e === "$stable", gi = (e) => d(e) ? e.map(ea) : [ea(e)], _i = (e, t, n) => {
	if (t._n) return t;
	let r = Tn((...e) => gi(t(...e)), n);
	return r._c = !1, r;
}, vi = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (hi(n)) continue;
		let i = e[n];
		if (h(i)) t[n] = _i(n, i, r);
		else if (i != null) {
			let e = gi(i);
			t[n] = () => e;
		}
	}
}, yi = (e, t) => {
	let n = gi(t);
	e.slots.default = () => n;
}, bi = (e, t, n) => {
	for (let r in t) (n || !hi(r)) && (e[r] = t[r]);
}, xi = (e, t, n) => {
	let r = e.slots = oi();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (bi(r, t, n), n && k(r, "_", e, !0)) : vi(t, r);
	} else t && yi(e, t);
}, Si = (e, n, r) => {
	let { vnode: i, slots: a } = e, o = !0, s = t;
	if (i.shapeFlag & 32) {
		let e = n._;
		e ? r && e === 1 ? o = !1 : bi(a, n, r) : (o = !n.$stable, vi(n, a)), s = n;
	} else n && (yi(e, n), s = { default: 1 });
	if (o) for (let e in a) !hi(e) && s[e] == null && delete a[e];
}, Ci = Fi;
function wi(e) {
	return Ti(e);
}
function Ti(e, i) {
	let a = ce();
	a.__VUE__ = !0;
	let { insert: o, remove: s, patchProp: c, createElement: l, createText: u, createComment: d, setText: f, setElementText: p, parentNode: m, nextSibling: h, setScopeId: g = r, insertStaticContent: _ } = e, v = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !qi(e, t) && (r = ge(e), fe(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null);
		let { type: l, ref: u, shapeFlag: d } = t;
		switch (l) {
			case Ii:
				y(e, t, n, r);
				break;
			case Li:
				b(e, t, n, r);
				break;
			case Ri:
				e ?? x(t, n, r, o);
				break;
			case U:
				E(e, t, n, r, i, a, o, s, c);
				break;
			default: d & 1 ? w(e, t, n, r, i, a, o, s, c) : d & 6 ? D(e, t, n, r, i, a, o, s, c) : (d & 64 || d & 128) && l.process(e, t, n, r, i, a, o, s, c, ye);
		}
		u != null && i ? nr(u, e && e.ref, a, t || e, !t) : u == null && e && e.ref != null && nr(e.ref, null, a, e, !0);
	}, y = (e, t, n, r) => {
		if (e == null) o(t.el = u(t.children), n, r);
		else {
			let n = t.el = e.el;
			t.children !== e.children && f(n, t.children);
		}
	}, b = (e, t, n, r) => {
		e == null ? o(t.el = d(t.children || ""), n, r) : t.el = e.el;
	}, x = (e, t, n, r) => {
		[e.el, e.anchor] = _(e.children, t, n, r, e.el, e.anchor);
	}, S = ({ el: e, anchor: t }, n, r) => {
		let i;
		for (; e && e !== t;) i = h(e), o(e, n, r), e = i;
		o(t, n, r);
	}, C = ({ el: e, anchor: t }) => {
		let n;
		for (; e && e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, w = (e, t, n, r, i, a, o, s, c) => {
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) te(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), re(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, te = (e, t, n, r, i, a, s, u) => {
		let d, f, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (d = e.el = l(e.type, a, m && m.is, m), h & 8 ? p(d, e.children) : h & 16 && T(e.children, d, null, r, i, Ei(e, a), s, u), _ && En(e, null, r, "created"), ne(d, e, e.scopeId, s, r), m) {
			for (let e in m) e !== "value" && !ee(e) && c(d, e, null, m[e], a, r);
			"value" in m && c(d, "value", null, m.value, a), (f = m.onVnodeBeforeMount) && ia(f, r, e);
		}
		_ && En(e, null, r, "beforeMount");
		let v = Oi(i, g);
		v && g.beforeEnter(d), o(d, t, n), ((f = m && m.onVnodeMounted) || v || _) && Ci(() => {
			f && ia(f, r, e), v && g.enter(d), _ && En(e, null, r, "mounted");
		}, i);
	}, ne = (e, t, n, r, i) => {
		if (n && g(e, n), r) for (let t = 0; t < r.length; t++) g(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || Pi(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				ne(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, T = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) v(null, e[l] = s ? ta(e[l]) : ea(e[l]), t, n, r, i, a, o, s);
	}, re = (e, n, r, i, a, o, s) => {
		let l = n.el = e.el, { patchFlag: u, dynamicChildren: d, dirs: f } = n;
		u |= e.patchFlag & 16;
		let m = e.props || t, h = n.props || t, g;
		if (r && Di(r, !1), (g = h.onVnodeBeforeUpdate) && ia(g, r, n, e), f && En(n, e, r, "beforeUpdate"), r && Di(r, !0), (m.innerHTML && h.innerHTML == null || m.textContent && h.textContent == null) && p(l, ""), d ? ie(e.dynamicChildren, d, l, r, i, Ei(n, a), o) : s || le(e, n, l, null, r, i, Ei(n, a), o, !1), u > 0) {
			if (u & 16) ae(l, m, h, r, a);
			else if (u & 2 && m.class !== h.class && c(l, "class", null, h.class, a), u & 4 && c(l, "style", m.style, h.style, a), u & 8) {
				let e = n.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let n = e[t], i = m[n], o = h[n];
					(o !== i || n === "value") && c(l, n, i, o, a, r);
				}
			}
			u & 1 && e.children !== n.children && p(l, n.children);
		} else !s && d == null && ae(l, m, h, r, a);
		((g = h.onVnodeUpdated) || f) && Ci(() => {
			g && ia(g, r, n, e), f && En(n, e, r, "updated");
		}, i);
	}, ie = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s];
			v(c, l, c.el && (c.type === U || !qi(c, l) || c.shapeFlag & 198) ? m(c.el) : n, null, r, i, a, o, !0);
		}
	}, ae = (e, n, r, i, a) => {
		if (n !== r) {
			if (n !== t) for (let t in n) !ee(t) && !(t in r) && c(e, t, n[t], null, a, i);
			for (let t in r) {
				if (ee(t)) continue;
				let o = r[t], s = n[t];
				o !== s && t !== "value" && c(e, t, s, o, a, i);
			}
			"value" in r && c(e, "value", n.value, r.value, a);
		}
	}, E = (e, t, n, r, i, a, s, c, l) => {
		let d = t.el = e ? e.el : u(""), f = t.anchor = e ? e.anchor : u(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (c = c ? c.concat(h) : h), e == null ? (o(d, n, r), o(f, n, r), T(t.children || [], n, f, i, a, s, c, l)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (ie(e.dynamicChildren, m, n, i, a, s, c), (t.key != null || i && t === i.subTree) && ki(e, t, !0)) : le(e, t, n, f, i, a, s, c, l);
	}, D = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : k(t, n, r, i, a, o, c) : oe(e, t, c);
	}, k = (e, t, n, r, i, a, o) => {
		let s = e.component = sa(e, r, i);
		if (ar(e) && (s.ctx.renderer = ye), ha(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, A, o), !e.el) {
				let r = s.subTree = Xi(Li);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else A(s, e, t, n, i, a, o);
	}, oe = (e, t, n) => {
		let r = t.component = e.component;
		if (ti(e, t, n)) if (r.asyncDep && !r.asyncResolved) {
			se(r, t, n);
			return;
		} else r.next = t, r.update();
		else t.el = e.el, r.vnode = t;
	}, A = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = ji(e);
					if (n) {
						t && (t.el = c.el, se(e, t, o)), n.asyncDep.then(() => {
							Ci(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, d;
				Di(e, !1), t ? (t.el = c.el, se(e, t, o)) : t = c, n && O(n), (d = t.props && t.props.onVnodeBeforeUpdate) && ia(d, s, t, c), Di(e, !0);
				let f = Qr(e), p = e.subTree;
				e.subTree = f, v(p, f, m(p.el), ge(p), e, i, a), t.el = f.el, u === null && ii(e, f.el), r && Ci(r, i), (d = t.props && t.props.onVnodeUpdated) && Ci(() => ia(d, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = ir(t);
				if (Di(e, !1), l && O(l), !m && (o = c && c.onVnodeBeforeMount) && ia(o, d, t), Di(e, !0), s && be) {
					let t = () => {
						e.subTree = Qr(e), be(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = Qr(e);
					v(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && Ci(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					Ci(() => ia(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && ir(d.vnode) && d.vnode.shapeFlag & 256) && e.a && Ci(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new Te(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => hn(u), Di(e, !0), l();
	}, se = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, li(e, t.props, r, n), Si(e, t.children, n), ze(), vn(e), Be();
	}, le = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, u = e ? e.shapeFlag : 0, d = t.children, { patchFlag: f, shapeFlag: m } = t;
		if (f > 0) {
			if (f & 128) {
				j(l, d, n, r, i, a, o, s, c);
				return;
			} else if (f & 256) {
				ue(l, d, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (u & 16 && he(l, i, a), d !== l && p(n, d)) : u & 16 ? m & 16 ? j(l, d, n, r, i, a, o, s, c) : he(l, i, a, !0) : (u & 8 && p(n, ""), m & 16 && T(d, n, r, i, a, o, s, c));
	}, ue = (e, t, r, i, a, o, s, c, l) => {
		e ||= n, t ||= n;
		let u = e.length, d = t.length, f = Math.min(u, d), p;
		for (p = 0; p < f; p++) {
			let n = t[p] = l ? ta(t[p]) : ea(t[p]);
			v(e[p], n, r, null, a, o, s, c, l);
		}
		u > d ? he(e, a, o, !0, !1, f) : T(t, r, i, a, o, s, c, l, f);
	}, j = (e, t, r, i, a, o, s, c, l) => {
		let u = 0, d = t.length, f = e.length - 1, p = d - 1;
		for (; u <= f && u <= p;) {
			let n = e[u], i = t[u] = l ? ta(t[u]) : ea(t[u]);
			if (qi(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			u++;
		}
		for (; u <= f && u <= p;) {
			let n = e[f], i = t[p] = l ? ta(t[p]) : ea(t[p]);
			if (qi(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			f--, p--;
		}
		if (u > f) {
			if (u <= p) {
				let e = p + 1, n = e < d ? t[e].el : i;
				for (; u <= p;) v(null, t[u] = l ? ta(t[u]) : ea(t[u]), r, n, a, o, s, c, l), u++;
			}
		} else if (u > p) for (; u <= f;) fe(e[u], a, o, !0), u++;
		else {
			let m = u, h = u, g = /* @__PURE__ */ new Map();
			for (u = h; u <= p; u++) {
				let e = t[u] = l ? ta(t[u]) : ea(t[u]);
				e.key != null && g.set(e.key, u);
			}
			let _, y = 0, b = p - h + 1, x = !1, S = 0, C = Array(b);
			for (u = 0; u < b; u++) C[u] = 0;
			for (u = m; u <= f; u++) {
				let n = e[u];
				if (y >= b) {
					fe(n, a, o, !0);
					continue;
				}
				let i;
				if (n.key != null) i = g.get(n.key);
				else for (_ = h; _ <= p; _++) if (C[_ - h] === 0 && qi(n, t[_])) {
					i = _;
					break;
				}
				i === void 0 ? fe(n, a, o, !0) : (C[i - h] = u + 1, i >= S ? S = i : x = !0, v(n, t[i], r, null, a, o, s, c, l), y++);
			}
			let w = x ? Ai(C) : n;
			for (_ = w.length - 1, u = b - 1; u >= 0; u--) {
				let e = h + u, n = t[e], f = t[e + 1], p = e + 1 < d ? f.el || Ni(f) : i;
				C[u] === 0 ? v(null, n, r, p, a, o, s, c, l) : x && (_ < 0 || u !== w[_] ? de(n, r, p, 2) : _--);
			}
		}
	}, de = (e, t, n, r, i = null) => {
		let { el: a, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) {
			de(e.component.subTree, t, n, r);
			return;
		}
		if (d & 128) {
			e.suspense.move(t, n, r);
			return;
		}
		if (d & 64) {
			c.move(e, t, n, ye);
			return;
		}
		if (c === U) {
			o(a, t, n);
			for (let e = 0; e < u.length; e++) de(u[e], t, n, r);
			o(e.anchor, t, n);
			return;
		}
		if (c === Ri) {
			S(e, t, n);
			return;
		}
		if (r !== 2 && d & 1 && l) if (r === 0) l.beforeEnter(a), o(a, t, n), Ci(() => l.enter(a), i);
		else {
			let { leave: r, delayLeave: i, afterLeave: c } = l, u = () => {
				e.ctx.isUnmounted ? s(a) : o(a, t, n);
			}, d = () => {
				a._isLeaving && a[Ln](!0), r(a, () => {
					u(), c && c();
				});
			};
			i ? i(a, u, d) : d();
		}
		else o(a, t, n);
	}, fe = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p } = e;
		if (d === -2 && (i = !1), s != null && (ze(), nr(s, null, n, e, !0), Be()), p != null && (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let m = u & 1 && f, h = !ir(e), g;
		if (h && (g = o && o.onVnodeBeforeUnmount) && ia(g, t, e), u & 6) me(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			m && En(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, ye, r) : l && !l.hasOnce && (a !== U || d > 0 && d & 64) ? he(l, t, n, !1, !0) : (a === U && d & 384 || !i && u & 16) && he(c, t, n), r && M(e);
		}
		(h && (g = o && o.onVnodeUnmounted) || m) && Ci(() => {
			g && ia(g, t, e), m && En(e, null, t, "unmounted");
		}, n);
	}, M = (e) => {
		let { type: t, el: n, anchor: r, transition: i } = e;
		if (t === U) {
			pe(n, r);
			return;
		}
		if (t === Ri) {
			C(e);
			return;
		}
		let a = () => {
			s(n), i && !i.persisted && i.afterLeave && i.afterLeave();
		};
		if (e.shapeFlag & 1 && i && !i.persisted) {
			let { leave: t, delayLeave: r } = i, o = () => t(n, a);
			r ? r(e.el, a, o) : o();
		} else a();
	}, pe = (e, t) => {
		let n;
		for (; e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, me = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		Mi(c), Mi(l), r && O(r), i.stop(), a && (a.flags |= 8, fe(o, e, t, n)), s && Ci(s, t), Ci(() => {
			e.isUnmounted = !0;
		}, t);
	}, he = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) fe(e[o], t, n, r, i);
	}, ge = (e) => {
		if (e.shapeFlag & 6) return ge(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = h(e.anchor || e.el), n = t && t[Fn];
		return n ? h(n) : t;
	}, _e = !1, ve = (e, t, n) => {
		let r;
		e == null ? t._vnode && (fe(t._vnode, null, null, !0), r = t._vnode.component) : v(t._vnode || null, e, t, null, null, null, n), t._vnode = e, _e ||= (_e = !0, vn(r), yn(), !1);
	}, ye = {
		p: v,
		um: fe,
		m: de,
		r: M,
		mt: k,
		mc: T,
		pc: le,
		pbc: ie,
		n: ge,
		o: e
	}, N, be;
	return i && ([N, be] = i(ye)), {
		render: ve,
		hydrate: N,
		createApp: Gr(ve, N)
	};
}
function Ei({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Di({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Oi(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function ki(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (d(r) && d(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = ta(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && ki(t, a)), a.type === Ii && (a.patchFlag === -1 && (a = i[e] = ta(a)), a.el = t.el), a.type === Li && !a.el && (a.el = t.el);
	}
}
function Ai(e) {
	let t = e.slice(), n = [0], r, i, a, o, s, c = e.length;
	for (r = 0; r < c; r++) {
		let c = e[r];
		if (c !== 0) {
			if (i = n[n.length - 1], e[i] < c) {
				t[r] = i, n.push(r);
				continue;
			}
			for (a = 0, o = n.length - 1; a < o;) s = a + o >> 1, e[n[s]] < c ? a = s + 1 : o = s;
			c < e[n[a]] && (a > 0 && (t[r] = n[a - 1]), n[a] = r);
		}
	}
	for (a = n.length, o = n[a - 1]; a-- > 0;) n[a] = o, o = t[o];
	return n;
}
function ji(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : ji(t);
}
function Mi(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Ni(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? Ni(t.subTree) : null;
}
var Pi = (e) => e.__isSuspense;
function Fi(e, t) {
	t && t.pendingBranch ? d(e) ? t.effects.push(...e) : t.effects.push(e) : _n(e);
}
var U = /* @__PURE__ */ Symbol.for("v-fgt"), Ii = /* @__PURE__ */ Symbol.for("v-txt"), Li = /* @__PURE__ */ Symbol.for("v-cmt"), Ri = /* @__PURE__ */ Symbol.for("v-stc"), zi = [], Bi = null;
function W(e = !1) {
	zi.push(Bi = e ? null : []);
}
function Vi() {
	zi.pop(), Bi = zi[zi.length - 1] || null;
}
var Hi = 1;
function Ui(e, t = !1) {
	Hi += e, e < 0 && Bi && t && (Bi.hasOnce = !0);
}
function Wi(e) {
	return e.dynamicChildren = Hi > 0 ? Bi || n : null, Vi(), Hi > 0 && Bi && Bi.push(e), e;
}
function G(e, t, n, r, i, a) {
	return Wi(K(e, t, n, r, i, a, !0));
}
function Gi(e, t, n, r, i) {
	return Wi(Xi(e, t, n, r, i, !0));
}
function Ki(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function qi(e, t) {
	return e.type === t.type && e.key === t.key;
}
var Ji = ({ key: e }) => e ?? null, Yi = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : g(e) || /* @__PURE__ */ z(e) || h(e) ? {
	i: Sn,
	r: e,
	k: t,
	f: !!n
} : e);
function K(e, t = null, n = null, r = 0, i = null, a = e === U ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && Ji(t),
		ref: t && Yi(t),
		scopeId: Cn,
		slotScopeIds: null,
		children: n,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetStart: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag: a,
		patchFlag: r,
		dynamicProps: i,
		dynamicChildren: null,
		appContext: null,
		ctx: Sn
	};
	return s ? (na(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= g(n) ? 8 : 16), Hi > 0 && !o && Bi && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && Bi.push(c), c;
}
var Xi = Zi;
function Zi(e, t = null, n = null, r = 0, i = null, a = !1) {
	if ((!e || e === Sr) && (e = Li), Ki(e)) {
		let r = $i(e, t, !0);
		return n && na(r, n), Hi > 0 && !a && Bi && (r.shapeFlag & 6 ? Bi[Bi.indexOf(e)] = r : Bi.push(r)), r.patchFlag = -2, r;
	}
	if (wa(e) && (e = e.__vccOpts), t) {
		t = Qi(t);
		let { class: e, style: n } = t;
		e && !g(e) && (t.class = M(e)), v(n) && (/* @__PURE__ */ Rt(n) && !d(n) && (n = s({}, n)), t.style = le(n));
	}
	let o = g(e) ? 1 : Pi(e) ? 128 : In(e) ? 64 : v(e) ? 4 : h(e) ? 2 : 0;
	return K(e, t, n, r, i, o, a, !0);
}
function Qi(e) {
	return e ? /* @__PURE__ */ Rt(e) || si(e) ? s({}, e) : e : null;
}
function $i(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? ra(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && Ji(l),
		ref: t && t.ref ? n && a ? d(a) ? a.concat(Yi(t)) : [a, Yi(t)] : Yi(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== U ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && $i(e.ssContent),
		ssFallback: e.ssFallback && $i(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce
	};
	return c && r && Xn(u, c.clone(u)), u;
}
function q(e = " ", t = 0) {
	return Xi(Ii, null, e, t);
}
function J(e = "", t = !1) {
	return t ? (W(), Gi(Li, null, e)) : Xi(Li, null, e);
}
function ea(e) {
	return e == null || typeof e == "boolean" ? Xi(Li) : d(e) ? Xi(U, null, e.slice()) : Ki(e) ? ta(e) : Xi(Ii, null, String(e));
}
function ta(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : $i(e);
}
function na(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (d(t)) n = 16;
	else if (typeof t == "object") if (r & 65) {
		let n = t.default;
		n && (n._c && (n._d = !1), na(e, n()), n._c && (n._d = !0));
		return;
	} else {
		n = 32;
		let r = t._;
		!r && !si(t) ? t._ctx = Sn : r === 3 && Sn && (Sn.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
	}
	else h(t) ? (t = {
		default: t,
		_ctx: Sn
	}, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [q(t)]) : n = 8);
	e.children = t, e.shapeFlag |= n;
}
function ra(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = M([t.class, r.class]));
		else if (e === "style") t.style = le([t.style, r.style]);
		else if (a(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(d(n) && n.includes(i)) && (t[e] = n ? [].concat(n, i) : i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function ia(e, t, n, r = null) {
	nn(e, t, 7, [n, r]);
}
var aa = Ur(), oa = 0;
function sa(e, n, r) {
	let i = e.type, a = (n ? n.appContext : e.appContext) || aa, o = {
		uid: oa++,
		vnode: e,
		type: i,
		parent: n,
		appContext: a,
		root: null,
		next: null,
		subTree: null,
		effect: null,
		update: null,
		job: null,
		scope: new Se(!0),
		render: null,
		proxy: null,
		exposed: null,
		exposeProxy: null,
		withProxy: null,
		provides: n ? n.provides : Object.create(a.provides),
		ids: n ? n.ids : [
			"",
			0,
			0
		],
		accessCache: null,
		renderCache: [],
		components: null,
		directives: null,
		propsOptions: pi(i, a),
		emitsOptions: Xr(i, a),
		emit: null,
		emitted: null,
		propsDefaults: t,
		inheritAttrs: i.inheritAttrs,
		ctx: t,
		data: t,
		props: t,
		attrs: t,
		slots: t,
		refs: t,
		setupState: t,
		setupContext: null,
		suspense: r,
		suspenseId: r ? r.pendingId : 0,
		asyncDep: null,
		asyncResolved: !1,
		isMounted: !1,
		isUnmounted: !1,
		isDeactivated: !1,
		bc: null,
		c: null,
		bm: null,
		m: null,
		bu: null,
		u: null,
		um: null,
		bum: null,
		da: null,
		a: null,
		rtg: null,
		rtc: null,
		ec: null,
		sp: null
	};
	return o.ctx = { _: o }, o.root = n ? n.root : o, o.emit = Jr.bind(null, o), e.ce && e.ce(o), o;
}
var Y = null, ca = () => Y || Sn, la, ua;
{
	let e = ce(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	la = t("__VUE_INSTANCE_SETTERS__", (e) => Y = e), ua = t("__VUE_SSR_SETTERS__", (e) => ma = e);
}
var da = (e) => {
	let t = Y;
	return la(e), e.scope.on(), () => {
		e.scope.off(), la(t);
	};
}, fa = () => {
	Y && Y.scope.off(), la(null);
};
function pa(e) {
	return e.vnode.shapeFlag & 4;
}
var ma = !1;
function ha(e, t = !1, n = !1) {
	t && ua(t);
	let { props: r, children: i } = e.vnode, a = pa(e);
	ci(e, r, a, t), xi(e, i, n || t);
	let o = a ? ga(e, t) : void 0;
	return t && ua(!1), o;
}
function ga(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Er);
	let { setup: r } = n;
	if (r) {
		ze();
		let n = e.setupContext = r.length > 1 ? Sa(e) : null, i = da(e), a = tn(r, e, 0, [e.props, n]), o = y(a);
		if (Be(), i(), (o || e.sp) && !ir(e) && $n(e), o) {
			if (a.then(fa, fa), t) return a.then((n) => {
				_a(e, n, t);
			}).catch((t) => {
				rn(t, e, 0);
			});
			e.asyncDep = a;
		} else _a(e, a, t);
	} else ba(e, t);
}
function _a(e, t, n) {
	h(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : v(t) && (e.setupState = Kt(t)), ba(e, n);
}
var va, ya;
function ba(e, t, n) {
	let i = e.type;
	if (!e.render) {
		if (!t && va && !i.render) {
			let t = i.template || Nr(e).template;
			if (t) {
				let { isCustomElement: n, compilerOptions: r } = e.appContext.config, { delimiters: a, compilerOptions: o } = i;
				i.render = va(t, s(s({
					isCustomElement: n,
					delimiters: a
				}, r), o));
			}
		}
		e.render = i.render || r, ya && ya(e);
	}
	{
		let t = da(e);
		ze();
		try {
			kr(e);
		} finally {
			Be(), t();
		}
	}
}
var xa = { get(e, t) {
	return L(e, "get", ""), e[t];
} };
function Sa(e) {
	return {
		attrs: new Proxy(e.attrs, xa),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function Ca(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(Kt(zt(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in wr) return wr[n](e);
		},
		has(e, t) {
			return t in e || t in wr;
		}
	}) : e.proxy;
}
function wa(e) {
	return h(e) && "__vccOpts" in e;
}
var X = (e, t) => /* @__PURE__ */ Jt(e, t, ma);
function Ta(e, t, n) {
	try {
		Ui(-1);
		let r = arguments.length;
		return r === 2 ? v(t) && !d(t) ? Ki(t) ? Xi(e, null, [t]) : Xi(e, t) : Xi(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && Ki(n) && (n = [n]), Xi(e, t, n));
	} finally {
		Ui(1);
	}
}
var Ea = "3.5.30", Da = void 0, Oa = typeof window < "u" && window.trustedTypes;
if (Oa) try {
	Da = /* @__PURE__ */ Oa.createPolicy("vue", { createHTML: (e) => e });
} catch {}
var ka = Da ? (e) => Da.createHTML(e) : (e) => e, Aa = "http://www.w3.org/2000/svg", ja = "http://www.w3.org/1998/Math/MathML", Ma = typeof document < "u" ? document : null, Na = Ma && /* @__PURE__ */ Ma.createElement("template"), Pa = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? Ma.createElementNS(Aa, e) : t === "mathml" ? Ma.createElementNS(ja, e) : n ? Ma.createElement(e, { is: n }) : Ma.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => Ma.createTextNode(e),
	createComment: (e) => Ma.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => Ma.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), !(i === a || !(i = i.nextSibling)););
		else {
			Na.innerHTML = ka(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = Na.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, Fa = "transition", Ia = "animation", La = /* @__PURE__ */ Symbol("_vtc"), Ra = {
	name: String,
	type: String,
	css: {
		type: Boolean,
		default: !0
	},
	duration: [
		String,
		Number,
		Object
	],
	enterFromClass: String,
	enterActiveClass: String,
	enterToClass: String,
	appearFromClass: String,
	appearActiveClass: String,
	appearToClass: String,
	leaveFromClass: String,
	leaveActiveClass: String,
	leaveToClass: String
}, za = /* @__PURE__ */ s({}, Vn, Ra), Ba = /* @__PURE__ */ ((e) => (e.displayName = "Transition", e.props = za, e))((e, { slots: t }) => Ta(Gn, Ua(e), t)), Va = (e, t = []) => {
	d(e) ? e.forEach((e) => e(...t)) : e && e(...t);
}, Ha = (e) => e ? d(e) ? e.some((e) => e.length > 1) : e.length > 1 : !1;
function Ua(e) {
	let t = {};
	for (let n in e) n in Ra || (t[n] = e[n]);
	if (e.css === !1) return t;
	let { name: n = "v", type: r, duration: i, enterFromClass: a = `${n}-enter-from`, enterActiveClass: o = `${n}-enter-active`, enterToClass: c = `${n}-enter-to`, appearFromClass: l = a, appearActiveClass: u = o, appearToClass: d = c, leaveFromClass: f = `${n}-leave-from`, leaveActiveClass: p = `${n}-leave-active`, leaveToClass: m = `${n}-leave-to` } = e, h = Wa(i), g = h && h[0], _ = h && h[1], { onBeforeEnter: v, onEnter: y, onEnterCancelled: b, onLeave: x, onLeaveCancelled: S, onBeforeAppear: C = v, onAppear: w = y, onAppearCancelled: ee = b } = t, te = (e, t, n, r) => {
		e._enterCancelled = r, qa(e, t ? d : c), qa(e, t ? u : o), n && n();
	}, ne = (e, t) => {
		e._isLeaving = !1, qa(e, f), qa(e, m), qa(e, p), t && t();
	}, T = (e) => (t, n) => {
		let i = e ? w : y, o = () => te(t, e, n);
		Va(i, [t, o]), Ja(() => {
			qa(t, e ? l : a), Ka(t, e ? d : c), Ha(i) || Xa(t, r, g, o);
		});
	};
	return s(t, {
		onBeforeEnter(e) {
			Va(v, [e]), Ka(e, a), Ka(e, o);
		},
		onBeforeAppear(e) {
			Va(C, [e]), Ka(e, l), Ka(e, u);
		},
		onEnter: T(!1),
		onAppear: T(!0),
		onLeave(e, t) {
			e._isLeaving = !0;
			let n = () => ne(e, t);
			Ka(e, f), e._enterCancelled ? (Ka(e, p), eo(e)) : (eo(e), Ka(e, p)), Ja(() => {
				e._isLeaving && (qa(e, f), Ka(e, m), Ha(x) || Xa(e, r, _, n));
			}), Va(x, [e, n]);
		},
		onEnterCancelled(e) {
			te(e, !1, void 0, !0), Va(b, [e]);
		},
		onAppearCancelled(e) {
			te(e, !0, void 0, !0), Va(ee, [e]);
		},
		onLeaveCancelled(e) {
			ne(e), Va(S, [e]);
		}
	});
}
function Wa(e) {
	if (e == null) return null;
	if (v(e)) return [Ga(e.enter), Ga(e.leave)];
	{
		let t = Ga(e);
		return [t, t];
	}
}
function Ga(e) {
	return A(e);
}
function Ka(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.add(t)), (e[La] || (e[La] = /* @__PURE__ */ new Set())).add(t);
}
function qa(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.remove(t));
	let n = e[La];
	n && (n.delete(t), n.size || (e[La] = void 0));
}
function Ja(e) {
	requestAnimationFrame(() => {
		requestAnimationFrame(e);
	});
}
var Ya = 0;
function Xa(e, t, n, r) {
	let i = e._endId = ++Ya, a = () => {
		i === e._endId && r();
	};
	if (n != null) return setTimeout(a, n);
	let { type: o, timeout: s, propCount: c } = Za(e, t);
	if (!o) return r();
	let l = o + "end", u = 0, d = () => {
		e.removeEventListener(l, f), a();
	}, f = (t) => {
		t.target === e && ++u >= c && d();
	};
	setTimeout(() => {
		u < c && d();
	}, s + 1), e.addEventListener(l, f);
}
function Za(e, t) {
	let n = window.getComputedStyle(e), r = (e) => (n[e] || "").split(", "), i = r(`${Fa}Delay`), a = r(`${Fa}Duration`), o = Qa(i, a), s = r(`${Ia}Delay`), c = r(`${Ia}Duration`), l = Qa(s, c), u = null, d = 0, f = 0;
	t === Fa ? o > 0 && (u = Fa, d = o, f = a.length) : t === Ia ? l > 0 && (u = Ia, d = l, f = c.length) : (d = Math.max(o, l), u = d > 0 ? o > l ? Fa : Ia : null, f = u ? u === Fa ? a.length : c.length : 0);
	let p = u === Fa && /\b(?:transform|all)(?:,|$)/.test(r(`${Fa}Property`).toString());
	return {
		type: u,
		timeout: d,
		propCount: f,
		hasTransform: p
	};
}
function Qa(e, t) {
	for (; e.length < t.length;) e = e.concat(e);
	return Math.max(...t.map((t, n) => $a(t) + $a(e[n])));
}
function $a(e) {
	return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function eo(e) {
	return (e ? e.ownerDocument : document).body.offsetHeight;
}
function to(e, t, n) {
	let r = e[La];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var no = /* @__PURE__ */ Symbol("_vod"), ro = /* @__PURE__ */ Symbol("_vsh"), io = {
	name: "show",
	beforeMount(e, { value: t }, { transition: n }) {
		e[no] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : ao(e, t);
	},
	mounted(e, { value: t }, { transition: n }) {
		n && t && n.enter(e);
	},
	updated(e, { value: t, oldValue: n }, { transition: r }) {
		!t != !n && (r ? t ? (r.beforeEnter(e), ao(e, !0), r.enter(e)) : r.leave(e, () => {
			ao(e, !1);
		}) : ao(e, t));
	},
	beforeUnmount(e, { value: t }) {
		ao(e, t);
	}
};
function ao(e, t) {
	e.style.display = t ? e[no] : "none", e[ro] = !t;
}
var oo = /* @__PURE__ */ Symbol(""), so = /(?:^|;)\s*display\s*:/;
function co(e, t, n) {
	let r = e.style, i = g(n), a = !1;
	if (n && !i) {
		if (t) if (g(t)) for (let e of t.split(";")) {
			let t = e.slice(0, e.indexOf(":")).trim();
			n[t] ?? uo(r, t, "");
		}
		else for (let e in t) n[e] ?? uo(r, e, "");
		for (let e in n) e === "display" && (a = !0), uo(r, e, n[e]);
	} else if (i) {
		if (t !== n) {
			let e = r[oo];
			e && (n += ";" + e), r.cssText = n, a = so.test(n);
		}
	} else t && e.removeAttribute("style");
	no in e && (e[no] = a ? r.display : "", e[ro] && (r.display = "none"));
}
var lo = /\s*!important$/;
function uo(e, t, n) {
	if (d(n)) n.forEach((n) => uo(e, t, n));
	else if (n ??= "", t.startsWith("--")) e.setProperty(t, n);
	else {
		let r = mo(e, t);
		lo.test(n) ? e.setProperty(ie(r), n.replace(lo, ""), "important") : e[r] = n;
	}
}
var fo = [
	"Webkit",
	"Moz",
	"ms"
], po = {};
function mo(e, t) {
	let n = po[t];
	if (n) return n;
	let r = T(t);
	if (r !== "filter" && r in e) return po[t] = r;
	r = ae(r);
	for (let n = 0; n < fo.length; n++) {
		let i = fo[n] + r;
		if (i in e) return po[t] = i;
	}
	return t;
}
var ho = "http://www.w3.org/1999/xlink";
function go(e, t, n, r, i, a = me(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(ho, t.slice(6, t.length)) : e.setAttributeNS(ho, t, n) : n == null || a && !he(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : _(n) ? String(n) : n);
}
function _o(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? ka(n) : n);
		return;
	}
	let a = e.tagName;
	if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
		let r = a === "OPTION" ? e.getAttribute("value") || "" : e.value, i = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
		(r !== i || !("_value" in e)) && (e.value = i), n ?? e.removeAttribute(t), e._value = n;
		return;
	}
	let o = !1;
	if (n === "" || n == null) {
		let r = typeof e[t];
		r === "boolean" ? n = he(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
	}
	try {
		e[t] = n;
	} catch {}
	o && e.removeAttribute(i || t);
}
function vo(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function yo(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var bo = /* @__PURE__ */ Symbol("_vei");
function xo(e, t, n, r, i = null) {
	let a = e[bo] || (e[bo] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = Co(t);
		r ? vo(e, n, a[t] = Do(r, i), s) : o && (yo(e, n, o, s), a[t] = void 0);
	}
}
var So = /(?:Once|Passive|Capture)$/;
function Co(e) {
	let t;
	if (So.test(e)) {
		t = {};
		let n;
		for (; n = e.match(So);) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
	}
	return [e[2] === ":" ? e.slice(3) : ie(e.slice(2)), t];
}
var wo = 0, To = /* @__PURE__ */ Promise.resolve(), Eo = () => wo ||= (To.then(() => wo = 0), Date.now());
function Do(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		nn(Oo(e, n.value), t, 5, [e]);
	};
	return n.value = e, n.attached = Eo(), n;
}
function Oo(e, t) {
	if (d(t)) {
		let n = e.stopImmediatePropagation;
		return e.stopImmediatePropagation = () => {
			n.call(e), e._stopped = !0;
		}, t.map((e) => (t) => !t._stopped && e && e(t));
	} else return t;
}
var ko = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Ao = (e, t, n, r, i, s) => {
	let c = i === "svg";
	t === "class" ? to(e, r, c) : t === "style" ? co(e, n, r) : a(t) ? o(t) || xo(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : jo(e, t, r, c)) ? (_o(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && go(e, t, r, c, s, t !== "value")) : e._isVueCE && (Mo(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !g(r))) ? _o(e, T(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), go(e, t, r, c));
};
function jo(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && ko(t) && h(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return ko(t) && g(n) ? !1 : t in e;
}
function Mo(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = T(t);
	return Array.isArray(n) ? n.some((e) => T(e) === r) : Object.keys(n).some((e) => T(e) === r);
}
var No = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return d(t) ? (e) => O(t, e) : t;
};
function Po(e) {
	e.target.composing = !0;
}
function Fo(e) {
	let t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var Io = /* @__PURE__ */ Symbol("_assign");
function Lo(e, t, n) {
	return t && (e = e.trim()), n && (e = oe(e)), e;
}
var Z = {
	created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
		e[Io] = No(i);
		let a = r || i.props && i.props.type === "number";
		vo(e, t ? "change" : "input", (t) => {
			t.target.composing || e[Io](Lo(e.value, n, a));
		}), (n || a) && vo(e, "change", () => {
			e.value = Lo(e.value, n, a);
		}), t || (vo(e, "compositionstart", Po), vo(e, "compositionend", Fo), vo(e, "change", Fo));
	},
	mounted(e, { value: t }) {
		e.value = t ?? "";
	},
	beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: i, number: a } }, o) {
		if (e[Io] = No(o), e.composing) return;
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? oe(e.value) : e.value, c = t ?? "";
		s !== c && (document.activeElement === e && e.type !== "range" && (r && t === n || i && e.value.trim() === c) || (e.value = c));
	}
}, Ro = {
	deep: !0,
	created(e, t, n) {
		e[Io] = No(n), vo(e, "change", () => {
			let t = e._modelValue, n = Uo(e), r = e.checked, i = e[Io];
			if (d(t)) {
				let e = ve(t, n), a = e !== -1;
				if (r && !a) i(t.concat(n));
				else if (!r && a) {
					let n = [...t];
					n.splice(e, 1), i(n);
				}
			} else if (p(t)) {
				let e = new Set(t);
				r ? e.add(n) : e.delete(n), i(e);
			} else i(Wo(e, r));
		});
	},
	mounted: zo,
	beforeUpdate(e, t, n) {
		e[Io] = No(n), zo(e, t, n);
	}
};
function zo(e, { value: t, oldValue: n }, r) {
	e._modelValue = t;
	let i;
	if (d(t)) i = ve(t, r.props.value) > -1;
	else if (p(t)) i = t.has(r.props.value);
	else {
		if (t === n) return;
		i = _e(t, Wo(e, !0));
	}
	e.checked !== i && (e.checked = i);
}
var Bo = {
	created(e, { value: t }, n) {
		e.checked = _e(t, n.props.value), e[Io] = No(n), vo(e, "change", () => {
			e[Io](Uo(e));
		});
	},
	beforeUpdate(e, { value: t, oldValue: n }, r) {
		e[Io] = No(r), t !== n && (e.checked = _e(t, r.props.value));
	}
}, Vo = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		let i = p(t);
		vo(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? oe(Uo(e)) : Uo(e));
			e[Io](e.multiple ? i ? new Set(t) : t : t[0]), e._assigning = !0, pn(() => {
				e._assigning = !1;
			});
		}), e[Io] = No(r);
	},
	mounted(e, { value: t }) {
		Ho(e, t);
	},
	beforeUpdate(e, t, n) {
		e[Io] = No(n);
	},
	updated(e, { value: t }) {
		e._assigning || Ho(e, t);
	}
};
function Ho(e, t) {
	let n = e.multiple, r = d(t);
	if (!(n && !r && !p(t))) {
		for (let i = 0, a = e.options.length; i < a; i++) {
			let a = e.options[i], o = Uo(a);
			if (n) if (r) {
				let e = typeof o;
				e === "string" || e === "number" ? a.selected = t.some((e) => String(e) === String(o)) : a.selected = ve(t, o) > -1;
			} else a.selected = t.has(o);
			else if (_e(Uo(a), t)) {
				e.selectedIndex !== i && (e.selectedIndex = i);
				return;
			}
		}
		!n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
	}
}
function Uo(e) {
	return "_value" in e ? e._value : e.value;
}
function Wo(e, t) {
	let n = t ? "_trueValue" : "_falseValue";
	return n in e ? e[n] : t;
}
var Go = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], Ko = {
	stop: (e) => e.stopPropagation(),
	prevent: (e) => e.preventDefault(),
	self: (e) => e.target !== e.currentTarget,
	ctrl: (e) => !e.ctrlKey,
	shift: (e) => !e.shiftKey,
	alt: (e) => !e.altKey,
	meta: (e) => !e.metaKey,
	left: (e) => "button" in e && e.button !== 0,
	middle: (e) => "button" in e && e.button !== 1,
	right: (e) => "button" in e && e.button !== 2,
	exact: (e, t) => Go.some((n) => e[`${n}Key`] && !t.includes(n))
}, Q = (e, t) => {
	if (!e) return e;
	let n = e._withMods ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n, ...r) => {
		for (let e = 0; e < t.length; e++) {
			let r = Ko[t[e]];
			if (r && r(n, t)) return;
		}
		return e(n, ...r);
	}));
}, qo = /* @__PURE__ */ s({ patchProp: Ao }, Pa), Jo;
function Yo() {
	return Jo ||= wi(qo);
}
var Xo = ((...e) => {
	let t = Yo().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = Qo(e);
		if (!r) return;
		let i = t._component;
		!h(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, Zo(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
});
function Zo(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function Qo(e) {
	return g(e) ? document.querySelector(e) : e;
}
//#endregion
//#region src/seven-days1/bridge.ts
var $ = /* @__PURE__ */ Mt({
	isReady: !1,
	latestMesId: -1,
	mvuDataMap: /* @__PURE__ */ new Map()
}), $o = () => {
	try {
		if (window.SillyTavern !== void 0) return window.SillyTavern;
		if (window.top && window.top.SillyTavern !== void 0) return window.top.SillyTavern;
		if (window.parent && window.parent.SillyTavern !== void 0) return window.parent.SillyTavern;
	} catch {}
	return null;
}, es = (e) => {
	let t = $o()?.getContext?.();
	if (t?.isGenerating) {
		typeof toastr < "u" && toastr.warning("观测者正在记录中，请等待当前生成完毕...", "系统提示");
		return;
	}
	if (t && typeof t.sendText == "function") {
		t.sendText(e);
		return;
	}
	let n = document;
	try {
		window.parent && window.parent.document && (n = window.parent.document);
	} catch {}
	let r = n.getElementById("send_textarea"), i = n.getElementById("send_but");
	if (r && i) {
		let t = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;
		t ? t.call(r, e) : r.value = e, r.dispatchEvent(new Event("input", { bubbles: !0 })), setTimeout(() => i.click(), 100);
		return;
	}
	throw Error("无法找到发送按钮或API，触发沙盒降级");
}, ts = (e) => {
	try {
		let t = window.Mvu;
		if (!t) try {
			t = window.top.Mvu;
		} catch {}
		if (t && typeof t.getMvuData == "function") return t.getMvuData({
			type: "message",
			message_id: e
		})?.stat_data || {};
		let n = window.getVariables;
		if (!n) try {
			n = window.top.getVariables;
		} catch {}
		if (n) return n({
			type: "message",
			message_id: e
		}) || {};
	} catch {}
	return {};
}, ns = { class: "stb-pm-wrapper" }, rs = { class: "stb-pm-header" }, is = { class: "stb-pm-location" }, as = { class: "stb-pm-env-col" }, os = { class: "stb-pm-tag stb-pm-tag-time" }, ss = { class: "stb-pm-tag stb-pm-tag-weather" }, cs = { class: "stb-pm-bgm-container" }, ls = { class: "stb-pm-actions" }, us = { class: "stb-pm-tabs-container" }, ds = { class: "stb-pm-tab-label" }, fs = ["name"], ps = { class: "stb-pm-tab-content" }, ms = { class: "stb-pm-badges" }, hs = { class: "stb-pm-badge stb-pm-badge-title" }, gs = { class: "stb-pm-badge" }, _s = { class: "stb-pm-badge" }, vs = { class: "stb-pm-panel" }, ys = { class: "stb-pm-bar-container" }, bs = { class: "stb-pm-bar-header" }, xs = { class: "stb-pm-bar-value" }, Ss = { class: "stb-pm-bar-track" }, Cs = { class: "stb-pm-bar-container" }, ws = { class: "stb-pm-bar-header" }, Ts = { class: "stb-pm-bar-value" }, Es = { class: "stb-pm-bar-track" }, Ds = { class: "stb-pm-bar-container" }, Os = { class: "stb-pm-bar-header" }, ks = { class: "stb-pm-bar-value" }, As = { class: "stb-pm-bar-track" }, js = {
	class: "stb-pm-bar-container",
	style: { "margin-bottom": "0" }
}, Ms = { class: "stb-pm-bar-header" }, Ns = { class: "stb-pm-bar-value" }, Ps = {
	class: "stb-pm-panel",
	style: { "border-left-color": "#ce93d8" }
}, Fs = ["textContent"], Is = { class: "stb-pm-panel" }, Ls = { class: "stb-pm-limbs-grid" }, Rs = ["data-status"], zs = { class: "stb-pm-limb-stat" }, Bs = ["data-status"], Vs = { class: "stb-pm-limb-stat" }, Hs = ["data-status"], Us = { class: "stb-pm-limb-stat" }, Ws = ["data-status"], Gs = { class: "stb-pm-limb-stat" }, Ks = ["data-status"], qs = { class: "stb-pm-limb-stat" }, Js = ["data-status"], Ys = { class: "stb-pm-limb-stat" }, Xs = { class: "stb-pm-panel" }, Zs = ["textContent"], Qs = { class: "stb-pm-tab-label" }, $s = ["name"], ec = { class: "stb-pm-tab-content" }, tc = { class: "stb-pm-panel" }, nc = { class: "stb-pm-stats-grid" }, rc = { class: "stb-pm-stat-box" }, ic = { class: "stb-pm-stat-value" }, ac = { class: "stb-pm-stat-box" }, oc = { class: "stb-pm-stat-value" }, sc = { class: "stb-pm-stat-box" }, cc = { class: "stb-pm-stat-value" }, lc = { class: "stb-pm-stat-box" }, uc = { class: "stb-pm-stat-value" }, dc = { class: "stb-pm-stat-box" }, fc = { class: "stb-pm-stat-value" }, pc = { class: "stb-pm-stat-box" }, mc = { class: "stb-pm-stat-value" }, hc = { class: "stb-pm-panel" }, gc = { class: "stb-pm-folder-content stb-pm-text-block" }, _c = { class: "stb-pm-folder-actions" }, vc = { class: "stb-pm-folder-content stb-pm-text-block" }, yc = { class: "stb-pm-folder-actions" }, bc = { class: "stb-pm-folder-content stb-pm-terminal-data" }, xc = { key: 1 }, Sc = { class: "stb-pm-folder-actions" }, Cc = { class: "stb-pm-panel" }, wc = { class: "stb-pm-folder-content stb-pm-terminal-data" }, Tc = { key: 1 }, Ec = { class: "stb-pm-folder-actions" }, Dc = { class: "stb-pm-tab-label" }, Oc = ["name"], kc = { class: "stb-pm-tab-content" }, Ac = { class: "stb-pm-panel" }, jc = {
	class: "stb-pm-info-row",
	style: {
		display: "flex",
		"flex-direction": "row",
		"justify-content": "space-between"
	}
}, Mc = { class: "stb-pm-info-value stb-pm-evolution" }, Nc = {
	class: "stb-pm-info-row",
	style: {
		display: "flex",
		"flex-direction": "row",
		"justify-content": "space-between",
		"border-bottom": "none",
		"margin-bottom": "0"
	}
}, Pc = { class: "stb-pm-info-value" }, Fc = { class: "stb-pm-panel" }, Ic = { class: "stb-pm-terminal-data stb-pm-terminal-data-red" }, Lc = { key: 1 }, Rc = {
	class: "stb-pm-panel",
	style: { "border-left-color": "#ff6b6b" }
}, zc = ["textContent"], Bc = { class: "stb-pm-tab-label" }, Vc = ["name"], Hc = { class: "stb-pm-tab-content" }, Uc = {
	class: "stb-pm-panel",
	style: { "border-left-color": "#81d4fa" }
}, Wc = {
	class: "stb-pm-info-row",
	style: {
		display: "flex",
		"flex-direction": "row",
		"justify-content": "space-between"
	}
}, Gc = {
	class: "stb-pm-info-value",
	style: {
		color: "#81d4fa",
		"font-weight": "bold"
	}
}, Kc = {
	class: "stb-pm-info-row",
	style: {
		display: "flex",
		"flex-direction": "row",
		"justify-content": "space-between",
		"border-bottom": "none",
		"margin-bottom": "0"
	}
}, qc = {
	class: "stb-pm-info-value",
	style: {
		color: "#d4af37",
		"font-family": "monospace"
	}
}, Jc = {
	class: "stb-pm-panel",
	style: { "border-left-color": "#ce93d8" }
}, Yc = {
	class: "stb-pm-info-row",
	style: {
		display: "flex",
		"flex-direction": "row",
		"justify-content": "space-between"
	}
}, Xc = {
	class: "stb-pm-info-value",
	style: { color: "#ce93d8" }
}, Zc = {
	class: "stb-pm-info-row",
	style: {
		display: "flex",
		"flex-direction": "row",
		"justify-content": "space-between",
		"border-bottom": "none",
		"margin-bottom": "0"
	}
}, Qc = { class: "stb-pm-info-value" }, $c = { class: "stb-pm-panel" }, el = { class: "stb-pm-terminal-data stb-pm-terminal-data-gold" }, tl = { key: 1 }, nl = { class: "stb-pm-tab-label" }, rl = ["name"], il = { class: "stb-pm-tab-content" }, al = { class: "stb-pm-panel" }, ol = { class: "stb-pm-folder-content stb-pm-terminal-data" }, sl = { key: 1 }, cl = { class: "stb-pm-folder-content stb-pm-terminal-data" }, ll = { key: 0 }, ul = { key: 1 }, dl = { class: "stb-pm-folder-content stb-pm-terminal-data stb-pm-terminal-data-gold" }, fl = { key: 1 }, pl = { class: "stb-pm-tab-label" }, ml = ["name"], hl = { class: "stb-pm-tab-content" }, gl = { class: "stb-pm-panel" }, _l = {
	class: "stb-pm-info-row",
	style: {
		display: "flex",
		"flex-direction": "row",
		"justify-content": "space-between"
	}
}, vl = { class: "stb-pm-info-value" }, yl = {
	class: "stb-pm-info-row",
	style: {
		display: "flex",
		"flex-direction": "row",
		"justify-content": "space-between"
	}
}, bl = { class: "stb-pm-info-value" }, xl = {
	class: "stb-pm-info-row",
	style: {
		display: "flex",
		"flex-direction": "row",
		"justify-content": "space-between",
		"border-bottom": "none",
		"margin-bottom": "0"
	}
}, Sl = {
	class: "stb-pm-info-value",
	style: { color: "#81d4fa" }
}, Cl = { class: "stb-pm-panel" }, wl = { class: "stb-pm-folder-content stb-pm-terminal-data stb-pm-terminal-data-red" }, Tl = { key: 1 }, El = { class: "stb-pm-tab-label" }, Dl = ["name"], Ol = { class: "stb-pm-tab-content" }, kl = { class: "stb-pm-panel" }, Al = {
	class: "stb-pm-info-row",
	style: {
		display: "flex",
		"flex-direction": "row",
		"justify-content": "space-between"
	}
}, jl = {
	class: "stb-pm-info-value",
	style: { color: "#ff6b6b" }
}, Ml = {
	class: "stb-pm-info-row",
	style: {
		display: "flex",
		"flex-direction": "row",
		"justify-content": "space-between",
		"border-bottom": "none",
		"margin-bottom": "0"
	}
}, Nl = { class: "stb-pm-info-value" }, Pl = { class: "stb-pm-panel" }, Fl = { class: "stb-pm-folder-content stb-pm-terminal-data" }, Il = { key: 1 }, Ll = {
	class: "stb-pm-panel",
	style: { "border-left-color": "#d4af37" }
}, Rl = { class: "stb-pm-rumor-card" }, zl = ["textContent"], Bl = { class: "stb-pm-rumor-card" }, Vl = ["textContent"], Hl = {
	class: "stb-pm-rumor-card",
	style: { "margin-bottom": "0" }
}, Ul = ["textContent"], Wl = /* @__PURE__ */ Qn({
	__name: "App",
	props: { mesId: {
		type: Number,
		required: !0
	} },
	setup(e) {
		let t = e, n = /* @__PURE__ */ B("tab1"), r = /* @__PURE__ */ B(null), i = X(() => $.mvuDataMap.get(t.mesId) || {}), a = X(() => $.latestMesId === t.mesId), o = X(() => Object.keys(i.value).length > 0), s = X(() => t.mesId), c = X(() => Object.keys(i.value.玩家角色?.武装战力?.饰品 || {}).length > 0), l = X(() => Object.keys(i.value.玩家角色?.武装战力?.背包道具 || {}).length > 0), u = X(() => Object.keys(i.value.玩家角色?.基础属性?.专属业障 || {}).length > 0), d = X(() => Object.keys(i.value.玩家角色?.轮回线索?.永久精神创伤 || {}).length > 0), f = X(() => Object.keys(i.value.社交网络?.势力声望 || {}).length > 0), p = X(() => Object.keys(i.value.核心同伴 || {}).length > 0), m = X(() => Object.keys(i.value.社交网络?.NPC羁绊 || {}).length > 0), h = X(() => Object.keys(i.value.据点收容?.收容单元 || {}).length > 0), g = X(() => Object.keys(i.value.当前处境?.任务列表 || {}).length > 0), _ = X(() => {
			let e = i.value.当前处境 || {};
			return {
				focus: e.战术聚焦 || "",
				echo: e.精神回响 || "",
				status: e.特殊状态 || "",
				rumor1: e.旧巷余声 || "",
				rumor2: e.暗箱微光 || "",
				rumor3: e.远钟残响 || "",
				bgm: e.环境音轨 || ""
			};
		}), v = (e, t) => {
			let n = Number(e) || 0, r = Number(t) || 1;
			return r === 0 ? "0%" : Math.min(100, Math.max(0, Math.round(n / r * 100))) + "%";
		}, y = (e) => {
			es(e);
		}, b = (e) => {
			if (!r.value) return;
			let t = e.replace(/auto=1/g, "auto=0");
			t.includes("<iframe") || t.includes("<audio") ? r.value.innerHTML = t : r.value.innerHTML = "";
		}, x = () => {
			let e = document;
			try {
				window.parent && window.parent.document && (e = window.parent.document);
			} catch {}
			return e;
		}, S = () => {
			try {
				let e = x().querySelectorAll(".stb-pm-bgm-content");
				e.length > 1 && e.forEach((e) => {
					let n = e.closest(".mes");
					(n ? parseInt(n.getAttribute("mesid") || "-1", 10) : -1) !== t.mesId && (e.querySelectorAll("iframe").forEach((e) => {
						let t = e.getAttribute("src");
						t && t.includes("auto=1") && e.setAttribute("src", t.replace("auto=1", "auto=0"));
					}), e.querySelectorAll("audio").forEach((e) => {
						e.paused || e.pause();
					}));
				});
			} catch (e) {
				console.warn("[SevenDays UI] 停止其他 BGM 时被拦截或发生异常:", e);
			}
		};
		return jn([() => _.value.bgm, a], ([e, t]) => {
			e ? pn(() => {
				b(e), t && S();
			}) : r.value && (r.value.innerHTML = "");
		}, { immediate: !0 }), pr(() => {
			a.value && pn(() => S());
		}), (e, t) => V((W(), G("div", ns, [
			K("div", rs, [K("div", is, N(i.value.当前处境?.当前地点 || "未知"), 1), K("div", as, [K("div", os, "T+" + N(i.value.当前处境?.累计小时数 || 0) + "H", 1), K("div", ss, N(i.value.当前处境?.当前天象 || "未知"), 1)])]),
			V(K("div", cs, [K("details", {
				open: "",
				onClick: t[0] ||= Q(() => {}, ["stop"])
			}, [t[23] ||= K("summary", null, [K("span", null, "🎵 环境音轨 (BGM)"), K("span", { class: "stb-pm-bgm-arrow" }, "▼")], -1), K("div", {
				ref_key: "bgmContainerRef",
				ref: r,
				class: "stb-pm-bgm-content"
			}, null, 512)])], 512), [[io, _.value.bgm]]),
			K("div", ls, [K("a", {
				href: "#",
				class: "stb-pm-btn stb-pm-btn-guide",
				onClick: t[1] ||= Q((e) => y("【系统指令：呼唤骰娘】请求向导指引"), ["prevent", "stop"])
			}, "◆ 呼唤观测者"), K("a", {
				href: "#",
				class: "stb-pm-btn stb-pm-btn-mirror",
				onClick: t[2] ||= Q((e) => y("【系统指令：使用镜面发生器】进入心灵镜牢"), ["prevent", "stop"])
			}, "◇ 潜入心灵镜牢")]),
			K("div", us, [
				K("label", ds, [
					V(K("input", {
						"onUpdate:modelValue": t[3] ||= (e) => n.value = e,
						type: "radio",
						name: "pm-tabs_" + s.value,
						value: "tab1",
						class: "stb-pm-tab-radio"
					}, null, 8, fs), [[Bo, n.value]]),
					t[42] ||= K("div", { class: "stb-tab-btn" }, "观测主屏", -1),
					K("div", ps, [
						K("div", ms, [
							K("div", hs, [t[24] ||= K("strong", null, "Title:", -1), q(" " + N(i.value.玩家角色?.基础属性?.称号 || "未知"), 1)]),
							K("div", gs, [t[25] ||= K("strong", null, "Lv.", -1), q(" " + N(i.value.玩家角色?.基础属性?.等级 || 1), 1)]),
							K("div", _s, [t[26] ||= K("strong", null, "Dice:", -1), q(" " + N(i.value.玩家角色?.基础属性?.骰子点数 || 0), 1)])
						]),
						K("div", vs, [
							t[32] ||= K("div", { class: "stb-pm-panel-title" }, "Vital Signs", -1),
							K("div", ys, [K("div", bs, [t[27] ||= K("span", {
								class: "stb-pm-bar-label",
								style: { color: "#ff6b6b" }
							}, "HP", -1), K("span", xs, N(i.value.玩家角色?.基础属性?.当前HP || 0) + " / " + N(i.value.玩家角色?.基础属性?.最大HP || 0), 1)]), K("div", Ss, [K("div", {
								class: "stb-pm-bar-fill stb-pm-bar-hp",
								style: le({ width: v(i.value.玩家角色?.基础属性?.当前HP, i.value.玩家角色?.基础属性?.最大HP) })
							}, null, 4)])]),
							K("div", Cs, [K("div", ws, [t[28] ||= K("span", {
								class: "stb-pm-bar-label",
								style: { color: "#81d4fa" }
							}, "MP", -1), K("span", Ts, N(i.value.玩家角色?.基础属性?.当前MP || 0) + " / " + N(i.value.玩家角色?.基础属性?.最大MP || 0), 1)]), K("div", Es, [K("div", {
								class: "stb-pm-bar-fill stb-pm-bar-mp",
								style: le({ width: v(i.value.玩家角色?.基础属性?.当前MP, i.value.玩家角色?.基础属性?.最大MP) })
							}, null, 4)])]),
							K("div", Ds, [K("div", Os, [t[29] ||= K("span", {
								class: "stb-pm-bar-label",
								style: { color: "#81c784" }
							}, "SP", -1), K("span", ks, N(i.value.玩家角色?.基础属性?.理智值 || 0) + " / 20", 1)]), K("div", As, [K("div", {
								class: "stb-pm-bar-fill stb-pm-bar-sp",
								style: le({ width: v(i.value.玩家角色?.基础属性?.理智值, 20) })
							}, null, 4)])]),
							K("div", js, [K("div", Ms, [t[30] ||= K("span", {
								class: "stb-pm-bar-label",
								style: { color: "#fff59d" }
							}, "XP", -1), K("span", Ns, N(i.value.玩家角色?.基础属性?.经验值 || 0), 1)]), t[31] ||= K("div", { class: "stb-pm-bar-track" }, [K("div", {
								class: "stb-pm-bar-fill stb-pm-bar-xp",
								style: { width: "100%" }
							})], -1)])
						]),
						V(K("div", Ps, [t[33] ||= K("div", {
							class: "stb-pm-panel-title",
							style: {
								color: "#ce93d8",
								"border-bottom-color": "rgba(206, 147, 216, 0.3)"
							}
						}, "Special Status", -1), K("div", {
							class: "stb-pm-status-list",
							textContent: N(_.value.status)
						}, null, 8, Fs)], 512), [[io, _.value.status]]),
						K("div", Is, [t[40] ||= K("div", { class: "stb-pm-panel-title" }, "Biometric Scan", -1), K("div", Ls, [
							K("div", {
								"data-status": i.value.玩家角色?.肢体伤病?.头部 || "完好",
								class: "stb-pm-limb-card"
							}, [t[34] ||= K("div", { class: "stb-pm-limb-name" }, "头部", -1), K("div", zs, N(i.value.玩家角色?.肢体伤病?.头部 || "完好"), 1)], 8, Rs),
							K("div", {
								"data-status": i.value.玩家角色?.肢体伤病?.胸部 || "完好",
								class: "stb-pm-limb-card"
							}, [t[35] ||= K("div", { class: "stb-pm-limb-name" }, "胸部", -1), K("div", Vs, N(i.value.玩家角色?.肢体伤病?.胸部 || "完好"), 1)], 8, Bs),
							K("div", {
								"data-status": i.value.玩家角色?.肢体伤病?.左臂 || "完好",
								class: "stb-pm-limb-card"
							}, [t[36] ||= K("div", { class: "stb-pm-limb-name" }, "左臂", -1), K("div", Us, N(i.value.玩家角色?.肢体伤病?.左臂 || "完好"), 1)], 8, Hs),
							K("div", {
								"data-status": i.value.玩家角色?.肢体伤病?.右臂 || "完好",
								class: "stb-pm-limb-card"
							}, [t[37] ||= K("div", { class: "stb-pm-limb-name" }, "右臂", -1), K("div", Gs, N(i.value.玩家角色?.肢体伤病?.右臂 || "完好"), 1)], 8, Ws),
							K("div", {
								"data-status": i.value.玩家角色?.肢体伤病?.左腿 || "完好",
								class: "stb-pm-limb-card"
							}, [t[38] ||= K("div", { class: "stb-pm-limb-name" }, "左腿", -1), K("div", qs, N(i.value.玩家角色?.肢体伤病?.左腿 || "完好"), 1)], 8, Ks),
							K("div", {
								"data-status": i.value.玩家角色?.肢体伤病?.右腿 || "完好",
								class: "stb-pm-limb-card"
							}, [t[39] ||= K("div", { class: "stb-pm-limb-name" }, "右腿", -1), K("div", Ys, N(i.value.玩家角色?.肢体伤病?.右腿 || "完好"), 1)], 8, Js)
						])]),
						V(K("div", Xs, [t[41] ||= K("div", { class: "stb-pm-panel-title" }, "Tactical Focus", -1), K("div", {
							class: "stb-pm-text-block",
							textContent: N(_.value.focus)
						}, null, 8, Zs)], 512), [[io, _.value.focus]])
					])
				]),
				K("label", Qs, [
					V(K("input", {
						"onUpdate:modelValue": t[4] ||= (e) => n.value = e,
						type: "radio",
						name: "pm-tabs_" + s.value,
						value: "tab2",
						class: "stb-pm-tab-radio"
					}, null, 8, $s), [[Bo, n.value]]),
					t[56] ||= K("div", { class: "stb-tab-btn" }, "武装档案", -1),
					K("div", ec, [
						K("div", tc, [t[49] ||= K("div", { class: "stb-pm-panel-title" }, "Core Attributes", -1), K("div", nc, [
							K("div", rc, [t[43] ||= K("span", { class: "stb-pm-stat-label" }, "STR", -1), K("span", ic, N(i.value.玩家角色?.基础属性?.六维?.力量 || 10), 1)]),
							K("div", ac, [t[44] ||= K("span", { class: "stb-pm-stat-label" }, "DEX", -1), K("span", oc, N(i.value.玩家角色?.基础属性?.六维?.敏捷 || 10), 1)]),
							K("div", sc, [t[45] ||= K("span", { class: "stb-pm-stat-label" }, "CON", -1), K("span", cc, N(i.value.玩家角色?.基础属性?.六维?.体质 || 10), 1)]),
							K("div", lc, [t[46] ||= K("span", { class: "stb-pm-stat-label" }, "INT", -1), K("span", uc, N(i.value.玩家角色?.基础属性?.六维?.智力 || 10), 1)]),
							K("div", dc, [t[47] ||= K("span", { class: "stb-pm-stat-label" }, "WIS", -1), K("span", fc, N(i.value.玩家角色?.基础属性?.六维?.感知 || 10), 1)]),
							K("div", pc, [t[48] ||= K("span", { class: "stb-pm-stat-label" }, "CHA", -1), K("span", mc, N(i.value.玩家角色?.基础属性?.六维?.魅力 || 10), 1)])
						])]),
						K("div", hc, [
							t[53] ||= K("div", { class: "stb-pm-panel-title" }, "Equipped Gear", -1),
							K("details", {
								class: "stb-pm-folder",
								onClick: t[6] ||= Q(() => {}, ["stop"])
							}, [
								t[50] ||= K("summary", null, [K("span", null, "⚔️ 主武器"), K("span", { class: "stb-pm-folder-arrow" }, "▼")], -1),
								K("div", gc, N(i.value.玩家角色?.武装战力?.主武器 || "空"), 1),
								K("div", _c, [K("a", {
									href: "#",
									class: "stb-pm-btn-small",
									onClick: t[5] ||= Q((e) => y("【系统指令：卸下主武器】"), ["prevent", "stop"])
								}, "卸下")])
							]),
							K("details", {
								class: "stb-pm-folder",
								onClick: t[8] ||= Q(() => {}, ["stop"])
							}, [
								t[51] ||= K("summary", null, [K("span", null, "🛡️ 防具"), K("span", { class: "stb-pm-folder-arrow" }, "▼")], -1),
								K("div", vc, N(i.value.玩家角色?.武装战力?.防具 || "空"), 1),
								K("div", yc, [K("a", {
									href: "#",
									class: "stb-pm-btn-small",
									onClick: t[7] ||= Q((e) => y("【系统指令：卸下防具】"), ["prevent", "stop"])
								}, "卸下")])
							]),
							K("details", {
								class: "stb-pm-folder",
								onClick: t[10] ||= Q(() => {}, ["stop"])
							}, [
								t[52] ||= K("summary", null, [K("span", null, "💍 饰品"), K("span", { class: "stb-pm-folder-arrow" }, "▼")], -1),
								K("div", bc, [c.value ? (W(!0), G(U, { key: 0 }, H(i.value.玩家角色.武装战力.饰品, (e, t) => (W(), G("div", { key: "acc_" + t }, "👉 " + N(t) + ": " + N(e), 1))), 128)) : (W(), G("div", xc, "空"))]),
								K("div", Sc, [K("a", {
									href: "#",
									class: "stb-pm-btn-small",
									onClick: t[9] ||= Q((e) => y("【系统指令：管理饰品】"), ["prevent", "stop"])
								}, "管理")])
							])
						]),
						K("div", Cc, [t[55] ||= K("div", { class: "stb-pm-panel-title" }, "Inventory", -1), K("details", {
							class: "stb-pm-folder",
							onClick: t[12] ||= Q(() => {}, ["stop"])
						}, [
							t[54] ||= K("summary", null, [K("span", null, "🎒 背包道具"), K("span", { class: "stb-pm-folder-arrow" }, "▼")], -1),
							K("div", wc, [l.value ? (W(!0), G(U, { key: 0 }, H(i.value.玩家角色.武装战力.背包道具, (e, t) => (W(), G("div", { key: "inv_" + t }, " 🍱 " + N(t) + " (" + N(e?.数量 || 1) + ") - " + N(e?.描述 || "无"), 1))), 128)) : (W(), G("div", Tc, "无"))]),
							K("div", Ec, [K("a", {
								href: "#",
								class: "stb-pm-btn-small",
								onClick: t[11] ||= Q((e) => y("【系统指令：整理背包/使用道具】"), ["prevent", "stop"])
							}, "使用/装备")])
						])])
					])
				]),
				K("label", Dc, [
					V(K("input", {
						"onUpdate:modelValue": t[13] ||= (e) => n.value = e,
						type: "radio",
						name: "pm-tabs_" + s.value,
						value: "tab3",
						class: "stb-pm-tab-radio"
					}, null, 8, Oc), [[Bo, n.value]]),
					t[62] ||= K("div", { class: "stb-tab-btn" }, "深层意识", -1),
					K("div", kc, [
						K("div", Ac, [
							t[59] ||= K("div", { class: "stb-pm-panel-title" }, "Sanity Evolution", -1),
							K("div", jc, [t[57] ||= K("span", { class: "stb-pm-info-label" }, "当前阶段", -1), K("span", Mc, N(i.value.玩家角色?.理智演化?.当前阶段 || "正常"), 1)]),
							K("div", Nc, [t[58] ||= K("span", { class: "stb-pm-info-label" }, "理智稳定性", -1), K("span", Pc, N(i.value.玩家角色?.基础属性?.理智稳定性 || 100) + " / 100", 1)])
						]),
						K("div", Fc, [t[60] ||= K("div", { class: "stb-pm-panel-title" }, "Karma (专属业障)", -1), K("div", Ic, [u.value ? (W(!0), G(U, { key: 0 }, H(i.value.玩家角色.基础属性.专属业障, (e, t) => (W(), G("div", { key: "karma_" + t }, "⚡ [" + N(t) + "] " + N(e), 1))), 128)) : (W(), G("div", Lc, "无"))])]),
						V(K("div", Rc, [t[61] ||= K("div", {
							class: "stb-pm-panel-title",
							style: {
								color: "#ff6b6b",
								"border-bottom-color": "rgba(255, 107, 107, 0.3)"
							}
						}, "Mental Echo (精神回响)", -1), K("div", {
							class: "stb-pm-text-block",
							textContent: N(_.value.echo)
						}, null, 8, zc)], 512), [[io, _.value.echo]])
					])
				]),
				K("label", Bc, [
					V(K("input", {
						"onUpdate:modelValue": t[14] ||= (e) => n.value = e,
						type: "radio",
						name: "pm-tabs_" + s.value,
						value: "tab4",
						class: "stb-pm-tab-radio"
					}, null, 8, Vc), [[Bo, n.value]]),
					t[72] ||= K("div", { class: "stb-tab-btn" }, "轮回异化", -1),
					K("div", Hc, [
						K("div", Uc, [
							t[65] ||= K("div", {
								class: "stb-pm-panel-title",
								style: {
									color: "#81d4fa",
									"border-bottom-color": "rgba(129, 212, 250, 0.3)"
								}
							}, "Mirror Dungeon", -1),
							K("div", Wc, [t[63] ||= K("span", { class: "stb-pm-info-label" }, "当前层数", -1), K("span", Gc, N(i.value.玩家角色?.特殊机制?.心灵镜牢?.当前层数 || 0) + " / 15", 1)]),
							K("div", Kc, [t[64] ||= K("span", { class: "stb-pm-info-label" }, "星光余额", -1), K("span", qc, N(i.value.玩家角色?.特殊机制?.心灵镜牢?.星光余额 || 0), 1)])
						]),
						K("div", Jc, [
							t[68] ||= K("div", {
								class: "stb-pm-panel-title",
								style: {
									color: "#ce93d8",
									"border-bottom-color": "rgba(206, 147, 216, 0.3)"
								}
							}, "Identity Override", -1),
							K("div", Yc, [t[66] ||= K("span", { class: "stb-pm-info-label" }, "当前人格", -1), K("span", Xc, N(i.value.玩家角色?.特殊机制?.人格覆盖?.当前人格 || "无"), 1)]),
							K("div", Zc, [t[67] ||= K("span", { class: "stb-pm-info-label" }, "记忆混淆度", -1), K("span", Qc, N(i.value.玩家角色?.特殊机制?.人格覆盖?.记忆混淆度 || 0) + " / 100", 1)])
						]),
						K("div", $c, [t[71] ||= K("div", { class: "stb-pm-panel-title" }, "Loop Clues (轮回线索)", -1), K("div", el, [
							q(" 真相碎片: " + N(Array.isArray(i.value.玩家角色?.轮回线索?.世界真相碎片) && i.value.玩家角色.轮回线索.世界真相碎片.length > 0 ? i.value.玩家角色.轮回线索.世界真相碎片.join(" / ") : "无"), 1),
							t[69] ||= K("br", null, null, -1),
							t[70] ||= q(" 永久创伤: ", -1),
							d.value ? (W(!0), G(U, { key: 0 }, H(i.value.玩家角色.轮回线索.永久精神创伤, (e, t) => (W(), G("div", { key: "trauma_" + t }, "⚠️ [" + N(t) + "]: " + N(e), 1))), 128)) : (W(), G("div", tl, "无"))
						])])
					])
				]),
				K("label", nl, [
					V(K("input", {
						"onUpdate:modelValue": t[15] ||= (e) => n.value = e,
						type: "radio",
						name: "pm-tabs_" + s.value,
						value: "tab5",
						class: "stb-pm-tab-radio"
					}, null, 8, rl), [[Bo, n.value]]),
					t[77] ||= K("div", { class: "stb-tab-btn" }, "社交网络", -1),
					K("div", il, [K("div", al, [
						t[76] ||= K("div", { class: "stb-pm-panel-title" }, "Social Network", -1),
						K("details", {
							class: "stb-pm-folder",
							onClick: t[16] ||= Q(() => {}, ["stop"])
						}, [t[73] ||= K("summary", null, [K("span", null, "🏛️ 势力声望"), K("span", { class: "stb-pm-folder-arrow" }, "▼")], -1), K("div", ol, [f.value ? (W(!0), G(U, { key: 0 }, H(i.value.社交网络.势力声望, (e, t) => (W(), G("div", { key: "faction_" + t }, "🏛️ " + N(t) + ": " + N(e), 1))), 128)) : (W(), G("div", sl, "无"))])]),
						K("details", {
							class: "stb-pm-folder",
							onClick: t[17] ||= Q(() => {}, ["stop"])
						}, [t[74] ||= K("summary", null, [K("span", null, "👥 核心同伴"), K("span", { class: "stb-pm-folder-arrow" }, "▼")], -1), K("div", cl, [p.value ? (W(!0), G(U, { key: 0 }, H(i.value.核心同伴, (e, t) => (W(), G(U, { key: "comp_" + t }, [t !== "$meta" && t !== "无" ? (W(), G("div", ll, " 👥 [" + N(t) + "] HP:" + N(e?.当前HP || 0) + "/" + N(e?.最大HP || 0) + " SP:" + N(e?.理智值 || 0) + " 羁绊:" + N(e?.好感度 || 0), 1)) : J("", !0)], 64))), 128)) : (W(), G("div", ul, "无"))])]),
						K("details", {
							class: "stb-pm-folder",
							onClick: t[18] ||= Q(() => {}, ["stop"])
						}, [t[75] ||= K("summary", null, [K("span", null, "🔗 NPC羁绊"), K("span", { class: "stb-pm-folder-arrow" }, "▼")], -1), K("div", dl, [m.value ? (W(!0), G(U, { key: 0 }, H(i.value.社交网络.NPC羁绊, (e, t) => (W(), G("div", { key: "npc_" + t }, " 🔗 [" + N(t) + "] 好感:" + N(e?.好感度 || 0) + " | 状态:" + N(e?.复合状态 || "无"), 1))), 128)) : (W(), G("div", fl, "无"))])])
					])])
				]),
				K("label", pl, [
					V(K("input", {
						"onUpdate:modelValue": t[19] ||= (e) => n.value = e,
						type: "radio",
						name: "pm-tabs_" + s.value,
						value: "tab6",
						class: "stb-pm-tab-radio"
					}, null, 8, ml), [[Bo, n.value]]),
					t[84] ||= K("div", { class: "stb-tab-btn" }, "据点收容", -1),
					K("div", hl, [K("div", gl, [
						t[81] ||= K("div", { class: "stb-pm-panel-title" }, "Facility Status", -1),
						K("div", _l, [t[78] ||= K("span", { class: "stb-pm-info-label" }, "供电等级", -1), K("span", vl, N(i.value.据点收容?.设施状态?.供电等级 || "未知"), 1)]),
						K("div", yl, [t[79] ||= K("span", { class: "stb-pm-info-label" }, "防御等级", -1), K("span", bl, "Lv." + N(i.value.据点收容?.设施状态?.防御等级 || 0), 1)]),
						K("div", xl, [t[80] ||= K("span", { class: "stb-pm-info-label" }, "脑啡肽储量", -1), K("span", Sl, N(i.value.据点收容?.资源储备?.脑啡肽储量 || 0), 1)])
					]), K("div", Cl, [t[83] ||= K("div", { class: "stb-pm-panel-title" }, "Containment Units", -1), K("details", {
						class: "stb-pm-folder",
						onClick: t[20] ||= Q(() => {}, ["stop"])
					}, [t[82] ||= K("summary", null, [K("span", null, "📦 收容单元列表"), K("span", { class: "stb-pm-folder-arrow" }, "▼")], -1), K("div", wl, [h.value ? (W(!0), G(U, { key: 0 }, H(i.value.据点收容.收容单元, (e, t) => (W(), G("div", { key: "unit_" + t }, " ⚠️ [" + N(t) + "] 危险:" + N(e?.危险等级 || "未知") + " | 状态:" + N(e?.状态 || "未知"), 1))), 128)) : (W(), G("div", Tl, "无"))])])])])
				]),
				K("label", El, [
					V(K("input", {
						"onUpdate:modelValue": t[21] ||= (e) => n.value = e,
						type: "radio",
						name: "pm-tabs_" + s.value,
						value: "tab7",
						class: "stb-pm-tab-radio"
					}, null, 8, Dl), [[Bo, n.value]]),
					t[94] ||= K("div", { class: "stb-tab-btn" }, "任务异闻", -1),
					K("div", Ol, [
						K("div", kl, [
							t[87] ||= K("div", { class: "stb-pm-panel-title" }, "Current Encounter", -1),
							K("div", Al, [t[85] ||= K("span", { class: "stb-pm-info-label" }, "状态", -1), K("span", jl, N(i.value.当前处境?.当前遭遇?.状态 || "未知"), 1)]),
							K("div", Ml, [t[86] ||= K("span", { class: "stb-pm-info-label" }, "危险度", -1), K("span", Nl, N(i.value.当前处境?.当前遭遇?.危险度 || "未知"), 1)])
						]),
						K("div", Pl, [t[89] ||= K("div", { class: "stb-pm-panel-title" }, "Active Quests", -1), K("details", {
							class: "stb-pm-folder",
							onClick: t[22] ||= Q(() => {}, ["stop"])
						}, [t[88] ||= K("summary", null, [K("span", null, "📜 任务列表"), K("span", { class: "stb-pm-folder-arrow" }, "▼")], -1), K("div", Fl, [g.value ? (W(!0), G(U, { key: 0 }, H(i.value.当前处境.任务列表, (e, t) => (W(), G("div", { key: "quest_" + t }, " 📌 [" + N(t) + "] 评级:" + N(e?.评级 || "未知") + " | 状态:" + N(e?.状态 || "未知"), 1))), 128)) : (W(), G("div", Il, "无"))])])]),
						V(K("div", Ll, [
							t[93] ||= K("div", {
								class: "stb-pm-panel-title",
								style: {
									color: "#d4af37",
									"border-bottom-color": "rgba(212, 175, 55, 0.3)"
								}
							}, "Urban Rumors (都市截获)", -1),
							V(K("div", Rl, [t[90] ||= K("div", { class: "stb-pm-rumor-title" }, "旧巷余声", -1), K("div", {
								class: "stb-pm-rumor-text",
								textContent: N(_.value.rumor1)
							}, null, 8, zl)], 512), [[io, _.value.rumor1]]),
							V(K("div", Bl, [t[91] ||= K("div", { class: "stb-pm-rumor-title" }, "暗箱微光", -1), K("div", {
								class: "stb-pm-rumor-text",
								textContent: N(_.value.rumor2)
							}, null, 8, Vl)], 512), [[io, _.value.rumor2]]),
							V(K("div", Hl, [t[92] ||= K("div", { class: "stb-pm-rumor-title" }, "远钟残响", -1), K("div", {
								class: "stb-pm-rumor-text",
								textContent: N(_.value.rumor3)
							}, null, 8, Ul)], 512), [[io, _.value.rumor3]])
						], 512), [[io, _.value.rumor1 || _.value.rumor2 || _.value.rumor3]])
					])
				])
			])
		], 512)), [[io, a.value && o.value]]);
	}
}), Gl = {
	key: 0,
	class: "pm-master-container"
}, Kl = { class: "bgm-player" }, ql = {
	key: 0,
	class: "modal-overlay"
}, Jl = { class: "modal-content" }, Yl = ["value"], Xl = {
	key: "already_started",
	class: "page-check"
}, Zl = {
	key: "check",
	class: "page-check"
}, Ql = { class: "sys-check-box" }, $l = {
	key: 0,
	class: "status-loading"
}, eu = { class: "sys-actions" }, tu = ["disabled"], nu = ["disabled"], ru = {
	key: "transition",
	class: "transition-note"
}, iu = {
	key: "library",
	class: "library-scene"
}, au = ["src"], ou = {
	class: "scene-text",
	style: {
		position: "relative",
		"z-index": "1"
	}
}, su = { class: "highlight-gold" }, cu = { style: {
	width: "100%",
	"max-width": "900px",
	margin: "0 auto 20px",
	display: "flex",
	gap: "10px",
	"align-items": "center",
	"z-index": "10",
	position: "relative"
} }, lu = {
	class: "dossier-container",
	style: {
		position: "relative",
		"z-index": "1"
	}
}, uu = { class: "dossier-summary" }, du = { class: "ds-type" }, fu = { class: "ds-name" }, pu = { class: "ds-desc" }, mu = { class: "dossier-content" }, hu = {
	key: 0,
	class: "cp-quote"
}, gu = { class: "cp-grid" }, _u = { class: "cp-box" }, vu = { class: "cp-box-content" }, yu = { class: "cp-box" }, bu = { class: "cp-box-content" }, xu = { class: "cp-actions" }, Su = ["onClick"], Cu = {
	key: "custom_char",
	class: "custom-char-page"
}, wu = {
	key: 0,
	class: "roll-screen"
}, Tu = { key: 0 }, Eu = { key: 1 }, Du = {
	key: 1,
	style: { width: "100%" }
}, Ou = { class: "points-header" }, ku = { style: {
	"font-size": "0.8em",
	opacity: "0.8"
} }, Au = { style: { color: "white" } }, ju = { style: { "text-align": "right" } }, Mu = { class: "preset-bar" }, Nu = { style: {
	display: "flex",
	gap: "10px",
	"align-items": "center"
} }, Pu = ["value"], Fu = ["disabled"], Iu = { style: {
	display: "flex",
	gap: "10px",
	"align-items": "center"
} }, Lu = ["disabled"], Ru = { class: "shop-container" }, zu = { class: "shop-section" }, Bu = { class: "image-upload-row" }, Vu = ["src"], Hu = {
	key: 1,
	class: "image-preview",
	style: {
		display: "flex",
		"align-items": "center",
		"justify-content": "center",
		color: "#888",
		"font-size": "0.8em"
	}
}, Uu = { class: "persona-grid" }, Wu = { class: "shop-section" }, Gu = { class: "stat-grid" }, Ku = { class: "stat-row" }, qu = { class: "stat-controls" }, Ju = ["disabled"], Yu = { class: "stat-val" }, Xu = ["disabled"], Zu = { class: "stat-row" }, Qu = { class: "stat-controls" }, $u = ["disabled"], ed = { class: "stat-val" }, td = { class: "stat-row" }, nd = { class: "stat-controls" }, rd = ["disabled"], id = { class: "stat-val" }, ad = { class: "stat-row" }, od = { class: "stat-controls" }, sd = ["disabled"], cd = { class: "stat-val" }, ld = ["disabled"], ud = { class: "stat-row" }, dd = { class: "stat-controls" }, fd = ["disabled"], pd = { class: "stat-val" }, md = ["disabled"], hd = { class: "stat-grid" }, gd = { class: "stat-name" }, _d = { class: "stat-controls" }, vd = ["disabled", "onClick"], yd = { class: "stat-val" }, bd = ["disabled", "onClick"], xd = { class: "shop-section" }, Sd = { class: "diy-list" }, Cd = { class: "diy-header" }, wd = { class: "diy-title" }, Td = { style: {
	display: "flex",
	"align-items": "center",
	gap: "10px"
} }, Ed = {
	key: 0,
	class: "diy-cost-display"
}, Dd = ["disabled", "onClick"], Od = ["onClick"], kd = ["onUpdate:modelValue", "onInput"], Ad = ["onUpdate:modelValue", "onInput"], jd = ["onUpdate:modelValue", "onChange"], Md = ["value"], Nd = { class: "diy-list" }, Pd = { class: "diy-header" }, Fd = { class: "diy-title" }, Id = { style: {
	display: "flex",
	"align-items": "center",
	gap: "10px"
} }, Ld = {
	key: 0,
	class: "diy-cost-display"
}, Rd = ["disabled", "onClick"], zd = ["onClick"], Bd = ["onUpdate:modelValue", "onInput"], Vd = ["onUpdate:modelValue", "onInput"], Hd = ["onUpdate:modelValue", "onChange"], Ud = ["value"], Wd = { class: "diy-list" }, Gd = { class: "diy-header" }, Kd = { class: "diy-title" }, qd = { style: {
	display: "flex",
	"align-items": "center",
	gap: "10px"
} }, Jd = {
	key: 0,
	class: "diy-cost-display"
}, Yd = ["disabled", "onClick"], Xd = ["onClick"], Zd = ["onUpdate:modelValue", "onInput"], Qd = ["onUpdate:modelValue", "onInput"], $d = ["onUpdate:modelValue", "onChange"], ef = ["value"], tf = { class: "diy-list" }, nf = { class: "diy-header" }, rf = { class: "diy-title" }, af = { style: {
	display: "flex",
	"align-items": "center",
	gap: "10px"
} }, of = {
	key: 0,
	class: "diy-cost-display"
}, sf = ["disabled", "onClick"], cf = ["onClick"], lf = ["onUpdate:modelValue", "onInput"], uf = ["onUpdate:modelValue", "onInput"], df = ["onUpdate:modelValue", "onChange"], ff = ["value"], pf = { class: "diy-list" }, mf = { class: "diy-header" }, hf = {
	class: "diy-title",
	style: { color: "var(--pm-dark-red)" }
}, gf = { style: {
	display: "flex",
	"align-items": "center",
	gap: "10px"
} }, _f = {
	key: 0,
	class: "diy-cost-display refund"
}, vf = ["disabled", "onClick"], yf = ["onClick"], bf = ["onUpdate:modelValue", "onInput"], xf = ["onUpdate:modelValue", "onInput"], Sf = ["onUpdate:modelValue", "onChange"], Cf = ["value"], wf = { class: "shop-section" }, Tf = { class: "rl-grid" }, Ef = ["onClick"], Df = { class: "rl-type" }, Of = { class: "rl-name" }, kf = { class: "rl-desc" }, Af = { class: "rl-cost" }, jf = { class: "rl-grid" }, Mf = ["onClick"], Nf = { class: "rl-type" }, Pf = { class: "rl-name" }, Ff = { class: "rl-desc" }, If = { class: "rl-cost" }, Lf = { class: "rl-grid" }, Rf = ["onClick"], zf = { class: "rl-type" }, Bf = { class: "rl-name" }, Vf = { class: "rl-desc" }, Hf = { class: "rl-cost refund" }, Uf = { class: "shop-section" }, Wf = { style: {
	display: "flex",
	"align-items": "center",
	gap: "10px",
	cursor: "pointer",
	"font-weight": "bold",
	"margin-bottom": "15px"
} }, Gf = {
	key: 0,
	style: {
		display: "grid",
		gap: "15px"
	}
}, Kf = { class: "shop-section" }, qf = { class: "custom-idea-box" }, Jf = { style: {
	"text-align": "center",
	"margin-top": "40px"
} }, Yf = {
	key: 0,
	class: "negative-warning"
}, Xf = {
	key: 1,
	style: {
		color: "red",
		"font-weight": "bold",
		"margin-top": "15px"
	}
}, Zf = ["disabled"], Qf = {
	key: "settings",
	class: "page-settings"
}, $f = { style: {
	"font-size": "1.2em",
	color: "var(--pm-dark-red)",
	"font-weight": "bold",
	"margin-bottom": "30px"
} }, ep = { style: { "text-decoration": "underline" } }, tp = { class: "mbti-diff-grid" }, np = { class: "mbti-box" }, rp = { class: "mbti-row" }, ip = { class: "mbti-row" }, ap = { class: "mbti-row" }, op = { class: "mbti-row" }, sp = { class: "mbti-result" }, cp = { class: "diff-box" }, lp = { class: "toggles-grid" }, up = ["onClick"], dp = { class: "dm-section" }, fp = { class: "dm-presets" }, pp = ["disabled"], mp = /* @__PURE__ */ Qn({
	__name: "SetupModal",
	setup(e) {
		let t = /* @__PURE__ */ B(!0), n = /* @__PURE__ */ B("check"), r = /* @__PURE__ */ B(!1), i = /* @__PURE__ */ B(!1), a = /* @__PURE__ */ B(!1), o = /* @__PURE__ */ B(!1), s = /* @__PURE__ */ B(""), c = /* @__PURE__ */ B("https://files.catbox.moe/8b9z9j.png"), l = /* @__PURE__ */ B(""), u = /* @__PURE__ */ jt([{
			id: "dom",
			label: "⚙️ 观测者终端连接",
			status: "loading",
			statusText: "检测中"
		}, {
			id: "mvu",
			label: "🧩 变量引擎 (MVU)",
			status: "loading",
			statusText: "检测中"
		}]), d = /* @__PURE__ */ B({}), f = /* @__PURE__ */ B(""), p = X(() => Object.keys(d.value).length > 0), m = X(() => u[0].status === "ok"), h = () => {
			window.__PM_GLOBAL_AUDIO && (window.__PM_GLOBAL_AUDIO.pause(), window.__PM_GLOBAL_AUDIO.src = ""), t.value = !1;
		}, g = null, _ = () => {
			i.value = !0, u.forEach((e) => {
				e.status = "loading", e.statusText = "验证中...";
			}), g = setInterval(() => {
				u[0].status = $.isReady ? "ok" : "warn", u[0].statusText = $.isReady ? "Ready" : "等待 DOM", u[1].status = "ok", u[1].statusText = "Active";
				let e = $.mvuDataMap.get($.latestMesId);
				if (e && e.玩家角色?.基础属性?.当前HP !== void 0) {
					n.value = "already_started", i.value = !1, g && clearInterval(g);
					return;
				}
				e && e.玩家角色?.轮回线索?.永久精神创伤 && (d.value = e.玩家角色.轮回线索.永久精神创伤), e && e.玩家角色?.基础属性?.称号 && (f.value = e.玩家角色.基础属性.称号), $.isReady && (i.value = !1, g && clearInterval(g));
			}, 500);
		};
		pr(() => {
			_(), he();
		}), _r(() => {
			g && clearInterval(g);
		});
		let v = () => {
			_();
		}, y = () => {
			window.__PM_GLOBAL_AUDIO || (window.__PM_GLOBAL_AUDIO = new Audio());
			let e = window.__PM_GLOBAL_AUDIO;
			e.src = "https://music.163.com/song/media/outer/url?id=3346496288.mp3", e.volume = .4, e.loop = !0, e.play().catch((e) => console.log("BGM Autoplay prevented:", e)), n.value = "transition", setTimeout(() => {
				n.value = "library", a.value = !0;
			}, 5e3);
		}, b = [
			{
				id: "xingluo",
				type: "PRESET",
				name: "星落",
				desc: "吟游诗人 / 潜意识寄生者",
				quote: "我只是一个追逐光的旅人，为了写小说而记录下这些都市的见闻罢了。",
				concept: "披着浪漫星空外衣的深渊温床。",
				diff: "★★☆☆☆"
			},
			{
				id: "lin",
				type: "PRESET",
				name: "凛",
				desc: "九阶收尾人 / 远古遗迹核心",
				quote: "人类太吵闹了。我不需要理解你们的悲欢，我只需要……补完我自己。",
				concept: "披着白毛红瞳萝莉皮囊的远古非人知性体。",
				diff: "★★★☆☆"
			},
			{
				id: "kane",
				type: "PRESET",
				name: "凯恩",
				desc: "L公司幸存者 / 异想体容器",
				quote: "都是我的错……我没能救下他们。这把镰刀，是我永远无法洗刷的罪证。",
				concept: "披着受害者外衣的加害者。",
				diff: "★★★★☆"
			},
			{
				id: "chen",
				type: "PRESET",
				name: "尘",
				desc: "怯懦小弟 / 阿赖耶识完美兵器",
				quote: "别逼我拔刀……求求你，我宁愿挨打，也不想忘记你是谁……",
				concept: "装在怯懦外壳里的终极核弹。",
				diff: "★★★★★"
			}
		], x = /* @__PURE__ */ jt({
			character: null,
			dmPersonality: "腹黑乐子人，喜欢看玩家挣扎，语气带有优雅的嘲讽",
			sensitiveToggles: {
				BL_GL_BG: !1,
				异种_Furry: !1,
				R18G_猎奇: !1,
				非自愿_催眠_调教: !1,
				NTR_NTL: !1,
				卖春_奴隶: !1
			}
		}), S = /* @__PURE__ */ B(null), C = () => {
			S.value && S.value.focus();
		}, w = X(() => {
			if (x.character === "custom") return D.name || "自定义(命运掷骰)";
			let e = b.find((e) => e.id === x.character);
			return e ? e.name : "未知";
		}), ee = (e) => {
			x.character = e, n.value = "settings";
		}, te = /* @__PURE__ */ B("pre-roll"), ne = /* @__PURE__ */ B(!1), T = /* @__PURE__ */ B(0), re = /* @__PURE__ */ B(0), ie = {
			str: "力量",
			dex: "敏捷",
			con: "体质",
			int: "智力",
			wis: "感知",
			cha: "魅力"
		}, ae = {
			level: 1,
			hp: 100,
			mp: 50,
			sp: 20,
			stability: 50,
			str: 10,
			dex: 10,
			con: 10,
			int: 10,
			wis: 10,
			cha: 10
		}, E = /* @__PURE__ */ jt({ ...ae }), D = /* @__PURE__ */ jt({
			name: "",
			race: "",
			profession: "",
			desc: ""
		}), O = /* @__PURE__ */ jt({
			enabled: !1,
			name: "",
			desc: ""
		}), k = [
			{
				label: "ZAYIN / 普通 (0-500)",
				min: 0,
				max: 500
			},
			{
				label: "TETH / 精良 (501-1500)",
				min: 501,
				max: 1500
			},
			{
				label: "HE / 稀有 (1501-3500)",
				min: 1501,
				max: 3500
			},
			{
				label: "WAW / 史诗 (3501-7500)",
				min: 3501,
				max: 7500
			},
			{
				label: "ALEPH / 神器 (7501-9999)",
				min: 7501,
				max: 9999
			}
		], oe = [
			{
				label: "轻度折磨 (+500~1000)",
				min: 500,
				max: 1e3
			},
			{
				label: "中度诅咒 (+1001~2500)",
				min: 1001,
				max: 2500
			},
			{
				label: "致命死局 (+2501~4000)",
				min: 2501,
				max: 4e3
			}
		], A = /* @__PURE__ */ jt({
			traits: [],
			weapons: [],
			armors: [],
			items: [],
			karmas: []
		}), se = (e) => {
			A[e].push({
				name: "",
				desc: "",
				tier: "",
				cost: 0,
				refund: 0,
				rolled: !1
			});
		}, ce = (e, t) => {
			A[e].splice(t, 1);
		}, le = (e, t) => {
			let n = A[e][t];
			if (!n.tier) return;
			let r = (e === "karmas" ? oe : k).find((e) => e.label === n.tier);
			if (r) {
				let t = Math.floor(Math.random() * (r.max - r.min + 1)) + r.min;
				e === "karmas" ? n.refund = t : n.cost = t, n.rolled = !0;
			}
		}, ue = /* @__PURE__ */ jt({
			backgrounds: [],
			egos: [],
			karmas: []
		}), j = /* @__PURE__ */ jt({
			backgrounds: [],
			egos: [],
			karmas: []
		}), de = /* @__PURE__ */ B(""), fe = /* @__PURE__ */ B([]), pe = /* @__PURE__ */ B(-1), me = /* @__PURE__ */ B(""), he = () => {
			try {
				let e = localStorage.getItem("pm_custom_presets_v5");
				e && (fe.value = JSON.parse(e));
			} catch (e) {
				console.warn("无法读取本地预设", e);
			}
		}, ge = () => {
			if (!me.value) return;
			let e = {
				name: me.value,
				stats: { ...E },
				persona: { ...D },
				companion: { ...O },
				diy: JSON.parse(JSON.stringify(A)),
				idea: de.value,
				selectedItems: {
					backgrounds: [...j.backgrounds],
					egos: [...j.egos],
					karmas: [...j.karmas]
				}
			};
			fe.value.push(e);
			try {
				localStorage.setItem("pm_custom_presets_v5", JSON.stringify(fe.value)), alert("预设保存成功！"), me.value = "", pe.value = fe.value.length - 1;
			} catch {
				alert("保存失败，可能是浏览器限制了本地存储。");
			}
		}, _e = () => {
			if (pe.value === -1) return;
			let e = fe.value[pe.value];
			e && (Object.assign(E, e.stats), Object.assign(D, e.persona), Object.assign(O, e.companion), e.diy && [
				"traits",
				"weapons",
				"armors",
				"items",
				"karmas"
			].forEach((t) => {
				A[t].splice(0, A[t].length), e.diy[t] && e.diy[t].length > 0 && A[t].push(...JSON.parse(JSON.stringify(e.diy[t])));
			}), de.value = e.idea || "", e.selectedItems && (j.backgrounds.splice(0, j.backgrounds.length, ...e.selectedItems.backgrounds || []), j.egos.splice(0, j.egos.length, ...e.selectedItems.egos || []), j.karmas.splice(0, j.karmas.length, ...e.selectedItems.karmas || []), e.selectedItems.backgrounds.forEach((e) => {
				ue.backgrounds.find((t) => t.name === e.name) || ue.backgrounds.push(e);
			}), e.selectedItems.egos.forEach((e) => {
				ue.egos.find((t) => t.name === e.name) || ue.egos.push(e);
			}), e.selectedItems.karmas.forEach((e) => {
				ue.karmas.find((t) => t.name === e.name) || ue.karmas.push(e);
			})), alert("预设读取成功！"));
		}, ve = () => {
			x.character = "custom", n.value = "custom_char";
		}, ye = [
			{
				type: "废土异变系",
				name: "异想体血肉共生",
				desc: "肢体断裂可缓慢自愈（每长休恢复10%肢体HP），但理智上限-5，魅力检定-10。",
				cost: 1500,
				minQ: 1
			},
			{
				type: "废土异变系",
				name: "废墟聆听者",
				desc: "感知检定+10，能提前感知清道夫与异想体，但极昼幻听加倍（极昼期间每4小时额外扣除1点SP）。",
				cost: 1e3,
				minQ: 1
			},
			{
				type: "翼之阴影系",
				name: "K公司叛逃摘除员",
				desc: "开局自带2支低浓度安瓿（瞬间解除重伤），但遭到K公司死行追杀（遭遇K公司概率+30%）。",
				cost: 2500,
				minQ: 51
			},
			{
				type: "翼之阴影系",
				name: "T公司时间偷窃者",
				desc: "可消耗5点SP倒流时间1回合（重置上回合伤害），但寿命流失极快（体质上限-2）。",
				cost: 3500,
				minQ: 51
			},
			{
				type: "色彩残影系",
				name: "色彩收尾人学徒",
				desc: "开局全属性+3，自带一门绝对命中的秘传战技（1d20+10伤害，限1次/天），但被首脑眼线高度关注（机制杀触发阈值降低）。",
				cost: 6e3,
				minQ: 86
			}
		], be = [
			{
				type: "奇点故障品",
				name: "过载的F公司妖灵锁",
				desc: "能强行打开敌人的肉体防御（无视护甲，造成1d8+敏捷调整值伤害），但有20%概率锁死自己的关节（敏捷临时-5）。",
				cost: 2500,
				minQ: 1
			},
			{
				type: "HE级 E.G.O",
				name: "暗蚀长鞭",
				desc: "攻击造成1d8+3物理伤害，附带1d4腐蚀（持续2回合），但每次攻击消耗2点SP。",
				cost: 3e3,
				minQ: 1
			},
			{
				type: "WAW级 E.G.O",
				name: "残缺的血色悲鸣",
				desc: "攻击造成2d8范围伤害，附带群体精神震慑（意志DC14），但每次挥舞需扣除自身3点HP。",
				cost: 6e3,
				minQ: 51
			},
			{
				type: "ALEPH级 E.G.O",
				name: "拟态幼体",
				desc: "造成伤害（3d10）的50%吸血，暴击（1-5）秒杀低阶敌人，装备时理智上限减半，每回合必须造成伤害否则反噬。",
				cost: 9500,
				minQ: 96
			}
		], xe = [
			{
				type: "精神折磨类",
				name: "卡门的偏爱",
				desc: "极易触发低语，理智稳定度永久无法超过50，San Check失败惩罚加倍。",
				refund: 1e3
			},
			{
				type: "精神折磨类",
				name: "记忆吞噬者",
				desc: "每次使用核心技能，永久遗忘一个重要的人或事（随机扣除NPC好感度或线索）。",
				refund: 1e3
			},
			{
				type: "肉体诅咒类",
				name: "阿赖耶识排异",
				desc: "定期发作剧痛，发作时所有属性临时减半，持续1d4小时。",
				refund: 2e3
			},
			{
				type: "肉体诅咒类",
				name: "不可愈合之殇",
				desc: "所有常规医疗手段（急救包/止痛药）效果减半，只能通过吞噬同类血肉回血（触发食人癖判定）。",
				refund: 2e3
			},
			{
				type: "命运死局类",
				name: "首脑的通缉令",
				desc: "开局即被C公司爪牙标记，存活难度地狱级，任何高调行为都会引来处刑者（绝对机制杀）。",
				refund: 3500
			},
			{
				type: "命运死局类",
				name: "注定的扭曲",
				desc: "理智值(SP)上限仅为正常人的一半（Max 10），且无法通过任何手段提升，极易陷入疯狂。",
				refund: 3500
			}
		], P = (e, t, n) => [...e.filter((e) => !e.minQ || n >= e.minQ)].sort(() => .5 - Math.random()).slice(0, t), Se = () => {
			ne.value = !0, setTimeout(() => {
				T.value = Math.floor(Math.random() * 8999) + 1e3, re.value = Math.floor(Math.random() * 100) + 1, ue.backgrounds = P(ye, 3, re.value), ue.egos = P(be, 3, re.value), ue.karmas = P(xe, 3, re.value), ne.value = !1, te.value = "shopping";
			}, 1500);
		}, Ce = X(() => {
			let e = re.value;
			return e <= 50 ? "普通 (最高HE级)" : e <= 85 ? "好运 (必出WAW级或强力奇点)" : e <= 95 ? "极运 (必出ALEPH级残片或色彩级背景)" : "深渊注视 (出现完整ALEPH级神装)";
		}), F = (e, t) => {
			let n = 0;
			for (let r = e + 1; r <= t; r++) n += r <= 15 ? 50 : 150;
			return n;
		}, we = X(() => {
			let e = T.value;
			return e -= (E.level - ae.level) * 100, e -= (E.hp - ae.hp) / 10 * 20, e -= (E.mp - ae.mp) / 10 * 20, e -= (E.sp - ae.sp) * 50, e -= (E.stability - ae.stability) / 5 * 30, [
				"str",
				"dex",
				"con",
				"int",
				"wis",
				"cha"
			].forEach((t) => {
				e -= F(ae[t], E[t]);
			}), j.backgrounds.forEach((t) => e -= t.cost), j.egos.forEach((t) => e -= t.cost), j.karmas.forEach((t) => e += t.refund), A.traits.forEach((t) => {
				t.rolled && (e -= t.cost);
			}), A.weapons.forEach((t) => {
				t.rolled && (e -= t.cost);
			}), A.armors.forEach((t) => {
				t.rolled && (e -= t.cost);
			}), A.items.forEach((t) => {
				t.rolled && (e -= t.cost);
			}), A.karmas.forEach((t) => {
				t.rolled && (e += t.refund);
			}), O.enabled && (e -= 2e3), e;
		}), Te = (e, t) => {
			let n = j[e].findIndex((e) => e.name === t.name);
			n > -1 ? j[e].splice(n, 1) : j[e].push(t);
		}, Ee = (e, t) => j[e].some((e) => e.name === t.name), De = X(() => j.karmas.length > 0 || A.karmas.some((e) => e.name && e.rolled)), Oe = () => {
			let e = (e) => e.some((e) => e.name && !e.rolled);
			if (e(A.traits) || e(A.weapons) || e(A.armors) || e(A.items) || e(A.karmas)) {
				alert("您有自定义的 DIY 项目尚未点击【评估代价 (Roll)】，请先 Roll 点获取命运的标价！");
				return;
			}
			n.value = "settings";
		}, I = /* @__PURE__ */ jt({
			ei: "I",
			sn: "N",
			tf: "T",
			jp: "J"
		}), ke = X(() => `${I.ei}${I.sn}${I.tf}${I.jp}`), Ae = /* @__PURE__ */ B("硬核 (Hardcore)"), je = () => {
			navigator.clipboard.writeText(s.value).catch(() => {}), o.value = !1, h();
		}, Me = async () => {
			if (r.value) return;
			r.value = !0;
			let e = "";
			try {
				let t = Object.entries(x.sensitiveToggles).filter(([e, t]) => t).map(([e]) => e).join(", ") || "完全纯净无敏感内容", i = String(w.value).replace(/[\r\n]+/g, " "), a = String(x.dmPersonality).replace(/[\r\n]+/g, " "), c = [
					"L巢地表废墟",
					"崩塌商业街",
					"废弃工业区",
					"焦土交火区",
					"地下防空洞",
					"边缘幸存者营地",
					"后巷主干道",
					"劣质工坊街",
					"地下诊所区",
					"脑叶地下分部(ZAYIN级走廊)"
				], u = c[Math.floor(Math.random() * c.length)], d = "", f = (e) => typeof e == "string" ? e.replace(/\./g, "_") : e, p = {
					$$meta: { recursiveExtensible: !0 },
					当前处境: {
						累计小时数: 0,
						当前天象: "极昼",
						当前地点: u,
						任务列表: { 无: {
							评级: "都市传闻",
							目标: "无",
							状态: "情报获取"
						} },
						当前遭遇: {
							存在遭遇: !1,
							危险度: "低危",
							实体列表: [],
							状态: "遭遇触发"
						}
					},
					玩家角色: {
						基础属性: {
							称号: "初入废土的旅人",
							等级: 1,
							经验值: 0,
							骰子点数: 1e3,
							最大HP: 100,
							当前HP: 100,
							最大MP: 50,
							当前MP: 50,
							理智值: 20,
							理智稳定性: 50,
							六维: {
								力量: 10,
								敏捷: 10,
								体质: 10,
								智力: 10,
								感知: 10,
								魅力: 10
							},
							专属业障: { 无: "无" }
						},
						肢体伤病: {
							头部: "完好无损",
							胸部: "完好无损",
							左臂: "完好无损",
							右臂: "完好无损",
							左腿: "完好无损",
							右腿: "完好无损"
						},
						理智演化: { 当前阶段: "理智充沛" },
						武装战力: {
							主武器: "生锈铁管",
							防具: "破旧大衣",
							饰品: { 无: "无" },
							背包道具: {
								半瓶纯净水: {
									数量: 1,
									描述: "勉强维持生命，缓解极昼脱水"
								},
								发霉的合成食物: {
									数量: 2,
									描述: "提供微薄热量"
								}
							}
						},
						轮回线索: {
							世界真相碎片: [],
							永久精神创伤: { 无: "无" },
							回溯暂存: {
								触发回溯: !1,
								保留比例: 0
							}
						},
						特殊机制: {
							敏感开关: {
								BL_GL_BG: !!x.sensitiveToggles.BL_GL_BG,
								异种_Furry: !!x.sensitiveToggles.异种_Furry,
								R18G_猎奇: !!x.sensitiveToggles.R18G_猎奇,
								非自愿_催眠_调教: !!x.sensitiveToggles.非自愿_催眠_调教,
								NTR_NTL: !!x.sensitiveToggles.NTR_NTL,
								卖春_奴隶: !!x.sensitiveToggles.卖春_奴隶
							},
							心灵镜牢: {
								当前层数: 0,
								星光余额: 0
							},
							人格覆盖: {
								当前人格: "无",
								记忆混淆度: 0
							}
						}
					},
					社交网络: {
						势力声望: { 都市流浪者: 0 },
						NPC羁绊: { 无: {
							好感度: 0,
							恐惧度: 0,
							信任度: 0,
							欲望度: 0,
							复合状态: "无"
						} }
					},
					据点收容: {
						设施状态: {
							供电等级: "瘫痪",
							抑制器状态: "失效",
							防御等级: 0,
							设施残破特质: "尚未占领据点"
						},
						资源储备: {
							脑啡肽储量: 0,
							EGO碎片储量: { ZAYIN: 0 }
						},
						收容单元: { 无: {
							危险等级: "ZAYIN",
							逆卡巴拉计数器: 0,
							偏好工作: "本能",
							状态: "稳定"
						} }
					},
					核心同伴: { 无: {
						类型: "预制",
						等级: 1,
						最大HP: 100,
						当前HP: 100,
						最大MP: 50,
						当前MP: 50,
						理智值: 10,
						理智稳定性: 50,
						肢体状态: "完好",
						战斗状态: "正常",
						好感度: 0,
						恐惧度: 0,
						信任度: 0,
						欲望度: 0,
						复合状态: "无"
					} },
					系统设置: { BGM配置: { 状态: "开启" } }
				};
				if (x.character === "custom") {
					p.玩家角色.基础属性.等级 = E.level || 1, p.玩家角色.基础属性.最大HP = E.hp || 100, p.玩家角色.基础属性.当前HP = E.hp || 100, p.玩家角色.基础属性.最大MP = E.mp || 50, p.玩家角色.基础属性.当前MP = E.mp || 50, p.玩家角色.基础属性.理智值 = E.sp || 20, p.玩家角色.基础属性.理智稳定性 = E.stability || 50, p.玩家角色.基础属性.骰子点数 = we.value || 0, Object.assign(p.玩家角色.基础属性.六维, {
						力量: E.str || 10,
						敏捷: E.dex || 10,
						体质: E.con || 10,
						智力: E.int || 10,
						感知: E.wis || 10,
						魅力: E.cha || 10
					}), p.玩家角色.基础属性.称号 = D.name || "自定义异端";
					let e = {};
					(j.karmas || []).forEach((t) => {
						t && t.name && (e[f(t.name)] = t.desc);
					}), A.karmas.forEach((t) => {
						t.rolled && t.name && (e[f(t.name)] = t.desc);
					}), Object.keys(e).length > 0 && (p.玩家角色.基础属性.专属业障 = e);
					let t = [];
					j.egos && t.push(...j.egos), A.weapons.forEach((e) => {
						e.rolled && e.name && t.push(e);
					}), t.length > 0 && (p.玩家角色.武装战力.主武器 = `"${Ne(t[0].name)} [${Ne(t[0].tier || "未知评级")}]"`, t.slice(1).forEach((e) => {
						p.玩家角色.武装战力.背包道具[f(e.name)] = {
							数量: 1,
							描述: `"[${Ne(e.tier || "未知评级")}] ${Ne(e.desc || "未知")}"`
						};
					}));
					let n = [];
					A.armors.forEach((e) => {
						e.rolled && e.name && n.push(e);
					}), n.length > 0 && (p.玩家角色.武装战力.防具 = `"${Ne(n[0].name)} [${Ne(n[0].tier || "未知评级")}]"`, n.slice(1).forEach((e) => {
						p.玩家角色.武装战力.背包道具[f(e.name)] = {
							数量: 1,
							描述: `"[${Ne(e.tier || "未知评级")}] ${Ne(e.desc || "未知")}"`
						};
					})), A.items.forEach((e) => {
						e.rolled && e.name && (p.玩家角色.武装战力.背包道具[f(e.name)] = {
							数量: 1,
							描述: `"[${Ne(e.tier || "未知评级")}] ${Ne(e.desc || "未知")}"`
						});
					});
					let r = [];
					j.backgrounds && j.backgrounds.forEach((e) => r.push(`【${e.name}】: ${e.desc}`)), A.traits.forEach((e) => {
						e.rolled && e.name && r.push(`【${e.name}】(${e.tier}): ${e.desc}`);
					}), O.enabled && O.name && (delete p.核心同伴.无, p.核心同伴[f(O.name)] = {
						类型: "\"自定义\"",
						等级: 1,
						最大HP: 100,
						当前HP: 100,
						最大MP: 50,
						当前MP: 50,
						理智值: 20,
						理智稳定性: 50,
						肢体状态: "\"完好\"",
						战斗状态: "\"正常\"",
						好感度: 50,
						恐惧度: 20,
						信任度: 50,
						欲望度: 20,
						复合状态: "\"无\""
					}, d += `\n📌 **同行伙伴：** 【${O.name}】 - ${O.desc}`), t.length > 0 && (d += "\n📌 **携带武器：** " + t.map((e) => `【${e.name}】(${e.tier}): ${e.desc}`).join(" | ")), n.length > 0 && (d += "\n📌 **防具装备：** " + n.map((e) => `【${e.name}】(${e.tier}): ${e.desc}`).join(" | "));
					let i = A.items.filter((e) => e.rolled && e.name).map((e) => `【${e.name}】: ${e.desc}`);
					i.length > 0 && (d += "\n📌 **背包道具：** " + i.join(" | ")), d += `\n📌 **种族/职业：** ${D.race || "未知"} / ${D.profession || "未知"}`, d += `\n📌 **外貌与性格：** ${D.desc || "无"}`, r.length > 0 && (d += "\n📌 **专属特质/背景：**\n  - " + r.join("\n  - ")), de.value && (d += `\n📌 **自定义脑洞：** ${de.value}`), l.value && (d += `\n📌 **玩家角色立绘参考：** ${l.value}`);
					let a = "\n\n🔥 **【DM核心裁定法则（AI必读）】** 🔥\n";
					a += "1. **数值自动补全：** 若玩家在自定义的武器/防具/道具/特质中未明确写出具体的骰子数值（如1d8、1d10+2、护甲减免%等），请DM务必根据其选择的【评级】和世界书规则，在开局描述时自动为其赋予合理的具体数值！\n", a += "2. **合理性惩罚（等价交换）：** DM拥有绝对的解释与修改权！若玩家填写的物品强度与所选【评级】严重不符（例如：选了普通级却写着秒杀全场），或者高评级神装未写明致命代价，DM必须在开局时强行修改其效果，或为其附加极其惨烈的隐藏代价（如：每次使用扣除半管血、引来首脑注视等）。\n", we.value < 0 && (a += `3. **命运负债清算：** 玩家当前透支了 ${Math.abs(we.value)} 点数。透支越多，开局遭遇的厄运越致命。请DM在开局或后续流程中，安排高维存在、黑市商人或极端环境来强行索要这笔债务！\n`), d += a;
				} else {
					let e = {
						xingluo: {
							name: "星落",
							hp: 12,
							currentHp: 10,
							mp: 18,
							currentMp: 18,
							sp: 20,
							stability: 70,
							str: 10,
							dex: 16,
							con: 11,
							int: 17,
							wis: 18,
							cha: 15,
							weapon: "\"羽毛笔与便携短杖 (1d6钝击, 攻击加值+1)\"",
							armor: "\"维多利亚侦探服\"",
							karma: {
								光之种感知: 65,
								同族控制度: 30,
								星空亲和度: 80
							}
						},
						kane: {
							name: "凯恩",
							hp: 20,
							currentHp: 15,
							mp: 14,
							currentMp: 10,
							sp: 12,
							stability: 65,
							str: 17,
							dex: 14,
							con: 18,
							int: 13,
							wis: 12,
							cha: 10,
							weapon: "\"HE级E_G_O·暗蚀镰刀 (1d10+3物理+1d4腐蚀, 攻击加值+6)\"",
							armor: "\"破损的脑叶公司制服\"",
							karma: {
								愧疚值: 85,
								支配欲隐藏值: 40,
								异想体适格度: 90,
								EGO稳定性: 75
							}
						},
						lin: {
							name: "凛",
							hp: 16,
							currentHp: 11,
							mp: 17,
							currentMp: 14,
							sp: 15,
							stability: 85,
							str: 13,
							dex: 19,
							con: 14,
							int: 16,
							wis: 18,
							cha: 14,
							weapon: "\"工坊定制骨刺剑 (1d8+4穿刺+1d6偷袭, 攻击加值+7)\"",
							armor: "\"九阶收尾人风衣\"",
							karma: {
								潜意识感知度: 55,
								伪装度: 90,
								光之亲和度: 70
							}
						},
						chen: {
							name: "尘",
							hp: 19,
							currentHp: 13,
							mp: 8,
							currentMp: 4,
							sp: 10,
							stability: 50,
							str: 16,
							dex: 15,
							con: 17,
							int: 10,
							wis: 11,
							cha: 9,
							weapon: "\"太刀“无我梦中” (1d10+3劈砍+1d8能量, 攻击加值+5)\"",
							armor: "\"宽大的旧衣服\"",
							karma: {
								五指印记活跃度: 20,
								记忆完整度: 30,
								身体强度: 60,
								回溯能力觉醒度: 10
							}
						}
					}[x.character];
					e && (p.玩家角色.基础属性.称号 = `"${e.name}"`, p.玩家角色.基础属性.最大HP = e.hp, p.玩家角色.基础属性.当前HP = e.currentHp, p.玩家角色.基础属性.最大MP = e.mp, p.玩家角色.基础属性.当前MP = e.currentMp, p.玩家角色.基础属性.理智值 = e.sp, p.玩家角色.基础属性.理智稳定性 = e.stability, p.玩家角色.基础属性.六维 = {
						力量: e.str,
						敏捷: e.dex,
						体质: e.con,
						智力: e.int,
						感知: e.wis,
						魅力: e.cha
					}, p.玩家角色.武装战力.主武器 = e.weapon, p.玩家角色.武装战力.防具 = e.armor, p.玩家角色.基础属性.专属业障 = e.karma);
				}
				d += `\n📌 **心理锚点(MBTI)：** ${ke.value}\n📌 **世界难度：** ${Ae.value}`;
				let m = "", g = (e, t = "") => {
					for (let n in e) if (Object.prototype.hasOwnProperty.call(e, n)) {
						if (n === "$$meta") continue;
						let r = t ? `${t}.${n}` : n;
						if (typeof e[n] == "object" && e[n] !== null && !Array.isArray(e[n]) && Object.prototype.toString.call(e[n]) === "[object Object]") g(e[n], r);
						else {
							let t = e[n];
							typeof t == "string" ? !t.startsWith("\"") && !t.startsWith("'") && (t = `'${t.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/</g, "<").replace(/>/g, ">")}'`) : Array.isArray(t) && (t = JSON.stringify(t)), m += `_.set('${r}', ${t});\n`;
						}
					}
				};
				g(JSON.parse(JSON.stringify(p)));
				let _ = `\n<UpdateVariable>\n${m}</UpdateVariable>\n`;
				e = `【系统指令：契约已签订，降临开始】\n\n📌 **我的降临姿态：** ${i}\n📌 **初始降临坐标：** ${u}\n📌 **已解禁敏感内容：** ${t}\n📌 **观测者(DM)性格：** ${a}${d}\n\n请根据以上设定，正式开启第一天的废土生存，向我描述初始的周遭环境与我的起始状态！\n${_}`;
				try {
					es(e), n.value = "already_started", h(), r.value = !1;
				} catch (t) {
					console.warn("发送失败，尝试写入剪贴板...", t), s.value = e, o.value = !0, r.value = !1;
				}
			} catch (t) {
				console.error("生成数据瘫痪：", t), alert("检测到代码构建瘫痪！报错： " + t.message), s.value = e || "生成失败，请检查控制台报错。", o.value = !0;
			} finally {
				setTimeout(() => {
					r.value = !1;
				}, 500);
			}
		}, Ne = (e) => typeof e == "string" ? e.replace(/"/g, "\\\"").replace(/\n/g, " ") : e;
		return (e, g) => t.value ? (W(), G("div", Gl, [
			V(K("div", Kl, [...g[47] ||= [K("span", { style: {
				color: "var(--pm-gold)",
				"font-size": "0.8em"
			} }, "🎵 BGM Playing...", -1)]], 512), [[io, a.value]]),
			o.value ? (W(), G("div", ql, [K("div", Jl, [
				g[48] ||= K("div", { class: "modal-title" }, "⚠️ 沙盒环境限制：请手动复制指令", -1),
				g[49] ||= K("p", { style: {
					color: "#555",
					"margin-bottom": "10px",
					"text-align": "center"
				} }, "由于当前环境的安全策略，无法自动发送。请全选下方文本框内容，复制后粘贴到酒馆聊天框发送。", -1),
				K("textarea", {
					readonly: "",
					value: s.value,
					class: "modal-textarea",
					onFocus: g[0] ||= (e) => e.target?.select()
				}, null, 40, Yl),
				K("button", {
					class: "modal-btn",
					onClick: je
				}, "一键复制并关闭")
			])])) : J("", !0),
			Xi(Ba, {
				name: "fade",
				mode: "out-in"
			}, {
				default: Tn(() => [n.value === "already_started" ? (W(), G("div", Xl, [
					g[50] ||= K("div", { class: "sys-title" }, "旅程已在进行中", -1),
					g[51] ||= K("div", { class: "sys-subtitle" }, "The Journey Has Already Begun", -1),
					g[52] ||= K("p", { style: {
						color: "#555",
						"font-size": "1.2em",
						"text-align": "center",
						"max-width": "600px",
						"line-height": "1.8"
					} }, [
						q(" 观测者已经记录了你的降临姿态。"),
						K("br"),
						q(" 请在下方的聊天框中继续你的废土生存，或者使用【系统指令】呼出面板。 ")
					], -1),
					K("button", {
						class: "sys-btn sys-btn-primary",
						style: { "margin-top": "30px" },
						onClick: h
					}, "关闭界面")
				])) : n.value === "check" ? (W(), G("div", Zl, [
					g[53] ||= K("div", { class: "sys-title" }, "白夜黑昼七日谈", -1),
					g[54] ||= K("div", { class: "sys-subtitle" }, "The Seven Days of White Night and Dark Day", -1),
					K("div", Ql, [(W(!0), G(U, null, H(u, (e) => (W(), G("div", {
						key: e.id,
						class: "sys-row"
					}, [K("span", null, N(e.label), 1), K("span", null, [e.status === "loading" ? (W(), G("span", $l, "Checking...")) : (W(), G("span", {
						key: 1,
						class: M(e.status === "ok" ? "status-ok" : "status-warn")
					}, N(e.statusText), 3))])]))), 128))]),
					K("div", eu, [K("button", {
						disabled: i.value,
						class: "sys-btn",
						onClick: Q(v, ["prevent"])
					}, "重新检查", 8, tu), K("button", {
						disabled: !m.value || i.value,
						class: "sys-btn sys-btn-primary",
						onClick: y
					}, N(m.value ? "开始游戏" : "环境异常或校验中..."), 9, nu)])
				])) : n.value === "transition" ? (W(), G("div", ru, [...g[55] ||= [K("div", { class: "note-title" }, "【系统提示：来自梓墨的笔记簿】", -1), K("ul", { class: "note-content" }, [
					K("li", null, [K("strong", null, "RP（玩家输入）："), q("在很大程度上决定了逆转生死的关键，只小小输入几句话的话旅人sama是不会成为真正的英雄的哦~")]),
					K("li", null, [
						K("strong", null, "BGM自定义："),
						q("你可以随时发送 "),
						K("code", null, "【系统指令：设置BGM】场景：Boss战，链接："),
						q(" 来替换内置音乐。")
					]),
					K("li", null, [K("strong", null, "快捷操作："), q("状态栏顶部的 [呼唤观测者] 和 [潜入心灵镜牢] 按钮可直接点击。")]),
					K("li", null, [
						K("strong", null, "装备管理："),
						q("在【武装档案】Tab中，点击装备面板的"),
						K("q", null, "“卸下/管理”"),
						q("按钮，可一键脱下装备或使用背包道具。")
					]),
					K("li", null, [K("strong", null, "极端复杂的世界模拟与情感管理系统："), q("你所遇见的，都是一个个鲜活的个体，请好好善待她/他/它们吧~")])
				], -1)]])) : n.value === "library" ? (W(), G("div", iu, [
					c.value ? (W(), G("img", {
						key: 0,
						src: c.value,
						class: "dm-sprite",
						alt: "DM Sprite",
						onError: g[1] ||= (e) => c.value = ""
					}, null, 40, au)) : J("", !0),
					K("div", ou, [
						p.value ? (W(), G(U, { key: 1 }, [
							g[63] ||= K("p", null, "骨骼断裂的回音与神经烧焦的幻痛依然在脑海深处轰鸣。但此刻，你只是静静地站在温暖的图书室内，面前是那位戴着单片眼镜的少女。", -1),
							K("p", null, [
								K("q", null, [
									g[59] ||= q("“死亡并未宽恕你，", -1),
									K("span", su, N(f.value ? f.value : "伤痕累累的轮回者"), 1),
									g[60] ||= q("。”", -1)
								]),
								g[61] ||= q("她微微欠身，目光扫过你灵魂上烙印的扭曲伤痕，", -1),
								g[62] ||= K("q", null, "“看来地狱的法则又一次让你回到了起点。”", -1)
							]),
							(W(!0), G(U, null, H(d.value, (e, t) => (W(), G("div", {
								key: t,
								class: "trauma-text"
							}, "⚠️ 永久精神创伤 [" + N(t) + "]: " + N(e), 1))), 128))
						], 64)) : (W(), G(U, { key: 0 }, [
							g[56] ||= K("p", null, "当眼前的黑暗如潮水般褪去，刺鼻的机油味与血腥味并未如期而至。取而代之的，是纸张的醇香与壁炉中木柴燃烧的噼啪声。你发现自己站在一间古旧而温暖的图书室内，高耸入云的书架上摆满了散发着微光的典籍。", -1),
							g[57] ||= K("p", null, "在房间中央的红木长桌后，坐着一位戴着单片眼镜的少女。她合上手中那本厚重的《至理之书》，抬起头，用一种仿佛能看穿灵魂的目光注视着你。", -1),
							g[58] ||= K("p", null, [
								K("q", null, [
									q("欢迎来到这座被时间遗忘的藏书阁，"),
									K("span", { class: "highlight-gold" }, "迷途的旅人"),
									q("。")
								]),
								q("她微微欠身，嘴角勾起一抹优雅却难以捉摸的弧度，"),
								K("q", null, "我是你的观测者，也是这场剧目的记录员。你可以称呼我为‘跑团娘’。")
							], -1)
						], 64)),
						g[64] ||= K("p", null, [q("她站起身，指尖在虚空中轻轻一划，周围的书架瞬间化作一片燃烧的废墟幻影。"), K("q", null, [
							q("你即将踏入的舞台，是L巢的废墟。那里没有童话，只有永无止境的"),
							K("span", { class: "highlight-red" }, "极昼与极夜"),
							q("，以及七天一次的残酷轮回。你的剧本很简单：活下去。在七天的倒计时结束前，寻找光之种的碎片，或者在清道夫的咀嚼声中化为驱动都市的燃料。")
						])], -1),
						g[65] ||= K("p", null, [K("q", null, "在这里，每一次挥剑都可能伴随着肢体的断裂，每一次绝望都可能引来卡门的低语。但请记住，你遇到的每一个灵魂，都有着自己的恐惧与渴望。你的选择，将决定他们是成为你的利刃，还是刺入你后背的毒牙。")], -1),
						g[66] ||= K("p", null, "幻影散去，她重新坐回桌后，从抽屉里取出了五枚质地各异的档案夹，在桌面上依次排开。", -1),
						g[67] ||= K("p", null, [K("q", null, "那么，演出即将开始。请翻开你的‘档案’，决定你将以何种姿态，降临这片绝望的焦土。")], -1)
					]),
					K("div", cu, [g[68] ||= K("span", { style: {
						color: "var(--pm-gold)",
						"font-size": "0.9em",
						"white-space": "nowrap",
						"font-weight": "bold"
					} }, "🖼️ 跑团娘立绘:", -1), V(K("input", {
						"onUpdate:modelValue": g[2] ||= (e) => c.value = e,
						type: "text",
						class: "pm-input",
						style: {
							margin: "0",
							padding: "8px",
							"font-size": "0.9em"
						},
						placeholder: "输入透明背景的图片URL替换立绘..."
					}, null, 512), [[Z, c.value]])]),
					K("div", lu, [(W(), G(U, null, H(b, (e) => K("details", {
						key: e.id,
						name: "char-accordion",
						class: "dossier-folder"
					}, [K("summary", uu, [
						K("span", du, N(e.type), 1),
						K("span", fu, N(e.name), 1),
						K("span", pu, N(e.desc), 1)
					]), K("div", mu, [
						e.quote ? (W(), G("div", hu, [K("q", null, N(e.quote), 1)])) : J("", !0),
						K("div", gu, [K("div", _u, [g[69] ||= K("div", { class: "cp-box-title" }, "核心概念", -1), K("div", vu, N(e.concept), 1)]), K("div", yu, [g[70] ||= K("div", { class: "cp-box-title" }, "生存难度", -1), K("div", bu, N(e.diff), 1)])]),
						K("div", xu, [K("div", {
							class: "cp-btn-confirm",
							onClick: (t) => ee(e.id)
						}, "确认降临", 8, Su)])
					])])), 64)), K("div", {
						class: "dossier-custom",
						onClick: ve
					}, [...g[71] ||= [K("span", { class: "ds-type" }, "CUSTOM", -1), K("span", { class: "ds-name" }, "命运掷骰 (自定义车卡)", -1)]])])
				])) : n.value === "custom_char" ? (W(), G("div", Cu, [te.value === "pre-roll" ? (W(), G("div", wu, [
					g[72] ||= K("h2", {
						class: "settings-title",
						style: { border: "none" }
					}, "命运的掷骰", -1),
					g[73] ||= K("p", { style: {
						color: "#888",
						"margin-bottom": "40px"
					} }, "“在都市中，出生便决定了大部分的命运。来吧，看看你的底牌。”", -1),
					K("div", {
						class: M([{ rolling: ne.value }, "roll-btn"]),
						onClick: Se
					}, [ne.value ? (W(), G("span", Eu, "...")) : (W(), G("span", Tu, "ROLL"))], 2)
				])) : J("", !0), te.value === "shopping" ? (W(), G("div", Du, [
					K("div", Ou, [K("div", null, [g[75] ||= K("h2", null, "黑市终端", -1), K("div", ku, [g[74] ||= q("商店品质评级: ", -1), K("span", Au, N(Ce.value) + " (Roll: " + N(re.value) + ")", 1)])]), K("div", ju, [g[76] ||= K("div", { style: {
						"font-size": "0.8em",
						opacity: "0.8"
					} }, "剩余可用点数", -1), K("div", { class: M([{ negative: we.value < 0 }, "points-display"]) }, N(we.value), 3)])]),
					K("div", Mu, [K("div", Nu, [
						g[78] ||= K("span", { style: {
							"font-weight": "bold",
							color: "var(--pm-dark-red)"
						} }, "本地预设:", -1),
						V(K("select", {
							"onUpdate:modelValue": g[3] ||= (e) => pe.value = e,
							class: "preset-select"
						}, [g[77] ||= K("option", { value: -1 }, "-- 选择预设 --", -1), (W(!0), G(U, null, H(fe.value, (e, t) => (W(), G("option", {
							key: t,
							value: t
						}, N(e.name), 9, Pu))), 128))], 512), [[Vo, pe.value]]),
						K("button", {
							disabled: pe.value === -1,
							class: "preset-btn",
							onClick: _e
						}, "读取", 8, Fu)
					]), K("div", Iu, [V(K("input", {
						"onUpdate:modelValue": g[4] ||= (e) => me.value = e,
						type: "text",
						class: "preset-input",
						placeholder: "输入预设名称..."
					}, null, 512), [[Z, me.value]]), K("button", {
						disabled: !me.value,
						class: "preset-btn",
						onClick: ge
					}, "保存当前配置", 8, Lu)])]),
					g[115] ||= K("details", { class: "price-table-details" }, [K("summary", { class: "price-table-summary" }, "📜 点击查看：黑市物价与评级参考表"), K("div", { class: "price-table-content" }, [K("div", { style: {
						display: "grid",
						"grid-template-columns": "1fr 1fr",
						gap: "20px"
					} }, [K("div", null, [K("strong", null, "基础属性市价："), K("ul", null, [
						K("li", null, "提升 1 级：100 点"),
						K("li", null, "提升 10 点 HP/MP：20 点"),
						K("li", null, "提升 1 点 理智值(SP)：50 点"),
						K("li", null, "提升 5 点 理智稳定性：30 点"),
						K("li", null, "六维属性 (10-15区间)：50 点/级"),
						K("li", null, "六维属性 (16-20区间)：150 点/级")
					])]), K("div", null, [K("strong", null, "装备/特质评级消耗："), K("ul", null, [
						K("li", null, "ZAYIN / 普通：0 - 500 点"),
						K("li", null, "TETH / 精良：501 - 1500 点"),
						K("li", null, "HE / 稀有：1501 - 3500 点"),
						K("li", null, "WAW / 史诗：3501 - 7500 点"),
						K("li", null, "ALEPH / 神器：7501 - 9999 点")
					])])])])], -1),
					K("div", Ru, [
						K("div", zu, [
							g[79] ||= K("div", { class: "shop-title" }, "身份档案 (Persona)", -1),
							K("div", Bu, [l.value ? (W(), G("img", {
								key: 0,
								src: l.value,
								class: "image-preview",
								onError: g[5] ||= (e) => l.value = ""
							}, null, 40, Vu)) : (W(), G("div", Hu, "无图")), V(K("input", {
								"onUpdate:modelValue": g[6] ||= (e) => l.value = e,
								type: "text",
								class: "pm-input",
								style: {
									margin: "0",
									flex: "1"
								},
								placeholder: "玩家角色立绘URL (可选，将发送给AI作为外貌参考)..."
							}, null, 512), [[Z, l.value]])]),
							K("div", Uu, [
								V(K("input", {
									"onUpdate:modelValue": g[7] ||= (e) => D.name = e,
									type: "text",
									class: "pm-input",
									placeholder: "姓名 (如: 罗兰)"
								}, null, 512), [[Z, D.name]]),
								V(K("input", {
									"onUpdate:modelValue": g[8] ||= (e) => D.race = e,
									type: "text",
									class: "pm-input",
									placeholder: "种族 (如: 人类/改造人)"
								}, null, 512), [[Z, D.race]]),
								V(K("input", {
									"onUpdate:modelValue": g[9] ||= (e) => D.profession = e,
									type: "text",
									class: "pm-input",
									placeholder: "职业 (如: 九阶收尾人)"
								}, null, 512), [[Z, D.profession]])
							]),
							V(K("textarea", {
								"onUpdate:modelValue": g[10] ||= (e) => D.desc = e,
								class: "pm-textarea",
								placeholder: "外貌特征与性格描述... (如: 穿着黑色西装，总是带着疲惫的笑容，极度厌恶背叛)"
							}, null, 512), [[Z, D.desc]]),
							g[80] ||= K("p", { style: {
								color: "#888",
								"font-size": "0.85em",
								"margin-top": "5px"
							} }, "* 开局降临坐标将由命运（系统）在L巢废墟及周边区域中随机空投。", -1)
						]),
						K("div", Wu, [
							g[91] ||= K("div", { class: "shop-title" }, "常驻市价表 (基础属性)", -1),
							K("div", Gu, [
								K("div", Ku, [
									g[81] ||= K("span", { class: "stat-name" }, "等级 (Max 30)", -1),
									K("div", qu, [
										K("button", {
											disabled: E.level <= 1,
											class: "stat-btn",
											onClick: g[11] ||= (e) => E.level--
										}, "-", 8, Ju),
										K("span", Yu, N(E.level), 1),
										K("button", {
											disabled: E.level >= 30,
											class: "stat-btn",
											onClick: g[12] ||= (e) => E.level++
										}, "+", 8, Xu)
									]),
									g[82] ||= K("span", { class: "stat-cost" }, "100/级", -1)
								]),
								K("div", Zu, [
									g[83] ||= K("span", { class: "stat-name" }, "最大 HP", -1),
									K("div", Qu, [
										K("button", {
											disabled: E.hp <= 10,
											class: "stat-btn",
											onClick: g[13] ||= (e) => E.hp -= 10
										}, "-", 8, $u),
										K("span", ed, N(E.hp), 1),
										K("button", {
											class: "stat-btn",
											onClick: g[14] ||= (e) => E.hp += 10
										}, "+")
									]),
									g[84] ||= K("span", { class: "stat-cost" }, "20/点", -1)
								]),
								K("div", td, [
									g[85] ||= K("span", { class: "stat-name" }, "最大 MP", -1),
									K("div", nd, [
										K("button", {
											disabled: E.mp <= 10,
											class: "stat-btn",
											onClick: g[15] ||= (e) => E.mp -= 10
										}, "-", 8, rd),
										K("span", id, N(E.mp), 1),
										K("button", {
											class: "stat-btn",
											onClick: g[16] ||= (e) => E.mp += 10
										}, "+")
									]),
									g[86] ||= K("span", { class: "stat-cost" }, "20/点", -1)
								]),
								K("div", ad, [
									g[87] ||= K("span", { class: "stat-name" }, "理智值 (SP)", -1),
									K("div", od, [
										K("button", {
											disabled: E.sp <= 10,
											class: "stat-btn",
											onClick: g[17] ||= (e) => E.sp--
										}, "-", 8, sd),
										K("span", cd, N(E.sp), 1),
										K("button", {
											disabled: E.sp >= 50,
											class: "stat-btn",
											onClick: g[18] ||= (e) => E.sp++
										}, "+", 8, ld)
									]),
									g[88] ||= K("span", { class: "stat-cost" }, "50/点", -1)
								]),
								K("div", ud, [
									g[89] ||= K("span", { class: "stat-name" }, "理智稳定性", -1),
									K("div", dd, [
										K("button", {
											disabled: E.stability <= 10,
											class: "stat-btn",
											onClick: g[19] ||= (e) => E.stability -= 5
										}, "-", 8, fd),
										K("span", pd, N(E.stability), 1),
										K("button", {
											disabled: E.stability >= 100,
											class: "stat-btn",
											onClick: g[20] ||= (e) => E.stability += 5
										}, "+", 8, md)
									]),
									g[90] ||= K("span", { class: "stat-cost" }, "30/点", -1)
								])
							]),
							g[92] ||= K("div", {
								class: "shop-title",
								style: {
									"margin-top": "20px",
									"font-size": "1.2em"
								}
							}, "六维属性 (10-15: 50点/级 | 16-20: 150点/级)", -1),
							K("div", hd, [(W(), G(U, null, H([
								"str",
								"dex",
								"con",
								"int",
								"wis",
								"cha"
							], (e) => K("div", {
								key: e,
								class: "stat-row"
							}, [K("span", gd, N(ie[e]), 1), K("div", _d, [
								K("button", {
									disabled: E[e] <= 10,
									class: "stat-btn",
									onClick: (t) => E[e]--
								}, "-", 8, vd),
								K("span", yd, N(E[e]), 1),
								K("button", {
									disabled: E[e] >= 20,
									class: "stat-btn",
									onClick: (t) => E[e]++
								}, "+", 8, bd)
							])])), 64))])
						]),
						K("div", xd, [
							g[103] ||= K("div", { class: "shop-title" }, "DIY 锻造与深渊契约端口", -1),
							g[104] ||= K("div", { class: "dm-warning" }, [
								K("strong", null, "【跑团娘的善意提醒】"),
								q(" 想要手搓 ALEPH 级神装？可以。但如果你敢在描述里写“毫无副作用”，我保证你拔剑的瞬间就会被奇点反噬切成肉沫。越强大的力量，需要越扭曲的代价来平衡。"),
								K("br"),
								K("span", { style: { color: "var(--pm-dark-red)" } }, "* 提示：如果你不知道具体的伤害数值（如1d8），可以只写效果，AI 会根据你选择的评级自动为你补全合理的数值。")
							], -1),
							K("div", Sd, [
								g[94] ||= K("div", {
									class: "shop-title",
									style: {
										"font-size": "1.2em",
										border: "none",
										"margin-bottom": "5px"
									}
								}, "自定义背景 / 特质", -1),
								(W(!0), G(U, null, H(A.traits, (e, t) => (W(), G("div", {
									key: "trait" + t,
									class: "diy-box"
								}, [
									K("div", Cd, [K("span", wd, "特质 #" + N(t + 1), 1), K("div", Td, [
										e.rolled ? (W(), G("span", Ed, "-" + N(e.cost) + " 点", 1)) : J("", !0),
										K("button", {
											disabled: !e.tier,
											class: "diy-roll-btn",
											onClick: (e) => le("traits", t)
										}, "评估代价 (Roll)", 8, Dd),
										K("button", {
											class: "btn-remove-diy",
											title: "删除",
											onClick: (e) => ce("traits", t)
										}, "×", 8, Od)
									])]),
									V(K("input", {
										"onUpdate:modelValue": (t) => e.name = t,
										type: "text",
										class: "pm-input",
										placeholder: "特质名称 (如: 异想体血肉共生)",
										onInput: (t) => e.rolled = !1
									}, null, 40, kd), [[Z, e.name]]),
									V(K("textarea", {
										"onUpdate:modelValue": (t) => e.desc = t,
										class: "pm-textarea",
										placeholder: "特质效果描述...",
										onInput: (t) => e.rolled = !1
									}, null, 40, Ad), [[Z, e.desc]]),
									V(K("select", {
										"onUpdate:modelValue": (t) => e.tier = t,
										class: "pm-select",
										onChange: (t) => e.rolled = !1
									}, [g[93] ||= K("option", { value: "" }, "-- 选择评级区间 --", -1), (W(), G(U, null, H(k, (e) => K("option", {
										key: e.label,
										value: e.label
									}, N(e.label), 9, Md)), 64))], 40, jd), [[Vo, e.tier]])
								]))), 128)),
								K("button", {
									class: "btn-add-diy",
									onClick: g[21] ||= (e) => se("traits")
								}, "➕ 添加自定义特质")
							]),
							K("div", Nd, [
								g[96] ||= K("div", {
									class: "shop-title",
									style: {
										"font-size": "1.2em",
										border: "none",
										"margin-bottom": "5px",
										"margin-top": "20px"
									}
								}, "自定义武器 / E.G.O", -1),
								(W(!0), G(U, null, H(A.weapons, (e, t) => (W(), G("div", {
									key: "weapon" + t,
									class: "diy-box"
								}, [
									K("div", Pd, [K("span", Fd, "武器 #" + N(t + 1), 1), K("div", Id, [
										e.rolled ? (W(), G("span", Ld, "-" + N(e.cost) + " 点", 1)) : J("", !0),
										K("button", {
											disabled: !e.tier,
											class: "diy-roll-btn",
											onClick: (e) => le("weapons", t)
										}, "评估代价 (Roll)", 8, Rd),
										K("button", {
											class: "btn-remove-diy",
											title: "删除",
											onClick: (e) => ce("weapons", t)
										}, "×", 8, zd)
									])]),
									V(K("input", {
										"onUpdate:modelValue": (t) => e.name = t,
										type: "text",
										class: "pm-input",
										placeholder: "武器名称 (如: ALEPH级·拟态幼体)",
										onInput: (t) => e.rolled = !1
									}, null, 40, Bd), [[Z, e.name]]),
									V(K("textarea", {
										"onUpdate:modelValue": (t) => e.desc = t,
										class: "pm-textarea",
										placeholder: "武器效果与【副作用代价】描述... (未写明伤害骰子AI将自动补全)",
										onInput: (t) => e.rolled = !1
									}, null, 40, Vd), [[Z, e.desc]]),
									V(K("select", {
										"onUpdate:modelValue": (t) => e.tier = t,
										class: "pm-select",
										onChange: (t) => e.rolled = !1
									}, [g[95] ||= K("option", { value: "" }, "-- 选择评级区间 --", -1), (W(), G(U, null, H(k, (e) => K("option", {
										key: e.label,
										value: e.label
									}, N(e.label), 9, Ud)), 64))], 40, Hd), [[Vo, e.tier]])
								]))), 128)),
								K("button", {
									class: "btn-add-diy",
									onClick: g[22] ||= (e) => se("weapons")
								}, "➕ 添加自定义武器")
							]),
							K("div", Wd, [
								g[98] ||= K("div", {
									class: "shop-title",
									style: {
										"font-size": "1.2em",
										border: "none",
										"margin-bottom": "5px",
										"margin-top": "20px"
									}
								}, "自定义防具 / 服饰", -1),
								(W(!0), G(U, null, H(A.armors, (e, t) => (W(), G("div", {
									key: "armor" + t,
									class: "diy-box"
								}, [
									K("div", Gd, [K("span", Kd, "防具 #" + N(t + 1), 1), K("div", qd, [
										e.rolled ? (W(), G("span", Jd, "-" + N(e.cost) + " 点", 1)) : J("", !0),
										K("button", {
											disabled: !e.tier,
											class: "diy-roll-btn",
											onClick: (e) => le("armors", t)
										}, "评估代价 (Roll)", 8, Yd),
										K("button", {
											class: "btn-remove-diy",
											title: "删除",
											onClick: (e) => ce("armors", t)
										}, "×", 8, Xd)
									])]),
									V(K("input", {
										"onUpdate:modelValue": (t) => e.name = t,
										type: "text",
										class: "pm-input",
										placeholder: "防具名称 (如: W公司清剿服)",
										onInput: (t) => e.rolled = !1
									}, null, 40, Zd), [[Z, e.name]]),
									V(K("textarea", {
										"onUpdate:modelValue": (t) => e.desc = t,
										class: "pm-textarea",
										placeholder: "防具效果与代价描述...",
										onInput: (t) => e.rolled = !1
									}, null, 40, Qd), [[Z, e.desc]]),
									V(K("select", {
										"onUpdate:modelValue": (t) => e.tier = t,
										class: "pm-select",
										onChange: (t) => e.rolled = !1
									}, [g[97] ||= K("option", { value: "" }, "-- 选择评级区间 --", -1), (W(), G(U, null, H(k, (e) => K("option", {
										key: e.label,
										value: e.label
									}, N(e.label), 9, ef)), 64))], 40, $d), [[Vo, e.tier]])
								]))), 128)),
								K("button", {
									class: "btn-add-diy",
									onClick: g[23] ||= (e) => se("armors")
								}, "➕ 添加自定义防具")
							]),
							K("div", tf, [
								g[100] ||= K("div", {
									class: "shop-title",
									style: {
										"font-size": "1.2em",
										border: "none",
										"margin-bottom": "5px",
										"margin-top": "20px"
									}
								}, "自定义道具 / 消耗品", -1),
								(W(!0), G(U, null, H(A.items, (e, t) => (W(), G("div", {
									key: "item" + t,
									class: "diy-box"
								}, [
									K("div", nf, [K("span", rf, "道具 #" + N(t + 1), 1), K("div", af, [
										e.rolled ? (W(), G("span", of, "-" + N(e.cost) + " 点", 1)) : J("", !0),
										K("button", {
											disabled: !e.tier,
											class: "diy-roll-btn",
											onClick: (e) => le("items", t)
										}, "评估代价 (Roll)", 8, sf),
										K("button", {
											class: "btn-remove-diy",
											title: "删除",
											onClick: (e) => ce("items", t)
										}, "×", 8, cf)
									])]),
									V(K("input", {
										"onUpdate:modelValue": (t) => e.name = t,
										type: "text",
										class: "pm-input",
										placeholder: "道具名称 (如: K公司高浓度安瓿)",
										onInput: (t) => e.rolled = !1
									}, null, 40, lf), [[Z, e.name]]),
									V(K("textarea", {
										"onUpdate:modelValue": (t) => e.desc = t,
										class: "pm-textarea",
										placeholder: "道具效果描述...",
										onInput: (t) => e.rolled = !1
									}, null, 40, uf), [[Z, e.desc]]),
									V(K("select", {
										"onUpdate:modelValue": (t) => e.tier = t,
										class: "pm-select",
										onChange: (t) => e.rolled = !1
									}, [g[99] ||= K("option", { value: "" }, "-- 选择评级区间 --", -1), (W(), G(U, null, H(k, (e) => K("option", {
										key: e.label,
										value: e.label
									}, N(e.label), 9, ff)), 64))], 40, df), [[Vo, e.tier]])
								]))), 128)),
								K("button", {
									class: "btn-add-diy",
									onClick: g[24] ||= (e) => se("items")
								}, "➕ 添加自定义道具")
							]),
							K("div", pf, [
								g[102] ||= K("div", {
									class: "shop-title",
									style: {
										"font-size": "1.2em",
										border: "none",
										"margin-bottom": "5px",
										"margin-top": "20px",
										color: "var(--pm-dark-red)"
									}
								}, "自定义专属业障 (返还点数)", -1),
								(W(!0), G(U, null, H(A.karmas, (e, t) => (W(), G("div", {
									key: "karma" + t,
									class: "diy-box",
									style: {
										"border-color": "var(--pm-dark-red)",
										background: "rgba(139, 0, 0, 0.02)"
									}
								}, [
									K("div", mf, [K("span", hf, "业障 #" + N(t + 1), 1), K("div", gf, [
										e.rolled ? (W(), G("span", _f, "+" + N(e.refund) + " 点", 1)) : J("", !0),
										K("button", {
											disabled: !e.tier,
											class: "diy-roll-btn",
											style: { background: "var(--pm-dark-red)" },
											onClick: (e) => le("karmas", t)
										}, "评估返还 (Roll)", 8, vf),
										K("button", {
											class: "btn-remove-diy",
											title: "删除",
											onClick: (e) => ce("karmas", t)
										}, "×", 8, yf)
									])]),
									V(K("input", {
										"onUpdate:modelValue": (t) => e.name = t,
										type: "text",
										class: "pm-input",
										placeholder: "业障名称 (如: 注定的扭曲)",
										onInput: (t) => e.rolled = !1
									}, null, 40, bf), [[Z, e.name]]),
									V(K("textarea", {
										"onUpdate:modelValue": (t) => e.desc = t,
										class: "pm-textarea",
										placeholder: "业障的负面效果与触发条件描述...",
										onInput: (t) => e.rolled = !1
									}, null, 40, xf), [[Z, e.desc]]),
									V(K("select", {
										"onUpdate:modelValue": (t) => e.tier = t,
										class: "pm-select",
										onChange: (t) => e.rolled = !1
									}, [g[101] ||= K("option", { value: "" }, "-- 选择痛苦评级 --", -1), (W(), G(U, null, H(oe, (e) => K("option", {
										key: e.label,
										value: e.label
									}, N(e.label), 9, Cf)), 64))], 40, Sf), [[Vo, e.tier]])
								]))), 128)),
								K("button", {
									class: "btn-add-diy",
									style: {
										"border-color": "var(--pm-dark-red)",
										color: "var(--pm-dark-red)"
									},
									onClick: g[25] ||= (e) => se("karmas")
								}, "➕ 添加自定义业障")
							])
						]),
						K("div", wf, [
							g[105] ||= K("div", { class: "shop-title" }, "本局限定商品 (Roguelike 刷新池)", -1),
							g[106] ||= K("p", { style: {
								color: "#555",
								"font-size": "0.9em",
								"margin-bottom": "15px"
							} }, "如果你懒得自己写，可以直接从黑市商人这里购买现成的。", -1),
							g[107] ||= K("h4", { style: {
								color: "var(--pm-text)",
								"margin-bottom": "10px"
							} }, "特殊背景 / 特质", -1),
							K("div", Tf, [(W(!0), G(U, null, H(ue.backgrounds, (e) => (W(), G("div", {
								key: e.name,
								class: M([{ selected: Ee("backgrounds", e) }, "rl-card"]),
								onClick: (t) => Te("backgrounds", e)
							}, [
								K("div", Df, N(e.type), 1),
								K("div", Of, N(e.name), 1),
								K("div", kf, N(e.desc), 1),
								K("div", Af, "-" + N(e.cost) + " 点", 1)
							], 10, Ef))), 128))]),
							g[108] ||= K("h4", { style: {
								color: "var(--pm-text)",
								"margin-top": "25px",
								"margin-bottom": "10px"
							} }, "稀有遗物 / E.G.O", -1),
							K("div", jf, [(W(!0), G(U, null, H(ue.egos, (e) => (W(), G("div", {
								key: e.name,
								class: M([{ selected: Ee("egos", e) }, "rl-card"]),
								onClick: (t) => Te("egos", e)
							}, [
								K("div", Nf, N(e.type), 1),
								K("div", Pf, N(e.name), 1),
								K("div", Ff, N(e.desc), 1),
								K("div", If, "-" + N(e.cost) + " 点", 1)
							], 10, Mf))), 128))]),
							g[109] ||= K("h4", { style: {
								color: "var(--pm-dark-red)",
								"margin-top": "25px",
								"margin-bottom": "10px"
							} }, "专属业障 (必须至少选择一项，可返还点数)", -1),
							K("div", Lf, [(W(!0), G(U, null, H(ue.karmas, (e) => (W(), G("div", {
								key: e.name,
								class: M([{ selected: Ee("karmas", e) }, "rl-card"]),
								onClick: (t) => Te("karmas", e)
							}, [
								K("div", zf, N(e.type), 1),
								K("div", Bf, N(e.name), 1),
								K("div", Vf, N(e.desc), 1),
								K("div", Hf, "+" + N(e.refund) + " 点", 1)
							], 10, Rf))), 128))])
						]),
						K("div", Uf, [
							g[111] ||= K("div", { class: "shop-title" }, "同行伙伴 (Companion) - 消耗 2000 点", -1),
							K("label", Wf, [V(K("input", {
								"onUpdate:modelValue": g[26] ||= (e) => O.enabled = e,
								type: "checkbox",
								style: {
									width: "20px",
									height: "20px"
								}
							}, null, 512), [[Ro, O.enabled]]), g[110] ||= q(" 携带一名自定义伙伴降临废土 ", -1)]),
							O.enabled ? (W(), G("div", Gf, [V(K("input", {
								"onUpdate:modelValue": g[27] ||= (e) => O.name = e,
								type: "text",
								class: "pm-input",
								style: { margin: "0" },
								placeholder: "伙伴姓名 (如: 安吉拉)"
							}, null, 512), [[Z, O.name]]), V(K("textarea", {
								"onUpdate:modelValue": g[28] ||= (e) => O.desc = e,
								class: "pm-textarea",
								style: { margin: "0" },
								placeholder: "伙伴的身份、能力与性格设定..."
							}, null, 512), [[Z, O.desc]])])) : J("", !0)
						]),
						K("div", Kf, [
							g[112] ||= K("div", { class: "shop-title" }, "完全自定义议约", -1),
							g[113] ||= K("p", { style: {
								color: "#555",
								"font-size": "0.9em"
							} }, [
								q("如果你对上面的商品不满意，可以在此写下你疯狂的脑洞（例如：“我想扮演一个被W公司列车切碎后又被环指拼凑起来的缝合怪”）。"),
								K("br"),
								q("注意：DM 会在游戏开始后为你进行点数估价，并强行缝合一个恶毒的专属业障。")
							], -1),
							K("div", qf, [V(K("textarea", {
								"onUpdate:modelValue": g[29] ||= (e) => de.value = e,
								placeholder: "在此输入你的自定义设定..."
							}, null, 512), [[Z, de.value]])])
						])
					]),
					K("div", Jf, [
						we.value < 0 ? (W(), G("div", Yf, [...g[114] ||= [
							q(" 【跑团娘的嘲弄】哎呀呀，点数透支了呢？没关系，你可以带着这身华丽的负债降临。", -1),
							K("br", null, null, -1),
							q(" 只不过……开局负数骰子意味着你已经被都市的厄运标记。准备好在『心灵镜牢』里打一辈子黑工还债了吗，可怜的耗子？ ", -1)
						]])) : J("", !0),
						!De.value && !de.value ? (W(), G("p", Xf, "必须至少选择一项【专属业障】（商店或DIY），或填写【自定义议约】。")) : J("", !0),
						K("button", {
							disabled: !De.value && !de.value,
							class: "pm-btn-embark",
							onClick: Oe
						}, "确认降临姿态", 8, Zf)
					])
				])) : J("", !0)])) : n.value === "settings" ? (W(), G("div", Qf, [
					g[123] ||= K("div", { class: "settings-title" }, "契约与法则", -1),
					g[124] ||= K("div", { class: "settings-warning" }, "“深渊的边界由你划定。一旦铭刻，不可反悔。”", -1),
					K("div", $f, [g[116] ||= q("已选定降临姿态：", -1), K("span", ep, N(w.value), 1)]),
					K("div", tp, [K("div", np, [
						g[117] ||= K("div", {
							class: "dm-title",
							style: {
								"font-size": "1.2em",
								"margin-bottom": "10px"
							}
						}, "心理锚点 (MBTI)", -1),
						g[118] ||= K("p", { style: {
							"font-size": "0.85em",
							color: "#666",
							"margin-bottom": "15px"
						} }, "决定你的理智恢复机制与卡门破防逻辑。", -1),
						K("div", rp, [K("button", {
							class: M([{ active: I.ei === "E" }, "mbti-btn"]),
							onClick: g[30] ||= (e) => I.ei = "E"
						}, "E (外向)", 2), K("button", {
							class: M([{ active: I.ei === "I" }, "mbti-btn"]),
							onClick: g[31] ||= (e) => I.ei = "I"
						}, "I (内向)", 2)]),
						K("div", ip, [K("button", {
							class: M([{ active: I.sn === "S" }, "mbti-btn"]),
							onClick: g[32] ||= (e) => I.sn = "S"
						}, "S (感觉)", 2), K("button", {
							class: M([{ active: I.sn === "N" }, "mbti-btn"]),
							onClick: g[33] ||= (e) => I.sn = "N"
						}, "N (直觉)", 2)]),
						K("div", ap, [K("button", {
							class: M([{ active: I.tf === "T" }, "mbti-btn"]),
							onClick: g[34] ||= (e) => I.tf = "T"
						}, "T (思考)", 2), K("button", {
							class: M([{ active: I.tf === "F" }, "mbti-btn"]),
							onClick: g[35] ||= (e) => I.tf = "F"
						}, "F (情感)", 2)]),
						K("div", op, [K("button", {
							class: M([{ active: I.jp === "J" }, "mbti-btn"]),
							onClick: g[36] ||= (e) => I.jp = "J"
						}, "J (判断)", 2), K("button", {
							class: M([{ active: I.jp === "P" }, "mbti-btn"]),
							onClick: g[37] ||= (e) => I.jp = "P"
						}, "P (知觉)", 2)]),
						K("div", sp, N(ke.value), 1)
					]), K("div", cp, [
						g[119] ||= K("div", {
							class: "dm-title",
							style: {
								"font-size": "1.2em",
								"margin-bottom": "10px"
							}
						}, "世界难度选择", -1),
						g[120] ||= K("p", { style: {
							"font-size": "0.85em",
							color: "#666",
							"margin-bottom": "15px"
						} }, "决定废土对你的残酷程度。", -1),
						K("button", {
							class: M([{ active: Ae.value === "剧情 (Story)" }, "diff-btn"]),
							onClick: g[38] ||= (e) => Ae.value = "剧情 (Story)"
						}, "剧情 (Story) - 侧重体验，资源较多", 2),
						K("button", {
							class: M([{ active: Ae.value === "普通 (Normal)" }, "diff-btn"]),
							onClick: g[39] ||= (e) => Ae.value = "普通 (Normal)"
						}, "普通 (Normal) - 标准的废土生存", 2),
						K("button", {
							class: M([{ active: Ae.value === "硬核 (Hardcore)" }, "diff-btn"]),
							onClick: g[40] ||= (e) => Ae.value = "硬核 (Hardcore)"
						}, "硬核 (Hardcore) - 极易断肢，资源匮乏", 2),
						K("button", {
							class: M([{ active: Ae.value === "地狱 (Hell)" }, "diff-btn"]),
							onClick: g[41] ||= (e) => Ae.value = "地狱 (Hell)"
						}, "地狱 (Hell) - 机制杀频发，卡门时刻注视", 2)
					])]),
					K("div", lp, [(W(!0), G(U, null, H(x.sensitiveToggles, (e, t) => (W(), G("div", {
						key: t,
						class: M(["toggle-btn", { active: e }]),
						onClick: (n) => x.sensitiveToggles[t] = !e
					}, N(String(t).replace(/_/g, " / ")), 11, up))), 128))]),
					K("div", dp, [
						g[121] ||= K("div", { class: "dm-title" }, "观测者化身设定", -1),
						g[122] ||= K("div", { class: "dm-desc" }, "“接下来，我的化身将与你同行，但她只会作为无情的DM存在。你希望她用什么态度来见证你的挣扎？”", -1),
						K("div", fp, [
							K("button", {
								class: M([{ active: x.dmPersonality === "三无机娘，冷酷客观，毫无感情波动" }, "pm-preset-btn"]),
								onClick: g[42] ||= (e) => x.dmPersonality = "三无机娘，冷酷客观，毫无感情波动"
							}, "三无机娘", 2),
							K("button", {
								class: M([{ active: x.dmPersonality === "腹黑乐子人，喜欢看玩家挣扎，语气带有优雅的嘲讽" }, "pm-preset-btn"]),
								onClick: g[43] ||= (e) => x.dmPersonality = "腹黑乐子人，喜欢看玩家挣扎，语气带有优雅的嘲讽"
							}, "腹黑乐子人", 2),
							K("button", {
								class: M([{ active: x.dmPersonality === "温柔病娇，一边哭泣一边宣告你的断头，极度排外" }, "pm-preset-btn"]),
								onClick: g[44] ||= (e) => x.dmPersonality = "温柔病娇，一边哭泣一边宣告你的断头，极度排外"
							}, "温柔病娇", 2),
							K("button", {
								class: M([{ active: x.dmPersonality === "暴躁老姐，满口粗话，大骂着把你的内脏扯出来" }, "pm-preset-btn"]),
								onClick: g[45] ||= (e) => x.dmPersonality = "暴躁老姐，满口粗话，大骂着把你的内脏扯出来"
							}, "暴躁老姐", 2),
							K("button", {
								class: "pm-preset-btn custom-btn",
								onClick: C
							}, "✍️ 自定义(手动输入)")
						]),
						V(K("input", {
							ref_key: "dmInputRef",
							ref: S,
							"onUpdate:modelValue": g[46] ||= (e) => x.dmPersonality = e,
							type: "text",
							class: "pm-input",
							placeholder: "或在此处写入你自定义的傲娇、病娇等设定..."
						}, null, 512), [[Z, x.dmPersonality]])
					]),
					K("button", {
						disabled: r.value,
						class: "pm-btn-embark",
						onClick: Me
					}, N(r.value ? "引擎连接中..." : "踏上旅程"), 9, pp)
				])) : J("", !0)]),
				_: 1
			})
		])) : J("", !0);
	}
});
//#endregion
//#region src/seven-days1/index.ts
if (!window.__PM_SEVEN_DAYS_MOUNTED__) {
	window.__PM_SEVEN_DAYS_MOUNTED__ = !0;
	let e = /* @__PURE__ */ new Map(), t = null, n = () => {
		let e = document;
		try {
			window.parent && window.parent.document && (e = window.parent.document);
		} catch {}
		return e;
	}, r = () => {
		let e = n();
		if (!e.getElementById("pm-global-styles")) {
			let t = e.createElement("style");
			t.id = "pm-global-styles", t.innerHTML = "\n        /* 隐藏原生标签 */\n        .mes_text initvar, .mes_text updatevariable, .mes_text variable_log,\n        .mes_text statusbar_data, .mes_text context_options, .mes_text context_summary {\n            display: none !important;\n        }\n        .mes_text narrative { display: block !important; }\n\n        /* =========================================\n           全局与羊皮纸基底 (废墟图书馆美学)\n           ========================================= */\n        :root {\n          --pm-gold: #d4af37;\n          --pm-dark-red: #8b0000;\n          --pm-black: #1a1105;\n          --pm-text: #2c241b;\n          --pm-bg-light: #ffffff;\n          --pm-bg-mid: #fcfaf5;\n          --pm-bg-dark: #f4ebd8;\n        }\n\n        /* 🚨 恢复老版本的“聊天框内全屏”效果 */\n        .pm-master-container {\n          position: relative;\n          width: 100%;\n          min-height: 100vh;\n          border-radius: 12px;\n          border: 2px solid var(--pm-gold);\n          z-index: 10;\n          background: radial-gradient(circle at center, var(--pm-bg-light) 0%, var(--pm-bg-mid) 50%, var(--pm-bg-dark) 100%);\n          padding: 20px;\n          box-sizing: border-box;\n          color: var(--pm-text);\n          overflow-x: hidden;\n          box-shadow: inset 0 0 40px rgba(255, 255, 255, 1);\n          display: flex;\n          flex-direction: column;\n          align-items: center;\n          font-family: 'Noto Serif SC', 'Songti SC', serif;\n          margin-top: 15px;\n          margin-bottom: 15px;\n        }\n        .pm-master-container::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; border: 3px solid rgba(212, 175, 55, 0.8); border-radius: 12px; animation: pm-border-glow 4s infinite alternate ease-in-out; pointer-events: none; z-index: 2; }\n        .pm-master-container::after { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-radius: 12px; background-image: url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"noiseFilter\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23noiseFilter)\" opacity=\"0.05\"/></svg>'); pointer-events: none; z-index: 1; }\n        @keyframes pm-border-glow { 0% { box-shadow: inset 0 0 15px rgba(212, 175, 55, 0.1), 0 0 15px rgba(212, 175, 55, 0.2); border-color: rgba(212, 175, 55, 0.4); } 100% { box-shadow: inset 0 0 40px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.5); border-color: rgba(212, 175, 55, 1); } }\n\n        /* 状态栏主容器 */\n        @keyframes stb-pm-terminal-breathe { 0% { border-color: #222; } 50% { border-color: #444; } 100% { border-color: #222; } }\n        .stb-pm-wrapper { width: 100%; max-width: 100%; overflow-x: hidden; overflow-wrap: anywhere; box-sizing: border-box; background: #050505; background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px); background-size: 24px 24px; border: 1px solid #333; border-top: 4px solid #8a0303; border-bottom: 4px solid #d4af37; border-radius: 12px; font-family: 'Nunito', 'Quicksand', 'Segoe UI Rounded', 'Helvetica Rounded', Arial, sans-serif; color: #d0d0d0; padding: 16px; animation: stb-pm-terminal-breathe 8s infinite ease-in-out; position: relative; margin-top: 15px; margin-bottom: 10px; }\n        .stb-pm-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid rgba(212, 175, 55, 0.2); padding-bottom: 12px; margin-bottom: 12px; position: relative; }\n        .stb-pm-header::after { content: ''; position: absolute; bottom: -1px; left: 0; width: 30%; height: 2px; background: #d4af37; box-shadow: 0 0 10px #d4af37; border-radius: 2px; }\n        .stb-pm-location { font-family: 'Quicksand', 'Georgia', serif; font-size: clamp(16px, 4vw, 18px); font-weight: bold; color: #d4af37; letter-spacing: 1px; text-shadow: 0 0 12px rgba(212, 175, 55, 0.6); word-break: break-word; display: flex; align-items: center; gap: 8px; flex: 1; }\n        .stb-pm-location::before { content: '◆'; font-size: 12px; color: #8a0303; text-shadow: 0 0 6px #8a0303; }\n        .stb-pm-env-col { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; flex-shrink: 0; }\n        .stb-pm-tag { background: rgba(0, 0, 0, 0.8); border: 1px solid #444; padding: 4px 10px; border-radius: 12px; white-space: nowrap; font-size: 12px; box-shadow: inset 0 0 8px rgba(255, 255, 255, 0.05); letter-spacing: 0.5px; }\n        .stb-pm-tag-time { color: #aaa; border-color: #555; }\n        .stb-pm-tag-weather { color: #ff6b6b; border-color: #8a0303; text-shadow: 0 0 5px rgba(138, 3, 3, 0.8); }\n\n        /* BGM 播放器 */\n        .stb-pm-bgm-container { margin-bottom: 16px; }\n        .stb-pm-bgm-container details { background: linear-gradient(90deg, rgba(255, 255, 255, 0.03), rgba(0, 0, 0, 0.5)); border: 1px solid #333; border-left: 3px solid #81d4fa; border-radius: 8px; overflow: hidden; transition: all 0.3s ease; }\n        .stb-pm-bgm-container summary { padding: 12px 16px; font-size: 14px; color: #81d4fa; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; font-weight: bold; }\n        .stb-pm-bgm-container summary::-webkit-details-marker { display: none; }\n        .stb-pm-bgm-container summary:hover { background: rgba(129, 212, 250, 0.1); }\n        .stb-pm-bgm-arrow { transition: transform 0.3s ease; }\n        .stb-pm-bgm-container details[open] .stb-pm-bgm-arrow { transform: rotate(180deg); }\n        .stb-pm-bgm-content { padding: 12px; border-top: 1px solid #333; display: flex; justify-content: center; background: #000; overflow: hidden; }\n        .stb-pm-bgm-content > iframe, .stb-pm-bgm-content > audio { width: 100% !important; max-width: 330px; height: 86px; border-radius: 6px; outline: none; border: none; }\n\n        /* 按钮与徽章 */\n        @keyframes stb-btn-breathe-gold { 0% { box-shadow: 0 0 5px rgba(212, 175, 55, 0.2); } 50% { box-shadow: 0 0 15px rgba(212, 175, 55, 0.6); } 100% { box-shadow: 0 0 5px rgba(212, 175, 55, 0.2); } }\n        @keyframes stb-btn-breathe-blue { 0% { box-shadow: 0 0 5px rgba(129, 212, 250, 0.2); } 50% { box-shadow: 0 0 15px rgba(129, 212, 250, 0.6); } 100% { box-shadow: 0 0 5px rgba(129, 212, 250, 0.2); } }\n        .stb-pm-actions { display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap; }\n        .stb-pm-btn { flex: 1; min-width: 140px; height: 40px; display: flex; align-items: center; justify-content: center; text-decoration: none; font-size: 14px; font-weight: bold; letter-spacing: 1px; border-radius: 20px; transition: all 0.2s ease; cursor: pointer; touch-action: manipulation; }\n        .stb-pm-btn:active { transform: scale(0.96); }\n        .stb-pm-btn-guide { background: linear-gradient(180deg, rgba(212, 175, 55, 0.15), rgba(0, 0, 0, 0.8)); border: 1px solid #d4af37; color: #f4e7c1; animation: stb-btn-breathe-gold 3s infinite ease-in-out; }\n        .stb-pm-btn-mirror { background: linear-gradient(180deg, rgba(129, 212, 250, 0.15), rgba(0, 0, 0, 0.8)); border: 1px solid #81d4fa; color: #e1f5fe; animation: stb-btn-breathe-blue 3s infinite ease-in-out; }\n        .stb-pm-badges { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 16px; }\n        .stb-pm-badge { background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.5)); border: 1px solid #333; border-left: 3px solid #d4af37; padding: 8px 14px; border-radius: 8px; font-size: 14px; color: #e0e0e0; display: flex; align-items: center; gap: 8px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5); }\n        .stb-pm-badge strong { color: #d4af37; font-weight: bold; }\n        .stb-pm-badge-title { flex: 1 1 100%; border-left-color: #81d4fa; }\n        .stb-pm-badge-title strong { color: #81d4fa; }\n\n        /* Tabs 切换 */\n        .stb-pm-tabs-container { display: flex; flex-wrap: wrap; gap: 4px; position: relative; min-height: 400px; }\n        .stb-pm-tab-label { display: inline-block; }\n        .stb-pm-tab-radio { display: none; }\n        .stb-tab-btn { padding: 10px 16px; font-size: 14px; color: #777; background: linear-gradient(to bottom, #0a0a0a, #111); border: 1px solid #222; border-bottom: none; border-radius: 8px 8px 0 0; cursor: pointer; white-space: nowrap; transition: all 0.3s ease; position: relative; letter-spacing: 1px; user-select: none; }\n        .stb-pm-tab-content { position: absolute; left: 16px; right: 16px; display: none; flex-direction: column; gap: 16px; max-height: 55vh; overflow-y: auto; padding-right: 8px; padding-top: 16px; border-top: 1px solid #222; scrollbar-width: thin; scrollbar-color: #555 #0a0a0a; -webkit-overflow-scrolling: touch; }\n        .stb-pm-tab-content::-webkit-scrollbar { width: 6px; }\n        .stb-pm-tab-content::-webkit-scrollbar-track { background: #0a0a0a; border-radius: 3px; }\n        .stb-pm-tab-content::-webkit-scrollbar-thumb { background: #555; border-radius: 3px; }\n        .stb-pm-tab-radio:checked ~ .stb-tab-btn { color: #fff; background: linear-gradient(to bottom, rgba(138, 3, 3, 0.25), #0a0a0a); border-color: #555; text-shadow: 0 0 6px rgba(255, 255, 255, 0.6); font-weight: bold; }\n        .stb-pm-tab-radio:checked ~ .stb-tab-btn::after { content: ''; position: absolute; bottom: -1px; left: 0; width: 100%; height: 3px; background: #d4af37; box-shadow: 0 -2px 12px #d4af37, 0 0 6px #fff; border-radius: 2px; z-index: 2; }\n        .stb-pm-tab-radio:checked ~ .stb-pm-tab-content { display: flex; top: 100%; margin-top: 40px; }\n\n        /* 面板与进度条 */\n        .stb-pm-panel { background: rgba(15, 15, 18, 0.8); border: 1px solid #222; border-left: 4px solid #555; border-radius: 8px; padding: 16px; min-width: 0; box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8); transition: border-color 0.3s ease, box-shadow 0.3s ease; position: relative; }\n        .stb-pm-panel:hover { border-left-color: #d4af37; box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8), -3px 0 12px rgba(212, 175, 55, 0.25); }\n        .stb-pm-panel-title { font-size: 13px; color: #999; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px; border-bottom: 1px dashed rgba(255, 255, 255, 0.15); padding-bottom: 6px; display: flex; align-items: center; font-weight: bold; }\n        .stb-pm-panel-title::before { content: '■'; font-size: 10px; margin-right: 8px; color: #555; }\n        .stb-pm-bar-container { margin-bottom: 14px; }\n        .stb-pm-bar-header { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 6px; }\n        .stb-pm-bar-label { font-weight: bold; text-shadow: 0 0 5px currentColor; letter-spacing: 1px; }\n        .stb-pm-bar-value { font-family: 'Courier New', Courier, monospace; font-size: 14px; color: #ccc; }\n        .stb-pm-bar-track { width: 100%; height: 14px; background: #0a0a0a; border: 1px solid #333; border-radius: 7px; overflow: hidden; box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.9), 0 1px 0 rgba(255, 255, 255, 0.05); position: relative; }\n        .stb-pm-bar-fill { height: 100%; transition: width 0.5s ease; border-radius: 7px; }\n        .stb-pm-bar-hp { background: linear-gradient(90deg, #ff6b6b, #8a0303); box-shadow: 0 0 8px rgba(255, 107, 107, 0.6); }\n        .stb-pm-bar-mp { background: linear-gradient(90deg, #81d4fa, #0277bd); box-shadow: 0 0 8px rgba(129, 212, 250, 0.6); }\n        .stb-pm-bar-sp { background: linear-gradient(90deg, #81c784, #2e7d32); box-shadow: 0 0 8px rgba(129, 199, 132, 0.6); }\n        .stb-pm-bar-xp { background: linear-gradient(90deg, #fff59d, #fbc02d); box-shadow: 0 0 8px rgba(255, 245, 157, 0.6); }\n\n        /* 肢体状态 */\n        .stb-pm-limbs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }\n        @keyframes stb-critical-flash { 0% { border-color: #ff4444; box-shadow: 0 0 10px rgba(255, 68, 68, 0.7); background: rgba(255, 68, 68, 0.15); } 50% { border-color: #550000; box-shadow: none; background: rgba(255, 68, 68, 0.05); } 100% { border-color: #ff4444; box-shadow: 0 0 10px rgba(255, 68, 68, 0.7); background: rgba(255, 68, 68, 0.15); } }\n        .stb-pm-limb-card { background: linear-gradient(180deg, #1a1a1a, #0d0d0d); border: 1px solid #333; border-radius: 8px; padding: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; transition: transform 0.2s ease, border-color 0.2s ease; position: relative; overflow: hidden; }\n        .stb-pm-limb-card::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: #333; }\n        .stb-pm-limb-name { font-size: 12px; color: #888; margin-bottom: 6px; letter-spacing: 1px; text-transform: uppercase; }\n        .stb-pm-limb-stat { font-size: 14px; font-weight: bold; text-align: center; word-break: break-word; white-space: normal; }\n        .stb-pm-limb-card[data-status*='完好']::before { background: #555; }\n        .stb-pm-limb-card[data-status*='完好'] .stb-pm-limb-stat { color: #999; }\n        .stb-pm-limb-card[data-status*='轻度']::before { background: #aaa; }\n        .stb-pm-limb-card[data-status*='轻度'] .stb-pm-limb-stat { color: #ddd; text-shadow: 0 0 4px rgba(255, 255, 255, 0.3); }\n        .stb-pm-limb-card[data-status*='重伤'] { border-color: #ffb74d; }\n        .stb-pm-limb-card[data-status*='重伤']::before { background: #ffb74d; box-shadow: 0 0 6px #ffb74d; }\n        .stb-pm-limb-card[data-status*='重伤'] .stb-pm-limb-stat { color: #ffcc80; text-shadow: 0 0 6px rgba(255, 204, 128, 0.6); }\n        .stb-pm-limb-card[data-status*='残废'], .stb-pm-limb-card[data-status*='断裂'] { animation: stb-critical-flash 1s infinite; }\n        .stb-pm-limb-card[data-status*='残废']::before, .stb-pm-limb-card[data-status*='断裂']::before { background: #ff4444; }\n        .stb-pm-limb-card[data-status*='残废'] .stb-pm-limb-stat, .stb-pm-limb-card[data-status*='断裂'] .stb-pm-limb-stat { color: #ff6b6b; text-decoration: line-through; }\n        .stb-pm-limb-card[data-status*='义体'], .stb-pm-limb-card[data-status*='同化'], .stb-pm-limb-card[data-status*='再生'] { border-color: #d4af37; background: rgba(212, 175, 55, 0.05); }\n        .stb-pm-limb-card[data-status*='义体']::before, .stb-pm-limb-card[data-status*='同化']::before, .stb-pm-limb-card[data-status*='再生']::before { background: #d4af37; box-shadow: 0 0 6px #d4af37; }\n        .stb-pm-limb-card[data-status*='义体'] .stb-pm-limb-stat, .stb-pm-limb-card[data-status*='同化'] .stb-pm-limb-stat, .stb-pm-limb-card[data-status*='再生'] .stb-pm-limb-stat { color: #f4e7c1; text-shadow: 0 0 6px rgba(212, 175, 55, 0.5); }\n\n        /* 属性与折叠夹 */\n        .stb-pm-stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 16px; }\n        .stb-pm-stat-box { background: rgba(255, 255, 255, 0.02); border: 1px solid #333; border-radius: 6px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5); }\n        .stb-pm-stat-label { font-size: 13px; color: #888; text-transform: uppercase; font-weight: bold; }\n        .stb-pm-stat-value { font-size: 16px; font-weight: bold; color: #d4af37; font-family: monospace; text-shadow: 0 0 5px rgba(212, 175, 55, 0.4); }\n        .stb-pm-folder { background: rgba(255, 255, 255, 0.03); border: 1px solid #333; border-radius: 6px; margin-bottom: 10px; overflow: hidden; transition: all 0.3s ease; }\n        .stb-pm-folder summary { padding: 12px 14px; font-size: 14px; color: #eee; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; font-weight: bold; background: rgba(0, 0, 0, 0.4); }\n        .stb-pm-folder summary::-webkit-details-marker { display: none; }\n        .stb-pm-folder summary:hover { background: rgba(255, 255, 255, 0.05); }\n        .stb-pm-folder-arrow { transition: transform 0.3s ease; color: #888; font-size: 12px; }\n        .stb-pm-folder[open] .stb-pm-folder-arrow { transform: rotate(180deg); }\n        .stb-pm-folder-content { padding: 12px; border-top: 1px solid #333; }\n        .stb-pm-folder-actions { display: flex; justify-content: flex-end; padding: 8px 12px; background: rgba(0, 0, 0, 0.6); border-top: 1px dashed #444; }\n        .stb-pm-btn-small { background: #222; border: 1px solid #555; color: #ccc; padding: 4px 12px; border-radius: 4px; font-size: 12px; text-decoration: none; transition: all 0.2s; cursor: pointer; }\n        .stb-pm-btn-small:hover { background: #8a0303; border-color: #ff6b6b; color: #fff; }\n\n        /* 文本与传闻卡片 */\n        .stb-pm-text-block { font-size: 15px; color: #ccc; line-height: 1.6; word-wrap: break-word; white-space: normal; }\n        .stb-pm-rumor-card { background: linear-gradient(90deg, rgba(212, 175, 55, 0.08), rgba(0, 0, 0, 0.6)); border: 1px solid #222; border-left: 4px solid #d4af37; padding: 12px 16px; margin-bottom: 12px; border-radius: 4px 8px 8px 4px; transition: all 0.3s ease; position: relative; }\n        .stb-pm-rumor-card::after { content: ''; position: absolute; top: 0; right: 0; width: 30px; height: 100%; background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.9)); }\n        .stb-pm-rumor-card:hover { background: linear-gradient(90deg, rgba(212, 175, 55, 0.15), rgba(0, 0, 0, 0.6)); border-left-width: 6px; transform: translateX(4px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6); }\n        .stb-pm-rumor-title { color: #d4af37; font-size: 14px; margin-bottom: 8px; font-weight: bold; letter-spacing: 1.5px; }\n        .stb-pm-rumor-text { color: #ddd; font-size: 15px; line-height: 1.6; position: relative; z-index: 1; }\n        .stb-pm-terminal-data { font-family: 'Courier New', Courier, monospace; font-size: 13px; color: #81d4fa; white-space: pre-wrap; word-break: break-all; line-height: 1.5; }\n        .stb-pm-terminal-data-gold { color: #f4e7c1; }\n        .stb-pm-terminal-data-red { color: #ff6b6b; }\n        .stb-pm-info-row { display: flex; flex-direction: row; justify-content: space-between; margin-bottom: 8px; border-bottom: 1px dashed #333; padding-bottom: 4px; }\n        .stb-pm-info-label { font-size: 14px; color: #999; }\n        .stb-pm-info-value { font-size: 14px; font-weight: bold; color: #ccc; }\n\n        /* =========================================\n           车卡界面专属样式\n           ========================================= */\n        .page-check, .library-scene, .custom-char-page, .page-settings { width: 100%; max-width: 1000px; flex: 1; display: flex; flex-direction: column; align-items: center; position: relative; z-index: 10; }\n        .page-check { justify-content: center; }\n        .sys-title { font-size: clamp(2em, 5vw, 3.5em); font-weight: 900; color: var(--pm-black); letter-spacing: 10px; margin-bottom: 5px; text-shadow: 0 0 15px rgba(212, 175, 55, 0.6); text-align: center; }\n        .sys-subtitle { font-family: 'Brush Script MT', 'Great Vibes', cursive; font-size: clamp(1.2em, 3vw, 1.8em); color: var(--pm-dark-red); margin-bottom: 50px; letter-spacing: 3px; text-align: center; }\n        .sys-check-box { width: 100%; max-width: 500px; margin: 0 auto 50px; border-top: 2px solid var(--pm-gold); border-bottom: 2px solid var(--pm-gold); padding: 30px 0; }\n        .sys-row { display: flex; justify-content: space-between; margin: 15px 0; font-size: 1.2em; font-weight: bold; color: #333; }\n        .status-ok { font-family: monospace; color: var(--pm-dark-red); text-shadow: 0 0 10px rgba(139, 0, 0, 0.2); }\n        .status-warn { font-family: monospace; color: #d4af37; }\n        .status-loading { font-family: monospace; color: #aaa; animation: pulse 1.5s infinite; }\n        .sys-actions { display: flex; gap: 30px; width: 100%; max-width: 500px; justify-content: center; }\n        .sys-btn { flex: 1; padding: 15px 0; text-align: center; border: 1px solid var(--pm-text); background: transparent; color: var(--pm-text); cursor: pointer; font-family: inherit; font-size: 1.2em; font-weight: bold; letter-spacing: 4px; transition: all 0.3s; border-radius: 4px; }\n        .sys-btn:hover { background: var(--pm-text); color: var(--pm-bg-mid); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); }\n        .sys-btn-primary { border-color: var(--pm-dark-red); color: var(--pm-dark-red); }\n        .sys-btn-primary:hover:not(:disabled) { background: var(--pm-dark-red); color: white; box-shadow: 0 8px 20px rgba(139, 0, 0, 0.25); }\n        .sys-btn-primary:disabled { opacity: 0.5; border-color: #666; color: #666; cursor: not-allowed; background: transparent; box-shadow: none; }\n\n        .transition-note { position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-radius: 12px; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 10%; background: radial-gradient(circle at center, #ffffff 0%, #fcfaf5 50%, #f4ebd8 100%); z-index: 210; animation: noteSequence 5.5s forwards ease-in-out; }\n        .note-title { font-size: clamp(1.5em, 3vw, 2em); color: var(--pm-dark-red); margin-bottom: 30px; border-bottom: 2px solid var(--pm-gold); padding-bottom: 15px; letter-spacing: 3px; font-weight: bold; }\n        .note-content { font-size: clamp(1em, 2vw, 1.2em); line-height: 2; max-width: 800px; color: var(--pm-text); }\n        .note-content li { margin-bottom: 15px; list-style-type: square; }\n        .note-content li strong { color: var(--pm-dark-red); font-weight: 900; }\n\n        .library-scene { width: 100%; padding: 20px 0; box-sizing: border-box; position: relative; z-index: 200; }\n        .bgm-player { position: absolute; top: 0px; left: 0px; width: 280px; opacity: 0.3; transition: opacity 0.4s; z-index: 220; }\n        .bgm-player:hover { opacity: 1; }\n        .bgm-player audio { width: 100%; height: 40px; outline: none; }\n        .scene-text { font-size: clamp(1.1em, 2.5vw, 1.3em); line-height: 2.2; text-align: justify; margin-top: 60px; margin-bottom: 50px; max-width: 900px; margin-left: auto; margin-right: auto; text-indent: 2em; color: var(--pm-black); }\n        .scene-text p { margin-bottom: 20px; }\n        .highlight-red { color: var(--pm-dark-red); font-weight: 900; text-shadow: 0 0 5px rgba(139, 0, 0, 0.2); }\n        .highlight-gold { color: var(--pm-gold); font-weight: 900; text-shadow: 0 0 5px rgba(212, 175, 55, 0.3); }\n        .trauma-text { color: var(--pm-dark-red); font-weight: bold; font-style: italic; font-size: 0.9em; background: rgba(139, 0, 0, 0.05); padding: 8px 15px; border-left: 3px solid var(--pm-dark-red); border-radius: 4px; display: block; margin: 15px 0; text-indent: 0; }\n\n        .dossier-container { max-width: 900px; width: 100%; display: flex; flex-direction: column; gap: 15px; margin: 0 auto 40px auto; }\n        .dossier-folder { background: rgba(255, 255, 255, 0.7); border: 1px solid var(--pm-gold); border-radius: 6px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05); overflow: hidden; transition: all 0.3s ease; }\n        .dossier-folder[open] { background: rgba(255, 255, 255, 0.95); box-shadow: 0 10px 25px rgba(139, 0, 0, 0.15); border-color: var(--pm-dark-red); }\n        .dossier-summary { padding: 15px 20px; display: flex; align-items: center; cursor: pointer; list-style: none; border-left: 4px solid var(--pm-gold); transition: all 0.3s; }\n        .dossier-summary::-webkit-details-marker { display: none; }\n        .dossier-summary:hover { background: rgba(212, 175, 55, 0.1); }\n        .dossier-folder[open] .dossier-summary { border-left-color: var(--pm-dark-red); border-bottom: 1px dashed rgba(139, 0, 0, 0.2); background: rgba(139, 0, 0, 0.05); }\n        .ds-type { font-family: monospace; color: #888; font-size: 0.9em; width: 80px; letter-spacing: 1px; }\n        .ds-name { font-size: 1.5em; font-weight: 900; color: var(--pm-dark-red); letter-spacing: 3px; flex: 1; }\n        .ds-desc { color: #555; font-style: italic; font-size: 0.95em; }\n        .dossier-content { padding: 30px; animation: slideDown 0.4s ease-out; }\n        .cp-quote { font-family: 'Georgia', serif; font-size: 1.1em; font-style: italic; color: #555; border-left: 4px solid var(--pm-gold); padding-left: 20px; margin-bottom: 30px; background: rgba(212, 175, 55, 0.05); padding: 15px 20px; }\n        .cp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 30px; }\n        .cp-box { border: 1px dashed #b89f7d; padding: 20px; background: rgba(255, 255, 255, 0.6); }\n        .cp-box-title { font-weight: 900; color: var(--pm-dark-red); margin-bottom: 10px; font-size: 1.1em; border-bottom: 1px solid rgba(139, 0, 0, 0.2); padding-bottom: 5px; letter-spacing: 1px; }\n        .cp-box-content { font-size: 1.05em; line-height: 1.8; color: #333; }\n        .cp-actions { display: flex; justify-content: center; margin-top: 20px; }\n        .cp-btn-confirm { padding: 15px 50px; font-size: 1.2em; font-weight: bold; cursor: pointer; border: 2px solid var(--pm-dark-red); background: var(--pm-dark-red); color: #fff; text-decoration: none; letter-spacing: 2px; transition: all 0.3s; border-radius: 4px; display: block; text-align: center; }\n        .cp-btn-confirm:hover { background: #5a0000; box-shadow: 0 5px 15px rgba(139, 0, 0, 0.3); transform: translateY(-2px); }\n        .dossier-custom { display: flex; align-items: center; padding: 15px 20px; background: var(--pm-black); border: 1px solid var(--pm-dark-red); border-left: 4px solid var(--pm-dark-red); border-radius: 6px; cursor: pointer; margin-top: 10px; transition: all 0.3s; text-decoration: none; }\n        .dossier-custom:hover { background: #2c1810; box-shadow: 0 5px 15px rgba(139, 0, 0, 0.3); transform: translateX(5px); }\n        .dossier-custom .ds-type { color: #aaa; }\n        .dossier-custom .ds-name { color: var(--pm-gold); }\n\n        .custom-char-page { width: 100%; display: flex; flex-direction: column; align-items: center; padding: 20px 0; position: relative; z-index: 200; }\n        .points-header { position: sticky; top: 0; width: 100%; background: rgba(26, 17, 5, 0.95); color: var(--pm-gold); padding: 15px 30px; border-radius: 8px; border: 1px solid var(--pm-gold); display: flex; justify-content: space-between; align-items: center; z-index: 300; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5); backdrop-filter: blur(5px); box-sizing: border-box; margin-bottom: 30px; }\n        .points-header h2 { margin: 0; font-size: 1.5em; letter-spacing: 2px; }\n        .points-display { font-size: 2em; font-weight: 900; font-family: monospace; text-shadow: 0 0 10px rgba(212, 175, 55, 0.5); transition: color 0.3s; }\n        .points-display.negative { color: #ff4444; text-shadow: 0 0 15px rgba(255, 0, 0, 0.8); animation: pulse-red 2s infinite; }\n        .preset-bar { width: 100%; background: rgba(255, 255, 255, 0.6); border: 1px dashed var(--pm-gold); padding: 15px; border-radius: 6px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }\n\n        /* 🚨 修复：输入框护眼优化，强制覆盖酒馆深色模式 */\n        .preset-select, .preset-input, .pm-input, .pm-textarea, .pm-select {\n            background-color: #fdfbf7 !important;\n            color: #1a1105 !important;\n            border: 1px solid #b89f7d !important;\n            padding: 12px; border-radius: 4px; font-family: inherit; font-size: 1em; box-sizing: border-box; outline: none; transition: border-color 0.3s;\n        }\n        .preset-select, .preset-input { padding: 8px; }\n        .pm-input { width: 100%; margin-bottom: 15px; }\n        .pm-textarea { width: 100%; height: 80px; resize: vertical; }\n        .pm-input:focus, .pm-textarea:focus, .pm-select:focus, .preset-input:focus, .preset-select:focus {\n            border-color: var(--pm-dark-red) !important;\n            box-shadow: 0 0 8px rgba(139, 0, 0, 0.3) !important;\n            background-color: #ffffff !important;\n        }\n\n        .preset-btn { padding: 8px 15px; background: var(--pm-black); color: var(--pm-gold); border: 1px solid var(--pm-gold); border-radius: 4px; cursor: pointer; transition: all 0.2s; }\n        .preset-btn:hover { background: var(--pm-dark-red); color: #fff; }\n        .roll-screen { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 50vh; text-align: center; }\n        .roll-btn { width: 200px; height: 200px; border-radius: 50%; background: radial-gradient(circle, var(--pm-dark-red) 0%, var(--pm-black) 100%); border: 4px solid var(--pm-gold); color: var(--pm-gold); font-size: 2em; font-weight: 900; cursor: pointer; transition: all 0.2s; box-shadow: 0 0 30px rgba(139, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; flex-direction: column; }\n        .roll-btn:hover { transform: scale(1.05); box-shadow: 0 0 50px rgba(212, 175, 55, 0.6); }\n        .roll-btn:active { transform: scale(0.95); }\n        .roll-btn.rolling { animation: shake 0.5s infinite; pointer-events: none; filter: brightness(1.5); }\n        .shop-container { width: 100%; display: grid; grid-template-columns: 1fr; gap: 30px; }\n        .shop-section { background: rgba(255, 255, 255, 0.6); border: 1px solid var(--pm-gold); border-radius: 8px; padding: 25px; }\n        .shop-title { font-size: 1.5em; color: var(--pm-dark-red); border-bottom: 2px solid var(--pm-gold); padding-bottom: 10px; margin-bottom: 20px; font-weight: 900; letter-spacing: 2px; display: flex; justify-content: space-between; align-items: center; }\n        .stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; }\n        .stat-row { display: flex; justify-content: space-between; align-items: center; background: rgba(0, 0, 0, 0.05); padding: 10px 15px; border-radius: 4px; border-left: 3px solid var(--pm-gold); }\n        .stat-name { font-weight: bold; color: var(--pm-text); width: 100px; }\n        .stat-controls { display: flex; align-items: center; gap: 10px; }\n\n        /* 🚨 修复：属性加减按钮居中对齐 */\n        .stat-btn { width: 30px; height: 30px; border-radius: 50%; border: 1px solid var(--pm-dark-red); background: transparent; color: var(--pm-dark-red); font-weight: bold; cursor: pointer; transition: all 0.2s; display: flex; justify-content: center; align-items: center; padding: 0; line-height: 1; }\n        .stat-btn:hover:not(:disabled) { background: var(--pm-dark-red); color: white; }\n        .stat-btn:disabled { border-color: #ccc; color: #ccc; cursor: not-allowed; }\n        .stat-val { font-family: monospace; font-size: 1.2em; font-weight: bold; width: 40px; text-align: center; }\n        .stat-cost { font-size: 0.8em; color: #888; width: 60px; text-align: right; }\n        .rl-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }\n        .rl-card { border: 1px solid #b89f7d; background: #fcfaf5; border-radius: 6px; padding: 15px; cursor: pointer; transition: all 0.3s; position: relative; overflow: hidden; }\n        .rl-card:hover { box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); transform: translateY(-2px); border-color: var(--pm-gold); }\n        .rl-card.selected { border-color: var(--pm-dark-red); background: rgba(139, 0, 0, 0.05); box-shadow: inset 0 0 0 2px var(--pm-dark-red); }\n        .rl-card.selected::after { content: '✓'; position: absolute; top: 10px; right: 15px; color: var(--pm-dark-red); font-size: 1.5em; font-weight: bold; }\n        .rl-type { font-size: 0.8em; color: #888; margin-bottom: 5px; font-family: monospace; }\n        .rl-name { font-size: 1.2em; font-weight: bold; color: var(--pm-black); margin-bottom: 10px; }\n        .rl-desc { font-size: 0.9em; color: #555; line-height: 1.5; margin-bottom: 15px; }\n        .rl-cost { font-weight: bold; color: var(--pm-dark-red); text-align: right; font-family: monospace; }\n        .rl-cost.refund { color: #2e7d32; }\n\n        .diy-list { display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px; }\n        .diy-box { background: rgba(0, 0, 0, 0.03); border: 1px dashed var(--pm-gold); padding: 15px; border-radius: 6px; position: relative; }\n        .diy-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }\n        .diy-title { font-weight: bold; color: var(--pm-dark-red); font-size: 1.1em; }\n        .diy-roll-btn { padding: 8px 15px; background: var(--pm-gold); color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; transition: all 0.2s; }\n        .diy-roll-btn:hover:not(:disabled) { background: var(--pm-dark-red); }\n        .diy-roll-btn:disabled { background: #ccc; cursor: not-allowed; }\n        .diy-cost-display { font-family: monospace; font-size: 1.2em; font-weight: bold; color: var(--pm-dark-red); }\n        .diy-cost-display.refund { color: #2e7d32; }\n        .btn-add-diy { width: 100%; padding: 10px; background: transparent; border: 1px dashed var(--pm-text); color: var(--pm-text); font-weight: bold; cursor: pointer; border-radius: 4px; transition: all 0.2s; }\n        .btn-add-diy:hover { background: rgba(0,0,0,0.05); border-color: var(--pm-dark-red); color: var(--pm-dark-red); }\n\n        /* 🚨 修复：删除按钮不再绝对定位，改为 Flex 布局防重叠 */\n        .btn-remove-diy { background: transparent; border: none; color: #ff4444; cursor: pointer; font-size: 1.5em; font-weight: bold; display: flex; align-items: center; justify-content: center; padding: 0 5px; transition: transform 0.2s; line-height: 1; }\n        .btn-remove-diy:hover { transform: scale(1.2); }\n\n        .dm-warning { background: rgba(139, 0, 0, 0.05); border-left: 4px solid var(--pm-dark-red); padding: 15px; margin-bottom: 20px; font-size: 0.95em; color: #555; line-height: 1.6; }\n        .dm-warning strong { color: var(--pm-dark-red); }\n        .negative-warning { background: rgba(139, 0, 0, 0.1); border: 2px solid #ff4444; color: #8b0000; padding: 20px; border-radius: 8px; margin-top: 20px; font-weight: bold; text-align: center; animation: pulse-border 2s infinite; line-height: 1.6; }\n        .price-table-details { margin-bottom: 20px; border: 1px solid var(--pm-gold); border-radius: 6px; background: rgba(255, 255, 255, 0.8); }\n        .price-table-summary { padding: 12px 20px; font-weight: bold; color: var(--pm-dark-red); cursor: pointer; list-style: none; background: rgba(212, 175, 55, 0.1); }\n        .price-table-summary::-webkit-details-marker { display: none; }\n        .price-table-content { padding:15px 20px; font-size: 0.9em; color: #444; line-height: 1.8; border-top: 1px dashed var(--pm-gold); }\n        .price-table-content ul { margin: 0; padding-left: 20px; }\n        .price-table-content li { margin-bottom: 5px; }\n        .custom-idea-box { width: 100%; margin-top: 20px; }\n        .custom-idea-box textarea { width: 100%; min-height: 150px; padding: 15px; border: 2px dashed var(--pm-gold); border-radius: 6px; background: rgba(255, 255, 255, 0.9); font-family: inherit; font-size: 1.05em; resize: vertical; box-sizing: border-box; outline: none; transition: all 0.3s; line-height: 1.6; }\n        .custom-idea-box textarea:focus { border-color: var(--pm-dark-red); border-style: solid; box-shadow: 0 0 10px rgba(139, 0, 0, 0.1); }\n\n        .page-settings { width: 100%; display: flex; flex-direction: column; align-items: center; padding: 40px 0; animation: slideDown 0.5s ease-out; }\n        .settings-title { font-size: 2.5em; font-weight: 900; color: var(--pm-dark-red); letter-spacing: 8px; margin-bottom: 10px; text-align: center; border-bottom: 2px solid var(--pm-gold); padding-bottom: 15px; width: 100%; max-width: 800px; }\n        .settings-warning { color: #555; font-style: italic; margin-bottom: 40px; letter-spacing: 2px; text-align: center; }\n        .toggles-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; width: 100%; max-width: 800px; margin-bottom: 50px; }\n        .toggle-btn { padding: 15px; border: 1px solid var(--pm-gold); background: rgba(255, 255, 255, 0.5); border-radius: 8px; text-align: center; cursor: pointer; font-weight: bold; color: #555; transition: all 0.3s; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); user-select: none; }\n        .toggle-btn.active { background: var(--pm-dark-red); color: #fff; border-color: #5a0000; box-shadow: 0 5px 15px rgba(139, 0, 0, 0.3); transform: translateY(-2px); }\n        .toggle-btn.active::after { content: ' [已开启]'; font-size: 0.8em; opacity: 0.8; }\n        .toggle-btn:not(.active)::after { content: ' [已关闭]'; font-size: 0.8em; opacity: 0.8; }\n        .dm-section { width: 100%; max-width: 800px; background: rgba(212, 175, 55, 0.05); border: 1px dashed var(--pm-gold); padding: 30px; border-radius: 8px; margin-bottom: 30px; box-sizing: border-box; }\n        .dm-title { font-size: 1.5em; color: var(--pm-black); font-weight: bold; margin-bottom: 15px; }\n        .dm-desc { color: #555; line-height: 1.8; margin-bottom: 20px; }\n        .dm-presets { display: flex; gap: 15px; margin-bottom: 20px; flex-wrap: wrap; align-items: center; }\n        .pm-preset-btn { padding: 10px 20px; border: 1px solid var(--pm-dark-red); background: transparent; color: var(--pm-dark-red); cursor: pointer; border-radius: 4px; transition: all 0.2s; font-family: inherit; font-size: 1em; }\n        .pm-preset-btn:hover, .pm-preset-btn.active { background: var(--pm-dark-red); color: white; }\n        .pm-preset-btn.custom-btn { border-style: dashed; font-weight: bold; }\n        .mbti-diff-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; width: 100%; max-width: 800px; margin-bottom: 50px; }\n        @media (max-width: 768px) { .mbti-diff-grid { grid-template-columns: 1fr; } }\n        .mbti-box { background: rgba(255, 255, 255, 0.6); border: 1px solid var(--pm-gold); padding: 20px; border-radius: 8px; }\n        .mbti-row { display: flex; justify-content: space-between; margin-bottom: 10px; background: rgba(0, 0, 0, 0.05); border-radius: 4px; overflow: hidden; }\n        .mbti-btn { flex: 1; padding: 10px; border: none; background: transparent; cursor: pointer; font-weight: bold; color: #555; transition: all 0.2s; }\n        .mbti-btn.active { background: var(--pm-dark-red); color: white; }\n        .mbti-result { text-align: center; font-size: 1.5em; font-weight: 900; color: var(--pm-dark-red); margin-top: 15px; letter-spacing: 2px; }\n        .diff-box { background: rgba(255, 255, 255, 0.6); border: 1px solid var(--pm-gold); padding: 20px; border-radius: 8px; display: flex; flex-direction: column; gap: 10px; }\n        .diff-btn { padding: 12px; border: 1px solid var(--pm-dark-red); background: transparent; color: var(--pm-dark-red); cursor: pointer; border-radius: 4px; font-weight: bold; transition: all 0.2s; text-align: left; }\n        .diff-btn:hover, .diff-btn.active { background: var(--pm-dark-red); color: white; }\n        .pm-btn-embark { padding: 20px 60px; font-size: 1.5em; font-weight: 900; background: var(--pm-black); color: var(--pm-gold); border: 2px solid var(--pm-gold); border-radius: 8px; cursor: pointer; letter-spacing: 8px; transition: all 0.4s; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3); text-align: center; display: inline-block; margin-top: 20px; }\n        .pm-btn-embark:hover:not(:disabled) { background: var(--pm-dark-red); color: #fff; border-color: #ff4444; box-shadow: 0 15px 30px rgba(139, 0, 0, 0.5); transform: translateY(-3px); }\n        .pm-btn-embark:disabled { opacity: 0.6; cursor: not-allowed; }\n\n        .modal-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-radius: 12px; background: rgba(0,0,0,0.8); z-index: 999999; display: flex; justify-content: center; align-items: center; padding: 20px; }\n        .modal-content { background: var(--pm-bg-light); border: 2px solid var(--pm-gold); border-radius: 8px; width: 100%; max-width: 800px; max-height: 90vh; display: flex; flex-direction: column; padding: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }\n        .modal-title { color: var(--pm-dark-red); font-size: 1.5em; font-weight: bold; margin-bottom: 15px; text-align: center; }\n        .modal-textarea { flex: 1; width: 100%; min-height: 300px; padding: 15px; font-family: monospace; font-size: 14px; border: 1px solid #ccc; border-radius: 4px; resize: none; outline: none; background: #f5f5f5; margin-bottom: 15px; }\n        .modal-btn { padding: 12px 30px; background: var(--pm-dark-red); color: white; border: none; border-radius: 4px; font-size: 1.2em; cursor: pointer; font-weight: bold; align-self: center; }\n        .modal-btn:hover { background: #5a0000; }\n\n        /* 🚨 新增：跑团娘立绘与插图样式 */\n        .dm-sprite {\n            position: absolute;\n            bottom: 0;\n            right: 0;\n            width: 350px;\n            max-width: 40vw;\n            opacity: 0.85;\n            pointer-events: none;\n            z-index: 0;\n            -webkit-mask-image: linear-gradient(to top, transparent 0%, black 15%);\n            mask-image: linear-gradient(to top, transparent 0%, black 15%);\n        }\n        .image-upload-row { display: flex; gap: 15px; align-items: center; margin-bottom: 15px; width: 100%; }\n        .image-preview { width: 60px; height: 60px; border-radius: 8px; border: 2px solid var(--pm-gold); object-fit: cover; background: rgba(0,0,0,0.1); flex-shrink: 0; }\n      ", e.head.appendChild(t);
		}
	}, i = () => {
		let r = n();
		for (let [t, n] of e.entries()) {
			let i = typeof t == "string" && t.startsWith("setup_") ? `pm-setup-root-${t.split("_")[1]}` : `pm-app-${t}`, a = r.getElementById(i);
			(!a || !r.body.contains(a)) && (n.unmount(), e.delete(t), typeof t == "number" && $.mvuDataMap.delete(t));
		}
		let i = r.querySelectorAll(".mes[mesid]");
		if (i.length === 0) {
			$.latestMesId = -1;
			return;
		}
		let a = -1;
		i.forEach((e) => {
			e.getAttribute("is_user") !== "true" && (a = parseInt(e.getAttribute("mesid") || "-1", 10));
		}), $.latestMesId = a, i.forEach((n) => {
			let i = parseInt(n.getAttribute("mesid") || "-1", 10);
			if (i === -1) return;
			let a = ts(i), o = $.mvuDataMap.get(i);
			if (a && o) try {
				JSON.stringify(a) !== JSON.stringify(o) && $.mvuDataMap.set(i, a);
			} catch {
				$.mvuDataMap.set(i, a);
			}
			else a !== o && $.mvuDataMap.set(i, a);
			let s = n.textContent || "", c = n.getAttribute("is_user") === "true", l = s.includes("<initvar>") || s.includes("pm-custom-char-mount-point"), u = n.querySelector(".mes_block");
			if (u) {
				if (s.includes("pm-custom-char-mount-point")) {
					let n = `pm-setup-root-${i}`, a = r.getElementById(n);
					a || (a = r.createElement("div"), a.id = n, a.style.cssText = "margin-top: 15px; width: 100%; position: relative; clear: both;", u.appendChild(a), t = Xo(mp), t.mount(a), e.set(`setup_${i}`, t));
				}
				if (!c && !l) {
					let t = `pm-app-${i}`, n = r.getElementById(t);
					if (!n) {
						n = r.createElement("div"), n.className = "pm-status-bar-container", n.id = t, n.style.cssText = "margin-top: 15px; width: 100%; clear: both;", u.appendChild(n);
						let a = Xo(Wl, { mesId: i });
						a.mount(n), e.set(i, a);
					}
				}
			}
		});
	}, a = () => {
		let t = n().getElementById("chat");
		if (!t) {
			setTimeout(a, 1e3);
			return;
		}
		$.isReady = !0, console.log("[SevenDays] 🚀 观测者终端已连接 (DOM-Driven)"), setInterval(() => {
			if ($.isReady) {
				for (let t of e.keys()) if (typeof t == "number") {
					let e = ts(t), n = $.mvuDataMap.get(t);
					try {
						JSON.stringify(e) !== JSON.stringify(n) && $.mvuDataMap.set(t, e);
					} catch {
						$.mvuDataMap.set(t, e);
					}
				}
			}
		}, 1e3);
		let r = !1, o = !1, s = () => {
			i(), r = !0, setTimeout(() => {
				r = !1, o && (o = !1, s());
			}, 500);
		};
		new MutationObserver((e) => {
			e.every((e) => {
				let t = e.target, n = t?.className, r = t?.id, i = typeof n == "string" && n.includes("pm-status-bar-container"), a = typeof r == "string" && (r.includes("pm-app-") || r.includes("pm-setup-root-"));
				return i || a;
			}) || (r ? o = !0 : s());
		}).observe(t, {
			childList: !0,
			subtree: !0,
			characterData: !0
		}), i();
	};
	r(), a();
}
//#endregion
