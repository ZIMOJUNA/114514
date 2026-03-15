
              (function(){
                if (typeof document !== 'undefined' && !document.getElementById('seven-days-injected-styles')) {
                  var style = document.createElement('style');
                  style.id = 'seven-days-injected-styles';
                  style.textContent = "";
                  document.head.appendChild(style);
                }
              })();
//#region node_modules/.pnpm/@vue+shared@3.5.30/node_modules/@vue/shared/dist/shared.esm-bundler.js
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
}, ne = /-\w/g, T = te((e) => e.replace(ne, (e) => e.slice(1).toUpperCase())), E = /\B([A-Z])/g, re = te((e) => e.replace(E, "-$1").toLowerCase()), ie = te((e) => e.charAt(0).toUpperCase() + e.slice(1)), ae = te((e) => e ? `on${ie(e)}` : ""), oe = (e, t) => !Object.is(e, t), se = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, D = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, ce = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, le = (e) => {
	let t = g(e) ? Number(e) : NaN;
	return isNaN(t) ? e : t;
}, ue, de = () => ue ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
function O(e) {
	if (d(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = g(r) ? pe(r) : O(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	} else if (g(e) || v(e)) return e;
}
var k = /;(?![^(]*\))/g, A = /:([^]+)/, fe = /\/\*[^]*?\*\//g;
function pe(e) {
	let t = {};
	return e.replace(fe, "").split(k).forEach((e) => {
		if (e) {
			let n = e.split(A);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function j(e) {
	let t = "";
	if (g(e)) t = e;
	else if (d(e)) for (let n = 0; n < e.length; n++) {
		let r = j(e[n]);
		r && (t += r + " ");
	}
	else if (v(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
var M = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", me = /* @__PURE__ */ e(M);
M + "";
function he(e) {
	return !!e || e === "";
}
function ge(e, t) {
	if (e.length !== t.length) return !1;
	let n = !0;
	for (let r = 0; n && r < e.length; r++) n = N(e[r], t[r]);
	return n;
}
function N(e, t) {
	if (e === t) return !0;
	let n = m(e), r = m(t);
	if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
	if (n = _(e), r = _(t), n || r) return e === t;
	if (n = d(e), r = d(t), n || r) return n && r ? ge(e, t) : !1;
	if (n = v(e), r = v(t), n || r) {
		if (!n || !r || Object.keys(e).length !== Object.keys(t).length) return !1;
		for (let n in e) {
			let r = e.hasOwnProperty(n), i = t.hasOwnProperty(n);
			if (r && !i || !r && i || !N(e[n], t[n])) return !1;
		}
	}
	return String(e) === String(t);
}
function P(e, t) {
	return e.findIndex((e) => N(e, t));
}
var _e = (e) => !!(e && e.__v_isRef === !0), F = (e) => g(e) ? e : e == null ? "" : d(e) || v(e) && (e.toString === b || !h(e.toString)) ? _e(e) ? F(e.value) : JSON.stringify(e, ve, 2) : String(e), ve = (e, t) => _e(t) ? ve(e, t.value) : f(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[ye(t, r) + " =>"] = n, e), {}) } : p(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => ye(e)) } : _(t) ? ye(t) : v(t) && !d(t) && !C(t) ? String(t) : t, ye = (e, t = "") => _(e) ? `Symbol(${e.description ?? t})` : e, I, be = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.__v_skip = !0, this.parent = I, !e && I && (this.index = (I.scopes ||= []).push(this) - 1);
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
			let t = I;
			try {
				return I = this, e();
			} finally {
				I = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = I, I = this);
	}
	off() {
		this._on > 0 && --this._on === 0 && (I = this.prevScope, this.prevScope = void 0);
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
function xe() {
	return I;
}
var L, Se = /* @__PURE__ */ new WeakSet(), Ce = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, I && I.active && I.effects.push(this);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, Se.has(this) && (Se.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || De(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, Re(this), Ae(this);
		let e = L, t = R;
		L = this, R = !0;
		try {
			return this.fn();
		} finally {
			je(this), L = e, R = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) Pe(e);
			this.deps = this.depsTail = void 0, Re(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? Se.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		Me(this) && this.run();
	}
	get dirty() {
		return Me(this);
	}
}, we = 0, Te, Ee;
function De(e, t = !1) {
	if (e.flags |= 8, t) {
		e.next = Ee, Ee = e;
		return;
	}
	e.next = Te, Te = e;
}
function Oe() {
	we++;
}
function ke() {
	if (--we > 0) return;
	if (Ee) {
		let e = Ee;
		for (Ee = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; Te;) {
		let t = Te;
		for (Te = void 0; t;) {
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
function Ae(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function je(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), Pe(r), Fe(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function Me(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Ne(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function Ne(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === B) || (e.globalVersion = B, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Me(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = L, r = R;
	L = e, R = !0;
	try {
		Ae(e);
		let n = e.fn(e._value);
		(t.version === 0 || oe(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		L = n, R = r, je(e), e.flags &= -3;
	}
}
function Pe(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) Pe(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function Fe(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var R = !0, Ie = [];
function z() {
	Ie.push(R), R = !1;
}
function Le() {
	let e = Ie.pop();
	R = e === void 0 ? !0 : e;
}
function Re(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = L;
		L = void 0;
		try {
			t();
		} finally {
			L = e;
		}
	}
}
var B = 0, ze = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, Be = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!L || !R || L === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== L) t = this.activeLink = new ze(L, this), L.deps ? (t.prevDep = L.depsTail, L.depsTail.nextDep = t, L.depsTail = t) : L.deps = L.depsTail = t, Ve(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = L.depsTail, t.nextDep = void 0, L.depsTail.nextDep = t, L.depsTail = t, L.deps === t && (L.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, B++, this.notify(e);
	}
	notify(e) {
		Oe();
		try {
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			ke();
		}
	}
};
function Ve(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) Ve(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
var He = /* @__PURE__ */ new WeakMap(), Ue = /* @__PURE__ */ Symbol(""), We = /* @__PURE__ */ Symbol(""), Ge = /* @__PURE__ */ Symbol("");
function Ke(e, t, n) {
	if (R && L) {
		let t = He.get(e);
		t || He.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new Be()), r.map = t, r.key = n), r.track();
	}
}
function qe(e, t, n, r, i, a) {
	let o = He.get(e);
	if (!o) {
		B++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (Oe(), t === "clear") o.forEach(s);
	else {
		let i = d(e), a = i && w(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === Ge || !_(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(Ge)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(Ue)), f(e) && s(o.get(We)));
				break;
			case "delete":
				i || (s(o.get(Ue)), f(e) && s(o.get(We)));
				break;
			case "set":
				f(e) && s(o.get(Ue));
				break;
		}
	}
	ke();
}
function Je(e) {
	let t = /* @__PURE__ */ V(e);
	return t === e ? t : (Ke(t, "iterate", Ge), /* @__PURE__ */ Pt(e) ? t : t.map(Lt));
}
function Ye(e) {
	return Ke(e = /* @__PURE__ */ V(e), "iterate", Ge), e;
}
function Xe(e, t) {
	return /* @__PURE__ */ Nt(e) ? Rt(/* @__PURE__ */ Mt(e) ? Lt(t) : t) : Lt(t);
}
var Ze = {
	__proto__: null,
	[Symbol.iterator]() {
		return Qe(this, Symbol.iterator, (e) => Xe(this, e));
	},
	concat(...e) {
		return Je(this).concat(...e.map((e) => d(e) ? Je(e) : e));
	},
	entries() {
		return Qe(this, "entries", (e) => (e[1] = Xe(this, e[1]), e));
	},
	every(e, t) {
		return et(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return et(this, "filter", e, t, (e) => e.map((e) => Xe(this, e)), arguments);
	},
	find(e, t) {
		return et(this, "find", e, t, (e) => Xe(this, e), arguments);
	},
	findIndex(e, t) {
		return et(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return et(this, "findLast", e, t, (e) => Xe(this, e), arguments);
	},
	findLastIndex(e, t) {
		return et(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return et(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return nt(this, "includes", e);
	},
	indexOf(...e) {
		return nt(this, "indexOf", e);
	},
	join(e) {
		return Je(this).join(e);
	},
	lastIndexOf(...e) {
		return nt(this, "lastIndexOf", e);
	},
	map(e, t) {
		return et(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return rt(this, "pop");
	},
	push(...e) {
		return rt(this, "push", e);
	},
	reduce(e, ...t) {
		return tt(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return tt(this, "reduceRight", e, t);
	},
	shift() {
		return rt(this, "shift");
	},
	some(e, t) {
		return et(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return rt(this, "splice", e);
	},
	toReversed() {
		return Je(this).toReversed();
	},
	toSorted(e) {
		return Je(this).toSorted(e);
	},
	toSpliced(...e) {
		return Je(this).toSpliced(...e);
	},
	unshift(...e) {
		return rt(this, "unshift", e);
	},
	values() {
		return Qe(this, "values", (e) => Xe(this, e));
	}
};
function Qe(e, t, n) {
	let r = Ye(e), i = r[t]();
	return r !== e && !/* @__PURE__ */ Pt(e) && (i._next = i.next, i.next = () => {
		let e = i._next();
		return e.done || (e.value = n(e.value)), e;
	}), i;
}
var $e = Array.prototype;
function et(e, t, n, r, i, a) {
	let o = Ye(e), s = o !== e && !/* @__PURE__ */ Pt(e), c = o[t];
	if (c !== $e[t]) {
		let t = c.apply(e, a);
		return s ? Lt(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, Xe(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function tt(e, t, n, r) {
	let i = Ye(e), a = i !== e && !/* @__PURE__ */ Pt(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = Xe(e, t)), n.call(this, t, Xe(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? Xe(e, c) : c;
}
function nt(e, t, n) {
	let r = /* @__PURE__ */ V(e);
	Ke(r, "iterate", Ge);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ Ft(n[0]) ? (n[0] = /* @__PURE__ */ V(n[0]), r[t](...n)) : i;
}
function rt(e, t, n = []) {
	z(), Oe();
	let r = (/* @__PURE__ */ V(e))[t].apply(e, n);
	return ke(), Le(), r;
}
var it = /* @__PURE__ */ e("__proto__,__v_isRef,__isVue"), at = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(_));
function ot(e) {
	_(e) || (e = String(e));
	let t = /* @__PURE__ */ V(this);
	return Ke(t, "has", e), t.hasOwnProperty(e);
}
var st = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? Tt : wt : i ? Ct : St).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = d(e);
		if (!r) {
			let e;
			if (a && (e = Ze[t])) return e;
			if (t === "hasOwnProperty") return ot;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ zt(e) ? e : n);
		if ((_(t) ? at.has(t) : it(t)) || (r || Ke(e, "get", t), i)) return o;
		if (/* @__PURE__ */ zt(o)) {
			let e = a && w(t) ? o : o.value;
			return r && v(e) ? /* @__PURE__ */ At(e) : e;
		}
		return v(o) ? r ? /* @__PURE__ */ At(o) : /* @__PURE__ */ Ot(o) : o;
	}
}, ct = class extends st {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = d(e) && w(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ Nt(i);
			if (!/* @__PURE__ */ Pt(n) && !/* @__PURE__ */ Nt(n) && (i = /* @__PURE__ */ V(i), n = /* @__PURE__ */ V(n)), !a && /* @__PURE__ */ zt(i) && !/* @__PURE__ */ zt(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : u(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ zt(e) ? e : r);
		return e === /* @__PURE__ */ V(r) && (o ? oe(n, i) && qe(e, "set", t, n, i) : qe(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = u(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && qe(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return (!_(t) || !at.has(t)) && Ke(e, "has", t), n;
	}
	ownKeys(e) {
		return Ke(e, "iterate", d(e) ? "length" : Ue), Reflect.ownKeys(e);
	}
}, lt = class extends st {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return !0;
	}
	deleteProperty(e, t) {
		return !0;
	}
}, ut = /* @__PURE__ */ new ct(), dt = /* @__PURE__ */ new lt(), ft = /* @__PURE__ */ new ct(!0), pt = (e) => e, mt = (e) => Reflect.getPrototypeOf(e);
function ht(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ V(i), o = f(a), c = e === "entries" || e === Symbol.iterator && o, l = e === "keys" && o, u = i[e](...r), d = n ? pt : t ? Rt : Lt;
		return !t && Ke(a, "iterate", l ? We : Ue), s(Object.create(u), { next() {
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
function gt(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function _t(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ V(r), a = /* @__PURE__ */ V(n);
			e || (oe(n, a) && Ke(i, "get", n), Ke(i, "get", a));
			let { has: o } = mt(i), s = t ? pt : e ? Rt : Lt;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && Ke(/* @__PURE__ */ V(t), "iterate", Ue), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ V(n), i = /* @__PURE__ */ V(t);
			return e || (oe(t, i) && Ke(r, "has", t), Ke(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ V(a), s = t ? pt : e ? Rt : Lt;
			return !e && Ke(o, "iterate", Ue), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return s(n, e ? {
		add: gt("add"),
		set: gt("set"),
		delete: gt("delete"),
		clear: gt("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ V(this), r = mt(n), i = /* @__PURE__ */ V(e), a = !t && !/* @__PURE__ */ Pt(e) && !/* @__PURE__ */ Nt(e) ? i : e;
			return r.has.call(n, a) || oe(e, a) && r.has.call(n, e) || oe(i, a) && r.has.call(n, i) || (n.add(a), qe(n, "add", a, a)), this;
		},
		set(e, n) {
			!t && !/* @__PURE__ */ Pt(n) && !/* @__PURE__ */ Nt(n) && (n = /* @__PURE__ */ V(n));
			let r = /* @__PURE__ */ V(this), { has: i, get: a } = mt(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ V(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? oe(n, s) && qe(r, "set", e, n, s) : qe(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ V(this), { has: n, get: r } = mt(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ V(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && qe(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ V(this), t = e.size !== 0, n = e.clear();
			return t && qe(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = ht(r, e, t);
	}), n;
}
function vt(e, t) {
	let n = _t(e, t);
	return (t, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? t : Reflect.get(u(n, r) && r in t ? n : t, r, i);
}
var yt = { get: /* @__PURE__ */ vt(!1, !1) }, bt = { get: /* @__PURE__ */ vt(!1, !0) }, xt = { get: /* @__PURE__ */ vt(!0, !1) }, St = /* @__PURE__ */ new WeakMap(), Ct = /* @__PURE__ */ new WeakMap(), wt = /* @__PURE__ */ new WeakMap(), Tt = /* @__PURE__ */ new WeakMap();
function Et(e) {
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
function Dt(e) {
	return e.__v_skip || !Object.isExtensible(e) ? 0 : Et(S(e));
}
/* @__NO_SIDE_EFFECTS__ */
function Ot(e) {
	return /* @__PURE__ */ Nt(e) ? e : jt(e, !1, ut, yt, St);
}
/* @__NO_SIDE_EFFECTS__ */
function kt(e) {
	return jt(e, !1, ft, bt, Ct);
}
/* @__NO_SIDE_EFFECTS__ */
function At(e) {
	return jt(e, !0, dt, xt, wt);
}
function jt(e, t, n, r, i) {
	if (!v(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
	let a = Dt(e);
	if (a === 0) return e;
	let o = i.get(e);
	if (o) return o;
	let s = new Proxy(e, a === 2 ? r : n);
	return i.set(e, s), s;
}
/* @__NO_SIDE_EFFECTS__ */
function Mt(e) {
	return /* @__PURE__ */ Nt(e) ? /* @__PURE__ */ Mt(e.__v_raw) : !!(e && e.__v_isReactive);
}
/* @__NO_SIDE_EFFECTS__ */
function Nt(e) {
	return !!(e && e.__v_isReadonly);
}
/* @__NO_SIDE_EFFECTS__ */
function Pt(e) {
	return !!(e && e.__v_isShallow);
}
/* @__NO_SIDE_EFFECTS__ */
function Ft(e) {
	return e ? !!e.__v_raw : !1;
}
/* @__NO_SIDE_EFFECTS__ */
function V(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ V(t) : e;
}
function It(e) {
	return !u(e, "__v_skip") && Object.isExtensible(e) && D(e, "__v_skip", !0), e;
}
var Lt = (e) => v(e) ? /* @__PURE__ */ Ot(e) : e, Rt = (e) => v(e) ? /* @__PURE__ */ At(e) : e;
/* @__NO_SIDE_EFFECTS__ */
function zt(e) {
	return e ? e.__v_isRef === !0 : !1;
}
/* @__NO_SIDE_EFFECTS__ */
function H(e) {
	return Bt(e, !1);
}
function Bt(e, t) {
	return /* @__PURE__ */ zt(e) ? e : new Vt(e, t);
}
var Vt = class {
	constructor(e, t) {
		this.dep = new Be(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ V(e), this._value = t ? e : Lt(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Pt(e) || /* @__PURE__ */ Nt(e);
		e = n ? e : /* @__PURE__ */ V(e), oe(e, t) && (this._rawValue = e, this._value = n ? e : Lt(e), this.dep.trigger());
	}
};
function Ht(e) {
	return /* @__PURE__ */ zt(e) ? e.value : e;
}
var Ut = {
	get: (e, t, n) => t === "__v_raw" ? e : Ht(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ zt(i) && !/* @__PURE__ */ zt(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function Wt(e) {
	return /* @__PURE__ */ Mt(e) ? e : new Proxy(e, Ut);
}
var Gt = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new Be(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = B - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && L !== this) return De(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return Ne(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter && this.setter(e);
	}
};
/* @__NO_SIDE_EFFECTS__ */
function Kt(e, t, n = !1) {
	let r, i;
	return h(e) ? r = e : (r = e.get, i = e.set), new Gt(r, i, n);
}
var qt = {}, Jt = /* @__PURE__ */ new WeakMap(), Yt = void 0;
function Xt(e, t = !1, n = Yt) {
	if (n) {
		let t = Jt.get(n);
		t || Jt.set(n, t = []), t.push(e);
	}
}
function Zt(e, n, i = t) {
	let { immediate: a, deep: o, once: s, scheduler: l, augmentJob: u, call: f } = i, p = (e) => o ? e : /* @__PURE__ */ Pt(e) || o === !1 || o === 0 ? Qt(e, 1) : Qt(e), m, g, _, v, y = !1, b = !1;
	if (/* @__PURE__ */ zt(e) ? (g = () => e.value, y = /* @__PURE__ */ Pt(e)) : /* @__PURE__ */ Mt(e) ? (g = () => p(e), y = !0) : d(e) ? (b = !0, y = e.some((e) => /* @__PURE__ */ Mt(e) || /* @__PURE__ */ Pt(e)), g = () => e.map((e) => {
		if (/* @__PURE__ */ zt(e)) return e.value;
		if (/* @__PURE__ */ Mt(e)) return p(e);
		if (h(e)) return f ? f(e, 2) : e();
	})) : g = h(e) ? n ? f ? () => f(e, 2) : e : () => {
		if (_) {
			z();
			try {
				_();
			} finally {
				Le();
			}
		}
		let t = Yt;
		Yt = m;
		try {
			return f ? f(e, 3, [v]) : e(v);
		} finally {
			Yt = t;
		}
	} : r, n && o) {
		let e = g, t = o === !0 ? Infinity : o;
		g = () => Qt(e(), t);
	}
	let x = xe(), S = () => {
		m.stop(), x && x.active && c(x.effects, m);
	};
	if (s && n) {
		let e = n;
		n = (...t) => {
			e(...t), S();
		};
	}
	let C = b ? Array(e.length).fill(qt) : qt, w = (e) => {
		if (!(!(m.flags & 1) || !m.dirty && !e)) if (n) {
			let e = m.run();
			if (o || y || (b ? e.some((e, t) => oe(e, C[t])) : oe(e, C))) {
				_ && _();
				let t = Yt;
				Yt = m;
				try {
					let t = [
						e,
						C === qt ? void 0 : b && C[0] === qt ? [] : C,
						v
					];
					C = e, f ? f(n, 3, t) : n(...t);
				} finally {
					Yt = t;
				}
			}
		} else m.run();
	};
	return u && u(w), m = new Ce(g), m.scheduler = l ? () => l(w, !1) : w, v = (e) => Xt(e, !1, m), _ = m.onStop = () => {
		let e = Jt.get(m);
		if (e) {
			if (f) f(e, 4);
			else for (let t of e) t();
			Jt.delete(m);
		}
	}, n ? a ? w(!0) : C = m.run() : l ? l(w.bind(null, !0), !0) : m.run(), S.pause = m.pause.bind(m), S.resume = m.resume.bind(m), S.stop = S, S;
}
function Qt(e, t = Infinity, n) {
	if (t <= 0 || !v(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ zt(e)) Qt(e.value, t, n);
	else if (d(e)) for (let r = 0; r < e.length; r++) Qt(e[r], t, n);
	else if (p(e) || f(e)) e.forEach((e) => {
		Qt(e, t, n);
	});
	else if (C(e)) {
		for (let r in e) Qt(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && Qt(e[r], t, n);
	}
	return e;
}
//#endregion
//#region node_modules/.pnpm/@vue+runtime-core@3.5.30/node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
function $t(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		tn(e, t, n);
	}
}
function en(e, t, n, r) {
	if (h(e)) {
		let i = $t(e, t, n, r);
		return i && y(i) && i.catch((e) => {
			tn(e, t, n);
		}), i;
	}
	if (d(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(en(e[a], t, n, r));
		return i;
	}
}
function tn(e, n, r, i = !0) {
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
			z(), $t(o, null, 10, [
				e,
				i,
				a
			]), Le();
			return;
		}
	}
	nn(e, r, a, i, s);
}
function nn(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var rn = [], an = -1, on = [], sn = null, cn = 0, ln = /* @__PURE__ */ Promise.resolve(), un = null;
function dn(e) {
	let t = un || ln;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function fn(e) {
	let t = an + 1, n = rn.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = rn[r], a = vn(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function pn(e) {
	if (!(e.flags & 1)) {
		let t = vn(e), n = rn[rn.length - 1];
		!n || !(e.flags & 2) && t >= vn(n) ? rn.push(e) : rn.splice(fn(t), 0, e), e.flags |= 1, mn();
	}
}
function mn() {
	un ||= ln.then(yn);
}
function hn(e) {
	d(e) ? on.push(...e) : sn && e.id === -1 ? sn.splice(cn + 1, 0, e) : e.flags & 1 || (on.push(e), e.flags |= 1), mn();
}
function gn(e, t, n = an + 1) {
	for (; n < rn.length; n++) {
		let t = rn[n];
		if (t && t.flags & 2) {
			if (e && t.id !== e.uid) continue;
			rn.splice(n, 1), n--, t.flags & 4 && (t.flags &= -2), t(), t.flags & 4 || (t.flags &= -2);
		}
	}
}
function _n(e) {
	if (on.length) {
		let e = [...new Set(on)].sort((e, t) => vn(e) - vn(t));
		if (on.length = 0, sn) {
			sn.push(...e);
			return;
		}
		for (sn = e, cn = 0; cn < sn.length; cn++) {
			let e = sn[cn];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		sn = null, cn = 0;
	}
}
var vn = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function yn(e) {
	try {
		for (an = 0; an < rn.length; an++) {
			let e = rn[an];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), $t(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; an < rn.length; an++) {
			let e = rn[an];
			e && (e.flags &= -2);
		}
		an = -1, rn.length = 0, _n(e), un = null, (rn.length || on.length) && yn(e);
	}
}
var bn = null, xn = null;
function Sn(e) {
	let t = bn;
	return bn = e, xn = e && e.type.__scopeId || null, t;
}
function Cn(e, t = bn, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && Vi(-1);
		let i = Sn(t), a;
		try {
			a = e(...n);
		} finally {
			Sn(i), r._d && Vi(1);
		}
		return a;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function U(e, n) {
	if (bn === null) return e;
	let r = Ca(bn), i = e.dirs ||= [];
	for (let e = 0; e < n.length; e++) {
		let [a, o, s, c = t] = n[e];
		a && (h(a) && (a = {
			mounted: a,
			updated: a
		}), a.deep && Qt(o), i.push({
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
function wn(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (z(), en(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), Le());
	}
}
function Tn(e, t) {
	if (sa) {
		let n = sa.provides, r = sa.parent && sa.parent.provides;
		r === n && (n = sa.provides = Object.create(r)), n[e] = t;
	}
}
function En(e, t, n = !1) {
	let r = ca();
	if (r || Wr) {
		let i = Wr ? Wr._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && h(t) ? t.call(r && r.proxy) : t;
	}
}
var Dn = /* @__PURE__ */ Symbol.for("v-scx"), On = () => En(Dn);
function kn(e, t, n) {
	return An(e, t, n);
}
function An(e, n, i = t) {
	let { immediate: a, deep: o, flush: c, once: l } = i, u = s({}, i), d = n && a || !n && c !== "post", f;
	if (ma) {
		if (c === "sync") {
			let e = On();
			f = e.__watcherHandles ||= [];
		} else if (!d) {
			let e = () => {};
			return e.stop = r, e.resume = r, e.pause = r, e;
		}
	}
	let p = sa;
	u.call = (e, t, n) => en(e, p, t, n);
	let m = !1;
	c === "post" ? u.scheduler = (e) => {
		xi(e, p && p.suspense);
	} : c !== "sync" && (m = !0, u.scheduler = (e, t) => {
		t ? e() : pn(e);
	}), u.augmentJob = (e) => {
		n && (e.flags |= 4), m && (e.flags |= 2, p && (e.id = p.uid, e.i = p));
	};
	let h = Zt(e, n, u);
	return ma && (f ? f.push(h) : d && h()), h;
}
function jn(e, t, n) {
	let r = this.proxy, i = g(e) ? e.includes(".") ? Mn(r, e) : () => r[e] : e.bind(r, r), a;
	h(t) ? a = t : (a = t.handler, n = t);
	let o = da(this), s = An(i, a.bind(r), n);
	return o(), s;
}
function Mn(e, t) {
	let n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t;
	};
}
var Nn = /* @__PURE__ */ Symbol("_vte"), Pn = (e) => e.__isTeleport, Fn = /* @__PURE__ */ Symbol("_leaveCb"), In = /* @__PURE__ */ Symbol("_enterCb");
function Ln() {
	let e = {
		isMounted: !1,
		isLeaving: !1,
		isUnmounting: !1,
		leavingVNodes: /* @__PURE__ */ new Map()
	};
	return dr(() => {
		e.isMounted = !0;
	}), mr(() => {
		e.isUnmounting = !0;
	}), e;
}
var Rn = [Function, Array], zn = {
	mode: String,
	appear: Boolean,
	persisted: Boolean,
	onBeforeEnter: Rn,
	onEnter: Rn,
	onAfterEnter: Rn,
	onEnterCancelled: Rn,
	onBeforeLeave: Rn,
	onLeave: Rn,
	onAfterLeave: Rn,
	onLeaveCancelled: Rn,
	onBeforeAppear: Rn,
	onAppear: Rn,
	onAfterAppear: Rn,
	onAppearCancelled: Rn
}, Bn = (e) => {
	let t = e.subTree;
	return t.component ? Bn(t.component) : t;
}, Vn = {
	name: "BaseTransition",
	props: zn,
	setup(e, { slots: t }) {
		let n = ca(), r = Ln();
		return () => {
			let i = t.default && Yn(t.default(), !0);
			if (!i || !i.length) return;
			let a = Hn(i), o = /* @__PURE__ */ V(e), { mode: s } = o;
			if (r.isLeaving) return Kn(a);
			let c = qn(a);
			if (!c) return Kn(a);
			let l = Gn(c, o, r, n, (e) => l = e);
			c.type !== Fi && Jn(c, l);
			let u = n.subTree && qn(n.subTree);
			if (u && u.type !== Fi && !Gi(u, c) && Bn(n).type !== Fi) {
				let e = Gn(u, o, r, n);
				if (Jn(u, e), s === "out-in" && c.type !== Fi) return r.isLeaving = !0, e.afterLeave = () => {
					r.isLeaving = !1, n.job.flags & 8 || n.update(), delete e.afterLeave, u = void 0;
				}, Kn(a);
				s === "in-out" && c.type !== Fi ? e.delayLeave = (e, t, n) => {
					let i = Wn(r, u);
					i[String(u.key)] = u, e[Fn] = () => {
						t(), e[Fn] = void 0, delete l.delayedLeave, u = void 0;
					}, l.delayedLeave = () => {
						n(), delete l.delayedLeave, u = void 0;
					};
				} : u = void 0;
			} else u &&= void 0;
			return a;
		};
	}
};
function Hn(e) {
	let t = e[0];
	if (e.length > 1) {
		for (let n of e) if (n.type !== Fi) {
			t = n;
			break;
		}
	}
	return t;
}
var Un = Vn;
function Wn(e, t) {
	let { leavingVNodes: n } = e, r = n.get(t.type);
	return r || (r = /* @__PURE__ */ Object.create(null), n.set(t.type, r)), r;
}
function Gn(e, t, n, r, i) {
	let { appear: a, mode: o, persisted: s = !1, onBeforeEnter: c, onEnter: l, onAfterEnter: u, onEnterCancelled: f, onBeforeLeave: p, onLeave: m, onAfterLeave: h, onLeaveCancelled: g, onBeforeAppear: _, onAppear: v, onAfterAppear: y, onAppearCancelled: b } = t, x = String(e.key), S = Wn(n, e), C = (e, t) => {
		e && en(e, r, 9, t);
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
			t[Fn] && t[Fn](!0);
			let i = S[x];
			i && Gi(e, i) && i.el[Fn] && i.el[Fn](), C(r, [t]);
		},
		enter(t) {
			if (S[x] === e) return;
			let r = l, i = u, o = f;
			if (!n.isMounted) if (a) r = v || l, i = y || u, o = b || f;
			else return;
			let s = !1;
			t[In] = (e) => {
				s || (s = !0, C(e ? o : i, [t]), ee.delayedLeave && ee.delayedLeave(), t[In] = void 0);
			};
			let c = t[In].bind(null, !1);
			r ? w(r, [t, c]) : c();
		},
		leave(t, r) {
			let i = String(e.key);
			if (t[In] && t[In](!0), n.isUnmounting) return r();
			C(p, [t]);
			let a = !1;
			t[Fn] = (n) => {
				a || (a = !0, r(), C(n ? g : h, [t]), t[Fn] = void 0, S[i] === e && delete S[i]);
			};
			let o = t[Fn].bind(null, !1);
			S[i] = e, m ? w(m, [t, o]) : o();
		},
		clone(e) {
			let a = Gn(e, t, n, r, i);
			return i && i(a), a;
		}
	};
	return ee;
}
function Kn(e) {
	if (rr(e)) return e = Zi(e), e.children = null, e;
}
function qn(e) {
	if (!rr(e)) return Pn(e.type) && e.children ? Hn(e.children) : e;
	if (e.component) return e.component.subTree;
	let { shapeFlag: t, children: n } = e;
	if (n) {
		if (t & 16) return n[0];
		if (t & 32 && h(n.default)) return n.default();
	}
}
function Jn(e, t) {
	e.shapeFlag & 6 && e.component ? (e.transition = t, Jn(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Yn(e, t = !1, n) {
	let r = [], i = 0;
	for (let a = 0; a < e.length; a++) {
		let o = e[a], s = n == null ? o.key : String(n) + String(o.key == null ? a : o.key);
		o.type === G ? (o.patchFlag & 128 && i++, r = r.concat(Yn(o.children, t, s))) : (t || o.type !== Fi) && r.push(s == null ? o : Zi(o, { key: s }));
	}
	if (i > 1) for (let e = 0; e < r.length; e++) r[e].patchFlag = -2;
	return r;
}
/* @__NO_SIDE_EFFECTS__ */
function Xn(e, t) {
	return h(e) ? s({ name: e.name }, t, { setup: e }) : e;
}
function Zn(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function Qn(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var $n = /* @__PURE__ */ new WeakMap();
function er(e, n, r, a, o = !1) {
	if (d(e)) {
		e.forEach((e, t) => er(e, n && (d(n) ? n[t] : n), r, a, o));
		return;
	}
	if (nr(a) && !o) {
		a.shapeFlag & 512 && a.type.__asyncResolved && a.component.subTree.component && er(e, n, r, a.component.subTree);
		return;
	}
	let s = a.shapeFlag & 4 ? Ca(a.component) : a.el, l = o ? null : s, { i: f, r: p } = e, m = n && n.r, _ = f.refs === t ? f.refs = {} : f.refs, v = f.setupState, y = /* @__PURE__ */ V(v), b = v === t ? i : (e) => Qn(_, e) ? !1 : u(y, e), x = (e, t) => !(t && Qn(_, t));
	if (m != null && m !== p) {
		if (tr(n), g(m)) _[m] = null, b(m) && (v[m] = null);
		else if (/* @__PURE__ */ zt(m)) {
			let e = n;
			x(m, e.k) && (m.value = null), e.k && (_[e.k] = null);
		}
	}
	if (h(p)) $t(p, f, 12, [l, _]);
	else {
		let t = g(p), n = /* @__PURE__ */ zt(p);
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
					i(), $n.delete(e);
				};
				t.id = -1, $n.set(e, t), xi(t, r);
			} else tr(e), i();
		}
	}
}
function tr(e) {
	let t = $n.get(e);
	t && (t.flags |= 8, $n.delete(e));
}
de().requestIdleCallback, de().cancelIdleCallback;
var nr = (e) => !!e.type.__asyncLoader, rr = (e) => e.type.__isKeepAlive;
function ir(e, t) {
	or(e, "a", t);
}
function ar(e, t) {
	or(e, "da", t);
}
function or(e, t, n = sa) {
	let r = e.__wdc ||= () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent;
		}
		return e();
	};
	if (cr(t, r, n), n) {
		let e = n.parent;
		for (; e && e.parent;) rr(e.parent.vnode) && sr(r, t, n, e), e = e.parent;
	}
}
function sr(e, t, n, r) {
	let i = cr(t, e, r, !0);
	hr(() => {
		c(r[t], i);
	}, n);
}
function cr(e, t, n = sa, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			z();
			let i = da(n), a = en(t, n, e, r);
			return i(), Le(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var lr = (e) => (t, n = sa) => {
	(!ma || e === "sp") && cr(e, (...e) => t(...e), n);
}, ur = lr("bm"), dr = lr("m"), fr = lr("bu"), pr = lr("u"), mr = lr("bum"), hr = lr("um"), gr = lr("sp"), _r = lr("rtg"), vr = lr("rtc");
function yr(e, t = sa) {
	cr("ec", e, t);
}
var br = /* @__PURE__ */ Symbol.for("v-ndc");
function W(e, t, n, r) {
	let i, a = n && n[r], o = d(e);
	if (o || g(e)) {
		let n = o && /* @__PURE__ */ Mt(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ Pt(e), s = /* @__PURE__ */ Nt(e), e = Ye(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? Rt(Lt(e[n])) : Lt(e[n]) : e[n], n, void 0, a && a[n]);
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
var xr = (e) => e ? pa(e) ? Ca(e) : xr(e.parent) : null, Sr = /* @__PURE__ */ s(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => xr(e.parent),
	$root: (e) => xr(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => jr(e),
	$forceUpdate: (e) => e.f ||= () => {
		pn(e.update);
	},
	$nextTick: (e) => e.n ||= dn.bind(e.proxy),
	$watch: (e) => jn.bind(e)
}), Cr = (e, n) => e !== t && !e.__isScriptSetup && u(e, n), wr = {
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
			else if (Cr(i, n)) return s[n] = 1, i[n];
			else if (a !== t && u(a, n)) return s[n] = 2, a[n];
			else if (u(o, n)) return s[n] = 3, o[n];
			else if (r !== t && u(r, n)) return s[n] = 4, r[n];
			else Er && (s[n] = 0);
		}
		let d = Sr[n], f, p;
		if (d) return n === "$attrs" && Ke(e.attrs, "get", ""), d(e);
		if ((f = c.__cssModules) && (f = f[n])) return f;
		if (r !== t && u(r, n)) return s[n] = 4, r[n];
		if (p = l.config.globalProperties, u(p, n)) return p[n];
	},
	set({ _: e }, n, r) {
		let { data: i, setupState: a, ctx: o } = e;
		return Cr(a, n) ? (a[n] = r, !0) : i !== t && u(i, n) ? (i[n] = r, !0) : u(e.props, n) || n[0] === "$" && n.slice(1) in e ? !1 : (o[n] = r, !0);
	},
	has({ _: { data: e, setupState: n, accessCache: r, ctx: i, appContext: a, props: o, type: s } }, c) {
		let l;
		return !!(r[c] || e !== t && c[0] !== "$" && u(e, c) || Cr(n, c) || u(o, c) || u(i, c) || u(Sr, c) || u(a.config.globalProperties, c) || (l = s.__cssModules) && l[c]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? u(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
};
function Tr(e) {
	return d(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
var Er = !0;
function Dr(e) {
	let t = jr(e), n = e.proxy, i = e.ctx;
	Er = !1, t.beforeCreate && kr(t.beforeCreate, e, "bc");
	let { data: a, computed: o, methods: s, watch: c, provide: l, inject: u, created: f, beforeMount: p, mounted: m, beforeUpdate: g, updated: _, activated: y, deactivated: b, beforeDestroy: x, beforeUnmount: S, destroyed: C, unmounted: w, render: ee, renderTracked: te, renderTriggered: ne, errorCaptured: T, serverPrefetch: E, expose: re, inheritAttrs: ie, components: ae, directives: oe, filters: se } = t;
	if (u && Or(u, i, null), s) for (let e in s) {
		let t = s[e];
		h(t) && (i[e] = t.bind(n));
	}
	if (a) {
		let t = a.call(n, n);
		v(t) && (e.data = /* @__PURE__ */ Ot(t));
	}
	if (Er = !0, o) for (let e in o) {
		let t = o[e], a = Ta({
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
	if (c) for (let e in c) Ar(c[e], i, n, e);
	if (l) {
		let e = h(l) ? l.call(n) : l;
		Reflect.ownKeys(e).forEach((t) => {
			Tn(t, e[t]);
		});
	}
	f && kr(f, e, "c");
	function D(e, t) {
		d(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (D(ur, p), D(dr, m), D(fr, g), D(pr, _), D(ir, y), D(ar, b), D(yr, T), D(vr, te), D(_r, ne), D(mr, S), D(hr, w), D(gr, E), d(re)) if (re.length) {
		let t = e.exposed ||= {};
		re.forEach((e) => {
			Object.defineProperty(t, e, {
				get: () => n[e],
				set: (t) => n[e] = t,
				enumerable: !0
			});
		});
	} else e.exposed ||= {};
	ee && e.render === r && (e.render = ee), ie != null && (e.inheritAttrs = ie), ae && (e.components = ae), oe && (e.directives = oe), E && Zn(e);
}
function Or(e, t, n = r) {
	d(e) && (e = Ir(e));
	for (let n in e) {
		let r = e[n], i;
		i = v(r) ? "default" in r ? En(r.from || n, r.default, !0) : En(r.from || n) : En(r), /* @__PURE__ */ zt(i) ? Object.defineProperty(t, n, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		}) : t[n] = i;
	}
}
function kr(e, t, n) {
	en(d(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Ar(e, t, n, r) {
	let i = r.includes(".") ? Mn(n, r) : () => n[r];
	if (g(e)) {
		let n = t[e];
		h(n) && kn(i, n);
	} else if (h(e)) kn(i, e.bind(n));
	else if (v(e)) if (d(e)) e.forEach((e) => Ar(e, t, n, r));
	else {
		let r = h(e.handler) ? e.handler.bind(n) : t[e.handler];
		h(r) && kn(i, r, e);
	}
}
function jr(e) {
	let t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: a, config: { optionMergeStrategies: o } } = e.appContext, s = a.get(t), c;
	return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach((e) => Mr(c, e, o, !0)), Mr(c, t, o)), v(t) && a.set(t, c), c;
}
function Mr(e, t, n, r = !1) {
	let { mixins: i, extends: a } = t;
	a && Mr(e, a, n, !0), i && i.forEach((t) => Mr(e, t, n, !0));
	for (let i in t) if (!(r && i === "expose")) {
		let r = Nr[i] || n && n[i];
		e[i] = r ? r(e[i], t[i]) : t[i];
	}
	return e;
}
var Nr = {
	data: Pr,
	props: zr,
	emits: zr,
	methods: Rr,
	computed: Rr,
	beforeCreate: Lr,
	created: Lr,
	beforeMount: Lr,
	mounted: Lr,
	beforeUpdate: Lr,
	updated: Lr,
	beforeDestroy: Lr,
	beforeUnmount: Lr,
	destroyed: Lr,
	unmounted: Lr,
	activated: Lr,
	deactivated: Lr,
	errorCaptured: Lr,
	serverPrefetch: Lr,
	components: Rr,
	directives: Rr,
	watch: Br,
	provide: Pr,
	inject: Fr
};
function Pr(e, t) {
	return t ? e ? function() {
		return s(h(e) ? e.call(this, this) : e, h(t) ? t.call(this, this) : t);
	} : t : e;
}
function Fr(e, t) {
	return Rr(Ir(e), Ir(t));
}
function Ir(e) {
	if (d(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function Lr(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function Rr(e, t) {
	return e ? s(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function zr(e, t) {
	return e ? d(e) && d(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : s(/* @__PURE__ */ Object.create(null), Tr(e), Tr(t ?? {})) : t;
}
function Br(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = s(/* @__PURE__ */ Object.create(null), e);
	for (let r in t) n[r] = Lr(e[r], t[r]);
	return n;
}
function Vr() {
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
var Hr = 0;
function Ur(e, t) {
	return function(n, r = null) {
		h(n) || (n = s({}, n)), r != null && !v(r) && (r = null);
		let i = Vr(), a = /* @__PURE__ */ new WeakSet(), o = [], c = !1, l = i.app = {
			_uid: Hr++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: Da,
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
					let u = l._ceVNode || Ji(n, r);
					return u.appContext = i, s === !0 ? s = "svg" : s === !1 && (s = void 0), o && t ? t(u, a) : e(u, a, s), c = !0, l._container = a, a.__vue_app__ = l, Ca(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				c && (en(o, l._instance, 16), e(null, l._container), delete l._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, l;
			},
			runWithContext(e) {
				let t = Wr;
				Wr = l;
				try {
					return e();
				} finally {
					Wr = t;
				}
			}
		};
		return l;
	};
}
var Wr = null, Gr = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${T(t)}Modifiers`] || e[`${re(t)}Modifiers`];
function Kr(e, n, ...r) {
	if (e.isUnmounted) return;
	let i = e.vnode.props || t, a = r, o = n.startsWith("update:"), s = o && Gr(i, n.slice(7));
	s && (s.trim && (a = r.map((e) => g(e) ? e.trim() : e)), s.number && (a = r.map(ce)));
	let c, l = i[c = ae(n)] || i[c = ae(T(n))];
	!l && o && (l = i[c = ae(re(n))]), l && en(l, e, 6, a);
	let u = i[c + "Once"];
	if (u) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[c]) return;
		e.emitted[c] = !0, en(u, e, 6, a);
	}
}
var qr = /* @__PURE__ */ new WeakMap();
function Jr(e, t, n = !1) {
	let r = n ? qr : t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {}, c = !1;
	if (!h(e)) {
		let r = (e) => {
			let n = Jr(e, t, !0);
			n && (c = !0, s(o, n));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !a && !c ? (v(e) && r.set(e, null), null) : (d(a) ? a.forEach((e) => o[e] = null) : s(o, a), v(e) && r.set(e, o), o);
}
function Yr(e, t) {
	return !e || !a(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), u(e, t[0].toLowerCase() + t.slice(1)) || u(e, re(t)) || u(e, t));
}
function Xr(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: s, attrs: c, emit: l, render: u, renderCache: d, props: f, data: p, setupState: m, ctx: h, inheritAttrs: g } = e, _ = Sn(e), v, y;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			v = $i(u.call(t, e, d, f, m, p, h)), y = c;
		} else {
			let e = t;
			v = $i(e.length > 1 ? e(f, {
				attrs: c,
				slots: s,
				emit: l
			}) : e(f, null)), y = t.props ? c : Zr(c);
		}
	} catch (t) {
		Li.length = 0, tn(t, e, 1), v = Ji(Fi);
	}
	let b = v;
	if (y && g !== !1) {
		let e = Object.keys(y), { shapeFlag: t } = b;
		e.length && t & 7 && (a && e.some(o) && (y = Qr(y, a)), b = Zi(b, y, !1, !0));
	}
	return n.dirs && (b = Zi(b, null, !1, !0), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && Jn(b, n.transition), v = b, Sn(_), v;
}
var Zr = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || a(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, Qr = (e, t) => {
	let n = {};
	for (let r in e) (!o(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
	return n;
};
function $r(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? ei(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (ti(o, r, n) && !Yr(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? o ? ei(r, o, l) : !0 : !!o;
	return !1;
}
function ei(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (ti(t, e, a) && !Yr(n, a)) return !0;
	}
	return !1;
}
function ti(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && v(r) && v(i) ? !N(r, i) : r !== i;
}
function ni({ vnode: e, parent: t }, n) {
	for (; t;) {
		let r = t.subTree;
		if (r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e) (e = t.vnode).el = n, t = t.parent;
		else break;
	}
}
var ri = {}, ii = () => Object.create(ri), ai = (e) => Object.getPrototypeOf(e) === ri;
function oi(e, t, n, r = !1) {
	let i = {}, a = ii();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), ci(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	n ? e.props = r ? i : /* @__PURE__ */ kt(i) : e.type.props ? e.props = i : e.props = a, e.attrs = a;
}
function si(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ V(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (Yr(e.emitsOptions, o)) continue;
				let d = t[o];
				if (c) if (u(a, o)) d !== a[o] && (a[o] = d, l = !0);
				else {
					let t = T(o);
					i[t] = li(c, s, t, d, e, !1);
				}
				else d !== a[o] && (a[o] = d, l = !0);
			}
		}
	} else {
		ci(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) (!t || !u(t, a) && ((r = re(a)) === a || !u(t, r))) && (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = li(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) (!t || !u(t, e)) && (delete a[e], l = !0);
	}
	l && qe(e.attrs, "set", "");
}
function ci(e, n, r, i) {
	let [a, o] = e.propsOptions, s = !1, c;
	if (n) for (let t in n) {
		if (ee(t)) continue;
		let l = n[t], d;
		a && u(a, d = T(t)) ? !o || !o.includes(d) ? r[d] = l : (c ||= {})[d] = l : Yr(e.emitsOptions, t) || (!(t in i) || l !== i[t]) && (i[t] = l, s = !0);
	}
	if (o) {
		let n = /* @__PURE__ */ V(r), i = c || t;
		for (let t = 0; t < o.length; t++) {
			let s = o[t];
			r[s] = li(a, n, s, i[s], e, !u(i, s));
		}
	}
	return s;
}
function li(e, t, n, r, i, a) {
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
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === re(n)) && (r = !0));
	}
	return r;
}
var ui = /* @__PURE__ */ new WeakMap();
function di(e, r, i = !1) {
	let a = i ? ui : r.propsCache, o = a.get(e);
	if (o) return o;
	let c = e.props, l = {}, f = [], p = !1;
	if (!h(e)) {
		let t = (e) => {
			p = !0;
			let [t, n] = di(e, r, !0);
			s(l, t), n && f.push(...n);
		};
		!i && r.mixins.length && r.mixins.forEach(t), e.extends && t(e.extends), e.mixins && e.mixins.forEach(t);
	}
	if (!c && !p) return v(e) && a.set(e, n), n;
	if (d(c)) for (let e = 0; e < c.length; e++) {
		let n = T(c[e]);
		fi(n) && (l[n] = t);
	}
	else if (c) for (let e in c) {
		let t = T(e);
		if (fi(t)) {
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
function fi(e) {
	return e[0] !== "$" && !ee(e);
}
var pi = (e) => e === "_" || e === "_ctx" || e === "$stable", mi = (e) => d(e) ? e.map($i) : [$i(e)], hi = (e, t, n) => {
	if (t._n) return t;
	let r = Cn((...e) => mi(t(...e)), n);
	return r._c = !1, r;
}, gi = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (pi(n)) continue;
		let i = e[n];
		if (h(i)) t[n] = hi(n, i, r);
		else if (i != null) {
			let e = mi(i);
			t[n] = () => e;
		}
	}
}, _i = (e, t) => {
	let n = mi(t);
	e.slots.default = () => n;
}, vi = (e, t, n) => {
	for (let r in t) (n || !pi(r)) && (e[r] = t[r]);
}, yi = (e, t, n) => {
	let r = e.slots = ii();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (vi(r, t, n), n && D(r, "_", e, !0)) : gi(t, r);
	} else t && _i(e, t);
}, bi = (e, n, r) => {
	let { vnode: i, slots: a } = e, o = !0, s = t;
	if (i.shapeFlag & 32) {
		let e = n._;
		e ? r && e === 1 ? o = !1 : vi(a, n, r) : (o = !n.$stable, gi(n, a)), s = n;
	} else n && (_i(e, n), s = { default: 1 });
	if (o) for (let e in a) !pi(e) && s[e] == null && delete a[e];
}, xi = Ni;
function Si(e) {
	return Ci(e);
}
function Ci(e, i) {
	let a = de();
	a.__VUE__ = !0;
	let { insert: o, remove: s, patchProp: c, createElement: l, createText: u, createComment: d, setText: f, setElementText: p, parentNode: m, nextSibling: h, setScopeId: g = r, insertStaticContent: _ } = e, v = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !Gi(e, t) && (r = ge(e), pe(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null);
		let { type: l, ref: u, shapeFlag: d } = t;
		switch (l) {
			case Pi:
				y(e, t, n, r);
				break;
			case Fi:
				b(e, t, n, r);
				break;
			case Ii:
				e ?? x(t, n, r, o);
				break;
			case G:
				ae(e, t, n, r, i, a, o, s, c);
				break;
			default: d & 1 ? w(e, t, n, r, i, a, o, s, c) : d & 6 ? oe(e, t, n, r, i, a, o, s, c) : (d & 64 || d & 128) && l.process(e, t, n, r, i, a, o, s, c, _e);
		}
		u != null && i ? er(u, e && e.ref, a, t || e, !t) : u == null && e && e.ref != null && er(e.ref, null, a, e, !0);
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
				n && n._beginPatch(), E(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, te = (e, t, n, r, i, a, s, u) => {
		let d, f, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (d = e.el = l(e.type, a, m && m.is, m), h & 8 ? p(d, e.children) : h & 16 && T(e.children, d, null, r, i, wi(e, a), s, u), _ && wn(e, null, r, "created"), ne(d, e, e.scopeId, s, r), m) {
			for (let e in m) e !== "value" && !ee(e) && c(d, e, null, m[e], a, r);
			"value" in m && c(d, "value", null, m.value, a), (f = m.onVnodeBeforeMount) && ra(f, r, e);
		}
		_ && wn(e, null, r, "beforeMount");
		let v = Ei(i, g);
		v && g.beforeEnter(d), o(d, t, n), ((f = m && m.onVnodeMounted) || v || _) && xi(() => {
			f && ra(f, r, e), v && g.enter(d), _ && wn(e, null, r, "mounted");
		}, i);
	}, ne = (e, t, n, r, i) => {
		if (n && g(e, n), r) for (let t = 0; t < r.length; t++) g(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || Mi(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				ne(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, T = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) v(null, e[l] = s ? ea(e[l]) : $i(e[l]), t, n, r, i, a, o, s);
	}, E = (e, n, r, i, a, o, s) => {
		let l = n.el = e.el, { patchFlag: u, dynamicChildren: d, dirs: f } = n;
		u |= e.patchFlag & 16;
		let m = e.props || t, h = n.props || t, g;
		if (r && Ti(r, !1), (g = h.onVnodeBeforeUpdate) && ra(g, r, n, e), f && wn(n, e, r, "beforeUpdate"), r && Ti(r, !0), (m.innerHTML && h.innerHTML == null || m.textContent && h.textContent == null) && p(l, ""), d ? re(e.dynamicChildren, d, l, r, i, wi(n, a), o) : s || O(e, n, l, null, r, i, wi(n, a), o, !1), u > 0) {
			if (u & 16) ie(l, m, h, r, a);
			else if (u & 2 && m.class !== h.class && c(l, "class", null, h.class, a), u & 4 && c(l, "style", m.style, h.style, a), u & 8) {
				let e = n.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let n = e[t], i = m[n], o = h[n];
					(o !== i || n === "value") && c(l, n, i, o, a, r);
				}
			}
			u & 1 && e.children !== n.children && p(l, n.children);
		} else !s && d == null && ie(l, m, h, r, a);
		((g = h.onVnodeUpdated) || f) && xi(() => {
			g && ra(g, r, n, e), f && wn(n, e, r, "updated");
		}, i);
	}, re = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s];
			v(c, l, c.el && (c.type === G || !Gi(c, l) || c.shapeFlag & 198) ? m(c.el) : n, null, r, i, a, o, !0);
		}
	}, ie = (e, n, r, i, a) => {
		if (n !== r) {
			if (n !== t) for (let t in n) !ee(t) && !(t in r) && c(e, t, n[t], null, a, i);
			for (let t in r) {
				if (ee(t)) continue;
				let o = r[t], s = n[t];
				o !== s && t !== "value" && c(e, t, s, o, a, i);
			}
			"value" in r && c(e, "value", n.value, r.value, a);
		}
	}, ae = (e, t, n, r, i, a, s, c, l) => {
		let d = t.el = e ? e.el : u(""), f = t.anchor = e ? e.anchor : u(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (c = c ? c.concat(h) : h), e == null ? (o(d, n, r), o(f, n, r), T(t.children || [], n, f, i, a, s, c, l)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (re(e.dynamicChildren, m, n, i, a, s, c), (t.key != null || i && t === i.subTree) && Di(e, t, !0)) : O(e, t, n, f, i, a, s, c, l);
	}, oe = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : D(t, n, r, i, a, o, c) : ce(e, t, c);
	}, D = (e, t, n, r, i, a, o) => {
		let s = e.component = oa(e, r, i);
		if (rr(e) && (s.ctx.renderer = _e), ha(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, le, o), !e.el) {
				let r = s.subTree = Ji(Fi);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else le(s, e, t, n, i, a, o);
	}, ce = (e, t, n) => {
		let r = t.component = e.component;
		if ($r(e, t, n)) if (r.asyncDep && !r.asyncResolved) {
			ue(r, t, n);
			return;
		} else r.next = t, r.update();
		else t.el = e.el, r.vnode = t;
	}, le = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = ki(e);
					if (n) {
						t && (t.el = c.el, ue(e, t, o)), n.asyncDep.then(() => {
							xi(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, d;
				Ti(e, !1), t ? (t.el = c.el, ue(e, t, o)) : t = c, n && se(n), (d = t.props && t.props.onVnodeBeforeUpdate) && ra(d, s, t, c), Ti(e, !0);
				let f = Xr(e), p = e.subTree;
				e.subTree = f, v(p, f, m(p.el), ge(p), e, i, a), t.el = f.el, u === null && ni(e, f.el), r && xi(r, i), (d = t.props && t.props.onVnodeUpdated) && xi(() => ra(d, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = nr(t);
				if (Ti(e, !1), l && se(l), !m && (o = c && c.onVnodeBeforeMount) && ra(o, d, t), Ti(e, !0), s && ve) {
					let t = () => {
						e.subTree = Xr(e), ve(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = Xr(e);
					v(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && xi(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					xi(() => ra(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && nr(d.vnode) && d.vnode.shapeFlag & 256) && e.a && xi(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new Ce(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => pn(u), Ti(e, !0), l();
	}, ue = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, si(e, t.props, r, n), bi(e, t.children, n), z(), gn(e), Le();
	}, O = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, u = e ? e.shapeFlag : 0, d = t.children, { patchFlag: f, shapeFlag: m } = t;
		if (f > 0) {
			if (f & 128) {
				A(l, d, n, r, i, a, o, s, c);
				return;
			} else if (f & 256) {
				k(l, d, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (u & 16 && he(l, i, a), d !== l && p(n, d)) : u & 16 ? m & 16 ? A(l, d, n, r, i, a, o, s, c) : he(l, i, a, !0) : (u & 8 && p(n, ""), m & 16 && T(d, n, r, i, a, o, s, c));
	}, k = (e, t, r, i, a, o, s, c, l) => {
		e ||= n, t ||= n;
		let u = e.length, d = t.length, f = Math.min(u, d), p;
		for (p = 0; p < f; p++) {
			let n = t[p] = l ? ea(t[p]) : $i(t[p]);
			v(e[p], n, r, null, a, o, s, c, l);
		}
		u > d ? he(e, a, o, !0, !1, f) : T(t, r, i, a, o, s, c, l, f);
	}, A = (e, t, r, i, a, o, s, c, l) => {
		let u = 0, d = t.length, f = e.length - 1, p = d - 1;
		for (; u <= f && u <= p;) {
			let n = e[u], i = t[u] = l ? ea(t[u]) : $i(t[u]);
			if (Gi(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			u++;
		}
		for (; u <= f && u <= p;) {
			let n = e[f], i = t[p] = l ? ea(t[p]) : $i(t[p]);
			if (Gi(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			f--, p--;
		}
		if (u > f) {
			if (u <= p) {
				let e = p + 1, n = e < d ? t[e].el : i;
				for (; u <= p;) v(null, t[u] = l ? ea(t[u]) : $i(t[u]), r, n, a, o, s, c, l), u++;
			}
		} else if (u > p) for (; u <= f;) pe(e[u], a, o, !0), u++;
		else {
			let m = u, h = u, g = /* @__PURE__ */ new Map();
			for (u = h; u <= p; u++) {
				let e = t[u] = l ? ea(t[u]) : $i(t[u]);
				e.key != null && g.set(e.key, u);
			}
			let _, y = 0, b = p - h + 1, x = !1, S = 0, C = Array(b);
			for (u = 0; u < b; u++) C[u] = 0;
			for (u = m; u <= f; u++) {
				let n = e[u];
				if (y >= b) {
					pe(n, a, o, !0);
					continue;
				}
				let i;
				if (n.key != null) i = g.get(n.key);
				else for (_ = h; _ <= p; _++) if (C[_ - h] === 0 && Gi(n, t[_])) {
					i = _;
					break;
				}
				i === void 0 ? pe(n, a, o, !0) : (C[i - h] = u + 1, i >= S ? S = i : x = !0, v(n, t[i], r, null, a, o, s, c, l), y++);
			}
			let w = x ? Oi(C) : n;
			for (_ = w.length - 1, u = b - 1; u >= 0; u--) {
				let e = h + u, n = t[e], f = t[e + 1], p = e + 1 < d ? f.el || ji(f) : i;
				C[u] === 0 ? v(null, n, r, p, a, o, s, c, l) : x && (_ < 0 || u !== w[_] ? fe(n, r, p, 2) : _--);
			}
		}
	}, fe = (e, t, n, r, i = null) => {
		let { el: a, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) {
			fe(e.component.subTree, t, n, r);
			return;
		}
		if (d & 128) {
			e.suspense.move(t, n, r);
			return;
		}
		if (d & 64) {
			c.move(e, t, n, _e);
			return;
		}
		if (c === G) {
			o(a, t, n);
			for (let e = 0; e < u.length; e++) fe(u[e], t, n, r);
			o(e.anchor, t, n);
			return;
		}
		if (c === Ii) {
			S(e, t, n);
			return;
		}
		if (r !== 2 && d & 1 && l) if (r === 0) l.beforeEnter(a), o(a, t, n), xi(() => l.enter(a), i);
		else {
			let { leave: r, delayLeave: i, afterLeave: c } = l, u = () => {
				e.ctx.isUnmounted ? s(a) : o(a, t, n);
			}, d = () => {
				a._isLeaving && a[Fn](!0), r(a, () => {
					u(), c && c();
				});
			};
			i ? i(a, u, d) : d();
		}
		else o(a, t, n);
	}, pe = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p } = e;
		if (d === -2 && (i = !1), s != null && (z(), er(s, null, n, e, !0), Le()), p != null && (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let m = u & 1 && f, h = !nr(e), g;
		if (h && (g = o && o.onVnodeBeforeUnmount) && ra(g, t, e), u & 6) me(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			m && wn(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, _e, r) : l && !l.hasOnce && (a !== G || d > 0 && d & 64) ? he(l, t, n, !1, !0) : (a === G && d & 384 || !i && u & 16) && he(c, t, n), r && j(e);
		}
		(h && (g = o && o.onVnodeUnmounted) || m) && xi(() => {
			g && ra(g, t, e), m && wn(e, null, t, "unmounted");
		}, n);
	}, j = (e) => {
		let { type: t, el: n, anchor: r, transition: i } = e;
		if (t === G) {
			M(n, r);
			return;
		}
		if (t === Ii) {
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
	}, M = (e, t) => {
		let n;
		for (; e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, me = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		Ai(c), Ai(l), r && se(r), i.stop(), a && (a.flags |= 8, pe(o, e, t, n)), s && xi(s, t), xi(() => {
			e.isUnmounted = !0;
		}, t);
	}, he = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) pe(e[o], t, n, r, i);
	}, ge = (e) => {
		if (e.shapeFlag & 6) return ge(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = h(e.anchor || e.el), n = t && t[Nn];
		return n ? h(n) : t;
	}, N = !1, P = (e, t, n) => {
		let r;
		e == null ? t._vnode && (pe(t._vnode, null, null, !0), r = t._vnode.component) : v(t._vnode || null, e, t, null, null, null, n), t._vnode = e, N ||= (N = !0, gn(r), _n(), !1);
	}, _e = {
		p: v,
		um: pe,
		m: fe,
		r: j,
		mt: D,
		mc: T,
		pc: O,
		pbc: re,
		n: ge,
		o: e
	}, F, ve;
	return i && ([F, ve] = i(_e)), {
		render: P,
		hydrate: F,
		createApp: Ur(P, F)
	};
}
function wi({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Ti({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Ei(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Di(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (d(r) && d(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = ea(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && Di(t, a)), a.type === Pi && (a.patchFlag === -1 && (a = i[e] = ea(a)), a.el = t.el), a.type === Fi && !a.el && (a.el = t.el);
	}
}
function Oi(e) {
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
function ki(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : ki(t);
}
function Ai(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function ji(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? ji(t.subTree) : null;
}
var Mi = (e) => e.__isSuspense;
function Ni(e, t) {
	t && t.pendingBranch ? d(e) ? t.effects.push(...e) : t.effects.push(e) : hn(e);
}
var G = /* @__PURE__ */ Symbol.for("v-fgt"), Pi = /* @__PURE__ */ Symbol.for("v-txt"), Fi = /* @__PURE__ */ Symbol.for("v-cmt"), Ii = /* @__PURE__ */ Symbol.for("v-stc"), Li = [], Ri = null;
function K(e = !1) {
	Li.push(Ri = e ? null : []);
}
function zi() {
	Li.pop(), Ri = Li[Li.length - 1] || null;
}
var Bi = 1;
function Vi(e, t = !1) {
	Bi += e, e < 0 && Ri && t && (Ri.hasOnce = !0);
}
function Hi(e) {
	return e.dynamicChildren = Bi > 0 ? Ri || n : null, zi(), Bi > 0 && Ri && Ri.push(e), e;
}
function q(e, t, n, r, i, a) {
	return Hi(J(e, t, n, r, i, a, !0));
}
function Ui(e, t, n, r, i) {
	return Hi(Ji(e, t, n, r, i, !0));
}
function Wi(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function Gi(e, t) {
	return e.type === t.type && e.key === t.key;
}
var Ki = ({ key: e }) => e ?? null, qi = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : g(e) || /* @__PURE__ */ zt(e) || h(e) ? {
	i: bn,
	r: e,
	k: t,
	f: !!n
} : e);
function J(e, t = null, n = null, r = 0, i = null, a = e === G ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && Ki(t),
		ref: t && qi(t),
		scopeId: xn,
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
		ctx: bn
	};
	return s ? (ta(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= g(n) ? 8 : 16), Bi > 0 && !o && Ri && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && Ri.push(c), c;
}
var Ji = Yi;
function Yi(e, t = null, n = null, r = 0, i = null, a = !1) {
	if ((!e || e === br) && (e = Fi), Wi(e)) {
		let r = Zi(e, t, !0);
		return n && ta(r, n), Bi > 0 && !a && Ri && (r.shapeFlag & 6 ? Ri[Ri.indexOf(e)] = r : Ri.push(r)), r.patchFlag = -2, r;
	}
	if (wa(e) && (e = e.__vccOpts), t) {
		t = Xi(t);
		let { class: e, style: n } = t;
		e && !g(e) && (t.class = j(e)), v(n) && (/* @__PURE__ */ Ft(n) && !d(n) && (n = s({}, n)), t.style = O(n));
	}
	let o = g(e) ? 1 : Mi(e) ? 128 : Pn(e) ? 64 : v(e) ? 4 : h(e) ? 2 : 0;
	return J(e, t, n, r, i, o, a, !0);
}
function Xi(e) {
	return e ? /* @__PURE__ */ Ft(e) || ai(e) ? s({}, e) : e : null;
}
function Zi(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? na(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && Ki(l),
		ref: t && t.ref ? n && a ? d(a) ? a.concat(qi(t)) : [a, qi(t)] : qi(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== G ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && Zi(e.ssContent),
		ssFallback: e.ssFallback && Zi(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce
	};
	return c && r && Jn(u, c.clone(u)), u;
}
function Y(e = " ", t = 0) {
	return Ji(Pi, null, e, t);
}
function Qi(e, t) {
	let n = Ji(Ii, null, e);
	return n.staticCount = t, n;
}
function X(e = "", t = !1) {
	return t ? (K(), Ui(Fi, null, e)) : Ji(Fi, null, e);
}
function $i(e) {
	return e == null || typeof e == "boolean" ? Ji(Fi) : d(e) ? Ji(G, null, e.slice()) : Wi(e) ? ea(e) : Ji(Pi, null, String(e));
}
function ea(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : Zi(e);
}
function ta(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (d(t)) n = 16;
	else if (typeof t == "object") if (r & 65) {
		let n = t.default;
		n && (n._c && (n._d = !1), ta(e, n()), n._c && (n._d = !0));
		return;
	} else {
		n = 32;
		let r = t._;
		!r && !ai(t) ? t._ctx = bn : r === 3 && bn && (bn.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
	}
	else h(t) ? (t = {
		default: t,
		_ctx: bn
	}, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [Y(t)]) : n = 8);
	e.children = t, e.shapeFlag |= n;
}
function na(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = j([t.class, r.class]));
		else if (e === "style") t.style = O([t.style, r.style]);
		else if (a(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(d(n) && n.includes(i)) && (t[e] = n ? [].concat(n, i) : i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function ra(e, t, n, r = null) {
	en(e, t, 7, [n, r]);
}
var ia = Vr(), aa = 0;
function oa(e, n, r) {
	let i = e.type, a = (n ? n.appContext : e.appContext) || ia, o = {
		uid: aa++,
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
		scope: new be(!0),
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
		propsOptions: di(i, a),
		emitsOptions: Jr(i, a),
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
	return o.ctx = { _: o }, o.root = n ? n.root : o, o.emit = Kr.bind(null, o), e.ce && e.ce(o), o;
}
var sa = null, ca = () => sa || bn, la, ua;
{
	let e = de(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	la = t("__VUE_INSTANCE_SETTERS__", (e) => sa = e), ua = t("__VUE_SSR_SETTERS__", (e) => ma = e);
}
var da = (e) => {
	let t = sa;
	return la(e), e.scope.on(), () => {
		e.scope.off(), la(t);
	};
}, fa = () => {
	sa && sa.scope.off(), la(null);
};
function pa(e) {
	return e.vnode.shapeFlag & 4;
}
var ma = !1;
function ha(e, t = !1, n = !1) {
	t && ua(t);
	let { props: r, children: i } = e.vnode, a = pa(e);
	oi(e, r, a, t), yi(e, i, n || t);
	let o = a ? ga(e, t) : void 0;
	return t && ua(!1), o;
}
function ga(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, wr);
	let { setup: r } = n;
	if (r) {
		z();
		let n = e.setupContext = r.length > 1 ? Sa(e) : null, i = da(e), a = $t(r, e, 0, [e.props, n]), o = y(a);
		if (Le(), i(), (o || e.sp) && !nr(e) && Zn(e), o) {
			if (a.then(fa, fa), t) return a.then((n) => {
				_a(e, n, t);
			}).catch((t) => {
				tn(t, e, 0);
			});
			e.asyncDep = a;
		} else _a(e, a, t);
	} else ba(e, t);
}
function _a(e, t, n) {
	h(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : v(t) && (e.setupState = Wt(t)), ba(e, n);
}
var va, ya;
function ba(e, t, n) {
	let i = e.type;
	if (!e.render) {
		if (!t && va && !i.render) {
			let t = i.template || jr(e).template;
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
		z();
		try {
			Dr(e);
		} finally {
			Le(), t();
		}
	}
}
var xa = { get(e, t) {
	return Ke(e, "get", ""), e[t];
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
	return e.exposed ? e.exposeProxy ||= new Proxy(Wt(It(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in Sr) return Sr[n](e);
		},
		has(e, t) {
			return t in e || t in Sr;
		}
	}) : e.proxy;
}
function wa(e) {
	return h(e) && "__vccOpts" in e;
}
var Ta = (e, t) => /* @__PURE__ */ Kt(e, t, ma);
function Ea(e, t, n) {
	try {
		Vi(-1);
		let r = arguments.length;
		return r === 2 ? v(t) && !d(t) ? Wi(t) ? Ji(e, null, [t]) : Ji(e, t) : Ji(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && Wi(n) && (n = [n]), Ji(e, t, n));
	} finally {
		Vi(1);
	}
}
var Da = "3.5.30", Oa = void 0, ka = typeof window < "u" && window.trustedTypes;
if (ka) try {
	Oa = /* @__PURE__ */ ka.createPolicy("vue", { createHTML: (e) => e });
} catch {}
var Aa = Oa ? (e) => Oa.createHTML(e) : (e) => e, ja = "http://www.w3.org/2000/svg", Ma = "http://www.w3.org/1998/Math/MathML", Na = typeof document < "u" ? document : null, Pa = Na && /* @__PURE__ */ Na.createElement("template"), Fa = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? Na.createElementNS(ja, e) : t === "mathml" ? Na.createElementNS(Ma, e) : n ? Na.createElement(e, { is: n }) : Na.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => Na.createTextNode(e),
	createComment: (e) => Na.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => Na.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), !(i === a || !(i = i.nextSibling)););
		else {
			Pa.innerHTML = Aa(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = Pa.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, Ia = "transition", La = "animation", Ra = /* @__PURE__ */ Symbol("_vtc"), za = {
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
}, Ba = /* @__PURE__ */ s({}, zn, za), Va = /* @__PURE__ */ ((e) => (e.displayName = "Transition", e.props = Ba, e))((e, { slots: t }) => Ea(Un, Wa(e), t)), Ha = (e, t = []) => {
	d(e) ? e.forEach((e) => e(...t)) : e && e(...t);
}, Ua = (e) => e ? d(e) ? e.some((e) => e.length > 1) : e.length > 1 : !1;
function Wa(e) {
	let t = {};
	for (let n in e) n in za || (t[n] = e[n]);
	if (e.css === !1) return t;
	let { name: n = "v", type: r, duration: i, enterFromClass: a = `${n}-enter-from`, enterActiveClass: o = `${n}-enter-active`, enterToClass: c = `${n}-enter-to`, appearFromClass: l = a, appearActiveClass: u = o, appearToClass: d = c, leaveFromClass: f = `${n}-leave-from`, leaveActiveClass: p = `${n}-leave-active`, leaveToClass: m = `${n}-leave-to` } = e, h = Ga(i), g = h && h[0], _ = h && h[1], { onBeforeEnter: v, onEnter: y, onEnterCancelled: b, onLeave: x, onLeaveCancelled: S, onBeforeAppear: C = v, onAppear: w = y, onAppearCancelled: ee = b } = t, te = (e, t, n, r) => {
		e._enterCancelled = r, Ja(e, t ? d : c), Ja(e, t ? u : o), n && n();
	}, ne = (e, t) => {
		e._isLeaving = !1, Ja(e, f), Ja(e, m), Ja(e, p), t && t();
	}, T = (e) => (t, n) => {
		let i = e ? w : y, o = () => te(t, e, n);
		Ha(i, [t, o]), Ya(() => {
			Ja(t, e ? l : a), qa(t, e ? d : c), Ua(i) || Za(t, r, g, o);
		});
	};
	return s(t, {
		onBeforeEnter(e) {
			Ha(v, [e]), qa(e, a), qa(e, o);
		},
		onBeforeAppear(e) {
			Ha(C, [e]), qa(e, l), qa(e, u);
		},
		onEnter: T(!1),
		onAppear: T(!0),
		onLeave(e, t) {
			e._isLeaving = !0;
			let n = () => ne(e, t);
			qa(e, f), e._enterCancelled ? (qa(e, p), to(e)) : (to(e), qa(e, p)), Ya(() => {
				e._isLeaving && (Ja(e, f), qa(e, m), Ua(x) || Za(e, r, _, n));
			}), Ha(x, [e, n]);
		},
		onEnterCancelled(e) {
			te(e, !1, void 0, !0), Ha(b, [e]);
		},
		onAppearCancelled(e) {
			te(e, !0, void 0, !0), Ha(ee, [e]);
		},
		onLeaveCancelled(e) {
			ne(e), Ha(S, [e]);
		}
	});
}
function Ga(e) {
	if (e == null) return null;
	if (v(e)) return [Ka(e.enter), Ka(e.leave)];
	{
		let t = Ka(e);
		return [t, t];
	}
}
function Ka(e) {
	return le(e);
}
function qa(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.add(t)), (e[Ra] || (e[Ra] = /* @__PURE__ */ new Set())).add(t);
}
function Ja(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.remove(t));
	let n = e[Ra];
	n && (n.delete(t), n.size || (e[Ra] = void 0));
}
function Ya(e) {
	requestAnimationFrame(() => {
		requestAnimationFrame(e);
	});
}
var Xa = 0;
function Za(e, t, n, r) {
	let i = e._endId = ++Xa, a = () => {
		i === e._endId && r();
	};
	if (n != null) return setTimeout(a, n);
	let { type: o, timeout: s, propCount: c } = Qa(e, t);
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
function Qa(e, t) {
	let n = window.getComputedStyle(e), r = (e) => (n[e] || "").split(", "), i = r(`${Ia}Delay`), a = r(`${Ia}Duration`), o = $a(i, a), s = r(`${La}Delay`), c = r(`${La}Duration`), l = $a(s, c), u = null, d = 0, f = 0;
	t === Ia ? o > 0 && (u = Ia, d = o, f = a.length) : t === La ? l > 0 && (u = La, d = l, f = c.length) : (d = Math.max(o, l), u = d > 0 ? o > l ? Ia : La : null, f = u ? u === Ia ? a.length : c.length : 0);
	let p = u === Ia && /\b(?:transform|all)(?:,|$)/.test(r(`${Ia}Property`).toString());
	return {
		type: u,
		timeout: d,
		propCount: f,
		hasTransform: p
	};
}
function $a(e, t) {
	for (; e.length < t.length;) e = e.concat(e);
	return Math.max(...t.map((t, n) => eo(t) + eo(e[n])));
}
function eo(e) {
	return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function to(e) {
	return (e ? e.ownerDocument : document).body.offsetHeight;
}
function no(e, t, n) {
	let r = e[Ra];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var ro = /* @__PURE__ */ Symbol("_vod"), io = /* @__PURE__ */ Symbol("_vsh"), ao = {
	name: "show",
	beforeMount(e, { value: t }, { transition: n }) {
		e[ro] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : oo(e, t);
	},
	mounted(e, { value: t }, { transition: n }) {
		n && t && n.enter(e);
	},
	updated(e, { value: t, oldValue: n }, { transition: r }) {
		!t != !n && (r ? t ? (r.beforeEnter(e), oo(e, !0), r.enter(e)) : r.leave(e, () => {
			oo(e, !1);
		}) : oo(e, t));
	},
	beforeUnmount(e, { value: t }) {
		oo(e, t);
	}
};
function oo(e, t) {
	e.style.display = t ? e[ro] : "none", e[io] = !t;
}
var so = /* @__PURE__ */ Symbol(""), co = /(?:^|;)\s*display\s*:/;
function lo(e, t, n) {
	let r = e.style, i = g(n), a = !1;
	if (n && !i) {
		if (t) if (g(t)) for (let e of t.split(";")) {
			let t = e.slice(0, e.indexOf(":")).trim();
			n[t] ?? fo(r, t, "");
		}
		else for (let e in t) n[e] ?? fo(r, e, "");
		for (let e in n) e === "display" && (a = !0), fo(r, e, n[e]);
	} else if (i) {
		if (t !== n) {
			let e = r[so];
			e && (n += ";" + e), r.cssText = n, a = co.test(n);
		}
	} else t && e.removeAttribute("style");
	ro in e && (e[ro] = a ? r.display : "", e[io] && (r.display = "none"));
}
var uo = /\s*!important$/;
function fo(e, t, n) {
	if (d(n)) n.forEach((n) => fo(e, t, n));
	else if (n ??= "", t.startsWith("--")) e.setProperty(t, n);
	else {
		let r = ho(e, t);
		uo.test(n) ? e.setProperty(re(r), n.replace(uo, ""), "important") : e[r] = n;
	}
}
var po = [
	"Webkit",
	"Moz",
	"ms"
], mo = {};
function ho(e, t) {
	let n = mo[t];
	if (n) return n;
	let r = T(t);
	if (r !== "filter" && r in e) return mo[t] = r;
	r = ie(r);
	for (let n = 0; n < po.length; n++) {
		let i = po[n] + r;
		if (i in e) return mo[t] = i;
	}
	return t;
}
var go = "http://www.w3.org/1999/xlink";
function _o(e, t, n, r, i, a = me(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(go, t.slice(6, t.length)) : e.setAttributeNS(go, t, n) : n == null || a && !he(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : _(n) ? String(n) : n);
}
function vo(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? Aa(n) : n);
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
function yo(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function bo(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var xo = /* @__PURE__ */ Symbol("_vei");
function So(e, t, n, r, i = null) {
	let a = e[xo] || (e[xo] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = wo(t);
		r ? yo(e, n, a[t] = Oo(r, i), s) : o && (bo(e, n, o, s), a[t] = void 0);
	}
}
var Co = /(?:Once|Passive|Capture)$/;
function wo(e) {
	let t;
	if (Co.test(e)) {
		t = {};
		let n;
		for (; n = e.match(Co);) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
	}
	return [e[2] === ":" ? e.slice(3) : re(e.slice(2)), t];
}
var To = 0, Eo = /* @__PURE__ */ Promise.resolve(), Do = () => To ||= (Eo.then(() => To = 0), Date.now());
function Oo(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		en(ko(e, n.value), t, 5, [e]);
	};
	return n.value = e, n.attached = Do(), n;
}
function ko(e, t) {
	if (d(t)) {
		let n = e.stopImmediatePropagation;
		return e.stopImmediatePropagation = () => {
			n.call(e), e._stopped = !0;
		}, t.map((e) => (t) => !t._stopped && e && e(t));
	} else return t;
}
var Ao = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, jo = (e, t, n, r, i, s) => {
	let c = i === "svg";
	t === "class" ? no(e, r, c) : t === "style" ? lo(e, n, r) : a(t) ? o(t) || So(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Mo(e, t, r, c)) ? (vo(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && _o(e, t, r, c, s, t !== "value")) : e._isVueCE && (No(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !g(r))) ? vo(e, T(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), _o(e, t, r, c));
};
function Mo(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && Ao(t) && h(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return Ao(t) && g(n) ? !1 : t in e;
}
function No(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = T(t);
	return Array.isArray(n) ? n.some((e) => T(e) === r) : Object.keys(n).some((e) => T(e) === r);
}
var Po = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return d(t) ? (e) => se(t, e) : t;
};
function Fo(e) {
	e.target.composing = !0;
}
function Io(e) {
	let t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var Lo = /* @__PURE__ */ Symbol("_assign");
function Ro(e, t, n) {
	return t && (e = e.trim()), n && (e = ce(e)), e;
}
var Z = {
	created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
		e[Lo] = Po(i);
		let a = r || i.props && i.props.type === "number";
		yo(e, t ? "change" : "input", (t) => {
			t.target.composing || e[Lo](Ro(e.value, n, a));
		}), (n || a) && yo(e, "change", () => {
			e.value = Ro(e.value, n, a);
		}), t || (yo(e, "compositionstart", Fo), yo(e, "compositionend", Io), yo(e, "change", Io));
	},
	mounted(e, { value: t }) {
		e.value = t ?? "";
	},
	beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: i, number: a } }, o) {
		if (e[Lo] = Po(o), e.composing) return;
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? ce(e.value) : e.value, c = t ?? "";
		s !== c && (document.activeElement === e && e.type !== "range" && (r && t === n || i && e.value.trim() === c) || (e.value = c));
	}
}, zo = {
	deep: !0,
	created(e, t, n) {
		e[Lo] = Po(n), yo(e, "change", () => {
			let t = e._modelValue, n = Wo(e), r = e.checked, i = e[Lo];
			if (d(t)) {
				let e = P(t, n), a = e !== -1;
				if (r && !a) i(t.concat(n));
				else if (!r && a) {
					let n = [...t];
					n.splice(e, 1), i(n);
				}
			} else if (p(t)) {
				let e = new Set(t);
				r ? e.add(n) : e.delete(n), i(e);
			} else i(Go(e, r));
		});
	},
	mounted: Bo,
	beforeUpdate(e, t, n) {
		e[Lo] = Po(n), Bo(e, t, n);
	}
};
function Bo(e, { value: t, oldValue: n }, r) {
	e._modelValue = t;
	let i;
	if (d(t)) i = P(t, r.props.value) > -1;
	else if (p(t)) i = t.has(r.props.value);
	else {
		if (t === n) return;
		i = N(t, Go(e, !0));
	}
	e.checked !== i && (e.checked = i);
}
var Vo = {
	created(e, { value: t }, n) {
		e.checked = N(t, n.props.value), e[Lo] = Po(n), yo(e, "change", () => {
			e[Lo](Wo(e));
		});
	},
	beforeUpdate(e, { value: t, oldValue: n }, r) {
		e[Lo] = Po(r), t !== n && (e.checked = N(t, r.props.value));
	}
}, Ho = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		let i = p(t);
		yo(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? ce(Wo(e)) : Wo(e));
			e[Lo](e.multiple ? i ? new Set(t) : t : t[0]), e._assigning = !0, dn(() => {
				e._assigning = !1;
			});
		}), e[Lo] = Po(r);
	},
	mounted(e, { value: t }) {
		Uo(e, t);
	},
	beforeUpdate(e, t, n) {
		e[Lo] = Po(n);
	},
	updated(e, { value: t }) {
		e._assigning || Uo(e, t);
	}
};
function Uo(e, t) {
	let n = e.multiple, r = d(t);
	if (!(n && !r && !p(t))) {
		for (let i = 0, a = e.options.length; i < a; i++) {
			let a = e.options[i], o = Wo(a);
			if (n) if (r) {
				let e = typeof o;
				e === "string" || e === "number" ? a.selected = t.some((e) => String(e) === String(o)) : a.selected = P(t, o) > -1;
			} else a.selected = t.has(o);
			else if (N(Wo(a), t)) {
				e.selectedIndex !== i && (e.selectedIndex = i);
				return;
			}
		}
		!n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
	}
}
function Wo(e) {
	return "_value" in e ? e._value : e.value;
}
function Go(e, t) {
	let n = t ? "_trueValue" : "_falseValue";
	return n in e ? e[n] : t;
}
var Ko = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], qo = {
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
	exact: (e, t) => Ko.some((n) => e[`${n}Key`] && !t.includes(n))
}, Q = (e, t) => {
	if (!e) return e;
	let n = e._withMods ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n, ...r) => {
		for (let e = 0; e < t.length; e++) {
			let r = qo[t[e]];
			if (r && r(n, t)) return;
		}
		return e(n, ...r);
	}));
}, Jo = /* @__PURE__ */ s({ patchProp: jo }, Fa), Yo;
function Xo() {
	return Yo ||= Si(Jo);
}
var Zo = ((...e) => {
	let t = Xo().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = $o(e);
		if (!r) return;
		let i = t._component;
		!h(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, Qo(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
});
function Qo(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function $o(e) {
	return g(e) ? document.querySelector(e) : e;
}
//#endregion
//#region src/seven-days1/bridge.ts
var $ = /* @__PURE__ */ Ot({
	isReady: !1,
	latestMesId: -1,
	mvuDataMap: {}
}), es = () => {
	try {
		if (window.SillyTavern !== void 0) return window.SillyTavern;
		if (window.top && window.top.SillyTavern !== void 0) return window.top.SillyTavern;
		if (window.parent && window.parent.SillyTavern !== void 0) return window.parent.SillyTavern;
	} catch {}
	return null;
}, ts = (e) => {
	let t = es()?.getContext?.();
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
}, ns = (e) => {
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
}, rs = { class: "stb-pm-wrapper" }, is = { class: "stb-pm-header" }, as = { style: {
	display: "flex",
	"flex-direction": "column",
	gap: "5px",
	flex: "1"
} }, os = { class: "stb-pm-location" }, ss = {
	class: "stb-pm-env-col",
	style: {
		"align-items": "flex-start",
		"flex-direction": "row"
	}
}, cs = { class: "stb-pm-tag stb-pm-tag-time" }, ls = { class: "stb-pm-tag stb-pm-tag-weather" }, us = {
	class: "stb-pm-dm-avatar-box",
	title: "观测者正在注视着你..."
}, ds = ["src"], fs = { class: "stb-pm-bgm-container" }, ps = { class: "stb-pm-actions" }, ms = { class: "stb-pm-tabs-container" }, hs = { class: "stb-pm-tab-label" }, gs = ["name"], _s = { class: "stb-pm-tab-content" }, vs = { class: "stb-pm-badges" }, ys = { class: "stb-pm-badge stb-pm-badge-title" }, bs = { class: "stb-pm-badge" }, xs = { class: "stb-pm-badge" }, Ss = { class: "stb-pm-panel" }, Cs = { class: "stb-pm-bar-container" }, ws = { class: "stb-pm-bar-header" }, Ts = { class: "stb-pm-terminal-data" }, Es = { class: "stb-pm-bar-track" }, Ds = { class: "stb-pm-bar-container" }, Os = { class: "stb-pm-bar-header" }, ks = { class: "stb-pm-terminal-data" }, As = { class: "stb-pm-bar-track" }, js = { class: "stb-pm-bar-container" }, Ms = { class: "stb-pm-bar-header" }, Ns = { class: "stb-pm-terminal-data" }, Ps = { class: "stb-pm-bar-track" }, Fs = {
	class: "stb-pm-info-row",
	style: {
		"margin-top": "10px",
		border: "none"
	}
}, Is = {
	class: "stb-pm-terminal-data",
	style: {
		color: "#fff59d",
		"font-size": "16px"
	}
}, Ls = {
	class: "stb-pm-panel",
	style: { "border-left-color": "#ce93d8" }
}, Rs = ["innerHTML"], zs = { class: "stb-pm-panel" }, Bs = { class: "stb-pm-limbs-grid" }, Vs = ["data-status"], Hs = { class: "stb-pm-limb-name" }, Us = { class: "stb-pm-limb-stat" }, Ws = { class: "stb-pm-panel" }, Gs = ["innerHTML"], Ks = { class: "stb-pm-tab-label" }, qs = ["name"], Js = { class: "stb-pm-tab-content" }, Ys = { class: "stb-pm-panel" }, Xs = { class: "stb-pm-stats-grid" }, Zs = { class: "stb-pm-stat-box" }, Qs = { class: "stb-pm-stat-value" }, $s = { class: "stb-pm-stat-box" }, ec = { class: "stb-pm-stat-value" }, tc = { class: "stb-pm-stat-box" }, nc = { class: "stb-pm-stat-value" }, rc = { class: "stb-pm-stat-box" }, ic = { class: "stb-pm-stat-value" }, ac = { class: "stb-pm-stat-box" }, oc = { class: "stb-pm-stat-value" }, sc = { class: "stb-pm-stat-box" }, cc = { class: "stb-pm-stat-value" }, lc = { class: "stb-pm-panel" }, uc = { class: "stb-pm-folder-content stb-pm-terminal-data" }, dc = { class: "stb-pm-folder-content stb-pm-terminal-data" }, fc = { class: "stb-pm-folder-content stb-pm-terminal-data" }, pc = { key: 1 }, mc = { class: "stb-pm-folder-content stb-pm-terminal-data" }, hc = { style: { color: "#ce93d8" } }, gc = { key: 1 }, _c = { class: "stb-pm-panel" }, vc = { class: "stb-pm-folder-content stb-pm-terminal-data" }, yc = { key: 1 }, bc = { class: "stb-pm-tab-label" }, xc = ["name"], Sc = { class: "stb-pm-tab-content" }, Cc = { class: "stb-pm-panel" }, wc = { class: "stb-pm-info-row" }, Tc = { class: "stb-pm-info-value stb-pm-evolution" }, Ec = {
	class: "stb-pm-info-row",
	style: {
		"border-bottom": "none",
		"margin-bottom": "0"
	}
}, Dc = { class: "stb-pm-info-value" }, Oc = { class: "stb-pm-panel" }, kc = { class: "stb-pm-terminal-data stb-pm-terminal-data-red" }, Ac = { key: 1 }, jc = { class: "stb-pm-panel stb-panel-echo" }, Mc = { class: "stb-pm-echo-container" }, Nc = ["innerHTML"], Pc = { class: "stb-pm-tab-label" }, Fc = ["name"], Ic = { class: "stb-pm-tab-content" }, Lc = {
	class: "stb-pm-panel",
	style: { "border-left-color": "#81d4fa" }
}, Rc = { class: "stb-pm-info-row" }, zc = {
	class: "stb-pm-info-value",
	style: {
		color: "#81d4fa",
		"font-weight": "bold"
	}
}, Bc = {
	class: "stb-pm-info-row",
	style: {
		"border-bottom": "none",
		"margin-bottom": "0"
	}
}, Vc = {
	class: "stb-pm-info-value",
	style: {
		color: "#d4af37",
		"font-family": "monospace"
	}
}, Hc = {
	class: "stb-pm-panel",
	style: { "border-left-color": "#ce93d8" }
}, Uc = { class: "stb-pm-info-row" }, Wc = {
	class: "stb-pm-info-value",
	style: { color: "#ce93d8" }
}, Gc = {
	class: "stb-pm-info-row",
	style: {
		"border-bottom": "none",
		"margin-bottom": "0"
	}
}, Kc = { class: "stb-pm-info-value" }, qc = { class: "stb-pm-panel" }, Jc = { class: "stb-pm-terminal-data stb-pm-terminal-data-gold" }, Yc = { key: 1 }, Xc = { class: "stb-pm-tab-label" }, Zc = ["name"], Qc = { class: "stb-pm-tab-content" }, $c = { class: "stb-pm-panel" }, el = { class: "stb-pm-folder-content stb-pm-terminal-data" }, tl = { key: 1 }, nl = { class: "stb-pm-folder-content" }, rl = {
	key: 0,
	style: { background: "rgba(129, 212, 250, 0.1)" }
}, il = { style: { color: "#81d4fa" } }, al = {
	key: 1,
	class: "stb-pm-folder-content stb-pm-terminal-data"
}, ol = { style: {
	color: "#ff6b6b",
	"font-weight": "bold"
} }, sl = { style: {
	color: "#aaa",
	"font-style": "italic",
	margin: "8px 0",
	"border-left": "3px solid #81d4fa",
	"padding-left": "8px",
	background: "rgba(0,0,0,0.3)",
	"padding-top": "4px",
	"padding-bottom": "4px"
} }, cl = { style: { color: "#d4af37" } }, ll = { style: {
	"margin-top": "8px",
	"border-top": "1px dashed #444",
	"padding-top": "8px",
	display: "flex",
	"justify-content": "space-between",
	color: "#ccc"
} }, ul = {
	key: 1,
	class: "stb-pm-terminal-data"
}, dl = { class: "stb-pm-folder-content" }, fl = {
	key: 0,
	style: { background: "rgba(212, 175, 55, 0.1)" }
}, pl = { style: { color: "#d4af37" } }, ml = {
	key: 1,
	class: "stb-pm-folder-content stb-pm-terminal-data"
}, hl = { style: {
	color: "#ff6b6b",
	"font-weight": "bold"
} }, gl = { style: {
	color: "#aaa",
	"font-style": "italic",
	margin: "8px 0",
	"border-left": "3px solid #d4af37",
	"padding-left": "8px",
	background: "rgba(0,0,0,0.3)",
	"padding-top": "4px",
	"padding-bottom": "4px"
} }, _l = { style: { color: "#d4af37" } }, vl = { style: {
	"margin-top": "8px",
	"border-top": "1px dashed #444",
	"padding-top": "8px",
	display: "flex",
	"justify-content": "space-between",
	color: "#ccc"
} }, yl = {
	key: 1,
	class: "stb-pm-terminal-data"
}, bl = { class: "stb-pm-tab-label" }, xl = ["name"], Sl = { class: "stb-pm-tab-content" }, Cl = { class: "stb-pm-panel" }, wl = { class: "stb-pm-info-row" }, Tl = { class: "stb-pm-info-value" }, El = { class: "stb-pm-info-row" }, Dl = { class: "stb-pm-info-value" }, Ol = {
	class: "stb-pm-info-row",
	style: {
		"border-bottom": "none",
		"margin-bottom": "0"
	}
}, kl = {
	class: "stb-pm-info-value",
	style: { color: "#81d4fa" }
}, Al = { class: "stb-pm-panel" }, jl = { class: "stb-pm-folder-content stb-pm-terminal-data stb-pm-terminal-data-red" }, Ml = { key: 1 }, Nl = { class: "stb-pm-tab-label" }, Pl = ["name"], Fl = { class: "stb-pm-tab-content" }, Il = { class: "stb-pm-panel" }, Ll = { class: "stb-pm-info-row" }, Rl = {
	class: "stb-pm-info-value",
	style: { color: "#ff6b6b" }
}, zl = {
	class: "stb-pm-info-row",
	style: {
		"border-bottom": "none",
		"margin-bottom": "0"
	}
}, Bl = { class: "stb-pm-info-value" }, Vl = { class: "stb-pm-panel" }, Hl = { class: "stb-pm-folder-content stb-pm-terminal-data" }, Ul = { key: 1 }, Wl = {
	class: "stb-pm-panel",
	style: { "border-left-color": "#d4af37" }
}, Gl = { class: "stb-pm-rumor-card" }, Kl = ["innerHTML"], ql = { class: "stb-pm-rumor-card" }, Jl = ["innerHTML"], Yl = {
	class: "stb-pm-rumor-card",
	style: { "margin-bottom": "0" }
}, Xl = ["innerHTML"], Zl = { class: "stb-pm-tab-label" }, Ql = ["name"], $l = /* @__PURE__ */ Xn({
	__name: "App",
	props: { mesId: {
		type: Number,
		required: !0
	} },
	setup(e) {
		let t = e, n = /* @__PURE__ */ H("tab1"), r = /* @__PURE__ */ H(null), i = /* @__PURE__ */ H(localStorage.getItem("pm_dm_avatar_v1") || "https://files.catbox.moe/wfjl6u.png"), a = Ta(() => $.mvuDataMap[t.mesId] || {}), o = Ta(() => $.latestMesId === t.mesId), s = Ta(() => Object.keys(a.value).length > 0), c = Ta(() => t.mesId), l = /* @__PURE__ */ H({
			focus: "",
			echo: "",
			status: "",
			rumor1: "",
			rumor2: "",
			rumor3: "",
			bgm: ""
		}), u = /* @__PURE__ */ H(!1), d = Ta(() => {
			let e = a.value?.当前处境 || {};
			return {
				focus: l.value.focus || e.战术聚焦 || "",
				echo: l.value.echo || e.精神回响 || "",
				status: l.value.status || e.特殊状态 || "",
				rumor1: l.value.rumor1 || e.旧巷余声 || "",
				rumor2: l.value.rumor2 || e.暗箱微光 || "",
				rumor3: l.value.rumor3 || e.远钟残响 || "",
				bgm: l.value.bgm || e.环境音轨 || ""
			};
		}), f = () => {
			try {
				let e = (window.top?.SillyTavern?.getContext?.()?.chat || window.SillyTavern?.chat || [])[t.mesId];
				if (e && e.mes) {
					let t = e.mes, n = /<initvar>|pm-master-container|id="pm-app"/i.test(t), r = /<statusbar_data>|战术聚焦[:：]|statusplaceholderimpl/i.test(t);
					if (u.value = !n && r, u.value) {
						let e = t, n = t.match(/<STATUSBAR_DATA>([\s\S]*?)<\/STATUSBAR_DATA>/i);
						n && (e = n[1]);
						let r = [
							"战术聚焦",
							"精神回响",
							"特殊状态",
							"旧巷余声",
							"暗箱微光",
							"远钟残响",
							"环境音轨"
						], i = (t) => {
							let n = r.filter((e) => e !== t).join("|"), i = RegExp(`${t}[:：]\\s*([\\s\\S]*?)(?=(?:${n})[:：]|$)`, "i"), a = e.match(i);
							return a ? a[1].trim() : "";
						};
						l.value = {
							focus: i("战术聚焦"),
							echo: i("精神回响"),
							status: i("特殊状态"),
							rumor1: i("旧巷余声"),
							rumor2: i("暗箱微光"),
							rumor3: i("远钟残响"),
							bgm: i("环境音轨")
						};
					}
				}
			} catch {}
		}, p = (e, t) => {
			let n = Number(e) || 0, r = Number(t) || 1;
			return r === 0 ? "0%" : Math.min(100, Math.max(0, Math.round(n / r * 100))) + "%";
		}, m = (e) => {
			ts(e);
		}, h = (e, t) => {
			if (!r.value) return;
			let n = e, i = t ? "1" : "0";
			if (n.includes("<iframe") || n.includes("<audio")) n = n.replace(/auto=\d/g, `auto=${i}`), t && !n.includes("allow=\"autoplay\"") && (n = n.replace("<iframe", "<iframe allow=\"autoplay\"")), r.value.innerHTML = n;
			else if (n.startsWith("http") || n.startsWith("//")) {
				let e = n;
				e.includes("auto=") ? e = e.replace(/auto=\d/, `auto=${i}`) : e += e.includes("?") ? `&auto=${i}` : `?auto=${i}`, r.value.innerHTML = `<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width="100%" height="86" src="${e}" allow="autoplay"></iframe>`;
			} else r.value.innerHTML = "";
		}, g = () => {
			try {
				let e = (window.top?.document || document).querySelectorAll(".stb-pm-bgm-content");
				e.length > 1 && e.forEach((e) => {
					let n = e.closest(".mes");
					(n ? parseInt(n.getAttribute("mesid") || "-1", 10) : -1) !== t.mesId && (e.querySelectorAll("iframe").forEach((e) => {
						let t = e.getAttribute("src");
						t && t.includes("auto=1") && e.setAttribute("src", t.replace("auto=1", "auto=0"));
					}), e.querySelectorAll("audio").forEach((e) => {
						e.paused || e.pause();
					}));
				});
			} catch {}
		};
		return kn(() => $.mvuDataMap[t.mesId], () => {
			f();
		}, {
			deep: !0,
			immediate: !0
		}), kn([() => d.value.bgm, o], ([e, t]) => {
			e && dn(() => {
				h(e, t), t && g();
			});
		}, { immediate: !0 }), dr(() => {
			f(), o.value && dn(() => g());
		}), (e, t) => U((K(), q("div", rs, [
			J("div", is, [J("div", as, [J("div", os, F(a.value.当前处境?.当前地点 || "未知"), 1), J("div", ss, [J("div", cs, "T+" + F(a.value.当前处境?.累计小时数 || 0) + "H", 1), J("div", ls, F(a.value.当前处境?.当前天象 || "未知"), 1)])]), J("div", us, [J("img", {
				src: i.value,
				class: "stb-pm-dm-avatar",
				onError: t[0] ||= (e) => i.value = "https://files.catbox.moe/wfjl6u.png"
			}, null, 40, ds), t[24] ||= J("div", { class: "stb-pm-dm-label" }, "DM", -1)])]),
			U(J("div", fs, [J("details", {
				open: "",
				onClick: t[1] ||= Q(() => {}, ["stop"])
			}, [t[25] ||= J("summary", null, [J("span", null, "🎵 环境音轨 (BGM)"), J("span", { class: "stb-pm-bgm-arrow" }, "▼")], -1), J("div", {
				ref_key: "bgmContainerRef",
				ref: r,
				class: "stb-pm-bgm-content"
			}, null, 512)])], 512), [[ao, d.value.bgm]]),
			J("div", ps, [J("a", {
				href: "#",
				class: "stb-pm-btn stb-pm-btn-guide",
				onClick: t[2] ||= Q((e) => m("【系统指令：呼唤骰娘】请求向导指引"), ["prevent", "stop"])
			}, "◆ 呼唤观测者"), J("a", {
				href: "#",
				class: "stb-pm-btn stb-pm-btn-mirror",
				onClick: t[3] ||= Q((e) => m("【系统指令：使用镜面发生器】进入心灵镜牢"), ["prevent", "stop"])
			}, "◇ 潜入心灵镜牢")]),
			J("div", ms, [
				J("label", hs, [
					U(J("input", {
						"onUpdate:modelValue": t[4] ||= (e) => n.value = e,
						type: "radio",
						name: "pm-tabs_" + c.value,
						value: "tab1",
						class: "stb-pm-tab-radio"
					}, null, 8, gs), [[Vo, n.value]]),
					t[37] ||= J("div", { class: "stb-tab-btn" }, "观测主屏", -1),
					J("div", _s, [
						J("div", vs, [
							J("div", ys, [t[26] ||= J("strong", null, "Title:", -1), Y(" " + F(a.value.玩家角色?.基础属性?.称号 || "未知"), 1)]),
							J("div", bs, [t[27] ||= J("strong", null, "Lv.", -1), Y(" " + F(a.value.玩家角色?.基础属性?.等级 || 1), 1)]),
							J("div", xs, [t[28] ||= J("strong", null, "Dice:", -1), Y(" " + F(a.value.玩家角色?.基础属性?.骰子点数 || 0), 1)])
						]),
						J("div", Ss, [
							t[33] ||= J("div", { class: "stb-pm-panel-title" }, "Vital Signs", -1),
							J("div", Cs, [J("div", ws, [t[29] ||= J("span", {
								class: "stb-pm-bar-label",
								style: { color: "#ff6b6b" }
							}, "HP", -1), J("span", Ts, F(a.value.玩家角色?.基础属性?.当前HP ?? 0) + " / " + F(a.value.玩家角色?.基础属性?.最大HP ?? 0), 1)]), J("div", Es, [J("div", {
								class: "stb-pm-bar-fill stb-pm-bar-hp",
								style: O({ width: p(a.value.玩家角色?.基础属性?.当前HP, a.value.玩家角色?.基础属性?.最大HP) })
							}, null, 4)])]),
							J("div", Ds, [J("div", Os, [t[30] ||= J("span", {
								class: "stb-pm-bar-label",
								style: { color: "#81d4fa" }
							}, "MP", -1), J("span", ks, F(a.value.玩家角色?.基础属性?.当前MP ?? 0) + " / " + F(a.value.玩家角色?.基础属性?.最大MP ?? 0), 1)]), J("div", As, [J("div", {
								class: "stb-pm-bar-fill stb-pm-bar-mp",
								style: O({ width: p(a.value.玩家角色?.基础属性?.当前MP, a.value.玩家角色?.基础属性?.最大MP) })
							}, null, 4)])]),
							J("div", js, [J("div", Ms, [t[31] ||= J("span", {
								class: "stb-pm-bar-label",
								style: { color: "#81c784" }
							}, "SP", -1), J("span", Ns, F(a.value.玩家角色?.基础属性?.理智值 ?? 0) + " / 20", 1)]), J("div", Ps, [J("div", {
								class: "stb-pm-bar-fill stb-pm-bar-sp",
								style: O({ width: p(a.value.玩家角色?.基础属性?.理智值, 20) })
							}, null, 4)])]),
							J("div", Fs, [t[32] ||= J("span", {
								class: "stb-pm-info-label",
								style: {
									color: "#fbc02d",
									"font-weight": "bold"
								}
							}, "XP (经验值)", -1), J("span", Is, F(a.value.玩家角色?.基础属性?.经验值 ?? 0), 1)])
						]),
						U(J("div", Ls, [t[34] ||= J("div", {
							class: "stb-pm-panel-title",
							style: {
								color: "#ce93d8",
								"border-bottom-color": "rgba(206, 147, 216, 0.3)"
							}
						}, "Special Status", -1), J("div", {
							class: "stb-pm-status-list",
							innerHTML: d.value.status
						}, null, 8, Rs)], 512), [[ao, d.value.status]]),
						J("div", zs, [t[35] ||= J("div", { class: "stb-pm-panel-title" }, "Biometric Scan", -1), J("div", Bs, [(K(), q(G, null, W([
							"头部",
							"胸部",
							"左臂",
							"右臂",
							"左腿",
							"右腿"
						], (e) => J("div", {
							key: e,
							"data-status": a.value.玩家角色?.肢体伤病?.[e] || "完好",
							class: "stb-pm-limb-card"
						}, [J("div", Hs, F(e), 1), J("div", Us, F(a.value.玩家角色?.肢体伤病?.[e] || "完好"), 1)], 8, Vs)), 64))])]),
						U(J("div", Ws, [t[36] ||= J("div", { class: "stb-pm-panel-title" }, "Tactical Focus", -1), J("div", {
							class: "stb-pm-text-block",
							innerHTML: d.value.focus
						}, null, 8, Gs)], 512), [[ao, d.value.focus]])
					])
				]),
				J("label", Ks, [
					U(J("input", {
						"onUpdate:modelValue": t[5] ||= (e) => n.value = e,
						type: "radio",
						name: "pm-tabs_" + c.value,
						value: "tab2",
						class: "stb-pm-tab-radio"
					}, null, 8, qs), [[Vo, n.value]]),
					t[52] ||= J("div", { class: "stb-tab-btn" }, "武装档案", -1),
					J("div", Js, [
						J("div", Ys, [t[44] ||= J("div", { class: "stb-pm-panel-title" }, "Core Attributes", -1), J("div", Xs, [
							J("div", Zs, [t[38] ||= J("span", { class: "stb-pm-stat-label" }, "STR", -1), J("span", Qs, F(a.value.玩家角色?.基础属性?.六维?.力量 || 10), 1)]),
							J("div", $s, [t[39] ||= J("span", { class: "stb-pm-stat-label" }, "DEX", -1), J("span", ec, F(a.value.玩家角色?.基础属性?.六维?.敏捷 || 10), 1)]),
							J("div", tc, [t[40] ||= J("span", { class: "stb-pm-stat-label" }, "CON", -1), J("span", nc, F(a.value.玩家角色?.基础属性?.六维?.体质 || 10), 1)]),
							J("div", rc, [t[41] ||= J("span", { class: "stb-pm-stat-label" }, "INT", -1), J("span", ic, F(a.value.玩家角色?.基础属性?.六维?.智力 || 10), 1)]),
							J("div", ac, [t[42] ||= J("span", { class: "stb-pm-stat-label" }, "WIS", -1), J("span", oc, F(a.value.玩家角色?.基础属性?.六维?.感知 || 10), 1)]),
							J("div", sc, [t[43] ||= J("span", { class: "stb-pm-stat-label" }, "CHA", -1), J("span", cc, F(a.value.玩家角色?.基础属性?.六维?.魅力 || 10), 1)])
						])]),
						J("div", lc, [
							t[49] ||= J("div", { class: "stb-pm-panel-title" }, "Equipped Gear", -1),
							J("details", {
								class: "stb-pm-folder",
								open: "",
								onClick: t[6] ||= Q(() => {}, ["stop"])
							}, [t[45] ||= J("summary", null, [J("span", null, "⚔️ 主武器"), J("span", { class: "stb-pm-folder-arrow" }, "▼")], -1), J("div", uc, F(a.value.玩家角色?.武装战力?.主武器 || "空"), 1)]),
							J("details", {
								class: "stb-pm-folder",
								open: "",
								onClick: t[7] ||= Q(() => {}, ["stop"])
							}, [t[46] ||= J("summary", null, [J("span", null, "🛡️ 防具"), J("span", { class: "stb-pm-folder-arrow" }, "▼")], -1), J("div", dc, F(a.value.玩家角色?.武装战力?.防具 || "空"), 1)]),
							J("details", {
								class: "stb-pm-folder",
								open: "",
								onClick: t[8] ||= Q(() => {}, ["stop"])
							}, [t[47] ||= J("summary", null, [J("span", null, "💍 饰品"), J("span", { class: "stb-pm-folder-arrow" }, "▼")], -1), J("div", fc, [Object.keys(a.value.玩家角色?.武装战力?.饰品 || {}).length > 0 ? (K(!0), q(G, { key: 0 }, W(a.value.玩家角色?.武装战力?.饰品, (e, t) => (K(), q("div", { key: t }, "👉 " + F(t) + ": " + F(e), 1))), 128)) : (K(), q("div", pc, "空"))])]),
							J("details", {
								class: "stb-pm-folder",
								open: "",
								onClick: t[9] ||= Q(() => {}, ["stop"])
							}, [t[48] ||= J("summary", null, [J("span", { style: { color: "#ce93d8" } }, "✨ 技能/战技"), J("span", { class: "stb-pm-folder-arrow" }, "▼")], -1), J("div", mc, [Object.keys(a.value.玩家角色?.武装战力?.技能列表 || {}).length > 0 ? (K(!0), q(G, { key: 0 }, W(a.value.玩家角色?.武装战力?.技能列表, (e, t) => (K(), q("div", {
								key: t,
								style: { "margin-bottom": "5px" }
							}, [J("strong", hc, "[" + F(t) + "]", 1), Y(": " + F(e), 1)]))), 128)) : (K(), q("div", gc, "无"))])])
						]),
						J("div", _c, [t[51] ||= J("div", { class: "stb-pm-panel-title" }, "Inventory", -1), J("details", {
							class: "stb-pm-folder",
							open: "",
							onClick: t[10] ||= Q(() => {}, ["stop"])
						}, [t[50] ||= J("summary", null, [J("span", null, "🎒 背包道具"), J("span", { class: "stb-pm-folder-arrow" }, "▼")], -1), J("div", vc, [Object.keys(a.value.玩家角色?.武装战力?.背包道具 || {}).length > 0 ? (K(!0), q(G, { key: 0 }, W(a.value.玩家角色?.武装战力?.背包道具, (e, t) => (K(), q("div", { key: t }, " 🍱 " + F(t) + " (" + F(e?.数量 || 1) + ") - " + F(e?.描述 || "无"), 1))), 128)) : (K(), q("div", yc, "无"))])])])
					])
				]),
				J("label", bc, [
					U(J("input", {
						"onUpdate:modelValue": t[11] ||= (e) => n.value = e,
						type: "radio",
						name: "pm-tabs_" + c.value,
						value: "tab3",
						class: "stb-pm-tab-radio"
					}, null, 8, xc), [[Vo, n.value]]),
					t[58] ||= J("div", { class: "stb-tab-btn" }, "深层意识", -1),
					J("div", Sc, [
						J("div", Cc, [
							t[55] ||= J("div", { class: "stb-pm-panel-title" }, "Sanity Evolution", -1),
							J("div", wc, [t[53] ||= J("span", { class: "stb-pm-info-label" }, "当前阶段", -1), J("span", Tc, F(a.value.玩家角色?.理智演化?.当前阶段 || "正常"), 1)]),
							J("div", Ec, [t[54] ||= J("span", { class: "stb-pm-info-label" }, "理智稳定性", -1), J("span", Dc, F(a.value.玩家角色?.基础属性?.理智稳定性 || 100) + " / 100", 1)])
						]),
						J("div", Oc, [t[56] ||= J("div", { class: "stb-pm-panel-title" }, "Karma (专属业障)", -1), J("div", kc, [Object.keys(a.value.玩家角色?.基础属性?.专属业障 || {}).length > 0 ? (K(!0), q(G, { key: 0 }, W(a.value.玩家角色?.基础属性?.专属业障, (e, t) => (K(), q("div", { key: t }, "⚡ [" + F(t) + "] " + F(e), 1))), 128)) : (K(), q("div", Ac, "无"))])]),
						U(J("div", jc, [t[57] ||= J("div", {
							class: "stb-pm-panel-title",
							style: {
								color: "#ff6b6b",
								"border-bottom-color": "rgba(255, 107, 107, 0.3)"
							}
						}, "Mental Echo (精神回响)", -1), J("div", Mc, [J("div", {
							class: "stb-pm-echo-text",
							innerHTML: d.value.echo
						}, null, 8, Nc)])], 512), [[ao, d.value.echo]])
					])
				]),
				J("label", Pc, [
					U(J("input", {
						"onUpdate:modelValue": t[12] ||= (e) => n.value = e,
						type: "radio",
						name: "pm-tabs_" + c.value,
						value: "tab4",
						class: "stb-pm-tab-radio"
					}, null, 8, Fc), [[Vo, n.value]]),
					t[72] ||= J("div", { class: "stb-tab-btn" }, "轮回异化", -1),
					J("div", Ic, [
						J("div", Lc, [
							t[61] ||= J("div", {
								class: "stb-pm-panel-title",
								style: {
									color: "#81d4fa",
									"border-bottom-color": "rgba(129, 212, 250, 0.3)"
								}
							}, "Mirror Dungeon", -1),
							J("div", Rc, [t[59] ||= J("span", { class: "stb-pm-info-label" }, "当前层数", -1), J("span", zc, F(a.value.玩家角色?.特殊机制?.心灵镜牢?.当前层数 || 0) + " / 15", 1)]),
							J("div", Bc, [t[60] ||= J("span", { class: "stb-pm-info-label" }, "星光余额", -1), J("span", Vc, F(a.value.玩家角色?.特殊机制?.心灵镜牢?.星光余额 || 0), 1)])
						]),
						J("div", Hc, [
							t[64] ||= J("div", {
								class: "stb-pm-panel-title",
								style: {
									color: "#ce93d8",
									"border-bottom-color": "rgba(206, 147, 216, 0.3)"
								}
							}, "Identity Override", -1),
							J("div", Uc, [t[62] ||= J("span", { class: "stb-pm-info-label" }, "当前人格", -1), J("span", Wc, F(a.value.玩家角色?.特殊机制?.人格覆盖?.当前人格 || "无"), 1)]),
							J("div", Gc, [t[63] ||= J("span", { class: "stb-pm-info-label" }, "记忆混淆度", -1), J("span", Kc, F(a.value.玩家角色?.特殊机制?.人格覆盖?.记忆混淆度 || 0) + " / 100", 1)])
						]),
						J("div", qc, [t[71] ||= J("div", { class: "stb-pm-panel-title" }, "Loop Clues (轮回线索)", -1), J("div", Jc, [
							t[65] ||= J("strong", null, "真相碎片:", -1),
							t[66] ||= J("br", null, null, -1),
							Y(" " + F(Array.isArray(a.value.玩家角色?.轮回线索?.世界真相碎片) && a.value.玩家角色.轮回线索.世界真相碎片.length > 0 ? a.value.玩家角色.轮回线索.世界真相碎片.join(" / ") : "无"), 1),
							t[67] ||= J("br", null, null, -1),
							t[68] ||= J("br", null, null, -1),
							t[69] ||= J("strong", null, "永久创伤:", -1),
							t[70] ||= J("br", null, null, -1),
							Object.keys(a.value.玩家角色?.轮回线索?.永久精神创伤 || {}).length > 0 ? (K(!0), q(G, { key: 0 }, W(a.value.玩家角色?.轮回线索?.永久精神创伤, (e, t) => (K(), q("div", {
								key: t,
								style: { color: "#ff6b6b" }
							}, "⚠️ [" + F(t) + "]: " + F(e), 1))), 128)) : (K(), q("div", Yc, "无"))
						])])
					])
				]),
				J("label", Xc, [
					U(J("input", {
						"onUpdate:modelValue": t[13] ||= (e) => n.value = e,
						type: "radio",
						name: "pm-tabs_" + c.value,
						value: "tab5",
						class: "stb-pm-tab-radio"
					}, null, 8, Zc), [[Vo, n.value]]),
					t[85] ||= J("div", { class: "stb-tab-btn" }, "社交网络", -1),
					J("div", Qc, [J("div", $c, [
						t[84] ||= J("div", { class: "stb-pm-panel-title" }, "Social Network", -1),
						J("details", {
							class: "stb-pm-folder",
							open: "",
							onClick: t[14] ||= Q(() => {}, ["stop"])
						}, [t[73] ||= J("summary", null, [J("span", null, "🏛️ 势力声望"), J("span", { class: "stb-pm-folder-arrow" }, "▼")], -1), J("div", el, [Object.keys(a.value.社交网络?.势力声望 || {}).length > 0 ? (K(!0), q(G, { key: 0 }, W(a.value.社交网络?.势力声望, (e, t) => (K(), q("div", { key: t }, "🏛️ " + F(t) + ": " + F(e ?? 0), 1))), 128)) : (K(), q("div", tl, "无"))])]),
						J("details", {
							class: "stb-pm-folder",
							open: "",
							onClick: t[16] ||= Q(() => {}, ["stop"])
						}, [t[78] ||= J("summary", null, [J("span", null, "👥 核心同伴"), J("span", { class: "stb-pm-folder-arrow" }, "▼")], -1), J("div", nl, [Object.keys(a.value.核心同伴 || {}).length > 0 ? (K(!0), q(G, { key: 0 }, W(a.value.核心同伴, (e, n) => (K(), q("details", {
							key: n,
							class: "stb-pm-folder",
							style: {
								"border-color": "#81d4fa",
								"margin-top": "5px"
							},
							onClick: t[15] ||= Q(() => {}, ["stop"])
						}, [n !== "$meta" && n !== "无" ? (K(), q("summary", rl, [J("span", il, "👥 " + F(n) + " (Lv." + F(e?.等级 ?? 1) + ")", 1), t[74] ||= J("span", { class: "stb-pm-folder-arrow" }, "▼", -1)])) : X("", !0), n !== "$meta" && n !== "无" ? (K(), q("div", al, [
							J("div", ol, "🩸 HP: " + F(e?.当前HP ?? "?") + "/" + F(e?.最大HP ?? "?") + " | 🧠 SP: " + F(e?.理智值 ?? "?"), 1),
							J("div", null, [t[75] ||= J("strong", null, "⚔️ 武器:", -1), Y(" " + F(e?.武器 || "未知"), 1)]),
							J("div", null, [t[76] ||= J("strong", null, "👗 服装:", -1), Y(" " + F(e?.服装 || "未知"), 1)]),
							J("div", null, [t[77] ||= J("strong", null, "✨ 能力:", -1), Y(" " + F(e?.能力 || "未知"), 1)]),
							J("div", sl, "💭 心里话: \"" + F(e?.心里话 || "...") + "\"", 1),
							J("div", cl, "🔒 核心记忆: " + F(e?.核心记忆 || "未知"), 1),
							J("div", ll, [
								J("span", null, "好感: " + F(e?.好感度 ?? 0), 1),
								J("span", null, "恐惧: " + F(e?.恐惧度 ?? 0), 1),
								J("span", null, "信任: " + F(e?.信任度 ?? 0), 1),
								J("span", null, "欲望: " + F(e?.欲望度 ?? 0), 1)
							])
						])) : X("", !0)]))), 128)) : (K(), q("div", ul, "无"))])]),
						J("details", {
							class: "stb-pm-folder",
							open: "",
							onClick: t[18] ||= Q(() => {}, ["stop"])
						}, [t[83] ||= J("summary", null, [J("span", null, "🔗 NPC羁绊"), J("span", { class: "stb-pm-folder-arrow" }, "▼")], -1), J("div", dl, [Object.keys(a.value.社交网络?.NPC羁绊 || {}).length > 0 ? (K(!0), q(G, { key: 0 }, W(a.value.社交网络?.NPC羁绊, (e, n) => (K(), q("details", {
							key: n,
							class: "stb-pm-folder",
							style: {
								"border-color": "#d4af37",
								"margin-top": "5px"
							},
							onClick: t[17] ||= Q(() => {}, ["stop"])
						}, [n !== "$meta" && n !== "无" ? (K(), q("summary", fl, [J("span", pl, "🔗 " + F(n) + " (Lv." + F(e?.等级 ?? "?") + ")", 1), t[79] ||= J("span", { class: "stb-pm-folder-arrow" }, "▼", -1)])) : X("", !0), n !== "$meta" && n !== "无" ? (K(), q("div", ml, [
							J("div", hl, "🩸 HP: " + F(e?.当前HP ?? "?") + "/" + F(e?.最大HP ?? "?"), 1),
							J("div", null, [t[80] ||= J("strong", null, "⚔️ 武器:", -1), Y(" " + F(e?.武器 || "未知"), 1)]),
							J("div", null, [t[81] ||= J("strong", null, "👗 服装:", -1), Y(" " + F(e?.服装 || "未知"), 1)]),
							J("div", null, [t[82] ||= J("strong", null, "✨ 能力:", -1), Y(" " + F(e?.能力 || "未知"), 1)]),
							J("div", gl, "💭 心里话: \"" + F(e?.心里话 || "...") + "\"", 1),
							J("div", _l, "🔒 核心记忆: " + F(e?.核心记忆 || "未知"), 1),
							J("div", vl, [
								J("span", null, "好感: " + F(e?.好感度 ?? 0), 1),
								J("span", null, "恐惧: " + F(e?.恐惧度 ?? 0), 1),
								J("span", null, "信任: " + F(e?.信任度 ?? 0), 1),
								J("span", null, "欲望: " + F(e?.欲望度 ?? 0), 1)
							])
						])) : X("", !0)]))), 128)) : (K(), q("div", yl, "无"))])])
					])])
				]),
				J("label", bl, [
					U(J("input", {
						"onUpdate:modelValue": t[19] ||= (e) => n.value = e,
						type: "radio",
						name: "pm-tabs_" + c.value,
						value: "tab6",
						class: "stb-pm-tab-radio"
					}, null, 8, xl), [[Vo, n.value]]),
					t[92] ||= J("div", { class: "stb-tab-btn" }, "据点收容", -1),
					J("div", Sl, [J("div", Cl, [
						t[89] ||= J("div", { class: "stb-pm-panel-title" }, "Facility Status", -1),
						J("div", wl, [t[86] ||= J("span", { class: "stb-pm-info-label" }, "供电等级", -1), J("span", Tl, F(a.value.据点收容?.设施状态?.供电等级 || "未知"), 1)]),
						J("div", El, [t[87] ||= J("span", { class: "stb-pm-info-label" }, "防御等级", -1), J("span", Dl, "Lv." + F(a.value.据点收容?.设施状态?.防御等级 || 0), 1)]),
						J("div", Ol, [t[88] ||= J("span", { class: "stb-pm-info-label" }, "脑啡肽储量", -1), J("span", kl, F(a.value.据点收容?.资源储备?.脑啡肽储量 || 0), 1)])
					]), J("div", Al, [t[91] ||= J("div", { class: "stb-pm-panel-title" }, "Containment Units", -1), J("details", {
						class: "stb-pm-folder",
						open: "",
						onClick: t[20] ||= Q(() => {}, ["stop"])
					}, [t[90] ||= J("summary", null, [J("span", null, "📦 收容单元列表"), J("span", { class: "stb-pm-folder-arrow" }, "▼")], -1), J("div", jl, [Object.keys(a.value.据点收容?.收容单元 || {}).length > 0 ? (K(!0), q(G, { key: 0 }, W(a.value.据点收容?.收容单元, (e, t) => (K(), q("div", { key: t }, " ⚠️ [" + F(t) + "] 危险:" + F(e?.危险等级 || "未知") + " | 状态:" + F(e?.状态 || "未知"), 1))), 128)) : (K(), q("div", Ml, "无"))])])])])
				]),
				J("label", Nl, [
					U(J("input", {
						"onUpdate:modelValue": t[21] ||= (e) => n.value = e,
						type: "radio",
						name: "pm-tabs_" + c.value,
						value: "tab7",
						class: "stb-pm-tab-radio"
					}, null, 8, Pl), [[Vo, n.value]]),
					t[102] ||= J("div", { class: "stb-tab-btn" }, "任务异闻", -1),
					J("div", Fl, [
						J("div", Il, [
							t[95] ||= J("div", { class: "stb-pm-panel-title" }, "Current Encounter", -1),
							J("div", Ll, [t[93] ||= J("span", { class: "stb-pm-info-label" }, "状态", -1), J("span", Rl, F(a.value.当前处境?.当前遭遇?.状态 || "未知"), 1)]),
							J("div", zl, [t[94] ||= J("span", { class: "stb-pm-info-label" }, "危险度", -1), J("span", Bl, F(a.value.当前处境?.当前遭遇?.危险度 || "未知"), 1)])
						]),
						J("div", Vl, [t[97] ||= J("div", { class: "stb-pm-panel-title" }, "Active Quests", -1), J("details", {
							class: "stb-pm-folder",
							open: "",
							onClick: t[22] ||= Q(() => {}, ["stop"])
						}, [t[96] ||= J("summary", null, [J("span", null, "📜 任务列表"), J("span", { class: "stb-pm-folder-arrow" }, "▼")], -1), J("div", Hl, [Object.keys(a.value.当前处境?.任务列表 || {}).length > 0 ? (K(!0), q(G, { key: 0 }, W(a.value.当前处境?.任务列表, (e, t) => (K(), q("div", { key: t }, " 📌 [" + F(t) + "] 评级:" + F(e?.评级 || "未知") + " | 状态:" + F(e?.状态 || "未知"), 1))), 128)) : (K(), q("div", Ul, "无"))])])]),
						U(J("div", Wl, [
							t[101] ||= J("div", {
								class: "stb-pm-panel-title",
								style: {
									color: "#d4af37",
									"border-bottom-color": "rgba(212, 175, 55, 0.3)"
								}
							}, "Urban Rumors (都市截获)", -1),
							U(J("div", Gl, [t[98] ||= J("div", { class: "stb-pm-rumor-title" }, "旧巷余声", -1), J("div", {
								class: "stb-pm-rumor-text",
								innerHTML: d.value.rumor1
							}, null, 8, Kl)], 512), [[ao, d.value.rumor1]]),
							U(J("div", ql, [t[99] ||= J("div", { class: "stb-pm-rumor-title" }, "暗箱微光", -1), J("div", {
								class: "stb-pm-rumor-text",
								innerHTML: d.value.rumor2
							}, null, 8, Jl)], 512), [[ao, d.value.rumor2]]),
							U(J("div", Yl, [t[100] ||= J("div", { class: "stb-pm-rumor-title" }, "远钟残响", -1), J("div", {
								class: "stb-pm-rumor-text",
								innerHTML: d.value.rumor3
							}, null, 8, Xl)], 512), [[ao, d.value.rumor3]])
						], 512), [[ao, d.value.rumor1 || d.value.rumor2 || d.value.rumor3]])
					])
				]),
				J("label", Zl, [U(J("input", {
					"onUpdate:modelValue": t[23] ||= (e) => n.value = e,
					type: "radio",
					name: "pm-tabs_" + c.value,
					value: "tab8",
					class: "stb-pm-tab-radio"
				}, null, 8, Ql), [[Vo, n.value]]), t[103] ||= Qi("<div class=\"stb-tab-btn\" style=\"color:#d4af37;\">时空枢纽</div><div class=\"stb-pm-tab-content\"><div class=\"stb-pm-panel\" style=\"border-left-color:#d4af37;text-align:center;padding:40px 20px;\"><div style=\"font-size:40px;margin-bottom:15px;\">🗺️</div><div style=\"color:#d4af37;font-size:18px;font-weight:bold;margin-bottom:10px;letter-spacing:2px;\">区域地图与轮回图书室</div><div style=\"color:#888;font-size:14px;line-height:1.6;\"> 空间坐标正在解析中...<br> 此模块将在后续的【世界线更新】中开放。<br> 届时您将能直观地查看 L巢废墟的势力分布，并随时返回图书室查阅已解锁的真相碎片。 </div></div></div>", 2)])
			])
		], 512)), [[ao, o.value && (u.value || s.value)]]);
	}
}), eu = {
	key: 0,
	class: "pm-master-container"
}, tu = ["innerHTML"], nu = {
	key: 0,
	class: "modal-overlay"
}, ru = { class: "modal-content" }, iu = ["value"], au = {
	key: "already_started",
	class: "page-check"
}, ou = {
	key: "check",
	class: "page-check"
}, su = { class: "sys-check-box" }, cu = {
	key: 0,
	class: "status-loading"
}, lu = { class: "sys-actions" }, uu = ["disabled"], du = ["disabled"], fu = {
	key: "transition",
	class: "transition-note"
}, pu = {
	key: "library",
	class: "library-scene"
}, mu = {
	class: "scene-text",
	style: {
		position: "relative",
		"z-index": "1"
	}
}, hu = { class: "highlight-gold" }, gu = {
	key: 2,
	class: "dm-portrait-box"
}, _u = ["src"], vu = {
	class: "dossier-container",
	style: {
		position: "relative",
		"z-index": "1"
	}
}, yu = { class: "dossier-summary" }, bu = { class: "ds-type" }, xu = { class: "ds-name" }, Su = { class: "ds-desc" }, Cu = { class: "dossier-content" }, wu = {
	key: 0,
	class: "cp-quote"
}, Tu = { class: "cp-grid" }, Eu = { class: "cp-box" }, Du = { class: "cp-box-content" }, Ou = { class: "cp-box" }, ku = { class: "cp-box-content" }, Au = { class: "cp-actions" }, ju = ["onClick"], Mu = {
	key: "custom_char",
	class: "custom-char-page"
}, Nu = {
	key: 0,
	class: "roll-screen"
}, Pu = { key: 0 }, Fu = { key: 1 }, Iu = {
	key: 1,
	style: { width: "100%" }
}, Lu = { class: "points-header" }, Ru = { style: {
	"font-size": "0.8em",
	opacity: "0.8"
} }, zu = { style: { color: "white" } }, Bu = { style: { "text-align": "right" } }, Vu = { class: "preset-bar" }, Hu = { style: {
	display: "flex",
	gap: "10px",
	"align-items": "center"
} }, Uu = ["value"], Wu = ["disabled"], Gu = { style: {
	display: "flex",
	gap: "10px",
	"align-items": "center"
} }, Ku = ["disabled"], qu = { class: "shop-container" }, Ju = { class: "shop-section" }, Yu = { class: "image-upload-row" }, Xu = { style: {
	display: "flex",
	"flex-direction": "column",
	"align-items": "center",
	gap: "10px"
} }, Zu = { class: "player-portrait-box" }, Qu = ["src"], $u = {
	key: 1,
	class: "player-portrait-placeholder"
}, ed = { style: {
	display: "flex",
	"flex-direction": "column",
	"align-items": "center",
	gap: "10px"
} }, td = {
	class: "player-portrait-box",
	style: { "border-color": "#8a0303" }
}, nd = ["src"], rd = {
	key: 1,
	class: "player-portrait-placeholder",
	style: { color: "#8a0303" }
}, id = { class: "persona-grid" }, ad = { class: "shop-section" }, od = { class: "stat-grid" }, sd = { class: "stat-row" }, cd = { class: "stat-controls" }, ld = ["disabled"], ud = { class: "stat-val" }, dd = ["disabled"], fd = { class: "stat-row" }, pd = { class: "stat-controls" }, md = ["disabled"], hd = { class: "stat-val" }, gd = { class: "stat-row" }, _d = { class: "stat-controls" }, vd = ["disabled"], yd = { class: "stat-val" }, bd = { class: "stat-row" }, xd = { class: "stat-controls" }, Sd = ["disabled"], Cd = { class: "stat-val" }, wd = ["disabled"], Td = { class: "stat-row" }, Ed = { class: "stat-controls" }, Dd = ["disabled"], Od = { class: "stat-val" }, kd = ["disabled"], Ad = { class: "stat-grid" }, jd = { class: "stat-name" }, Md = { class: "stat-controls" }, Nd = ["disabled", "onClick"], Pd = { class: "stat-val" }, Fd = ["disabled", "onClick"], Id = { class: "shop-section" }, Ld = { class: "diy-list" }, Rd = { class: "diy-header" }, zd = { class: "diy-title" }, Bd = { style: {
	display: "flex",
	"align-items": "center",
	gap: "10px"
} }, Vd = {
	key: 0,
	class: "diy-cost-display"
}, Hd = ["disabled", "onClick"], Ud = ["onClick"], Wd = ["onUpdate:modelValue", "onInput"], Gd = ["onUpdate:modelValue", "onInput"], Kd = ["onUpdate:modelValue", "onChange"], qd = ["value"], Jd = { class: "diy-list" }, Yd = { class: "diy-header" }, Xd = { class: "diy-title" }, Zd = { style: {
	display: "flex",
	"align-items": "center",
	gap: "10px"
} }, Qd = {
	key: 0,
	class: "diy-cost-display"
}, $d = ["disabled", "onClick"], ef = ["onClick"], tf = ["onUpdate:modelValue", "onInput"], nf = ["onUpdate:modelValue", "onInput"], rf = ["onUpdate:modelValue", "onChange"], af = ["value"], of = { class: "diy-list" }, sf = { class: "diy-header" }, cf = { class: "diy-title" }, lf = { style: {
	display: "flex",
	"align-items": "center",
	gap: "10px"
} }, uf = {
	key: 0,
	class: "diy-cost-display"
}, df = ["disabled", "onClick"], ff = ["onClick"], pf = ["onUpdate:modelValue", "onInput"], mf = ["onUpdate:modelValue", "onInput"], hf = ["onUpdate:modelValue", "onChange"], gf = ["value"], _f = { class: "diy-list" }, vf = { class: "diy-header" }, yf = { class: "diy-title" }, bf = { style: {
	display: "flex",
	"align-items": "center",
	gap: "10px"
} }, xf = {
	key: 0,
	class: "diy-cost-display"
}, Sf = ["disabled", "onClick"], Cf = ["onClick"], wf = ["onUpdate:modelValue", "onInput"], Tf = ["onUpdate:modelValue", "onInput"], Ef = ["onUpdate:modelValue", "onChange"], Df = ["value"], Of = { class: "diy-list" }, kf = { class: "diy-header" }, Af = { class: "diy-title" }, jf = { style: {
	display: "flex",
	"align-items": "center",
	gap: "10px"
} }, Mf = {
	key: 0,
	class: "diy-cost-display"
}, Nf = ["disabled", "onClick"], Pf = ["onClick"], Ff = ["onUpdate:modelValue", "onInput"], If = ["onUpdate:modelValue", "onInput"], Lf = ["onUpdate:modelValue", "onChange"], Rf = ["value"], zf = { class: "diy-list" }, Bf = { class: "diy-header" }, Vf = {
	class: "diy-title",
	style: { color: "var(--pm-dark-red)" }
}, Hf = { style: {
	display: "flex",
	"align-items": "center",
	gap: "10px"
} }, Uf = {
	key: 0,
	class: "diy-cost-display refund"
}, Wf = ["disabled", "onClick"], Gf = ["onClick"], Kf = ["onUpdate:modelValue", "onInput"], qf = ["onUpdate:modelValue", "onInput"], Jf = ["onUpdate:modelValue", "onChange"], Yf = ["value"], Xf = { class: "shop-section" }, Zf = { class: "rl-grid" }, Qf = ["onClick"], $f = { class: "rl-type" }, ep = { class: "rl-name" }, tp = { class: "rl-desc" }, np = { class: "rl-cost" }, rp = { class: "rl-grid" }, ip = ["onClick"], ap = { class: "rl-type" }, op = { class: "rl-name" }, sp = { class: "rl-desc" }, cp = { class: "rl-cost" }, lp = { class: "rl-grid" }, up = ["onClick"], dp = { class: "rl-type" }, fp = { class: "rl-name" }, pp = { class: "rl-desc" }, mp = { class: "rl-cost" }, hp = { class: "rl-grid" }, gp = ["onClick"], _p = { class: "rl-type" }, vp = { class: "rl-name" }, yp = { class: "rl-desc" }, bp = { class: "rl-cost refund" }, xp = { class: "shop-section" }, Sp = { style: {
	display: "flex",
	"align-items": "center",
	gap: "10px",
	cursor: "pointer",
	"font-weight": "bold",
	"margin-bottom": "15px"
} }, Cp = {
	key: 0,
	style: {
		display: "grid",
		gap: "15px"
	}
}, wp = { class: "shop-section" }, Tp = { class: "custom-idea-box" }, Ep = { style: {
	"text-align": "center",
	"margin-top": "40px"
} }, Dp = {
	key: 0,
	class: "negative-warning"
}, Op = {
	key: 1,
	style: {
		color: "red",
		"font-weight": "bold",
		"margin-top": "15px"
	}
}, kp = ["disabled"], Ap = {
	key: "settings",
	class: "page-settings"
}, jp = { style: {
	"font-size": "1.2em",
	color: "var(--pm-dark-red)",
	"font-weight": "bold",
	"margin-bottom": "30px"
} }, Mp = { style: { "text-decoration": "underline" } }, Np = { class: "mbti-diff-grid" }, Pp = { class: "mbti-box" }, Fp = { class: "mbti-row" }, Ip = { class: "mbti-row" }, Lp = { class: "mbti-row" }, Rp = { class: "mbti-row" }, zp = { class: "mbti-result" }, Bp = { class: "diff-box" }, Vp = { class: "toggles-grid" }, Hp = ["onClick"], Up = { class: "dm-section" }, Wp = { class: "dm-presets" }, Gp = ["disabled"], Kp = {
	key: 1,
	style: {
		width: "100%",
		"text-align": "center",
		"margin-top": "40px",
		"padding-bottom": "20px",
		position: "relative",
		"z-index": "10"
	}
}, qp = /* @__PURE__ */ Xn({
	__name: "SetupModal",
	setup(e) {
		let t = /* @__PURE__ */ H(!0), n = /* @__PURE__ */ H("check"), r = /* @__PURE__ */ H(!1), i = /* @__PURE__ */ H(!1), a = /* @__PURE__ */ H(!1), o = /* @__PURE__ */ H(!1), s = /* @__PURE__ */ H(""), c = /* @__PURE__ */ H(""), l = /* @__PURE__ */ H(localStorage.getItem("pm_dm_avatar_v1") || "https://files.catbox.moe/wfjl6u.png"), u = /* @__PURE__ */ H(null), d = () => {
			u.value && u.value.click();
		}, f = (e) => {
			let t = e.target.files?.[0];
			if (!t) return;
			let n = new FileReader();
			n.onload = (e) => {
				e.target?.result && (l.value = e.target.result, localStorage.setItem("pm_dm_avatar_v1", l.value));
			}, n.readAsDataURL(t), e.target.value = "";
		}, p = /* @__PURE__ */ H(""), m = /* @__PURE__ */ H(null), h = () => {
			m.value && m.value.click();
		}, g = (e) => {
			let t = e.target.files?.[0];
			if (!t) return;
			let n = new FileReader();
			n.onload = (e) => {
				e.target?.result && (p.value = e.target.result);
			}, n.readAsDataURL(t), e.target.value = "";
		}, _ = () => {
			n.value === "custom_char" ? n.value = "library" : n.value === "settings" && (E.character === "custom" ? n.value = "custom_char" : n.value = "library");
		}, v = /* @__PURE__ */ Ot([{
			id: "dom",
			label: "⚙️ 观测者终端连接",
			status: "loading",
			statusText: "检测中"
		}, {
			id: "mvu",
			label: "🧩 变量引擎 (MVU)",
			status: "loading",
			statusText: "检测中"
		}]), y = /* @__PURE__ */ H({}), b = /* @__PURE__ */ H(""), x = Ta(() => Object.keys(y.value).length > 0), S = Ta(() => v[0].status === "ok"), C = () => {
			window.__PM_GLOBAL_AUDIO && (window.__PM_GLOBAL_AUDIO.pause(), window.__PM_GLOBAL_AUDIO.src = ""), c.value = "", t.value = !1;
		}, w = null, ee = () => {
			i.value = !0, v.forEach((e) => {
				e.status = "loading", e.statusText = "验证中...";
			}), w = setInterval(() => {
				v[0].status = $.isReady ? "ok" : "warn", v[0].statusText = $.isReady ? "Ready" : "等待 DOM", v[1].status = "ok", v[1].statusText = "Active";
				let e = $.mvuDataMap[$.latestMesId];
				if (e && e.玩家角色?.基础属性?.当前HP !== void 0) {
					n.value = "already_started", i.value = !1, w && clearInterval(w);
					return;
				}
				e && e.玩家角色?.轮回线索?.永久精神创伤 && (y.value = e.玩家角色.轮回线索.永久精神创伤), e && e.玩家角色?.基础属性?.称号 && (b.value = e.玩家角色.基础属性.称号), $.isReady && (i.value = !1, w && clearInterval(w));
			}, 500);
		};
		dr(() => {
			ee(), be();
		}), hr(() => {
			w && clearInterval(w);
		});
		let te = () => {
			ee();
		}, ne = () => {
			window.__PM_GLOBAL_AUDIO && (window.__PM_GLOBAL_AUDIO.pause(), window.__PM_GLOBAL_AUDIO.src = ""), c.value = "<iframe frameborder=\"no\" border=\"0\" marginwidth=\"0\" marginheight=\"0\" width=280 height=52 src=\"https://music.163.com/outchain/player?type=3&id=2487793153&auto=1&height=32\" allow=\"autoplay\"></iframe>", n.value = "transition", setTimeout(() => {
				n.value = "library", a.value = !0;
			}, 5e3);
		}, T = [
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
		], E = /* @__PURE__ */ Ot({
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
		}), re = /* @__PURE__ */ H(null), ie = () => {
			re.value && re.value.focus();
		}, ae = Ta(() => {
			if (E.character === "custom") return k.name || "自定义(命运掷骰)";
			let e = T.find((e) => e.id === E.character);
			return e ? e.name : "未知";
		}), oe = (e) => {
			E.character = e, n.value = "settings";
		}, se = /* @__PURE__ */ H("pre-roll"), D = /* @__PURE__ */ H(!1), ce = /* @__PURE__ */ H(0), le = /* @__PURE__ */ H(0), ue = {
			str: "力量",
			dex: "敏捷",
			con: "体质",
			int: "智力",
			wis: "感知",
			cha: "魅力"
		}, de = {
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
		}, O = /* @__PURE__ */ Ot({ ...de }), k = /* @__PURE__ */ Ot({
			name: "",
			race: "",
			profession: "",
			desc: ""
		}), A = /* @__PURE__ */ Ot({
			enabled: !1,
			name: "",
			desc: ""
		}), fe = [
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
		], pe = [
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
		], M = /* @__PURE__ */ Ot({
			traits: [],
			weapons: [],
			armors: [],
			items: [],
			karmas: [],
			skills: []
		}), me = (e) => {
			M[e].push({
				name: "",
				desc: "",
				tier: "",
				cost: 0,
				refund: 0,
				rolled: !1
			});
		}, he = (e, t) => {
			M[e].splice(t, 1);
		}, ge = (e, t) => {
			let n = M[e][t];
			if (!n.tier) return;
			let r = (e === "karmas" ? pe : fe).find((e) => e.label === n.tier);
			if (r) {
				let t = Math.floor(Math.random() * (r.max - r.min + 1)) + r.min;
				e === "karmas" ? n.refund = t : n.cost = t, n.rolled = !0;
			}
		}, N = /* @__PURE__ */ Ot({
			backgrounds: [],
			egos: [],
			karmas: [],
			skills: []
		}), P = /* @__PURE__ */ Ot({
			backgrounds: [],
			egos: [],
			karmas: [],
			skills: []
		}), _e = /* @__PURE__ */ H(""), ve = /* @__PURE__ */ H([]), ye = /* @__PURE__ */ H(-1), I = /* @__PURE__ */ H(""), be = () => {
			try {
				let e = localStorage.getItem("pm_custom_presets_v5");
				e && (ve.value = JSON.parse(e));
			} catch (e) {
				console.warn("无法读取本地预设", e);
			}
		}, xe = () => {
			if (!I.value) return;
			let e = {
				name: I.value,
				stats: { ...O },
				persona: { ...k },
				companion: { ...A },
				diy: JSON.parse(JSON.stringify(M)),
				idea: _e.value,
				selectedItems: {
					backgrounds: [...P.backgrounds],
					egos: [...P.egos],
					karmas: [...P.karmas],
					skills: [...P.skills]
				}
			};
			ve.value.push(e);
			try {
				localStorage.setItem("pm_custom_presets_v5", JSON.stringify(ve.value)), alert("预设保存成功！"), I.value = "", ye.value = ve.value.length - 1;
			} catch {
				alert("保存失败，可能是浏览器限制了本地存储。");
			}
		}, L = () => {
			if (ye.value === -1) return;
			let e = ve.value[ye.value];
			e && (Object.assign(O, e.stats), Object.assign(k, e.persona), Object.assign(A, e.companion), e.diy && [
				"traits",
				"weapons",
				"armors",
				"items",
				"karmas",
				"skills"
			].forEach((t) => {
				M[t].splice(0, M[t].length), e.diy[t] && e.diy[t].length > 0 && M[t].push(...JSON.parse(JSON.stringify(e.diy[t])));
			}), _e.value = e.idea || "", e.selectedItems && (P.backgrounds.splice(0, P.backgrounds.length, ...e.selectedItems.backgrounds || []), P.egos.splice(0, P.egos.length, ...e.selectedItems.egos || []), P.karmas.splice(0, P.karmas.length, ...e.selectedItems.karmas || []), P.skills.splice(0, P.skills.length, ...e.selectedItems.skills || []), e.selectedItems.backgrounds.forEach((e) => {
				N.backgrounds.find((t) => t.name === e.name) || N.backgrounds.push(e);
			}), e.selectedItems.egos.forEach((e) => {
				N.egos.find((t) => t.name === e.name) || N.egos.push(e);
			}), e.selectedItems.karmas.forEach((e) => {
				N.karmas.find((t) => t.name === e.name) || N.karmas.push(e);
			}), e.selectedItems.skills.forEach((e) => {
				N.skills.find((t) => t.name === e.name) || N.skills.push(e);
			})), alert("预设读取成功！"));
		}, Se = () => {
			E.character = "custom", n.value = "custom_char";
		}, Ce = [
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
		], we = [
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
			},
			{
				type: "遗物 / 奇点",
				name: "便携镜面终端",
				desc: "允许在非安全区强行潜入心灵镜牢，但每次使用会永久扣除5点理智上限，并引来异想体的注视。",
				cost: 4e3,
				minQ: 51
			}
		], Te = [
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
		], Ee = [
			{
				type: "基础战技",
				name: "工坊剑术·突刺",
				desc: "消耗3MP。下一次攻击命中率+20%，若命中则附加流血效果。",
				cost: 500,
				minQ: 1
			},
			{
				type: "奇点魔法",
				name: "W公司·空间闪烁",
				desc: "消耗10MP与2SP。瞬间移动至视线内任意位置，下一次攻击必定暴击。若大失败则肢体错位。",
				cost: 3e3,
				minQ: 51
			},
			{
				type: "失落战技",
				name: "色彩秘传·殷红一闪",
				desc: "消耗20MP与5HP。对单体造成毁灭性的5d10物理伤害，无视护甲。使用后陷入一回合虚弱。",
				cost: 7e3,
				minQ: 86
			}
		], De = (e, t, n) => [...e.filter((e) => !e.minQ || n >= e.minQ)].sort(() => .5 - Math.random()).slice(0, t), Oe = () => {
			D.value = !0, setTimeout(() => {
				ce.value = Math.floor(Math.random() * 8999) + 1e3, le.value = Math.floor(Math.random() * 100) + 1, N.backgrounds = De(Ce, 3, le.value), N.egos = De(we, 3, le.value), N.karmas = De(Te, 3, le.value), N.skills = De(Ee, 2, le.value), D.value = !1, se.value = "shopping";
			}, 1500);
		}, ke = Ta(() => {
			let e = le.value;
			return e <= 50 ? "普通 (最高HE级)" : e <= 85 ? "好运 (必出WAW级或强力奇点)" : e <= 95 ? "极运 (必出ALEPH级残片或色彩级背景)" : "深渊注视 (出现完整ALEPH级神装)";
		}), Ae = (e, t) => {
			let n = 0;
			for (let r = e + 1; r <= t; r++) n += r <= 15 ? 50 : 150;
			return n;
		}, je = Ta(() => {
			let e = ce.value;
			return e -= (O.level - de.level) * 100, e -= (O.hp - de.hp) / 10 * 20, e -= (O.mp - de.mp) / 10 * 20, e -= (O.sp - de.sp) * 50, e -= (O.stability - de.stability) / 5 * 30, [
				"str",
				"dex",
				"con",
				"int",
				"wis",
				"cha"
			].forEach((t) => {
				e -= Ae(de[t], O[t]);
			}), P.backgrounds.forEach((t) => e -= t.cost), P.egos.forEach((t) => e -= t.cost), P.karmas.forEach((t) => e += t.refund), P.skills.forEach((t) => e -= t.cost), M.traits.forEach((t) => {
				t.rolled && (e -= t.cost);
			}), M.weapons.forEach((t) => {
				t.rolled && (e -= t.cost);
			}), M.armors.forEach((t) => {
				t.rolled && (e -= t.cost);
			}), M.items.forEach((t) => {
				t.rolled && (e -= t.cost);
			}), M.karmas.forEach((t) => {
				t.rolled && (e += t.refund);
			}), M.skills.forEach((t) => {
				t.rolled && (e -= t.cost);
			}), A.enabled && (e -= 2e3), e;
		}), Me = (e, t) => {
			let n = P[e].findIndex((e) => e.name === t.name);
			n > -1 ? P[e].splice(n, 1) : P[e].push(t);
		}, Ne = (e, t) => P[e].some((e) => e.name === t.name), Pe = Ta(() => P.karmas.length > 0 || M.karmas.some((e) => e.name && e.rolled)), Fe = () => {
			let e = (e) => e.some((e) => e.name && !e.rolled);
			if (e(M.traits) || e(M.weapons) || e(M.armors) || e(M.items) || e(M.karmas) || e(M.skills)) {
				alert("您有自定义的 DIY 项目尚未点击【评估代价 (Roll)】，请先 Roll 点获取命运的标价！");
				return;
			}
			n.value = "settings";
		}, R = /* @__PURE__ */ Ot({
			ei: "I",
			sn: "N",
			tf: "T",
			jp: "J"
		}), Ie = Ta(() => `${R.ei}${R.sn}${R.tf}${R.jp}`), z = /* @__PURE__ */ H("硬核 (Hardcore)"), Le = () => {
			navigator.clipboard.writeText(s.value).catch(() => {}), o.value = !1, C();
		}, Re = async () => {
			if (r.value) return;
			r.value = !0;
			let e = "";
			try {
				let t = Object.entries(E.sensitiveToggles).filter(([e, t]) => t).map(([e]) => e).join(", ") || "完全纯净无敏感内容", i = String(ae.value).replace(/[\r\n]+/g, " "), a = String(E.dmPersonality).replace(/[\r\n]+/g, " "), c = [
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
				], l = c[Math.floor(Math.random() * c.length)], u = "", d = (e) => typeof e == "string" ? e.replace(/\./g, "_") : e, f = {
					$$meta: { recursiveExtensible: !0 },
					当前处境: {
						累计小时数: 0,
						当前天象: "极昼",
						当前地点: l,
						战术聚焦: "命运的齿轮开始转动...",
						精神回响: "未知的低语在废墟深处回荡...",
						特殊状态: "【初入废土】",
						旧巷余声: "风中传来拾荒者的哀嚎...",
						暗箱微光: "似乎有一双眼睛在暗中注视着你...",
						远钟残响: "白夜黑昼的倒计时已然开启...",
						环境音轨: "<iframe frameborder=\"no\" border=\"0\" marginwidth=\"0\" marginheight=\"0\" width=330 height=86 src=\"https://music.163.com/outchain/player?type=3&id=2067232691&auto=1&height=66\" allow=\"autoplay\"></iframe>",
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
							技能列表: { 无: "无" },
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
								BL_GL_BG: !!E.sensitiveToggles.BL_GL_BG,
								异种_Furry: !!E.sensitiveToggles.异种_Furry,
								R18G_猎奇: !!E.sensitiveToggles.R18G_猎奇,
								非自愿_催眠_调教: !!E.sensitiveToggles.非自愿_催眠_调教,
								NTR_NTL: !!E.sensitiveToggles.NTR_NTL,
								卖春_奴隶: !!E.sensitiveToggles.卖春_奴隶
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
							当前HP: 100,
							最大HP: 100,
							等级: 1,
							武器: "无",
							服装: "无",
							饰品: "无",
							能力: "无",
							心里话: "...",
							核心记忆: "无",
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
						理智值: 20,
						理智稳定性: 50,
						肢体状态: "\"完好\"",
						武器: "\"无\"",
						服装: "\"无\"",
						饰品: "\"无\"",
						能力: "\"无\"",
						心里话: "\"...\"",
						核心记忆: "\"无\"",
						战斗状态: "\"正常\"",
						好感度: 0,
						恐惧度: 0,
						信任度: 0,
						欲望度: 0,
						复合状态: "\"无\""
					} },
					系统设置: { BGM配置: { 状态: "开启" } }
				};
				if (E.character === "custom") {
					f.玩家角色.基础属性.等级 = O.level || 1, f.玩家角色.基础属性.最大HP = O.hp || 100, f.玩家角色.基础属性.当前HP = O.hp || 100, f.玩家角色.基础属性.最大MP = O.mp || 50, f.玩家角色.基础属性.当前MP = O.mp || 50, f.玩家角色.基础属性.理智值 = O.sp || 20, f.玩家角色.基础属性.理智稳定性 = O.stability || 50, f.玩家角色.基础属性.骰子点数 = je.value || 0, Object.assign(f.玩家角色.基础属性.六维, {
						力量: O.str || 10,
						敏捷: O.dex || 10,
						体质: O.con || 10,
						智力: O.int || 10,
						感知: O.wis || 10,
						魅力: O.cha || 10
					}), f.玩家角色.基础属性.称号 = k.name || "自定义异端";
					let e = {};
					(P.karmas || []).forEach((t) => {
						t && t.name && (e[d(t.name)] = t.desc);
					}), M.karmas.forEach((t) => {
						t.rolled && t.name && (e[d(t.name)] = t.desc);
					}), Object.keys(e).length > 0 && (f.玩家角色.基础属性.专属业障 = e);
					let t = [];
					P.egos && t.push(...P.egos), M.weapons.forEach((e) => {
						e.rolled && e.name && t.push(e);
					}), t.length > 0 && (f.玩家角色.武装战力.主武器 = `"${B(t[0].name)} [${B(t[0].tier || "未知评级")}]"`, t.slice(1).forEach((e) => {
						f.玩家角色.武装战力.背包道具[d(e.name)] = {
							数量: 1,
							描述: `"[${B(e.tier || "未知评级")}] ${B(e.desc || "未知")}"`
						};
					}));
					let n = [];
					M.armors.forEach((e) => {
						e.rolled && e.name && n.push(e);
					}), n.length > 0 && (f.玩家角色.武装战力.防具 = `"${B(n[0].name)} [${B(n[0].tier || "未知评级")}]"`, n.slice(1).forEach((e) => {
						f.玩家角色.武装战力.背包道具[d(e.name)] = {
							数量: 1,
							描述: `"[${B(e.tier || "未知评级")}] ${B(e.desc || "未知")}"`
						};
					})), M.items.forEach((e) => {
						e.rolled && e.name && (f.玩家角色.武装战力.背包道具[d(e.name)] = {
							数量: 1,
							描述: `"[${B(e.tier || "未知评级")}] ${B(e.desc || "未知")}"`
						});
					});
					let r = [];
					P.skills && r.push(...P.skills), M.skills.forEach((e) => {
						e.rolled && e.name && r.push(e);
					}), r.length > 0 && (delete f.玩家角色.武装战力.技能列表.无, r.forEach((e) => {
						f.玩家角色.武装战力.技能列表[d(e.name)] = `"[${B(e.tier || "未知评级")}] ${B(e.desc || "未知")}"`;
					}));
					let i = [];
					P.backgrounds && P.backgrounds.forEach((e) => i.push(`【${e.name}】: ${e.desc}`)), M.traits.forEach((e) => {
						e.rolled && e.name && i.push(`【${e.name}】(${e.tier}): ${e.desc}`);
					}), A.enabled && A.name && (delete f.核心同伴.无, f.核心同伴[d(A.name)] = {
						类型: "\"自定义\"",
						等级: 1,
						最大HP: 100,
						当前HP: 100,
						最大MP: 50,
						当前MP: 50,
						理智值: 20,
						理智稳定性: 50,
						肢体状态: "\"完好\"",
						武器: "\"无\"",
						服装: "\"无\"",
						饰品: "\"无\"",
						能力: "\"无\"",
						心里话: "\"...\"",
						核心记忆: "\"无\"",
						战斗状态: "\"正常\"",
						好感度: 50,
						恐惧度: 20,
						信任度: 50,
						欲望度: 20,
						复合状态: "\"无\""
					}, u += `\n📌 **同行伙伴：** 【${A.name}】 - ${A.desc}`), t.length > 0 && (u += "\n📌 **携带武器：** " + t.map((e) => `【${e.name}】(${e.tier}): ${e.desc}`).join(" | ")), n.length > 0 && (u += "\n📌 **防具装备：** " + n.map((e) => `【${e.name}】(${e.tier}): ${e.desc}`).join(" | "));
					let a = M.items.filter((e) => e.rolled && e.name).map((e) => `【${e.name}】: ${e.desc}`);
					a.length > 0 && (u += "\n📌 **背包道具：** " + a.join(" | ")), r.length > 0 && (u += "\n📌 **掌握技能：** " + r.map((e) => `【${e.name}】: ${e.desc}`).join(" | ")), u += `\n📌 **种族/职业：** ${k.race || "未知"} / ${k.profession || "未知"}`, u += `\n📌 **外貌与性格：** ${k.desc || "无"}`, i.length > 0 && (u += "\n📌 **专属特质/背景：**\n  - " + i.join("\n  - ")), _e.value && (u += `\n📌 **自定义脑洞：** ${_e.value}`), p.value && (p.value.startsWith("data:image") ? u += "\n📌 **玩家角色立绘参考：** [玩家已上传本地立绘，请根据外貌特征描述进行合理想象]" : u += `\n📌 **玩家角色立绘参考：** ${p.value}`);
					let o = "\n\n🔥 **【DM核心裁定法则（AI必读）】** 🔥\n";
					o += "1. **数值自动补全：** 若玩家在自定义的武器/防具/道具/特质中未明确写出具体的骰子数值（如1d8、1d10+2、护甲减免%等），请DM务必根据其选择的【评级】和世界书规则，在开局描述时自动为其赋予合理的具体数值！\n", o += "2. **合理性惩罚（等价交换）：** DM拥有绝对的解释与修改权！若玩家填写的物品强度与所选【评级】严重不符（例如：选了普通级却写着秒杀全场），或者高评级神装未写明致命代价，DM必须在开局时强行修改其效果，或为其附加极其惨烈的隐藏代价（如：每次使用扣除半管血、引来首脑注视等）。\n", je.value < 0 && (o += `3. **命运负债清算：** 玩家当前透支了 ${Math.abs(je.value)} 点数。透支越多，开局遭遇的厄运越致命。请DM在开局或后续流程中，安排高维存在、黑市商人或极端环境来强行索要这笔债务！\n`), u += o;
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
					}[E.character];
					e && (f.玩家角色.基础属性.称号 = `"${e.name}"`, f.玩家角色.基础属性.最大HP = e.hp, f.玩家角色.基础属性.当前HP = e.currentHp, f.玩家角色.基础属性.最大MP = e.mp, f.玩家角色.基础属性.当前MP = e.currentMp, f.玩家角色.基础属性.理智值 = e.sp, f.玩家角色.基础属性.理智稳定性 = e.stability, f.玩家角色.基础属性.六维 = {
						力量: e.str,
						敏捷: e.dex,
						体质: e.con,
						智力: e.int,
						感知: e.wis,
						魅力: e.cha
					}, f.玩家角色.武装战力.主武器 = e.weapon, f.玩家角色.武装战力.防具 = e.armor, f.玩家角色.基础属性.专属业障 = e.karma);
				}
				u += `\n📌 **心理锚点(MBTI)：** ${Ie.value}\n📌 **世界难度：** ${z.value}`;
				let m = "", h = (e, t = "") => {
					for (let n in e) if (Object.prototype.hasOwnProperty.call(e, n)) {
						if (n === "$$meta") continue;
						let r = t ? `${t}.${n}` : n;
						if (typeof e[n] == "object" && e[n] !== null && !Array.isArray(e[n]) && Object.prototype.toString.call(e[n]) === "[object Object]") h(e[n], r);
						else {
							let t = e[n];
							typeof t == "string" ? !t.startsWith("\"") && !t.startsWith("'") && (t = `'${t.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/</g, "<").replace(/>/g, ">")}'`) : Array.isArray(t) && (t = JSON.stringify(t)), m += `_.set('${r}', ${t});\n`;
						}
					}
				};
				h(JSON.parse(JSON.stringify(f)));
				let g = `\n<UpdateVariable>\n${m}</UpdateVariable>\n`;
				e = `【系统指令：契约已签订，降临开始】\n\n📌 **我的降临姿态：** ${i}\n📌 **初始降临坐标：** ${l}\n📌 **已解禁敏感内容：** ${t}\n📌 **观测者(DM)性格：** ${a}${u}\n\n请根据以上设定，正式开启第一天的废土生存，向我描述初始的周遭环境与我的起始状态！\n${g}`;
				try {
					ts(e), n.value = "already_started", C(), r.value = !1;
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
		}, B = (e) => typeof e == "string" ? e.replace(/"/g, "\\\"").replace(/\n/g, " ") : e;
		return (e, w) => t.value ? (K(), q("div", eu, [
			J("div", {
				class: j(["bgm-player", { "is-visible": a.value }]),
				innerHTML: c.value
			}, null, 10, tu),
			o.value ? (K(), q("div", nu, [J("div", ru, [
				w[49] ||= J("div", { class: "modal-title" }, "⚠️ 沙盒环境限制：请手动复制指令", -1),
				w[50] ||= J("p", { style: {
					color: "#555",
					"margin-bottom": "10px",
					"text-align": "center"
				} }, "由于当前环境的安全策略，无法自动发送。请全选下方文本框内容，复制后粘贴到酒馆聊天框发送。", -1),
				J("textarea", {
					readonly: "",
					value: s.value,
					class: "modal-textarea",
					onFocus: w[0] ||= (e) => e.target?.select()
				}, null, 40, iu),
				J("button", {
					class: "modal-btn",
					onClick: Le
				}, "一键复制并关闭")
			])])) : X("", !0),
			Ji(Va, {
				name: "fade",
				mode: "out-in"
			}, {
				default: Cn(() => [n.value === "already_started" ? (K(), q("div", au, [
					w[51] ||= J("div", { class: "sys-title" }, "旅程已在进行中", -1),
					w[52] ||= J("div", { class: "sys-subtitle" }, "The Journey Has Already Begun", -1),
					w[53] ||= J("p", { style: {
						color: "#555",
						"font-size": "1.2em",
						"text-align": "center",
						"max-width": "600px",
						"line-height": "1.8"
					} }, [
						Y(" 观测者已经记录了你的降临姿态。"),
						J("br"),
						Y(" 请在下方的聊天框中继续你的废土生存，或者使用【系统指令】呼出面板。 ")
					], -1),
					J("button", {
						class: "sys-btn sys-btn-primary",
						style: { "margin-top": "30px" },
						onClick: C
					}, "关闭界面")
				])) : n.value === "check" ? (K(), q("div", ou, [
					w[54] ||= J("div", { class: "sys-title" }, "白夜黑昼七日谈", -1),
					w[55] ||= J("div", { class: "sys-subtitle" }, "The Seven Days of White Night and Dark Day", -1),
					J("div", su, [(K(!0), q(G, null, W(v, (e) => (K(), q("div", {
						key: e.id,
						class: "sys-row"
					}, [J("span", null, F(e.label), 1), J("span", null, [e.status === "loading" ? (K(), q("span", cu, "Checking...")) : (K(), q("span", {
						key: 1,
						class: j(e.status === "ok" ? "status-ok" : "status-warn")
					}, F(e.statusText), 3))])]))), 128))]),
					J("div", lu, [J("button", {
						disabled: i.value,
						class: "sys-btn",
						onClick: Q(te, ["prevent"])
					}, "重新检查", 8, uu), J("button", {
						disabled: !S.value || i.value,
						class: "sys-btn sys-btn-primary",
						onClick: ne
					}, F(S.value ? "开始游戏" : "环境异常或校验中..."), 9, du)])
				])) : n.value === "transition" ? (K(), q("div", fu, [...w[56] ||= [J("div", { class: "note-title" }, "【系统提示：来自梓墨的笔记簿】", -1), J("ul", { class: "note-content" }, [
					J("li", null, [J("strong", null, "RP（玩家输入）："), Y("在很大程度上决定了逆转生死的关键，只小小输入几句话的话旅人sama是不会成为真正的英雄的哦~")]),
					J("li", null, [
						J("strong", null, "BGM自定义："),
						Y("你可以随时发送 "),
						J("code", null, "【系统指令：设置BGM】场景：Boss战，链接："),
						Y(" 来替换内置音乐。")
					]),
					J("li", null, [J("strong", null, "快捷操作："), Y("状态栏顶部的 [呼唤观测者] 和 [潜入心灵镜牢] 按钮可直接点击。")]),
					J("li", null, [
						J("strong", null, "装备管理："),
						Y("在【武装档案】Tab中，点击装备面板的"),
						J("q", null, "“卸下/管理”"),
						Y("按钮，可一键脱下装备或使用背包道具。")
					]),
					J("li", null, [J("strong", null, "极端复杂的世界模拟与情感管理系统："), Y("你所遇见的，都是一个个鲜活的个体，请好好善待她/他/它们吧~")])
				], -1)]])) : n.value === "library" ? (K(), q("div", pu, [J("div", mu, [
					x.value ? (K(), q(G, { key: 1 }, [
						w[64] ||= J("p", null, "骨骼断裂的回音与神经烧焦的幻痛依然在脑海深处轰鸣。但此刻，你只是静静地站在温暖的图书室内，面前是那位戴着单片眼镜的少女。", -1),
						J("p", null, [
							J("q", null, [
								w[60] ||= Y("“死亡并未宽恕你，", -1),
								J("span", hu, F(b.value ? b.value : "伤痕累累的轮回者"), 1),
								w[61] ||= Y("。”", -1)
							]),
							w[62] ||= Y("她微微欠身，目光扫过你灵魂上烙印的扭曲伤痕，", -1),
							w[63] ||= J("q", null, "“看来地狱的法则又一次让你回到了起点。”", -1)
						]),
						(K(!0), q(G, null, W(y.value, (e, t) => (K(), q("div", {
							key: t,
							class: "trauma-text"
						}, "⚠️ 永久精神创伤 [" + F(t) + "]: " + F(e), 1))), 128))
					], 64)) : (K(), q(G, { key: 0 }, [
						w[57] ||= J("p", null, "当眼前的黑暗如潮水般褪去，刺鼻的机油味与血腥味并未如期而至。取而代之的，是纸张的醇香与壁炉中木柴燃烧的噼啪声。你发现自己站在一间古旧而温暖的图书室内，高耸入云的书架上摆满了散发着微光的典籍。", -1),
						w[58] ||= J("p", null, "在房间中央的红木长桌后，坐着一位戴着单片眼镜的少女。她合上手中那本厚重的《至理之书》，抬起头，用一种仿佛能看穿灵魂的目光注视着你。", -1),
						w[59] ||= J("p", null, [
							J("q", null, [
								Y("欢迎来到这座被时间遗忘的藏书阁，"),
								J("span", { class: "highlight-gold" }, "迷途的旅人"),
								Y("。")
							]),
							Y("她微微欠身，嘴角勾起一抹优雅却难以捉摸的弧度，"),
							J("q", null, "我是你的观测者，也是这场剧目的记录员。你可以称呼我为‘跑团娘’。")
						], -1)
					], 64)),
					w[65] ||= J("p", null, [Y("她站起身，指尖在虚空中轻轻一划，周围的书架瞬间化作一片燃烧的废墟幻影。"), J("q", null, [
						Y("你即将踏入的舞台，是L巢的废墟。那里没有童话，只有永无止境的"),
						J("span", { class: "highlight-red" }, "极昼与极夜"),
						Y("，以及七天一次的残酷轮回。你的剧本很简单：活下去。在七天的倒计时结束前，寻找光之种的碎片，或者在清道夫的咀嚼声中化为驱动都市的燃料。")
					])], -1),
					w[66] ||= J("p", null, [J("q", null, "在这里，每一次挥剑都可能伴随着肢体的断裂，每一次绝望都可能引来卡门的低语。但请记住，你遇到的每一个灵魂，都有着自己的恐惧与渴望。你的选择，将决定他们是成为你的利刃，还是刺入你后背的毒牙。")], -1),
					w[67] ||= J("p", null, "幻影散去，她重新坐回桌后，从抽屉里取出了五枚质地各异的档案夹，在桌面上依次排开。", -1),
					w[68] ||= J("p", null, [J("q", null, "那么，演出即将开始。请翻开你的‘档案’，决定你将以何种姿态，降临这片绝望的焦土。")], -1),
					l.value ? (K(), q("div", gu, [J("img", {
						src: l.value,
						class: "dm-portrait-img",
						alt: "DM Sprite",
						onError: w[1] ||= (e) => l.value = ""
					}, null, 40, _u)])) : X("", !0)
				]), J("div", vu, [(K(), q(G, null, W(T, (e) => J("details", {
					key: e.id,
					name: "char-accordion",
					class: "dossier-folder"
				}, [J("summary", yu, [
					J("span", bu, F(e.type), 1),
					J("span", xu, F(e.name), 1),
					J("span", Su, F(e.desc), 1)
				]), J("div", Cu, [
					e.quote ? (K(), q("div", wu, [J("q", null, F(e.quote), 1)])) : X("", !0),
					J("div", Tu, [J("div", Eu, [w[69] ||= J("div", { class: "cp-box-title" }, "核心概念", -1), J("div", Du, F(e.concept), 1)]), J("div", Ou, [w[70] ||= J("div", { class: "cp-box-title" }, "生存难度", -1), J("div", ku, F(e.diff), 1)])]),
					J("div", Au, [J("div", {
						class: "cp-btn-confirm",
						onClick: (t) => oe(e.id)
					}, "确认降临", 8, ju)])
				])])), 64)), J("div", {
					class: "dossier-custom",
					onClick: Se
				}, [...w[71] ||= [J("span", { class: "ds-type" }, "CUSTOM", -1), J("span", { class: "ds-name" }, "命运掷骰 (自定义车卡)", -1)]])])])) : n.value === "custom_char" ? (K(), q("div", Mu, [se.value === "pre-roll" ? (K(), q("div", Nu, [
					w[72] ||= J("h2", {
						class: "settings-title",
						style: { border: "none" }
					}, "命运的掷骰", -1),
					w[73] ||= J("p", { style: {
						color: "#888",
						"margin-bottom": "40px"
					} }, "“在都市中，出生便决定了大部分的命运。来吧，看看你的底牌。”", -1),
					J("div", {
						class: j([{ rolling: D.value }, "roll-btn"]),
						onClick: Oe
					}, [D.value ? (K(), q("span", Fu, "...")) : (K(), q("span", Pu, "ROLL"))], 2)
				])) : X("", !0), se.value === "shopping" ? (K(), q("div", Iu, [
					J("div", Lu, [J("div", null, [w[75] ||= J("h2", null, "黑市终端", -1), J("div", Ru, [w[74] ||= Y("商店品质评级: ", -1), J("span", zu, F(ke.value) + " (Roll: " + F(le.value) + ")", 1)])]), J("div", Bu, [w[76] ||= J("div", { style: {
						"font-size": "0.8em",
						opacity: "0.8"
					} }, "剩余可用点数", -1), J("div", { class: j([{ negative: je.value < 0 }, "points-display"]) }, F(je.value), 3)])]),
					J("div", Vu, [J("div", Hu, [
						w[78] ||= J("span", { style: {
							"font-weight": "bold",
							color: "var(--pm-dark-red)"
						} }, "本地预设:", -1),
						U(J("select", {
							"onUpdate:modelValue": w[2] ||= (e) => ye.value = e,
							class: "preset-select"
						}, [w[77] ||= J("option", { value: -1 }, "-- 选择预设 --", -1), (K(!0), q(G, null, W(ve.value, (e, t) => (K(), q("option", {
							key: t,
							value: t
						}, F(e.name), 9, Uu))), 128))], 512), [[Ho, ye.value]]),
						J("button", {
							disabled: ye.value === -1,
							class: "preset-btn",
							onClick: L
						}, "读取", 8, Wu)
					]), J("div", Gu, [U(J("input", {
						"onUpdate:modelValue": w[3] ||= (e) => I.value = e,
						type: "text",
						class: "preset-input",
						placeholder: "输入预设名称..."
					}, null, 512), [[Z, I.value]]), J("button", {
						disabled: !I.value,
						class: "preset-btn",
						onClick: xe
					}, "保存当前配置", 8, Ku)])]),
					J("div", qu, [
						J("div", Ju, [
							w[79] ||= J("div", { class: "shop-title" }, "身份档案 (Profile)", -1),
							J("div", Yu, [J("div", Xu, [
								J("div", Zu, [p.value ? (K(), q("img", {
									key: 0,
									src: p.value,
									class: "player-portrait-img",
									onError: w[4] ||= (e) => p.value = ""
								}, null, 40, Qu)) : (K(), q("div", $u, "玩家无图"))]),
								J("input", {
									ref_key: "playerFileInput",
									ref: m,
									type: "file",
									accept: "image/*",
									style: { display: "none" },
									onChange: g
								}, null, 544),
								J("button", {
									class: "pm-btn-small",
									onClick: h
								}, "📁 上传玩家立绘"),
								p.value ? (K(), q("button", {
									key: 0,
									class: "pm-btn-small",
									onClick: w[5] ||= (e) => p.value = ""
								}, "🗑️ 清除")) : X("", !0)
							]), J("div", ed, [
								J("div", td, [l.value ? (K(), q("img", {
									key: 0,
									src: l.value,
									class: "player-portrait-img",
									onError: w[6] ||= (e) => l.value = ""
								}, null, 40, nd)) : (K(), q("div", rd, "DM无图"))]),
								J("input", {
									ref_key: "dmFileInput",
									ref: u,
									type: "file",
									accept: "image/*",
									style: { display: "none" },
									onChange: f
								}, null, 544),
								J("button", {
									class: "pm-btn-small",
									style: {
										"border-color": "#8a0303",
										color: "#8a0303"
									},
									onClick: d
								}, "📁 上传DM立绘"),
								l.value ? (K(), q("button", {
									key: 0,
									class: "pm-btn-small",
									style: {
										"border-color": "#8a0303",
										color: "#8a0303"
									},
									onClick: w[7] ||= (e) => l.value = ""
								}, "🗑️ 清除")) : X("", !0)
							])]),
							J("div", id, [
								U(J("input", {
									"onUpdate:modelValue": w[8] ||= (e) => k.name = e,
									type: "text",
									class: "pm-input",
									placeholder: "姓名 (如: 罗兰)"
								}, null, 512), [[Z, k.name]]),
								U(J("input", {
									"onUpdate:modelValue": w[9] ||= (e) => k.race = e,
									type: "text",
									class: "pm-input",
									placeholder: "种族 (如: 人类/改造人)"
								}, null, 512), [[Z, k.race]]),
								U(J("input", {
									"onUpdate:modelValue": w[10] ||= (e) => k.profession = e,
									type: "text",
									class: "pm-input",
									placeholder: "职业 (如: 九阶收尾人)"
								}, null, 512), [[Z, k.profession]])
							]),
							U(J("textarea", {
								"onUpdate:modelValue": w[11] ||= (e) => k.desc = e,
								class: "pm-textarea",
								placeholder: "外貌特征与性格描述... (如: 穿着黑色西装，总是带着疲惫的笑容，极度厌恶背叛)"
							}, null, 512), [[Z, k.desc]]),
							w[80] ||= J("p", { style: {
								color: "#888",
								"font-size": "0.85em",
								"margin-top": "5px"
							} }, "* 开局降临坐标将由命运（系统）在L巢废墟及周边区域中随机空投。", -1)
						]),
						J("div", ad, [
							w[91] ||= J("div", { class: "shop-title" }, "常驻市价表 (基础属性)", -1),
							J("div", od, [
								J("div", sd, [
									w[81] ||= J("span", { class: "stat-name" }, "等级 (Max 30)", -1),
									J("div", cd, [
										J("button", {
											disabled: O.level <= 1,
											class: "stat-btn",
											onClick: w[12] ||= (e) => O.level--
										}, "-", 8, ld),
										J("span", ud, F(O.level), 1),
										J("button", {
											disabled: O.level >= 30,
											class: "stat-btn",
											onClick: w[13] ||= (e) => O.level++
										}, "+", 8, dd)
									]),
									w[82] ||= J("span", { class: "stat-cost" }, "100/级", -1)
								]),
								J("div", fd, [
									w[83] ||= J("span", { class: "stat-name" }, "最大 HP", -1),
									J("div", pd, [
										J("button", {
											disabled: O.hp <= 10,
											class: "stat-btn",
											onClick: w[14] ||= (e) => O.hp -= 10
										}, "-", 8, md),
										J("span", hd, F(O.hp), 1),
										J("button", {
											class: "stat-btn",
											onClick: w[15] ||= (e) => O.hp += 10
										}, "+")
									]),
									w[84] ||= J("span", { class: "stat-cost" }, "20/点", -1)
								]),
								J("div", gd, [
									w[85] ||= J("span", { class: "stat-name" }, "最大 MP", -1),
									J("div", _d, [
										J("button", {
											disabled: O.mp <= 10,
											class: "stat-btn",
											onClick: w[16] ||= (e) => O.mp -= 10
										}, "-", 8, vd),
										J("span", yd, F(O.mp), 1),
										J("button", {
											class: "stat-btn",
											onClick: w[17] ||= (e) => O.mp += 10
										}, "+")
									]),
									w[86] ||= J("span", { class: "stat-cost" }, "20/点", -1)
								]),
								J("div", bd, [
									w[87] ||= J("span", { class: "stat-name" }, "理智值 (SP)", -1),
									J("div", xd, [
										J("button", {
											disabled: O.sp <= 10,
											class: "stat-btn",
											onClick: w[18] ||= (e) => O.sp--
										}, "-", 8, Sd),
										J("span", Cd, F(O.sp), 1),
										J("button", {
											disabled: O.sp >= 50,
											class: "stat-btn",
											onClick: w[19] ||= (e) => O.sp++
										}, "+", 8, wd)
									]),
									w[88] ||= J("span", { class: "stat-cost" }, "50/点", -1)
								]),
								J("div", Td, [
									w[89] ||= J("span", { class: "stat-name" }, "理智稳定性", -1),
									J("div", Ed, [
										J("button", {
											disabled: O.stability <= 10,
											class: "stat-btn",
											onClick: w[20] ||= (e) => O.stability -= 5
										}, "-", 8, Dd),
										J("span", Od, F(O.stability), 1),
										J("button", {
											disabled: O.stability >= 100,
											class: "stat-btn",
											onClick: w[21] ||= (e) => O.stability += 5
										}, "+", 8, kd)
									]),
									w[90] ||= J("span", { class: "stat-cost" }, "30/点", -1)
								])
							]),
							w[92] ||= J("div", {
								class: "shop-title",
								style: {
									"margin-top": "20px",
									"font-size": "1.2em"
								}
							}, "六维属性 (10-15: 50点/级 | 16-20: 150点/级)", -1),
							J("div", Ad, [(K(), q(G, null, W([
								"str",
								"dex",
								"con",
								"int",
								"wis",
								"cha"
							], (e) => J("div", {
								key: e,
								class: "stat-row"
							}, [J("span", jd, F(ue[e]), 1), J("div", Md, [
								J("button", {
									disabled: O[e] <= 10,
									class: "stat-btn",
									onClick: (t) => O[e]--
								}, "-", 8, Nd),
								J("span", Pd, F(O[e]), 1),
								J("button", {
									disabled: O[e] >= 20,
									class: "stat-btn",
									onClick: (t) => O[e]++
								}, "+", 8, Fd)
							])])), 64))])
						]),
						J("div", Id, [
							w[105] ||= J("div", { class: "shop-title" }, "DIY 锻造与深渊契约端口", -1),
							w[106] ||= J("div", { class: "dm-warning" }, [
								J("strong", null, "【跑团娘的善意提醒】"),
								Y(" 想要手搓 ALEPH 级神装？可以。但如果你敢在描述里写“毫无副作用”，我保证你拔剑的瞬间就会被奇点反噬切成肉沫。越强大的力量，需要越扭曲的代价来平衡。"),
								J("br"),
								J("span", { style: { color: "var(--pm-dark-red)" } }, "* 提示：如果你不知道具体的伤害数值（如1d8），可以只写效果，AI 会根据你选择的评级自动为你补全合理的数值。")
							], -1),
							J("div", Ld, [
								w[94] ||= J("div", {
									class: "shop-title",
									style: {
										"font-size": "1.2em",
										border: "none",
										"margin-bottom": "5px",
										"margin-top": "20px"
									}
								}, "自定义技能 / 战技", -1),
								(K(!0), q(G, null, W(M.skills, (e, t) => (K(), q("div", {
									key: "skill" + t,
									class: "diy-box"
								}, [
									J("div", Rd, [J("span", zd, "技能 #" + F(t + 1), 1), J("div", Bd, [
										e.rolled ? (K(), q("span", Vd, "-" + F(e.cost) + " 点", 1)) : X("", !0),
										J("button", {
											disabled: !e.tier,
											class: "diy-roll-btn",
											onClick: (e) => ge("skills", t)
										}, "评估代价 (Roll)", 8, Hd),
										J("button", {
											class: "btn-remove-diy",
											title: "删除",
											onClick: (e) => he("skills", t)
										}, "×", 8, Ud)
									])]),
									U(J("input", {
										"onUpdate:modelValue": (t) => e.name = t,
										type: "text",
										class: "pm-input",
										placeholder: "技能名称 (如: 拔刀斩)",
										onInput: (t) => e.rolled = !1
									}, null, 40, Wd), [[Z, e.name]]),
									U(J("textarea", {
										"onUpdate:modelValue": (t) => e.desc = t,
										class: "pm-textarea",
										placeholder: "技能效果与消耗描述... (如: 消耗5MP，造成1d10伤害)",
										onInput: (t) => e.rolled = !1
									}, null, 40, Gd), [[Z, e.desc]]),
									U(J("select", {
										"onUpdate:modelValue": (t) => e.tier = t,
										class: "pm-select",
										onChange: (t) => e.rolled = !1
									}, [w[93] ||= J("option", { value: "" }, "-- 选择评级区间 --", -1), (K(), q(G, null, W(fe, (e) => J("option", {
										key: e.label,
										value: e.label
									}, F(e.label), 9, qd)), 64))], 40, Kd), [[Ho, e.tier]])
								]))), 128)),
								J("button", {
									class: "btn-add-diy",
									onClick: w[22] ||= (e) => me("skills")
								}, "➕ 添加自定义技能")
							]),
							J("div", Jd, [
								w[96] ||= J("div", {
									class: "shop-title",
									style: {
										"font-size": "1.2em",
										border: "none",
										"margin-bottom": "5px",
										"margin-top": "20px"
									}
								}, "自定义背景 / 特质", -1),
								(K(!0), q(G, null, W(M.traits, (e, t) => (K(), q("div", {
									key: "trait" + t,
									class: "diy-box"
								}, [
									J("div", Yd, [J("span", Xd, "特质 #" + F(t + 1), 1), J("div", Zd, [
										e.rolled ? (K(), q("span", Qd, "-" + F(e.cost) + " 点", 1)) : X("", !0),
										J("button", {
											disabled: !e.tier,
											class: "diy-roll-btn",
											onClick: (e) => ge("traits", t)
										}, "评估代价 (Roll)", 8, $d),
										J("button", {
											class: "btn-remove-diy",
											title: "删除",
											onClick: (e) => he("traits", t)
										}, "×", 8, ef)
									])]),
									U(J("input", {
										"onUpdate:modelValue": (t) => e.name = t,
										type: "text",
										class: "pm-input",
										placeholder: "特质名称 (如: 异想体血肉共生)",
										onInput: (t) => e.rolled = !1
									}, null, 40, tf), [[Z, e.name]]),
									U(J("textarea", {
										"onUpdate:modelValue": (t) => e.desc = t,
										class: "pm-textarea",
										placeholder: "特质效果描述...",
										onInput: (t) => e.rolled = !1
									}, null, 40, nf), [[Z, e.desc]]),
									U(J("select", {
										"onUpdate:modelValue": (t) => e.tier = t,
										class: "pm-select",
										onChange: (t) => e.rolled = !1
									}, [w[95] ||= J("option", { value: "" }, "-- 选择评级区间 --", -1), (K(), q(G, null, W(fe, (e) => J("option", {
										key: e.label,
										value: e.label
									}, F(e.label), 9, af)), 64))], 40, rf), [[Ho, e.tier]])
								]))), 128)),
								J("button", {
									class: "btn-add-diy",
									onClick: w[23] ||= (e) => me("traits")
								}, "➕ 添加自定义特质")
							]),
							J("div", of, [
								w[98] ||= J("div", {
									class: "shop-title",
									style: {
										"font-size": "1.2em",
										border: "none",
										"margin-bottom": "5px",
										"margin-top": "20px"
									}
								}, "自定义武器 / E.G.O", -1),
								(K(!0), q(G, null, W(M.weapons, (e, t) => (K(), q("div", {
									key: "weapon" + t,
									class: "diy-box"
								}, [
									J("div", sf, [J("span", cf, "武器 #" + F(t + 1), 1), J("div", lf, [
										e.rolled ? (K(), q("span", uf, "-" + F(e.cost) + " 点", 1)) : X("", !0),
										J("button", {
											disabled: !e.tier,
											class: "diy-roll-btn",
											onClick: (e) => ge("weapons", t)
										}, "评估代价 (Roll)", 8, df),
										J("button", {
											class: "btn-remove-diy",
											title: "删除",
											onClick: (e) => he("weapons", t)
										}, "×", 8, ff)
									])]),
									U(J("input", {
										"onUpdate:modelValue": (t) => e.name = t,
										type: "text",
										class: "pm-input",
										placeholder: "武器名称 (如: ALEPH级·拟态幼体)",
										onInput: (t) => e.rolled = !1
									}, null, 40, pf), [[Z, e.name]]),
									U(J("textarea", {
										"onUpdate:modelValue": (t) => e.desc = t,
										class: "pm-textarea",
										placeholder: "武器效果与【副作用代价】描述... (未写明伤害骰子AI将自动补全)",
										onInput: (t) => e.rolled = !1
									}, null, 40, mf), [[Z, e.desc]]),
									U(J("select", {
										"onUpdate:modelValue": (t) => e.tier = t,
										class: "pm-select",
										onChange: (t) => e.rolled = !1
									}, [w[97] ||= J("option", { value: "" }, "-- 选择评级区间 --", -1), (K(), q(G, null, W(fe, (e) => J("option", {
										key: e.label,
										value: e.label
									}, F(e.label), 9, gf)), 64))], 40, hf), [[Ho, e.tier]])
								]))), 128)),
								J("button", {
									class: "btn-add-diy",
									onClick: w[24] ||= (e) => me("weapons")
								}, "➕ 添加自定义武器")
							]),
							J("div", _f, [
								w[100] ||= J("div", {
									class: "shop-title",
									style: {
										"font-size": "1.2em",
										border: "none",
										"margin-bottom": "5px",
										"margin-top": "20px"
									}
								}, "自定义防具 / 服饰", -1),
								(K(!0), q(G, null, W(M.armors, (e, t) => (K(), q("div", {
									key: "armor" + t,
									class: "diy-box"
								}, [
									J("div", vf, [J("span", yf, "防具 #" + F(t + 1), 1), J("div", bf, [
										e.rolled ? (K(), q("span", xf, "-" + F(e.cost) + " 点", 1)) : X("", !0),
										J("button", {
											disabled: !e.tier,
											class: "diy-roll-btn",
											onClick: (e) => ge("armors", t)
										}, "评估代价 (Roll)", 8, Sf),
										J("button", {
											class: "btn-remove-diy",
											title: "删除",
											onClick: (e) => he("armors", t)
										}, "×", 8, Cf)
									])]),
									U(J("input", {
										"onUpdate:modelValue": (t) => e.name = t,
										type: "text",
										class: "pm-input",
										placeholder: "防具名称 (如: W公司清剿服)",
										onInput: (t) => e.rolled = !1
									}, null, 40, wf), [[Z, e.name]]),
									U(J("textarea", {
										"onUpdate:modelValue": (t) => e.desc = t,
										class: "pm-textarea",
										placeholder: "防具效果与代价描述...",
										onInput: (t) => e.rolled = !1
									}, null, 40, Tf), [[Z, e.desc]]),
									U(J("select", {
										"onUpdate:modelValue": (t) => e.tier = t,
										class: "pm-select",
										onChange: (t) => e.rolled = !1
									}, [w[99] ||= J("option", { value: "" }, "-- 选择评级区间 --", -1), (K(), q(G, null, W(fe, (e) => J("option", {
										key: e.label,
										value: e.label
									}, F(e.label), 9, Df)), 64))], 40, Ef), [[Ho, e.tier]])
								]))), 128)),
								J("button", {
									class: "btn-add-diy",
									onClick: w[25] ||= (e) => me("armors")
								}, "➕ 添加自定义防具")
							]),
							J("div", Of, [
								w[102] ||= J("div", {
									class: "shop-title",
									style: {
										"font-size": "1.2em",
										border: "none",
										"margin-bottom": "5px",
										"margin-top": "20px"
									}
								}, "自定义道具 / 消耗品", -1),
								(K(!0), q(G, null, W(M.items, (e, t) => (K(), q("div", {
									key: "item" + t,
									class: "diy-box"
								}, [
									J("div", kf, [J("span", Af, "道具 #" + F(t + 1), 1), J("div", jf, [
										e.rolled ? (K(), q("span", Mf, "-" + F(e.cost) + " 点", 1)) : X("", !0),
										J("button", {
											disabled: !e.tier,
											class: "diy-roll-btn",
											onClick: (e) => ge("items", t)
										}, "评估代价 (Roll)", 8, Nf),
										J("button", {
											class: "btn-remove-diy",
											title: "删除",
											onClick: (e) => he("items", t)
										}, "×", 8, Pf)
									])]),
									U(J("input", {
										"onUpdate:modelValue": (t) => e.name = t,
										type: "text",
										class: "pm-input",
										placeholder: "道具名称 (如: K公司高浓度安瓿)",
										onInput: (t) => e.rolled = !1
									}, null, 40, Ff), [[Z, e.name]]),
									U(J("textarea", {
										"onUpdate:modelValue": (t) => e.desc = t,
										class: "pm-textarea",
										placeholder: "道具效果描述...",
										onInput: (t) => e.rolled = !1
									}, null, 40, If), [[Z, e.desc]]),
									U(J("select", {
										"onUpdate:modelValue": (t) => e.tier = t,
										class: "pm-select",
										onChange: (t) => e.rolled = !1
									}, [w[101] ||= J("option", { value: "" }, "-- 选择评级区间 --", -1), (K(), q(G, null, W(fe, (e) => J("option", {
										key: e.label,
										value: e.label
									}, F(e.label), 9, Rf)), 64))], 40, Lf), [[Ho, e.tier]])
								]))), 128)),
								J("button", {
									class: "btn-add-diy",
									onClick: w[26] ||= (e) => me("items")
								}, "➕ 添加自定义道具")
							]),
							J("div", zf, [
								w[104] ||= J("div", {
									class: "shop-title",
									style: {
										"font-size": "1.2em",
										border: "none",
										"margin-bottom": "5px",
										"margin-top": "20px",
										color: "var(--pm-dark-red)"
									}
								}, "自定义专属业障 (返还点数)", -1),
								(K(!0), q(G, null, W(M.karmas, (e, t) => (K(), q("div", {
									key: "karma" + t,
									class: "diy-box",
									style: {
										"border-color": "var(--pm-dark-red)",
										background: "rgba(139, 0, 0, 0.02)"
									}
								}, [
									J("div", Bf, [J("span", Vf, "业障 #" + F(t + 1), 1), J("div", Hf, [
										e.rolled ? (K(), q("span", Uf, "+" + F(e.refund) + " 点", 1)) : X("", !0),
										J("button", {
											disabled: !e.tier,
											class: "diy-roll-btn",
											style: { background: "var(--pm-dark-red)" },
											onClick: (e) => ge("karmas", t)
										}, "评估返还 (Roll)", 8, Wf),
										J("button", {
											class: "btn-remove-diy",
											title: "删除",
											onClick: (e) => he("karmas", t)
										}, "×", 8, Gf)
									])]),
									U(J("input", {
										"onUpdate:modelValue": (t) => e.name = t,
										type: "text",
										class: "pm-input",
										placeholder: "业障名称 (如: 注定的扭曲)",
										onInput: (t) => e.rolled = !1
									}, null, 40, Kf), [[Z, e.name]]),
									U(J("textarea", {
										"onUpdate:modelValue": (t) => e.desc = t,
										class: "pm-textarea",
										placeholder: "业障的负面效果与触发条件描述...",
										onInput: (t) => e.rolled = !1
									}, null, 40, qf), [[Z, e.desc]]),
									U(J("select", {
										"onUpdate:modelValue": (t) => e.tier = t,
										class: "pm-select",
										onChange: (t) => e.rolled = !1
									}, [w[103] ||= J("option", { value: "" }, "-- 选择痛苦评级 --", -1), (K(), q(G, null, W(pe, (e) => J("option", {
										key: e.label,
										value: e.label
									}, F(e.label), 9, Yf)), 64))], 40, Jf), [[Ho, e.tier]])
								]))), 128)),
								J("button", {
									class: "btn-add-diy",
									style: {
										"border-color": "var(--pm-dark-red)",
										color: "var(--pm-dark-red)"
									},
									onClick: w[27] ||= (e) => me("karmas")
								}, "➕ 添加自定义业障")
							])
						]),
						J("div", Xf, [
							w[107] ||= J("div", { class: "shop-title" }, "本局限定商品 (Roguelike 刷新池)", -1),
							w[108] ||= J("p", { style: {
								color: "#555",
								"font-size": "0.9em",
								"margin-bottom": "15px"
							} }, "如果你懒得自己写，可以直接从黑市商人这里购买现成的。", -1),
							w[109] ||= J("h4", { style: {
								color: "var(--pm-text)",
								"margin-bottom": "10px"
							} }, "特殊背景 / 特质", -1),
							J("div", Zf, [(K(!0), q(G, null, W(N.backgrounds, (e) => (K(), q("div", {
								key: e.name,
								class: j([{ selected: Ne("backgrounds", e) }, "rl-card"]),
								onClick: (t) => Me("backgrounds", e)
							}, [
								J("div", $f, F(e.type), 1),
								J("div", ep, F(e.name), 1),
								J("div", tp, F(e.desc), 1),
								J("div", np, "-" + F(e.cost) + " 点", 1)
							], 10, Qf))), 128))]),
							w[110] ||= J("h4", { style: {
								color: "var(--pm-text)",
								"margin-top": "25px",
								"margin-bottom": "10px"
							} }, "稀有遗物 / E.G.O", -1),
							J("div", rp, [(K(!0), q(G, null, W(N.egos, (e) => (K(), q("div", {
								key: e.name,
								class: j([{ selected: Ne("egos", e) }, "rl-card"]),
								onClick: (t) => Me("egos", e)
							}, [
								J("div", ap, F(e.type), 1),
								J("div", op, F(e.name), 1),
								J("div", sp, F(e.desc), 1),
								J("div", cp, "-" + F(e.cost) + " 点", 1)
							], 10, ip))), 128))]),
							w[111] ||= J("h4", { style: {
								color: "var(--pm-text)",
								"margin-top": "25px",
								"margin-bottom": "10px"
							} }, "失落战技 / 奇点魔法", -1),
							J("div", lp, [(K(!0), q(G, null, W(N.skills, (e) => (K(), q("div", {
								key: e.name,
								class: j([{ selected: Ne("skills", e) }, "rl-card"]),
								onClick: (t) => Me("skills", e)
							}, [
								J("div", dp, F(e.type), 1),
								J("div", fp, F(e.name), 1),
								J("div", pp, F(e.desc), 1),
								J("div", mp, "-" + F(e.cost) + " 点", 1)
							], 10, up))), 128))]),
							w[112] ||= J("h4", { style: {
								color: "var(--pm-dark-red)",
								"margin-top": "25px",
								"margin-bottom": "10px"
							} }, "专属业障 (必须至少选择一项，可返还点数)", -1),
							J("div", hp, [(K(!0), q(G, null, W(N.karmas, (e) => (K(), q("div", {
								key: e.name,
								class: j([{ selected: Ne("karmas", e) }, "rl-card"]),
								onClick: (t) => Me("karmas", e)
							}, [
								J("div", _p, F(e.type), 1),
								J("div", vp, F(e.name), 1),
								J("div", yp, F(e.desc), 1),
								J("div", bp, "+" + F(e.refund) + " 点", 1)
							], 10, gp))), 128))])
						]),
						J("div", xp, [
							w[114] ||= J("div", { class: "shop-title" }, "同行伙伴 (Companion) - 消耗 2000 点", -1),
							J("label", Sp, [U(J("input", {
								"onUpdate:modelValue": w[28] ||= (e) => A.enabled = e,
								type: "checkbox",
								style: {
									width: "20px",
									height: "20px"
								}
							}, null, 512), [[zo, A.enabled]]), w[113] ||= Y(" 携带一名自定义伙伴降临废土 ", -1)]),
							A.enabled ? (K(), q("div", Cp, [U(J("input", {
								"onUpdate:modelValue": w[29] ||= (e) => A.name = e,
								type: "text",
								class: "pm-input",
								style: { margin: "0" },
								placeholder: "伙伴姓名 (如: 安吉拉)"
							}, null, 512), [[Z, A.name]]), U(J("textarea", {
								"onUpdate:modelValue": w[30] ||= (e) => A.desc = e,
								class: "pm-textarea",
								style: { margin: "0" },
								placeholder: "伙伴的身份、能力与性格设定..."
							}, null, 512), [[Z, A.desc]])])) : X("", !0)
						]),
						J("div", wp, [
							w[115] ||= J("div", { class: "shop-title" }, "完全自定义议约", -1),
							w[116] ||= J("p", { style: {
								color: "#555",
								"font-size": "0.9em"
							} }, [
								Y("如果你对上面的商品不满意，可以在此写下你疯狂的脑洞（例如：“我想扮演一个被W公司列车切碎后又被环指拼凑起来的缝合怪”）。"),
								J("br"),
								Y("注意：DM 会在游戏开始后为你进行点数估价，并强行缝合一个恶毒的专属业障。")
							], -1),
							J("div", Tp, [U(J("textarea", {
								"onUpdate:modelValue": w[31] ||= (e) => _e.value = e,
								placeholder: "在此输入你的自定义设定..."
							}, null, 512), [[Z, _e.value]])])
						])
					]),
					J("div", Ep, [
						je.value < 0 ? (K(), q("div", Dp, [...w[117] ||= [
							Y(" 【跑团娘的嘲弄】哎呀呀，点数透支了呢？没关系，你可以带着这身华丽的负债降临。", -1),
							J("br", null, null, -1),
							Y(" 只不过……开局负数骰子意味着你已经被都市的厄运标记。准备好在『心灵镜牢』里打一辈子黑工还债了吗，可怜的耗子？ ", -1)
						]])) : X("", !0),
						!Pe.value && !_e.value ? (K(), q("p", Op, "必须至少选择一项【专属业障】（商店或DIY），或填写【自定义议约】。")) : X("", !0),
						J("button", {
							disabled: !Pe.value && !_e.value,
							class: "pm-btn-embark",
							onClick: Fe
						}, "确认降临姿态", 8, kp)
					])
				])) : X("", !0)])) : n.value === "settings" ? (K(), q("div", Ap, [
					w[125] ||= J("div", { class: "settings-title" }, "契约与法则", -1),
					w[126] ||= J("div", { class: "settings-warning" }, "“深渊的边界由你划定。一旦铭刻，不可反悔。”", -1),
					J("div", jp, [w[118] ||= Y("已选定降临姿态：", -1), J("span", Mp, F(ae.value), 1)]),
					J("div", Np, [J("div", Pp, [
						w[119] ||= J("div", {
							class: "dm-title",
							style: {
								"font-size": "1.2em",
								"margin-bottom": "10px"
							}
						}, "心理锚点 (MBTI)", -1),
						w[120] ||= J("p", { style: {
							"font-size": "0.85em",
							color: "#666",
							"margin-bottom": "15px"
						} }, "决定你的理智恢复机制与卡门破防逻辑。", -1),
						J("div", Fp, [J("button", {
							class: j([{ active: R.ei === "E" }, "mbti-btn"]),
							onClick: w[32] ||= (e) => R.ei = "E"
						}, "E (外向)", 2), J("button", {
							class: j([{ active: R.ei === "I" }, "mbti-btn"]),
							onClick: w[33] ||= (e) => R.ei = "I"
						}, "I (内向)", 2)]),
						J("div", Ip, [J("button", {
							class: j([{ active: R.sn === "S" }, "mbti-btn"]),
							onClick: w[34] ||= (e) => R.sn = "S"
						}, "S (感觉)", 2), J("button", {
							class: j([{ active: R.sn === "N" }, "mbti-btn"]),
							onClick: w[35] ||= (e) => R.sn = "N"
						}, "N (直觉)", 2)]),
						J("div", Lp, [J("button", {
							class: j([{ active: R.tf === "T" }, "mbti-btn"]),
							onClick: w[36] ||= (e) => R.tf = "T"
						}, "T (思考)", 2), J("button", {
							class: j([{ active: R.tf === "F" }, "mbti-btn"]),
							onClick: w[37] ||= (e) => R.tf = "F"
						}, "F (情感)", 2)]),
						J("div", Rp, [J("button", {
							class: j([{ active: R.jp === "J" }, "mbti-btn"]),
							onClick: w[38] ||= (e) => R.jp = "J"
						}, "J (判断)", 2), J("button", {
							class: j([{ active: R.jp === "P" }, "mbti-btn"]),
							onClick: w[39] ||= (e) => R.jp = "P"
						}, "P (知觉)", 2)]),
						J("div", zp, F(Ie.value), 1)
					]), J("div", Bp, [
						w[121] ||= J("div", {
							class: "dm-title",
							style: {
								"font-size": "1.2em",
								"margin-bottom": "10px"
							}
						}, "世界难度选择", -1),
						w[122] ||= J("p", { style: {
							"font-size": "0.85em",
							color: "#666",
							"margin-bottom": "15px"
						} }, "决定废土对你的残酷程度。", -1),
						J("button", {
							class: j([{ active: z.value === "剧情 (Story)" }, "diff-btn"]),
							onClick: w[40] ||= (e) => z.value = "剧情 (Story)"
						}, "剧情 (Story) - 侧重体验，资源较多", 2),
						J("button", {
							class: j([{ active: z.value === "普通 (Normal)" }, "diff-btn"]),
							onClick: w[41] ||= (e) => z.value = "普通 (Normal)"
						}, "普通 (Normal) - 标准的废土生存", 2),
						J("button", {
							class: j([{ active: z.value === "硬核 (Hardcore)" }, "diff-btn"]),
							onClick: w[42] ||= (e) => z.value = "硬核 (Hardcore)"
						}, "硬核 (Hardcore) - 极易断肢，资源匮乏", 2),
						J("button", {
							class: j([{ active: z.value === "地狱 (Hell)" }, "diff-btn"]),
							onClick: w[43] ||= (e) => z.value = "地狱 (Hell)"
						}, "地狱 (Hell) - 机制杀频发，卡门时刻注视", 2)
					])]),
					J("div", Vp, [(K(!0), q(G, null, W(E.sensitiveToggles, (e, t) => (K(), q("div", {
						key: t,
						class: j(["toggle-btn", { active: e }]),
						onClick: (n) => E.sensitiveToggles[t] = !e
					}, F(String(t).replace(/_/g, " / ")), 11, Hp))), 128))]),
					J("div", Up, [
						w[123] ||= J("div", { class: "dm-title" }, "观测者化身设定", -1),
						w[124] ||= J("div", { class: "dm-desc" }, "“接下来，我的化身将与你同行，但她只会作为无情的DM存在。你希望她用什么态度来见证你的挣扎？”", -1),
						J("div", Wp, [
							J("button", {
								class: j([{ active: E.dmPersonality === "三无机娘，冷酷客观，毫无感情波动" }, "pm-preset-btn"]),
								onClick: w[44] ||= (e) => E.dmPersonality = "三无机娘，冷酷客观，毫无感情波动"
							}, "三无机娘", 2),
							J("button", {
								class: j([{ active: E.dmPersonality === "腹黑乐子人，喜欢看玩家挣扎，语气带有优雅的嘲讽" }, "pm-preset-btn"]),
								onClick: w[45] ||= (e) => E.dmPersonality = "腹黑乐子人，喜欢看玩家挣扎，语气带有优雅的嘲讽"
							}, "腹黑乐子人", 2),
							J("button", {
								class: j([{ active: E.dmPersonality === "温柔病娇，一边哭泣一边宣告你的断头，极度排外" }, "pm-preset-btn"]),
								onClick: w[46] ||= (e) => E.dmPersonality = "温柔病娇，一边哭泣一边宣告你的断头，极度排外"
							}, "温柔病娇", 2),
							J("button", {
								class: j([{ active: E.dmPersonality === "暴躁老姐，满口粗话，大骂着把你的内脏扯出来" }, "pm-preset-btn"]),
								onClick: w[47] ||= (e) => E.dmPersonality = "暴躁老姐，满口粗话，大骂着把你的内脏扯出来"
							}, "暴躁老姐", 2),
							J("button", {
								class: "pm-preset-btn custom-btn",
								onClick: ie
							}, "✍️ 自定义(手动输入)")
						]),
						U(J("input", {
							ref_key: "dmInputRef",
							ref: re,
							"onUpdate:modelValue": w[48] ||= (e) => E.dmPersonality = e,
							type: "text",
							class: "pm-input",
							placeholder: "或在此处写入你自定义的傲娇、病娇等设定..."
						}, null, 512), [[Z, E.dmPersonality]])
					]),
					J("button", {
						disabled: r.value,
						class: "pm-btn-embark",
						onClick: Re
					}, F(r.value ? "引擎连接中..." : "踏上旅程"), 9, Gp)
				])) : X("", !0)]),
				_: 1
			}),
			n.value !== "check" && n.value !== "already_started" && n.value !== "transition" ? (K(), q("div", Kp, [J("button", {
				class: "pm-btn-back-stealth",
				onClick: _
			}, " [ ◀ 重新选择命运轨迹 ] ")])) : X("", !0)
		])) : X("", !0);
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
		let e = n(), t = e.getElementById("pm-global-styles");
		t || (t = e.createElement("style"), t.id = "pm-global-styles", e.head.appendChild(t)), t.innerHTML = "\n      /* 隐藏原生标签 */\n      .mes_text initvar, .mes_text updatevariable, .mes_text variable_log,\n      .mes_text statusbar_data, .mes_text context_options, .mes_text context_summary {\n          display: none !important;\n      }\n      .mes_text narrative { display: block !important; }\n\n      /* =========================================\n         全局与羊皮纸基底 (废墟图书馆美学)\n         ========================================= */\n      :root {\n        --pm-gold: #d4af37;\n        --pm-dark-red: #8b0000;\n        --pm-black: #1a1105;\n        --pm-text: #2c241b;\n        --pm-bg-light: #ffffff;\n        --pm-bg-mid: #fcfaf5;\n        --pm-bg-dark: #f4ebd8;\n      }\n\n      .pm-master-container {\n        position: relative;\n        width: 100%;\n        min-height: 100vh;\n        border-radius: 12px;\n        border: 2px solid var(--pm-gold);\n        z-index: 10;\n        background: radial-gradient(circle at center, var(--pm-bg-light) 0%, var(--pm-bg-mid) 50%, var(--pm-bg-dark) 100%);\n        padding: 20px;\n        box-sizing: border-box;\n        color: var(--pm-text);\n        overflow-x: hidden;\n        box-shadow: inset 0 0 40px rgba(255, 255, 255, 1);\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        font-family: 'Noto Serif SC', 'Songti SC', serif;\n        margin-top: 15px;\n        margin-bottom: 15px;\n      }\n      .pm-master-container::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; border: 3px solid rgba(212, 175, 55, 0.8); border-radius: 12px; animation: pm-border-glow 4s infinite alternate ease-in-out; pointer-events: none; z-index: 2; }\n      .pm-master-container::after { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-radius: 12px; background-image: url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"noiseFilter\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23noiseFilter)\" opacity=\"0.05\"/></svg>'); pointer-events: none; z-index: 1; }\n      @keyframes pm-border-glow { 0% { box-shadow: inset 0 0 15px rgba(212, 175, 55, 0.1), 0 0 15px rgba(212, 175, 55, 0.2); border-color: rgba(212, 175, 55, 0.4); } 100% { box-shadow: inset 0 0 40px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.5); border-color: rgba(212, 175, 55, 1); } }\n\n      @media (max-width: 768px) {\n        .pm-master-container { padding: 10px; }\n      }\n\n      /* 状态栏主容器 */\n      @keyframes stb-pm-terminal-breathe { 0% { border-color: #222; } 50% { border-color: #444; } 100% { border-color: #222; } }\n      .stb-pm-wrapper { width: 100%; max-width: 100%; overflow-x: hidden; overflow-wrap: anywhere; box-sizing: border-box; background: #050505; background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px); background-size: 24px 24px; border: 1px solid #333; border-top: 4px solid #8a0303; border-bottom: 4px solid #d4af37; border-radius: 12px; font-family: 'Nunito', 'Quicksand', 'Segoe UI Rounded', 'Helvetica Rounded', Arial, sans-serif; color: #d0d0d0; padding: 16px; animation: stb-pm-terminal-breathe 8s infinite ease-in-out; position: relative; margin-top: 15px; margin-bottom: 10px; }\n\n      /* 🚨 字体优化：将原本丑陋的等宽字体替换为更平滑的无衬线字体 */\n      .stb-pm-terminal-data { font-family: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif; font-size: 13.5px; color: #81d4fa; white-space: pre-wrap; word-break: break-all; line-height: 1.6; letter-spacing: 0.5px; }\n      .stb-pm-terminal-data-gold { color: #f4e7c1; }\n      .stb-pm-terminal-data-red { color: #ff6b6b; }\n\n      .stb-pm-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid rgba(212, 175, 55, 0.2); padding-bottom: 12px; margin-bottom: 12px; position: relative; }\n      .stb-pm-header::after { content: ''; position: absolute; bottom: -1px; left: 0; width: 30%; height: 2px; background: #d4af37; box-shadow: 0 0 10px #d4af37; border-radius: 2px; }\n      .stb-pm-location { font-family: 'Quicksand', 'Georgia', serif; font-size: clamp(16px, 4vw, 18px); font-weight: bold; color: #d4af37; letter-spacing: 1px; text-shadow: 0 0 12px rgba(212, 175, 55, 0.6); word-break: break-word; display: flex; align-items: center; gap: 8px; flex: 1; }\n      .stb-pm-location::before { content: '◆'; font-size: 12px; color: #8a0303; text-shadow: 0 0 6px #8a0303; }\n      .stb-pm-env-col { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; flex-shrink: 0; }\n      .stb-pm-tag { background: rgba(0, 0, 0, 0.8); border: 1px solid #444; padding: 4px 10px; border-radius: 12px; white-space: nowrap; font-size: 12px; box-shadow: inset 0 0 8px rgba(255, 255, 255, 0.05); letter-spacing: 0.5px; }\n      .stb-pm-tag-time { color: #aaa; border-color: #555; }\n      .stb-pm-tag-weather { color: #ff6b6b; border-color: #8a0303; text-shadow: 0 0 5px rgba(138, 3, 3, 0.8); }\n\n      /* DM 头像 */\n      .stb-pm-dm-avatar-box { position: absolute; top: -10px; right: -10px; width: 60px; height: 60px; border-radius: 50%; border: 2px solid var(--pm-gold); overflow: hidden; box-shadow: 0 0 15px rgba(212, 175, 55, 0.5); z-index: 10; background: #000; }\n      .stb-pm-dm-avatar { width: 100%; height: 100%; object-fit: cover; }\n      .stb-pm-dm-label { position: absolute; bottom: 0; left: 0; width: 100%; background: rgba(138, 3, 3, 0.8); color: #fff; font-size: 10px; text-align: center; font-weight: bold; letter-spacing: 1px; }\n\n      /* BGM 播放器 */\n      .stb-pm-bgm-container { margin-bottom: 16px; }\n      .stb-pm-bgm-container details { background: linear-gradient(90deg, rgba(255, 255, 255, 0.03), rgba(0, 0, 0, 0.5)); border: 1px solid #333; border-left: 3px solid #81d4fa; border-radius: 8px; overflow: hidden; transition: all 0.3s ease; }\n      .stb-pm-bgm-container summary { padding: 12px 16px; font-size: 14px; color: #81d4fa; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; font-weight: bold; }\n      .stb-pm-bgm-container summary::-webkit-details-marker { display: none; }\n      .stb-pm-bgm-container summary:hover { background: rgba(129, 212, 250, 0.1); }\n      .stb-pm-bgm-arrow { transition: transform 0.3s ease; }\n      .stb-pm-bgm-container details[open] .stb-pm-bgm-arrow { transform: rotate(180deg); }\n      .stb-pm-bgm-content { padding: 12px; border-top: 1px solid #333; display: flex; justify-content: center; background: #000; overflow: hidden; }\n      .stb-pm-bgm-content > iframe, .stb-pm-bgm-content > audio { width: 100% !important; max-width: 330px; height: 86px; border-radius: 6px; outline: none; border: none; }\n\n      /* 按钮与徽章 */\n      @keyframes stb-btn-breathe-gold { 0% { box-shadow: 0 0 5px rgba(212, 175, 55, 0.2); } 50% { box-shadow: 0 0 15px rgba(212, 175, 55, 0.6); } 100% { box-shadow: 0 0 5px rgba(212, 175, 55, 0.2); } }\n      @keyframes stb-btn-breathe-blue { 0% { box-shadow: 0 0 5px rgba(129, 212, 250, 0.2); } 50% { box-shadow: 0 0 15px rgba(129, 212, 250, 0.6); } 100% { box-shadow: 0 0 5px rgba(129, 212, 250, 0.2); } }\n      .stb-pm-actions { display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap; }\n      .stb-pm-btn { flex: 1; min-width: 140px; height: 40px; display: flex; align-items: center; justify-content: center; text-decoration: none; font-size: 14px; font-weight: bold; letter-spacing: 1px; border-radius: 20px; transition: all 0.2s ease; cursor: pointer; touch-action: manipulation; }\n      .stb-pm-btn:active { transform: scale(0.96); }\n      .stb-pm-btn-guide { background: linear-gradient(180deg, rgba(212, 175, 55, 0.15), rgba(0, 0, 0, 0.8)); border: 1px solid #d4af37; color: #f4e7c1; animation: stb-btn-breathe-gold 3s infinite ease-in-out; }\n      .stb-pm-btn-mirror { background: linear-gradient(180deg, rgba(129, 212, 250, 0.15), rgba(0, 0, 0, 0.8)); border: 1px solid #81d4fa; color: #e1f5fe; animation: stb-btn-breathe-blue 3s infinite ease-in-out; }\n      .stb-pm-badges { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 16px; }\n      .stb-pm-badge { background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.5)); border: 1px solid #333; border-left: 3px solid #d4af37; padding: 8px 14px; border-radius: 8px; font-size: 14px; color: #e0e0e0; display: flex; align-items: center; gap: 8px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5); }\n      .stb-pm-badge strong { color: #d4af37; font-weight: bold; }\n      .stb-pm-badge-title { flex: 1 1 100%; border-left-color: #81d4fa; }\n      .stb-pm-badge-title strong { color: #81d4fa; }\n\n      /* 🚨 Tabs 切换 (修复黑块与高度塌陷，增加动画) */\n      @keyframes pm-tab-fade-in {\n        0% { opacity: 0; transform: translateY(15px) scale(0.98); filter: blur(2px); }\n        100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }\n      }\n      .stb-pm-tabs-container { display: flex; flex-wrap: wrap; gap: 4px; position: relative; width: 100%; }\n      .stb-pm-tab-label { display: contents; }\n      .stb-pm-tab-radio { display: none; }\n      .stb-tab-btn { order: 1; padding: 10px 16px; font-size: 14px; color: #777; background: linear-gradient(to bottom, #0a0a0a, #111); border: 1px solid #222; border-bottom: none; border-radius: 8px 8px 0 0; cursor: pointer; white-space: nowrap; transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1); position: relative; letter-spacing: 1px; user-select: none; flex-grow: 1; text-align: center; }\n      .stb-tab-btn:active { transform: scale(0.95); }\n      @media (max-width: 768px) { .stb-tab-btn { font-size: 12px; padding: 8px 6px; letter-spacing: 0; } }\n      .stb-pm-tab-content { order: 2; width: 100%; display: none; flex-direction: column; gap: 16px; max-height: 65vh; overflow-y: auto; padding-right: 8px; padding-top: 16px; border-top: 1px solid #222; scrollbar-width: thin; scrollbar-color: #555 #0a0a0a; -webkit-overflow-scrolling: touch; }\n      .stb-pm-tab-content::-webkit-scrollbar { width: 6px; }\n      .stb-pm-tab-content::-webkit-scrollbar-track { background: #0a0a0a; border-radius: 3px; }\n      .stb-pm-tab-content::-webkit-scrollbar-thumb { background: #555; border-radius: 3px; }\n      .stb-pm-tab-radio:checked ~ .stb-tab-btn { color: #fff; background: linear-gradient(to bottom, rgba(138, 3, 3, 0.25), #0a0a0a); border-color: #555; text-shadow: 0 0 6px rgba(255, 255, 255, 0.6); font-weight: bold; }\n      .stb-pm-tab-radio:checked ~ .stb-tab-btn::after { content: ''; position: absolute; bottom: -1px; left: 0; width: 100%; height: 3px; background: #d4af37; box-shadow: 0 -2px 12px #d4af37, 0 0 6px #fff; border-radius: 2px; z-index: 2; }\n      .stb-pm-tab-radio:checked ~ .stb-pm-tab-content { display: flex; animation: pm-tab-fade-in 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }\n\n      /* 面板与进度条 */\n      .stb-pm-panel { background: rgba(15, 15, 18, 0.8); border: 1px solid #222; border-left: 4px solid #555; border-radius: 8px; padding: 16px; min-width: 0; box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8); transition: border-color 0.3s ease, box-shadow 0.3s ease; position: relative; }\n      .stb-pm-panel:hover { border-left-color: #d4af37; box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8), -3px 0 12px rgba(212, 175, 55, 0.25); }\n      .stb-pm-panel-title { font-size: 13px; color: #999; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px; border-bottom: 1px dashed rgba(255, 255, 255, 0.15); padding-bottom: 6px; display: flex; align-items: center; font-weight: bold; }\n      .stb-pm-panel-title::before { content: '■'; font-size: 10px; margin-right: 8px; color: #555; }\n      .stb-pm-bar-container { margin-bottom: 14px; }\n      .stb-pm-bar-header { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 6px; }\n      .stb-pm-bar-label { font-weight: bold; text-shadow: 0 0 5px currentColor; letter-spacing: 1px; }\n      .stb-pm-bar-value { font-family: 'Courier New', Courier, monospace; font-size: 14px; color: #ccc; }\n      .stb-pm-bar-track { width: 100%; height: 14px; background: #0a0a0a; border: 1px solid #333; border-radius: 7px; overflow: hidden; box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.9), 0 1px 0 rgba(255, 255, 255, 0.05); position: relative; }\n      .stb-pm-bar-fill { height: 100%; transition: width 0.5s ease; border-radius: 7px; }\n      .stb-pm-bar-hp { background: linear-gradient(90deg, #ff6b6b, #8a0303); box-shadow: 0 0 8px rgba(255, 107, 107, 0.6); }\n      .stb-pm-bar-mp { background: linear-gradient(90deg, #81d4fa, #0277bd); box-shadow: 0 0 8px rgba(129, 212, 250, 0.6); }\n      .stb-pm-bar-sp { background: linear-gradient(90deg, #81c784, #2e7d32); box-shadow: 0 0 8px rgba(129, 199, 132, 0.6); }\n      .stb-pm-bar-xp { background: linear-gradient(90deg, #fff59d, #fbc02d); box-shadow: 0 0 8px rgba(255, 245, 157, 0.6); }\n\n      /* 肢体状态 */\n      .stb-pm-limbs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }\n      @keyframes stb-critical-flash { 0% { border-color: #ff4444; box-shadow: 0 0 10px rgba(255, 68, 68, 0.7); background: rgba(255, 68, 68, 0.15); } 50% { border-color: #550000; box-shadow: none; background: rgba(255, 68, 68, 0.05); } 100% { border-color: #ff4444; box-shadow: 0 0 10px rgba(255, 68, 68, 0.7); background: rgba(255, 68, 68, 0.15); } }\n      .stb-pm-limb-card { background: linear-gradient(180deg, #1a1a1a, #0d0d0d); border: 1px solid #333; border-radius: 8px; padding: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; transition: transform 0.2s ease, border-color 0.2s ease; position: relative; overflow: hidden; }\n      .stb-pm-limb-card::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: #333; }\n      .stb-pm-limb-name { font-size: 12px; color: #888; margin-bottom: 6px; letter-spacing: 1px; text-transform: uppercase; }\n      .stb-pm-limb-stat { font-size: 14px; font-weight: bold; text-align: center; word-break: break-word; white-space: normal; }\n      .stb-pm-limb-card[data-status*='完好']::before { background: #555; }\n      .stb-pm-limb-card[data-status*='完好'] .stb-pm-limb-stat { color: #999; }\n      .stb-pm-limb-card[data-status*='轻度']::before { background: #aaa; }\n      .stb-pm-limb-card[data-status*='轻度'] .stb-pm-limb-stat { color: #ddd; text-shadow: 0 0 4px rgba(255, 255, 255, 0.3); }\n      .stb-pm-limb-card[data-status*='重伤'] { border-color: #ffb74d; }\n      .stb-pm-limb-card[data-status*='重伤']::before { background: #ffb74d; box-shadow: 0 0 6px #ffb74d; }\n      .stb-pm-limb-card[data-status*='重伤'] .stb-pm-limb-stat { color: #ffcc80; text-shadow: 0 0 6px rgba(255, 204, 128, 0.6); }\n      .stb-pm-limb-card[data-status*='残废'], .stb-pm-limb-card[data-status*='断裂'] { animation: stb-critical-flash 1s infinite; }\n      .stb-pm-limb-card[data-status*='残废']::before, .stb-pm-limb-card[data-status*='断裂']::before { background: #ff4444; }\n      .stb-pm-limb-card[data-status*='残废'] .stb-pm-limb-stat, .stb-pm-limb-card[data-status*='断裂'] .stb-pm-limb-stat { color: #ff6b6b; text-decoration: line-through; }\n      .stb-pm-limb-card[data-status*='义体'], .stb-pm-limb-card[data-status*='同化'], .stb-pm-limb-card[data-status*='再生'] { border-color: #d4af37; background: rgba(212, 175, 55, 0.05); }\n      .stb-pm-limb-card[data-status*='义体']::before, .stb-pm-limb-card[data-status*='同化']::before, .stb-pm-limb-card[data-status*='再生']::before { background: #d4af37; box-shadow: 0 0 6px #d4af37; }\n      .stb-pm-limb-card[data-status*='义体'] .stb-pm-limb-stat, .stb-pm-limb-card[data-status*='同化'] .stb-pm-limb-stat, .stb-pm-limb-card[data-status*='再生'] .stb-pm-limb-stat { color: #f4e7c1; text-shadow: 0 0 6px rgba(212, 175, 55, 0.5); }\n\n      /* 属性与折叠夹 */\n      .stb-pm-stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 16px; }\n      .stb-pm-stat-box { background: rgba(255, 255, 255, 0.02); border: 1px solid #333; border-radius: 6px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5); }\n      .stb-pm-stat-label { font-size: 13px; color: #888; text-transform: uppercase; font-weight: bold; }\n      .stb-pm-stat-value { font-size: 16px; font-weight: bold; color: #d4af37; font-family: monospace; text-shadow: 0 0 5px rgba(212, 175, 55, 0.4); }\n      .stb-pm-folder { background: rgba(255, 255, 255, 0.03); border: 1px solid #333; border-radius: 6px; margin-bottom: 10px; overflow: hidden; transition: all 0.3s ease; }\n      .stb-pm-folder summary { padding: 12px 14px; font-size: 14px; color: #eee; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; font-weight: bold; background: rgba(0, 0, 0, 0.4); }\n      .stb-pm-folder summary::-webkit-details-marker { display: none; }\n      .stb-pm-folder summary:hover { background: rgba(255, 255, 255, 0.05); }\n      .stb-pm-folder-arrow { transition: transform 0.3s ease; color: #888; font-size: 12px; }\n      .stb-pm-folder[open] > summary > .stb-pm-folder-arrow { transform: rotate(180deg); }\n      .stb-pm-folder-content { padding: 12px; border-top: 1px solid #333; }\n      .stb-pm-folder-actions { display: flex; justify-content: flex-end; padding: 8px 12px; background: rgba(0, 0, 0, 0.6); border-top: 1px dashed #444; }\n      .stb-pm-btn-small { background: #222; border: 1px solid #555; color: #ccc; padding: 4px 12px; border-radius: 4px; font-size: 12px; text-decoration: none; transition: all 0.2s; cursor: pointer; }\n      .stb-pm-btn-small:hover { background: #8a0303; border-color: #ff6b6b; color: #fff; }\n\n      /* 文本与传闻卡片 */\n      .stb-pm-text-block { font-size: 15px; color: #ccc; line-height: 1.6; word-wrap: break-word; white-space: normal; }\n      .stb-pm-rumor-card { background: linear-gradient(90deg, rgba(212, 175, 55, 0.08), rgba(0, 0, 0, 0.6)); border: 1px solid #222; border-left: 4px solid #d4af37; padding: 12px 16px; margin-bottom: 12px; border-radius: 4px 8px 8px 4px; transition: all 0.3s ease; position: relative; }\n      .stb-pm-rumor-card::after { content: ''; position: absolute; top: 0; right: 0; width: 30px; height: 100%; background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.9)); }\n      .stb-pm-rumor-card:hover { background: linear-gradient(90deg, rgba(212, 175, 55, 0.15), rgba(0, 0, 0, 0.6)); border-left-width: 6px; transform: translateX(4px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6); }\n      .stb-pm-rumor-title { color: #d4af37; font-size: 14px; margin-bottom: 8px; font-weight: bold; letter-spacing: 1.5px; }\n      .stb-pm-rumor-text { color: #ddd; font-size: 15px; line-height: 1.6; position: relative; z-index: 1; }\n      .stb-pm-info-row { display: flex; flex-direction: row; justify-content: space-between; margin-bottom: 8px; border-bottom: 1px dashed #333; padding-bottom: 4px; }\n      .stb-pm-info-label { font-size: 14px; color: #999; }\n      .stb-pm-info-value { font-size: 14px; font-weight: bold; color: #ccc; }\n\n      /* 🚨 骰子特效 CSS (修复正则误伤颜色代码) */\n      @keyframes pm-glitch-anim {\n        0% { clip-path: inset(10% 0 80% 0); transform: translate(-2px, 2px); }\n        20% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }\n        40% { clip-path: inset(40% 0 40% 0); transform: translate(2px, 2px); }\n        60% { clip-path: inset(20% 0 60% 0); transform: translate(-2px, -2px); }\n        80% { clip-path: inset(60% 0 20% 0); transform: translate(2px, 2px); }\n        100% { clip-path: inset(10% 0 80% 0); transform: translate(-2px, -2px); }\n      }\n      .pm-dice-roll {\n        display: inline-block; font-family: 'Courier New', monospace; font-weight: bold; color: #d4af37;\n        background: rgba(212, 175, 55, 0.1); border: 1px solid #d4af37; padding: 2px 6px; border-radius: 4px;\n        text-shadow: 0 0 5px rgba(212, 175, 55, 0.8); margin: 0 4px;\n      }\n      .pm-crit-success {\n        display: inline-block; font-weight: 900; color: #fff; background: linear-gradient(45deg, #d4af37, #ffeb3b);\n        padding: 2px 8px; border-radius: 4px; text-shadow: 0 0 10px #fff; box-shadow: 0 0 15px rgba(212, 175, 55, 0.8);\n        animation: pulse 1.5s infinite;\n      }\n      .pm-crit-fail {\n        display: inline-block; font-weight: 900; color: #fff; background: linear-gradient(45deg, #8b0000, #ff4444);\n        padding: 2px 8px; border-radius: 4px; text-shadow: 0 0 10px #fff; box-shadow: 0 0 15px rgba(139, 0, 0, 0.8);\n        position: relative;\n      }\n      .pm-crit-fail::before {\n        content: attr(data-text); position: absolute; left: -2px; text-shadow: 2px 0 red; top: 0; color: white;\n        background: transparent; overflow: hidden; animation: pm-glitch-anim 2s infinite linear alternate-reverse;\n      }\n\n      /* =========================================\n         车卡界面专属样式\n         ========================================= */\n      .fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease, transform 0.5s ease; }\n      .fade-enter-from { opacity: 0; transform: translateY(20px); }\n      .fade-leave-to { opacity: 0; transform: translateY(-20px); }\n\n      .page-check, .library-scene, .custom-char-page, .page-settings { width: 100%; max-width: 1000px; flex: 1; display: flex; flex-direction: column; align-items: center; position: relative; z-index: 10; }\n      .page-check { justify-content: center; }\n      .sys-title { font-size: clamp(2em, 5vw, 3.5em); font-weight: 900; color: var(--pm-black); letter-spacing: 10px; margin-bottom: 5px; text-shadow: 0 0 15px rgba(212, 175, 55, 0.6); text-align: center; }\n      .sys-subtitle { font-family: 'Brush Script MT', 'Great Vibes', cursive; font-size: clamp(1.2em, 3vw, 1.8em); color: var(--pm-dark-red); margin-bottom: 50px; letter-spacing: 3px; text-align: center; }\n      .sys-check-box { width: 100%; max-width: 500px; margin: 0 auto 50px; border-top: 2px solid var(--pm-gold); border-bottom: 2px solid var(--pm-gold); padding: 30px 0; }\n      .sys-row { display: flex; justify-content: space-between; margin: 15px 0; font-size: 1.2em; font-weight: bold; color: #333; }\n      .status-ok { font-family: monospace; color: var(--pm-dark-red); text-shadow: 0 0 10px rgba(139, 0, 0, 0.2); }\n      .status-warn { font-family: monospace; color: #d4af37; }\n      .status-loading { font-family: monospace; color: #aaa; animation: pulse 1.5s infinite; }\n      .sys-actions { display: flex; gap: 30px; width: 100%; max-width: 500px; justify-content: center; }\n      .sys-btn { flex: 1; padding: 15px 0; text-align: center; border: 1px solid var(--pm-text); background: transparent; color: var(--pm-text); cursor: pointer; font-family: inherit; font-size: 1.2em; font-weight: bold; letter-spacing: 4px; transition: all 0.3s; border-radius: 4px; }\n      .sys-btn:hover { background: var(--pm-text); color: var(--pm-bg-mid); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); }\n      .sys-btn-primary { border-color: var(--pm-dark-red); color: var(--pm-dark-red); }\n      .sys-btn-primary:hover:not(:disabled) { background: var(--pm-dark-red); color: white; box-shadow: 0 8px 20px rgba(139, 0, 0, 0.25); }\n      .sys-btn-primary:disabled { opacity: 0.5; border-color: #666; color: #666; cursor: not-allowed; background: transparent; box-shadow: none; }\n\n      .transition-note { position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-radius: 12px; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 10%; background: radial-gradient(circle at center, #ffffff 0%, #fcfaf5 50%, #f4ebd8 100%); z-index: 210; animation: noteSequence 5.5s forwards ease-in-out; }\n      .note-title { font-size: clamp(1.5em, 3vw, 2em); color: var(--pm-dark-red); margin-bottom: 30px; border-bottom: 2px solid var(--pm-gold); padding-bottom: 15px; letter-spacing: 3px; font-weight: bold; }\n      .note-content { font-size: clamp(1em, 2vw, 1.2em); line-height: 2; max-width: 800px; color: var(--pm-text); }\n      .note-content li { margin-bottom: 15px; list-style-type: square; }\n      .note-content li strong { color: var(--pm-dark-red); font-weight: 900; }\n\n      .library-scene { width: 100%; padding: 20px 0; box-sizing: border-box; position: relative; z-index: 200; }\n\n      .bgm-player { position: absolute; top: 0px; left: 0px; width: 280px; opacity: 0; pointer-events: none; transition: opacity 0.4s; z-index: 220; }\n      .bgm-player.is-visible { opacity: 0.3; pointer-events: auto; }\n      .bgm-player.is-visible:hover { opacity: 1; }\n      .bgm-player audio, .bgm-player iframe { width: 100%; height: 40px; outline: none; border: none; }\n\n      .scene-text { font-size: clamp(1.1em, 2.5vw, 1.3em); line-height: 2.2; text-align: justify; margin-top: 60px; margin-bottom: 50px; max-width: 900px; margin-left: auto; margin-right: auto; text-indent: 2em; color: var(--pm-black); }\n      .scene-text p { margin-bottom: 20px; }\n      .highlight-red { color: var(--pm-dark-red); font-weight: 900; text-shadow: 0 0 5px rgba(139, 0, 0, 0.2); }\n      .highlight-gold { color: var(--pm-gold); font-weight: 900; text-shadow: 0 0 5px rgba(212, 175, 55, 0.3); }\n      .trauma-text { color: var(--pm-dark-red); font-weight: bold; font-style: italic; font-size: 0.9em; background: rgba(139, 0, 0, 0.05); padding: 8px 15px; border-left: 3px solid var(--pm-dark-red); border-radius: 4px; display: block; margin: 15px 0; text-indent: 0; }\n\n      .dm-portrait-box { display: flex; justify-content: center; margin: 30px auto 50px auto; width: 100%; }\n      .dm-portrait-img { max-width: 220px; border: 4px solid var(--pm-gold); border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.3), inset 0 0 15px rgba(0,0,0,0.5); background: radial-gradient(circle, #2c1810 0%, #1a1105 100%); padding: 5px; object-fit: cover; transition: transform 0.3s ease, box-shadow 0.3s ease; }\n      .dm-portrait-img:hover { transform: scale(1.05); box-shadow: 0 15px 35px rgba(212, 175, 55, 0.4), inset 0 0 20px rgba(0,0,0,0.6); }\n\n      .dossier-container { max-width: 900px; width: 100%; display: flex; flex-direction: column; gap: 15px; margin: 0 auto 40px auto; }\n      .dossier-folder { background: rgba(255, 255, 255, 0.7); border: 1px solid var(--pm-gold); border-radius: 6px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05); overflow: hidden; transition: all 0.3s ease; }\n      .dossier-folder[open] { background: rgba(255, 255, 255, 0.95); box-shadow: 0 10px 25px rgba(139, 0, 0, 0.15); border-color: var(--pm-dark-red); }\n      .dossier-summary { padding: 15px 20px; display: flex; align-items: center; cursor: pointer; list-style: none; border-left: 4px solid var(--pm-gold); transition: all 0.3s; }\n      .dossier-summary::-webkit-details-marker { display: none; }\n      .dossier-summary:hover { background: rgba(212, 175, 55, 0.1); }\n      .dossier-folder[open] .dossier-summary { border-left-color: var(--pm-dark-red); border-bottom: 1px dashed rgba(139, 0, 0, 0.2); background: rgba(139, 0, 0, 0.05); }\n      .ds-type { font-family: monospace; color: #888; font-size: 0.9em; width: 80px; letter-spacing: 1px; }\n      .ds-name { font-size: 1.5em; font-weight: 900; color: var(--pm-dark-red); letter-spacing: 3px; flex: 1; }\n      .ds-desc { color: #555; font-style: italic; font-size: 0.95em; }\n      .dossier-content { padding: 30px; animation: slideDown 0.4s ease-out; }\n      .cp-quote { font-family: 'Georgia', serif; font-size: 1.1em; font-style: italic; color: #555; border-left: 4px solid var(--pm-gold); padding-left: 20px; margin-bottom: 30px; background: rgba(212, 175, 55, 0.05); padding: 15px 20px; }\n      .cp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 30px; }\n      @media (max-width: 768px) { .cp-grid { grid-template-columns: 1fr; } }\n      .cp-box { border: 1px dashed #b89f7d; padding: 20px; background: rgba(255, 255, 255, 0.6); }\n      .cp-box-title { font-weight: 900; color: var(--pm-dark-red); margin-bottom: 10px; font-size: 1.1em; border-bottom: 1px solid rgba(139, 0, 0, 0.2); padding-bottom: 5px; letter-spacing: 1px; }\n      .cp-box-content { font-size: 1.05em; line-height: 1.8; color: #333; }\n      .cp-actions { display: flex; justify-content: center; margin-top: 20px; }\n      .cp-btn-confirm { padding: 15px 50px; font-size: 1.2em; font-weight: bold; cursor: pointer; border: 2px solid var(--pm-dark-red); background: var(--pm-dark-red); color: #fff; text-decoration: none; letter-spacing: 2px; transition: all 0.3s; border-radius: 4px; display: block; text-align: center; }\n      .cp-btn-confirm:hover { background: #5a0000; box-shadow: 0 5px 15px rgba(139, 0, 0, 0.3); transform: translateY(-2px); }\n      .dossier-custom { display: flex; align-items: center; padding: 15px 20px; background: var(--pm-black); border: 1px solid var(--pm-dark-red); border-left: 4px solid var(--pm-dark-red); border-radius: 6px; cursor: pointer; margin-top: 10px; transition: all 0.3s; text-decoration: none; }\n      .dossier-custom:hover { background: #2c1810; box-shadow: 0 5px 15px rgba(139, 0, 0, 0.3); transform: translateX(5px); }\n      .dossier-custom .ds-type { color: #aaa; }\n      .dossier-custom .ds-name { color: var(--pm-gold); }\n\n      .custom-char-page { width: 100%; display: flex; flex-direction: column; align-items: center; padding: 20px 0; position: relative; z-index: 200; }\n      .points-header { position: sticky; top: 0; width: 100%; background: rgba(26, 17, 5, 0.95); color: var(--pm-gold); padding: 15px 30px; border-radius: 8px; border: 1px solid var(--pm-gold); display: flex; justify-content: space-between; align-items: center; z-index: 300; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5); backdrop-filter: blur(5px); box-sizing: border-box; margin-bottom: 30px; }\n      .points-header h2 { margin: 0; font-size: 1.5em; letter-spacing: 2px; }\n      .points-display { font-size: 2em; font-weight: 900; font-family: monospace; text-shadow: 0 0 10px rgba(212, 175, 55, 0.5); transition: color 0.3s; }\n      .points-display.negative { color: #ff4444; text-shadow: 0 0 15px rgba(255, 0, 0, 0.8); animation: pulse-red 2s infinite; }\n      .preset-bar { width: 100%; background: rgba(255, 255, 255, 0.6); border: 1px dashed var(--pm-gold); padding: 15px; border-radius: 6px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }\n\n      /* 🚨 强制白底黑字输入框 */\n      .preset-select, .preset-input, .pm-input, .pm-textarea, .pm-select {\n          background-color: #ffffff !important; color: #000000 !important; border: 1px solid #b89f7d !important;\n          padding: 12px; border-radius: 4px; font-family: inherit; font-size: 1em; box-sizing: border-box; outline: none; transition: border-color 0.3s;\n      }\n      .preset-select::placeholder, .preset-input::placeholder, .pm-input::placeholder, .pm-textarea::placeholder, .pm-select::placeholder { color: #888888 !important; }\n      .preset-select, .preset-input { padding: 8px; }\n      .pm-input { width: 100%; margin-bottom: 15px; }\n      .pm-textarea { width: 100%; height: 80px; resize: vertical; }\n      .pm-input:focus, .pm-textarea:focus, .pm-select:focus, .preset-input:focus, .preset-select:focus { border-color: var(--pm-dark-red) !important; box-shadow: 0 0 8px rgba(139, 0, 0, 0.3) !important; background-color: #ffffff !important; }\n\n      .pm-btn-small { padding: 8px 15px; background: #ffffff; color: var(--pm-dark-red); border: 1px solid var(--pm-dark-red); border-radius: 4px; cursor: pointer; font-weight: bold; transition: all 0.2s; font-family: inherit; }\n      .pm-btn-small:hover { background: var(--pm-dark-red); color: #ffffff; }\n\n      /* 🚨 隐藏式返回按钮 */\n      .pm-btn-back-stealth { background: transparent; border: none; color: #666; font-size: 0.9em; text-decoration: underline; cursor: pointer; transition: color 0.3s; letter-spacing: 1px; padding: 10px; }\n      .pm-btn-back-stealth:hover { color: var(--pm-dark-red); }\n\n      /* 玩家立绘自适应画框样式 */\n      .image-upload-row { display: flex; gap: 25px; align-items: stretch; margin-bottom: 25px; width: 100%; flex-wrap: wrap; }\n      .player-portrait-box { flex-shrink: 0; display: flex; justify-content: center; align-items: center; }\n      .player-portrait-img, .player-portrait-placeholder { max-width: 140px; max-height: 180px; width: auto; height: auto; border: 3px solid var(--pm-gold); border-radius: 6px; box-shadow: 0 8px 20px rgba(0,0,0,0.3), inset 0 0 10px rgba(0,0,0,0.5); background: radial-gradient(circle, #2c1810 0%, #1a1105 100%); padding: 4px; object-fit: contain; transition: transform 0.3s ease, box-shadow 0.3s ease; }\n      .player-portrait-img:hover { transform: scale(1.05); box-shadow: 0 12px 25px rgba(212, 175, 55, 0.4), inset 0 0 15px rgba(0,0,0,0.6); }\n      .player-portrait-placeholder { width: 100px; height: 120px; color: #888; font-size: 1em; font-weight: bold; letter-spacing: 2px; display: flex; align-items: center; justify-content: center; }\n\n      .preset-btn { padding: 8px 15px; background: var(--pm-black); color: var(--pm-gold); border: 1px solid var(--pm-gold); border-radius: 4px; cursor: pointer; transition: all 0.2s; }\n      .preset-btn:hover { background: var(--pm-dark-red); color: #fff; }\n      .roll-screen { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 50vh; text-align: center; }\n      .roll-btn { width: 200px; height: 200px; border-radius: 50%; background: radial-gradient(circle, var(--pm-dark-red) 0%, var(--pm-black) 100%); border: 4px solid var(--pm-gold); color: var(--pm-gold); font-size: 2em; font-weight: 900; cursor: pointer; transition: all 0.2s; box-shadow: 0 0 30px rgba(139, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; flex-direction: column; }\n      .roll-btn:hover { transform: scale(1.05); box-shadow: 0 0 50px rgba(212, 175, 55, 0.6); }\n      .roll-btn:active { transform: scale(0.95); }\n      .roll-btn.rolling { animation: shake 0.5s infinite; pointer-events: none; filter: brightness(1.5); }\n      .shop-container { width: 100%; display: grid; grid-template-columns: 1fr; gap: 30px; }\n      .shop-section { background: rgba(255, 255, 255, 0.6); border: 1px solid var(--pm-gold); border-radius: 8px; padding: 25px; }\n      .shop-title { font-size: 1.5em; color: var(--pm-dark-red); border-bottom: 2px solid var(--pm-gold); padding-bottom: 10px; margin-bottom: 20px; font-weight: 900; letter-spacing: 2px; display: flex; justify-content: space-between; align-items: center; }\n      .stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; }\n      .stat-row { display: flex; justify-content: space-between; align-items: center; background: rgba(0, 0, 0, 0.05); padding: 10px 15px; border-radius: 4px; border-left: 3px solid var(--pm-gold); }\n      .stat-name { font-weight: bold; color: var(--pm-text); width: 100px; }\n      .stat-controls { display: flex; align-items: center; gap: 10px; }\n      .stat-btn { width: 30px; height: 30px; border-radius: 50%; border: 1px solid var(--pm-dark-red); background: transparent; color: var(--pm-dark-red); font-weight: bold; cursor: pointer; transition: all 0.2s; display: flex; justify-content: center; align-items: center; padding: 0; line-height: 1; }\n      .stat-btn:hover:not(:disabled) { background: var(--pm-dark-red); color: white; }\n      .stat-btn:disabled { border-color: #ccc; color: #ccc; cursor: not-allowed; }\n      .stat-val { font-family: monospace; font-size: 1.2em; font-weight: bold; width: 40px; text-align: center; }\n      .stat-cost { font-size: 0.8em; color: #888; width: 60px; text-align: right; }\n      .rl-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }\n      .rl-card { border: 1px solid #b89f7d; background: #fcfaf5; border-radius: 6px; padding: 15px; cursor: pointer; transition: all 0.3s; position: relative; overflow: hidden; }\n      .rl-card:hover { box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); transform: translateY(-2px); border-color: var(--pm-gold); }\n      .rl-card.selected { border-color: var(--pm-dark-red); background: rgba(139, 0, 0, 0.05); box-shadow: inset 0 0 0 2px var(--pm-dark-red); }\n      .rl-card.selected::after { content: '✓'; position: absolute; top: 10px; right: 15px; color: var(--pm-dark-red); font-size: 1.5em; font-weight: bold; }\n      .rl-type { font-size: 0.8em; color: #888; margin-bottom: 5px; font-family: monospace; }\n      .rl-name { font-size: 1.2em; font-weight: bold; color: var(--pm-black); margin-bottom: 10px; }\n      .rl-desc { font-size: 0.9em; color: #555; line-height: 1.5; margin-bottom: 15px; }\n      .rl-cost { font-weight: bold; color: var(--pm-dark-red); text-align: right; font-family: monospace; }\n      .rl-cost.refund { color: #2e7d32; }\n\n      .diy-list { display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px; }\n      .diy-box { background: rgba(0, 0, 0, 0.03); border: 1px dashed var(--pm-gold); padding: 15px; border-radius: 6px; position: relative; }\n      .diy-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }\n      .diy-title { font-weight: bold; color: var(--pm-dark-red); font-size: 1.1em; }\n      .diy-roll-btn { padding: 8px 15px; background: var(--pm-gold); color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; transition: all 0.2s; }\n      .diy-roll-btn:hover:not(:disabled) { background: var(--pm-dark-red); }\n      .diy-roll-btn:disabled { background: #ccc; cursor: not-allowed; }\n      .diy-cost-display { font-family: monospace; font-size: 1.2em; font-weight: bold; color: var(--pm-dark-red); }\n      .diy-cost-display.refund { color: #2e7d32; }\n      .btn-add-diy { width: 100%; padding: 10px; background: transparent; border: 1px dashed var(--pm-text); color: var(--pm-text); font-weight: bold; cursor: pointer; border-radius: 4px; transition: all 0.2s; }\n      .btn-add-diy:hover { background: rgba(0,0,0,0.05); border-color: var(--pm-dark-red); color: var(--pm-dark-red); }\n      .btn-remove-diy { background: transparent; border: none; color: #ff4444; cursor: pointer; font-size: 1.5em; font-weight: bold; display: flex; align-items: center; justify-content: center; padding: 0 5px; transition: transform 0.2s; line-height: 1; }\n      .btn-remove-diy:hover { transform: scale(1.2); }\n\n      .dm-warning { background: rgba(139, 0, 0, 0.05); border-left: 4px solid var(--pm-dark-red); padding: 15px; margin-bottom: 20px; font-size: 0.95em; color: #555; line-height: 1.6; }\n      .dm-warning strong { color: var(--pm-dark-red); }\n      .negative-warning { background: rgba(139, 0, 0, 0.1); border: 2px solid #ff4444; color: #8b0000; padding: 20px; border-radius: 8px; margin-top: 20px; font-weight: bold; text-align: center; animation: pulse-border 2s infinite; line-height: 1.6; }\n\n      .custom-idea-box { width: 100%; margin-top: 20px; }\n      .custom-idea-box textarea { width: 100%; min-height: 150px; padding: 15px; border: 2px dashed var(--pm-gold); border-radius: 6px; background-color: #ffffff !important; color: #000000 !important; font-family: inherit; font-size: 1.05em; resize: vertical; box-sizing: border-box; outline: none; transition: all 0.3s; line-height: 1.6; }\n      .custom-idea-box textarea::placeholder { color: #888888 !important; }\n      .custom-idea-box textarea:focus { border-color: var(--pm-dark-red); border-style: solid; box-shadow: 0 0 10px rgba(139, 0, 0, 0.1); }\n\n      .page-settings { width: 100%; display: flex; flex-direction: column; align-items: center; padding: 40px 0; animation: slideDown 0.5s ease-out; }\n      .settings-title { font-size: 2.5em; font-weight: 900; color: var(--pm-dark-red); letter-spacing: 8px; margin-bottom: 10px; text-align: center; border-bottom: 2px solid var(--pm-gold); padding-bottom: 15px; width: 100%; max-width: 800px; }\n      .settings-warning { color: #555; font-style: italic; margin-bottom: 40px; letter-spacing: 2px; text-align: center; }\n      .toggles-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; width: 100%; max-width: 800px; margin-bottom: 50px; }\n      .toggle-btn { padding: 15px; border: 1px solid var(--pm-gold); background: rgba(255, 255, 255, 0.5); border-radius: 8px; text-align: center; cursor: pointer; font-weight: bold; color: #555; transition: all 0.3s; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); user-select: none; }\n      .toggle-btn.active { background: var(--pm-dark-red); color: #fff; border-color: #5a0000; box-shadow: 0 5px 15px rgba(139, 0, 0, 0.3); transform: translateY(-2px); }\n      .toggle-btn.active::after { content: ' [已开启]'; font-size: 0.8em; opacity: 0.8; }\n      .toggle-btn:not(.active)::after { content: ' [已关闭]'; font-size: 0.8em; opacity: 0.8; }\n      .dm-section { width: 100%; max-width: 800px; background: rgba(212, 175, 55, 0.05); border: 1px dashed var(--pm-gold); padding: 30px; border-radius: 8px; margin-bottom: 30px; box-sizing: border-box; }\n      .dm-title { font-size: 1.5em; color: var(--pm-black); font-weight: bold; margin-bottom: 15px; }\n      .dm-desc { color: #555; line-height: 1.8; margin-bottom: 20px; }\n      .dm-presets { display: flex; gap: 15px; margin-bottom: 20px; flex-wrap: wrap; align-items: center; }\n      .pm-preset-btn { padding: 10px 20px; border: 1px solid var(--pm-dark-red); background: transparent; color: var(--pm-dark-red); cursor: pointer; border-radius: 4px; transition: all 0.2s; font-family: inherit; font-size: 1em; }\n      .pm-preset-btn:hover, .pm-preset-btn.active { background: var(--pm-dark-red); color: white; }\n      .pm-preset-btn.custom-btn { border-style: dashed; font-weight: bold; }\n      .mbti-diff-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; width: 100%; max-width: 800px; margin-bottom: 50px; }\n      @media (max-width: 768px) { .mbti-diff-grid { grid-template-columns: 1fr; } }\n      .mbti-box { background: rgba(255, 255, 255, 0.6); border: 1px solid var(--pm-gold); padding: 20px; border-radius: 8px; }\n      .mbti-row { display: flex; justify-content: space-between; margin-bottom: 10px; background: rgba(0, 0, 0, 0.05); border-radius: 4px; overflow: hidden; }\n      .mbti-btn { flex: 1; padding: 10px; border: none; background: transparent; cursor: pointer; font-weight: bold; color: #555; transition: all 0.2s; }\n      .mbti-btn.active { background: var(--pm-dark-red); color: white; }\n      .mbti-result { text-align: center; font-size: 1.5em; font-weight: 900; color: var(--pm-dark-red); margin-top: 15px; letter-spacing: 2px; }\n      .diff-box { background: rgba(255, 255, 255, 0.6); border: 1px solid var(--pm-gold); padding: 20px; border-radius: 8px; display: flex; flex-direction: column; gap: 10px; }\n      .diff-btn { padding: 12px; border: 1px solid var(--pm-dark-red); background: transparent; color: var(--pm-dark-red); cursor: pointer; border-radius: 4px; font-weight: bold; transition: all 0.2s; text-align: left; }\n      .diff-btn:hover, .diff-btn.active { background: var(--pm-dark-red); color: white; }\n      .pm-btn-embark { padding: 20px 60px; font-size: 1.5em; font-weight: 900; background: var(--pm-black); color: var(--pm-gold); border: 2px solid var(--pm-gold); border-radius: 8px; cursor: pointer; letter-spacing: 8px; transition: all 0.4s; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3); text-align: center; display: inline-block; margin-top: 20px; }\n      .pm-btn-embark:hover:not(:disabled) { background: var(--pm-dark-red); color: #fff; border-color: #ff4444; box-shadow: 0 15px 30px rgba(139, 0, 0, 0.5); transform: translateY(-3px); }\n      .pm-btn-embark:disabled { opacity: 0.6; cursor: not-allowed; }\n\n      .modal-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-radius: 12px; background: rgba(0,0,0,0.8); z-index: 999999; display: flex; justify-content: center; align-items: center; padding: 20px; }\n      .modal-content { background: var(--pm-bg-light); border: 2px solid var(--pm-gold); border-radius: 8px; width: 100%; max-width: 800px; max-height: 90vh; display: flex; flex-direction: column; padding: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }\n      .modal-title { color: var(--pm-dark-red); font-size: 1.5em; font-weight: bold; margin-bottom: 15px; text-align: center; }\n      .modal-textarea { flex: 1; width: 100%; min-height: 300px; padding: 15px; font-family: monospace; font-size: 14px; border: 1px solid #ccc; border-radius: 4px; resize: none; outline: none; background-color: #ffffff !important; color: #000000 !important; margin-bottom: 15px; }\n      .modal-btn { padding: 12px 30px; background: var(--pm-dark-red); color: white; border: none; border-radius: 4px; font-size: 1.2em; cursor: pointer; font-weight: bold; align-self: center; }\n      .modal-btn:hover { background: #5a0000; }\n    ";
	}, i = () => {
		let r = n();
		for (let [t, n] of e.entries()) {
			let i = typeof t == "string" && t.startsWith("setup_") ? `pm-setup-root-${t.split("_")[1]}` : `pm-app-${t}`, a = r.getElementById(i);
			(!a || !r.body.contains(a)) && (n.unmount(), e.delete(t), typeof t == "number" && delete $.mvuDataMap[t]);
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
			let a = ns(i), o = $.mvuDataMap[i];
			if (a && o) try {
				JSON.stringify(a) !== JSON.stringify(o) && ($.mvuDataMap[i] = a);
			} catch {
				$.mvuDataMap[i] = a;
			}
			else a !== o && ($.mvuDataMap[i] = a);
			let s = n.textContent || "", c = n.getAttribute("is_user") === "true", l = s.includes("<initvar>") || s.includes("pm-custom-char-mount-point"), u = n.querySelector(".mes_block");
			if (!u) return;
			let d = n.querySelector(".mes_text");
			if (d && Array.from(d.children).forEach((e) => {
				if (e.classList && e.classList.contains("pm-status-bar-container") || e.hasAttribute("data-pm-parsed")) return;
				let t = e.textContent || "", n = t.toUpperCase().trim();
				if ((n.startsWith("战术聚焦:") || n.startsWith("战术聚焦：") || n.includes("战术聚焦:")) && t.length < 1e3) {
					e.style.display = "none", e.setAttribute("data-pm-parsed", "true");
					return;
				}
				if (n.includes("_.SET(") || n.includes("UPDATEVARIABLE") || n.includes("STATUSBAR_DATA")) {
					e.style.display = "none", e.setAttribute("data-pm-parsed", "true");
					return;
				}
				if (!c && e.innerHTML && !e.innerHTML.includes("pm-dice-roll")) {
					let t = e.innerHTML, n = !1;
					t.includes("大成功") && (t = t.replace(/大成功/g, "<span class=\"pm-crit-success\">大成功</span>"), n = !0), t.includes("大失败") && (t = t.replace(/大失败/g, "<span class=\"pm-crit-fail\" data-text=\"大失败\">大失败</span>"), n = !0), /\b(1d100|1d20|1d10|1d8|1d6|1d4)\b/i.test(t) && (t = t.replace(/\b(1d100|1d20|1d10|1d8|1d6|1d4)\b/gi, "<span class=\"pm-dice-roll\">$&</span>"), n = !0), /检定[:：]\s*\d+/i.test(t) && (t = t.replace(/(检定[:：]\s*\d+)/gi, "<span class=\"pm-dice-roll\">$&</span>"), n = !0), n && (e.innerHTML = t);
				}
				e.setAttribute("data-pm-parsed", "true");
			}), s.includes("pm-custom-char-mount-point")) {
				let n = `pm-setup-root-${i}`, a = r.getElementById(n);
				a || (a = r.createElement("div"), a.id = n, a.style.cssText = "margin-top: 15px; width: 100%; position: relative; clear: both;", u.appendChild(a), t = Zo(qp), t.mount(a), e.set(`setup_${i}`, t));
			}
			if (!c && !l) {
				let t = `pm-app-${i}`, n = r.getElementById(t);
				if (!n) {
					n = r.createElement("div"), n.className = "pm-status-bar-container", n.id = t, n.style.cssText = "margin-top: 15px; width: 100%; clear: both;", u.appendChild(n);
					let a = Zo($l, { mesId: i });
					a.mount(n), e.set(i, a);
				}
			}
		});
	}, a = () => {
		let t = n().getElementById("chat");
		if (!t) {
			setTimeout(a, 1e3);
			return;
		}
		$.isReady = !0, setInterval(() => {
			if ($.isReady) {
				for (let t of e.keys()) if (typeof t == "number") {
					let e = ns(t), n = $.mvuDataMap[t];
					try {
						JSON.stringify(e) !== JSON.stringify(n) && ($.mvuDataMap[t] = e);
					} catch {
						$.mvuDataMap[t] = e;
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
				let t = e.target;
				return typeof t?.className == "string" && t.className.includes("pm-status-bar-container") || typeof t?.id == "string" && (t.id.includes("pm-app-") || t.id.includes("pm-setup-root-"));
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
