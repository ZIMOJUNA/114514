
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
}, ne = /-\w/g, T = te((e) => e.replace(ne, (e) => e.slice(1).toUpperCase())), E = /\B([A-Z])/g, D = te((e) => e.replace(E, "-$1").toLowerCase()), re = te((e) => e.charAt(0).toUpperCase() + e.slice(1)), ie = te((e) => e ? `on${re(e)}` : ""), ae = (e, t) => !Object.is(e, t), oe = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, O = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, se = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, ce = (e) => {
	let t = g(e) ? Number(e) : NaN;
	return isNaN(t) ? e : t;
}, le, ue = () => le ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
function k(e) {
	if (d(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = g(r) ? fe(r) : k(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	} else if (g(e) || v(e)) return e;
}
var A = /;(?![^(]*\))/g, j = /:([^]+)/, de = /\/\*[^]*?\*\//g;
function fe(e) {
	let t = {};
	return e.replace(de, "").split(A).forEach((e) => {
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
var N = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", pe = /* @__PURE__ */ e(N);
N + "";
function me(e) {
	return !!e || e === "";
}
function he(e, t) {
	if (e.length !== t.length) return !1;
	let n = !0;
	for (let r = 0; n && r < e.length; r++) n = P(e[r], t[r]);
	return n;
}
function P(e, t) {
	if (e === t) return !0;
	let n = m(e), r = m(t);
	if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
	if (n = _(e), r = _(t), n || r) return e === t;
	if (n = d(e), r = d(t), n || r) return n && r ? he(e, t) : !1;
	if (n = v(e), r = v(t), n || r) {
		if (!n || !r || Object.keys(e).length !== Object.keys(t).length) return !1;
		for (let n in e) {
			let r = e.hasOwnProperty(n), i = t.hasOwnProperty(n);
			if (r && !i || !r && i || !P(e[n], t[n])) return !1;
		}
	}
	return String(e) === String(t);
}
function F(e, t) {
	return e.findIndex((e) => P(e, t));
}
var ge = (e) => !!(e && e.__v_isRef === !0), I = (e) => g(e) ? e : e == null ? "" : d(e) || v(e) && (e.toString === b || !h(e.toString)) ? ge(e) ? I(e.value) : JSON.stringify(e, _e, 2) : String(e), _e = (e, t) => ge(t) ? _e(e, t.value) : f(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[ve(t, r) + " =>"] = n, e), {}) } : p(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => ve(e)) } : _(t) ? ve(t) : v(t) && !d(t) && !C(t) ? String(t) : t, ve = (e, t = "") => _(e) ? `Symbol(${e.description ?? t})` : e, L, ye = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.__v_skip = !0, this.parent = L, !e && L && (this.index = (L.scopes ||= []).push(this) - 1);
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
			let t = L;
			try {
				return L = this, e();
			} finally {
				L = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = L, L = this);
	}
	off() {
		this._on > 0 && --this._on === 0 && (L = this.prevScope, this.prevScope = void 0);
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
function be() {
	return L;
}
var R, xe = /* @__PURE__ */ new WeakSet(), Se = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, L && L.active && L.effects.push(this);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, xe.has(this) && (xe.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ee(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, Le(this), ke(this);
		let e = R, t = z;
		R = this, z = !0;
		try {
			return this.fn();
		} finally {
			Ae(this), R = e, z = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) Ne(e);
			this.deps = this.depsTail = void 0, Le(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? xe.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		je(this) && this.run();
	}
	get dirty() {
		return je(this);
	}
}, Ce = 0, we, Te;
function Ee(e, t = !1) {
	if (e.flags |= 8, t) {
		e.next = Te, Te = e;
		return;
	}
	e.next = we, we = e;
}
function De() {
	Ce++;
}
function Oe() {
	if (--Ce > 0) return;
	if (Te) {
		let e = Te;
		for (Te = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; we;) {
		let t = we;
		for (we = void 0; t;) {
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
function ke(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Ae(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), Ne(r), Pe(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function je(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Me(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function Me(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === V) || (e.globalVersion = V, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !je(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = R, r = z;
	R = e, z = !0;
	try {
		ke(e);
		let n = e.fn(e._value);
		(t.version === 0 || ae(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		R = n, z = r, Ae(e), e.flags &= -3;
	}
}
function Ne(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) Ne(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function Pe(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var z = !0, Fe = [];
function B() {
	Fe.push(z), z = !1;
}
function Ie() {
	let e = Fe.pop();
	z = e === void 0 ? !0 : e;
}
function Le(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = R;
		R = void 0;
		try {
			t();
		} finally {
			R = e;
		}
	}
}
var V = 0, Re = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, ze = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!R || !z || R === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== R) t = this.activeLink = new Re(R, this), R.deps ? (t.prevDep = R.depsTail, R.depsTail.nextDep = t, R.depsTail = t) : R.deps = R.depsTail = t, Be(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = R.depsTail, t.nextDep = void 0, R.depsTail.nextDep = t, R.depsTail = t, R.deps === t && (R.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, V++, this.notify(e);
	}
	notify(e) {
		De();
		try {
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			Oe();
		}
	}
};
function Be(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) Be(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
var Ve = /* @__PURE__ */ new WeakMap(), He = /* @__PURE__ */ Symbol(""), Ue = /* @__PURE__ */ Symbol(""), We = /* @__PURE__ */ Symbol("");
function Ge(e, t, n) {
	if (z && R) {
		let t = Ve.get(e);
		t || Ve.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new ze()), r.map = t, r.key = n), r.track();
	}
}
function Ke(e, t, n, r, i, a) {
	let o = Ve.get(e);
	if (!o) {
		V++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (De(), t === "clear") o.forEach(s);
	else {
		let i = d(e), a = i && w(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === We || !_(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(We)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(He)), f(e) && s(o.get(Ue)));
				break;
			case "delete":
				i || (s(o.get(He)), f(e) && s(o.get(Ue)));
				break;
			case "set":
				f(e) && s(o.get(He));
				break;
		}
	}
	Oe();
}
function qe(e) {
	let t = /* @__PURE__ */ H(e);
	return t === e ? t : (Ge(t, "iterate", We), /* @__PURE__ */ Nt(e) ? t : t.map(It));
}
function Je(e) {
	return Ge(e = /* @__PURE__ */ H(e), "iterate", We), e;
}
function Ye(e, t) {
	return /* @__PURE__ */ Mt(e) ? Lt(/* @__PURE__ */ jt(e) ? It(t) : t) : It(t);
}
var Xe = {
	__proto__: null,
	[Symbol.iterator]() {
		return Ze(this, Symbol.iterator, (e) => Ye(this, e));
	},
	concat(...e) {
		return qe(this).concat(...e.map((e) => d(e) ? qe(e) : e));
	},
	entries() {
		return Ze(this, "entries", (e) => (e[1] = Ye(this, e[1]), e));
	},
	every(e, t) {
		return $e(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return $e(this, "filter", e, t, (e) => e.map((e) => Ye(this, e)), arguments);
	},
	find(e, t) {
		return $e(this, "find", e, t, (e) => Ye(this, e), arguments);
	},
	findIndex(e, t) {
		return $e(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return $e(this, "findLast", e, t, (e) => Ye(this, e), arguments);
	},
	findLastIndex(e, t) {
		return $e(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return $e(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return tt(this, "includes", e);
	},
	indexOf(...e) {
		return tt(this, "indexOf", e);
	},
	join(e) {
		return qe(this).join(e);
	},
	lastIndexOf(...e) {
		return tt(this, "lastIndexOf", e);
	},
	map(e, t) {
		return $e(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return nt(this, "pop");
	},
	push(...e) {
		return nt(this, "push", e);
	},
	reduce(e, ...t) {
		return et(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return et(this, "reduceRight", e, t);
	},
	shift() {
		return nt(this, "shift");
	},
	some(e, t) {
		return $e(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return nt(this, "splice", e);
	},
	toReversed() {
		return qe(this).toReversed();
	},
	toSorted(e) {
		return qe(this).toSorted(e);
	},
	toSpliced(...e) {
		return qe(this).toSpliced(...e);
	},
	unshift(...e) {
		return nt(this, "unshift", e);
	},
	values() {
		return Ze(this, "values", (e) => Ye(this, e));
	}
};
function Ze(e, t, n) {
	let r = Je(e), i = r[t]();
	return r !== e && !/* @__PURE__ */ Nt(e) && (i._next = i.next, i.next = () => {
		let e = i._next();
		return e.done || (e.value = n(e.value)), e;
	}), i;
}
var Qe = Array.prototype;
function $e(e, t, n, r, i, a) {
	let o = Je(e), s = o !== e && !/* @__PURE__ */ Nt(e), c = o[t];
	if (c !== Qe[t]) {
		let t = c.apply(e, a);
		return s ? It(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, Ye(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function et(e, t, n, r) {
	let i = Je(e), a = i !== e && !/* @__PURE__ */ Nt(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = Ye(e, t)), n.call(this, t, Ye(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? Ye(e, c) : c;
}
function tt(e, t, n) {
	let r = /* @__PURE__ */ H(e);
	Ge(r, "iterate", We);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ Pt(n[0]) ? (n[0] = /* @__PURE__ */ H(n[0]), r[t](...n)) : i;
}
function nt(e, t, n = []) {
	B(), De();
	let r = (/* @__PURE__ */ H(e))[t].apply(e, n);
	return Oe(), Ie(), r;
}
var rt = /* @__PURE__ */ e("__proto__,__v_isRef,__isVue"), it = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(_));
function at(e) {
	_(e) || (e = String(e));
	let t = /* @__PURE__ */ H(this);
	return Ge(t, "has", e), t.hasOwnProperty(e);
}
var ot = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? wt : Ct : i ? St : xt).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = d(e);
		if (!r) {
			let e;
			if (a && (e = Xe[t])) return e;
			if (t === "hasOwnProperty") return at;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ Rt(e) ? e : n);
		if ((_(t) ? it.has(t) : rt(t)) || (r || Ge(e, "get", t), i)) return o;
		if (/* @__PURE__ */ Rt(o)) {
			let e = a && w(t) ? o : o.value;
			return r && v(e) ? /* @__PURE__ */ kt(e) : e;
		}
		return v(o) ? r ? /* @__PURE__ */ kt(o) : /* @__PURE__ */ Dt(o) : o;
	}
}, st = class extends ot {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = d(e) && w(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ Mt(i);
			if (!/* @__PURE__ */ Nt(n) && !/* @__PURE__ */ Mt(n) && (i = /* @__PURE__ */ H(i), n = /* @__PURE__ */ H(n)), !a && /* @__PURE__ */ Rt(i) && !/* @__PURE__ */ Rt(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : u(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ Rt(e) ? e : r);
		return e === /* @__PURE__ */ H(r) && (o ? ae(n, i) && Ke(e, "set", t, n, i) : Ke(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = u(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && Ke(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return (!_(t) || !it.has(t)) && Ge(e, "has", t), n;
	}
	ownKeys(e) {
		return Ge(e, "iterate", d(e) ? "length" : He), Reflect.ownKeys(e);
	}
}, ct = class extends ot {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return !0;
	}
	deleteProperty(e, t) {
		return !0;
	}
}, lt = /* @__PURE__ */ new st(), ut = /* @__PURE__ */ new ct(), dt = /* @__PURE__ */ new st(!0), ft = (e) => e, pt = (e) => Reflect.getPrototypeOf(e);
function mt(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ H(i), o = f(a), c = e === "entries" || e === Symbol.iterator && o, l = e === "keys" && o, u = i[e](...r), d = n ? ft : t ? Lt : It;
		return !t && Ge(a, "iterate", l ? Ue : He), s(Object.create(u), { next() {
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
function ht(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function gt(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ H(r), a = /* @__PURE__ */ H(n);
			e || (ae(n, a) && Ge(i, "get", n), Ge(i, "get", a));
			let { has: o } = pt(i), s = t ? ft : e ? Lt : It;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && Ge(/* @__PURE__ */ H(t), "iterate", He), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ H(n), i = /* @__PURE__ */ H(t);
			return e || (ae(t, i) && Ge(r, "has", t), Ge(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ H(a), s = t ? ft : e ? Lt : It;
			return !e && Ge(o, "iterate", He), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return s(n, e ? {
		add: ht("add"),
		set: ht("set"),
		delete: ht("delete"),
		clear: ht("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ H(this), r = pt(n), i = /* @__PURE__ */ H(e), a = !t && !/* @__PURE__ */ Nt(e) && !/* @__PURE__ */ Mt(e) ? i : e;
			return r.has.call(n, a) || ae(e, a) && r.has.call(n, e) || ae(i, a) && r.has.call(n, i) || (n.add(a), Ke(n, "add", a, a)), this;
		},
		set(e, n) {
			!t && !/* @__PURE__ */ Nt(n) && !/* @__PURE__ */ Mt(n) && (n = /* @__PURE__ */ H(n));
			let r = /* @__PURE__ */ H(this), { has: i, get: a } = pt(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ H(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? ae(n, s) && Ke(r, "set", e, n, s) : Ke(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ H(this), { has: n, get: r } = pt(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ H(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && Ke(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ H(this), t = e.size !== 0, n = e.clear();
			return t && Ke(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = mt(r, e, t);
	}), n;
}
function _t(e, t) {
	let n = gt(e, t);
	return (t, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? t : Reflect.get(u(n, r) && r in t ? n : t, r, i);
}
var vt = { get: /* @__PURE__ */ _t(!1, !1) }, yt = { get: /* @__PURE__ */ _t(!1, !0) }, bt = { get: /* @__PURE__ */ _t(!0, !1) }, xt = /* @__PURE__ */ new WeakMap(), St = /* @__PURE__ */ new WeakMap(), Ct = /* @__PURE__ */ new WeakMap(), wt = /* @__PURE__ */ new WeakMap();
function Tt(e) {
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
function Et(e) {
	return e.__v_skip || !Object.isExtensible(e) ? 0 : Tt(S(e));
}
/* @__NO_SIDE_EFFECTS__ */
function Dt(e) {
	return /* @__PURE__ */ Mt(e) ? e : At(e, !1, lt, vt, xt);
}
/* @__NO_SIDE_EFFECTS__ */
function Ot(e) {
	return At(e, !1, dt, yt, St);
}
/* @__NO_SIDE_EFFECTS__ */
function kt(e) {
	return At(e, !0, ut, bt, Ct);
}
function At(e, t, n, r, i) {
	if (!v(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
	let a = Et(e);
	if (a === 0) return e;
	let o = i.get(e);
	if (o) return o;
	let s = new Proxy(e, a === 2 ? r : n);
	return i.set(e, s), s;
}
/* @__NO_SIDE_EFFECTS__ */
function jt(e) {
	return /* @__PURE__ */ Mt(e) ? /* @__PURE__ */ jt(e.__v_raw) : !!(e && e.__v_isReactive);
}
/* @__NO_SIDE_EFFECTS__ */
function Mt(e) {
	return !!(e && e.__v_isReadonly);
}
/* @__NO_SIDE_EFFECTS__ */
function Nt(e) {
	return !!(e && e.__v_isShallow);
}
/* @__NO_SIDE_EFFECTS__ */
function Pt(e) {
	return e ? !!e.__v_raw : !1;
}
/* @__NO_SIDE_EFFECTS__ */
function H(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ H(t) : e;
}
function Ft(e) {
	return !u(e, "__v_skip") && Object.isExtensible(e) && O(e, "__v_skip", !0), e;
}
var It = (e) => v(e) ? /* @__PURE__ */ Dt(e) : e, Lt = (e) => v(e) ? /* @__PURE__ */ kt(e) : e;
/* @__NO_SIDE_EFFECTS__ */
function Rt(e) {
	return e ? e.__v_isRef === !0 : !1;
}
/* @__NO_SIDE_EFFECTS__ */
function U(e) {
	return zt(e, !1);
}
function zt(e, t) {
	return /* @__PURE__ */ Rt(e) ? e : new Bt(e, t);
}
var Bt = class {
	constructor(e, t) {
		this.dep = new ze(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ H(e), this._value = t ? e : It(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Nt(e) || /* @__PURE__ */ Mt(e);
		e = n ? e : /* @__PURE__ */ H(e), ae(e, t) && (this._rawValue = e, this._value = n ? e : It(e), this.dep.trigger());
	}
};
function Vt(e) {
	return /* @__PURE__ */ Rt(e) ? e.value : e;
}
var Ht = {
	get: (e, t, n) => t === "__v_raw" ? e : Vt(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ Rt(i) && !/* @__PURE__ */ Rt(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function Ut(e) {
	return /* @__PURE__ */ jt(e) ? e : new Proxy(e, Ht);
}
var Wt = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new ze(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = V - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && R !== this) return Ee(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return Me(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter && this.setter(e);
	}
};
/* @__NO_SIDE_EFFECTS__ */
function Gt(e, t, n = !1) {
	let r, i;
	return h(e) ? r = e : (r = e.get, i = e.set), new Wt(r, i, n);
}
var Kt = {}, qt = /* @__PURE__ */ new WeakMap(), Jt = void 0;
function Yt(e, t = !1, n = Jt) {
	if (n) {
		let t = qt.get(n);
		t || qt.set(n, t = []), t.push(e);
	}
}
function Xt(e, n, i = t) {
	let { immediate: a, deep: o, once: s, scheduler: l, augmentJob: u, call: f } = i, p = (e) => o ? e : /* @__PURE__ */ Nt(e) || o === !1 || o === 0 ? Zt(e, 1) : Zt(e), m, g, _, v, y = !1, b = !1;
	if (/* @__PURE__ */ Rt(e) ? (g = () => e.value, y = /* @__PURE__ */ Nt(e)) : /* @__PURE__ */ jt(e) ? (g = () => p(e), y = !0) : d(e) ? (b = !0, y = e.some((e) => /* @__PURE__ */ jt(e) || /* @__PURE__ */ Nt(e)), g = () => e.map((e) => {
		if (/* @__PURE__ */ Rt(e)) return e.value;
		if (/* @__PURE__ */ jt(e)) return p(e);
		if (h(e)) return f ? f(e, 2) : e();
	})) : g = h(e) ? n ? f ? () => f(e, 2) : e : () => {
		if (_) {
			B();
			try {
				_();
			} finally {
				Ie();
			}
		}
		let t = Jt;
		Jt = m;
		try {
			return f ? f(e, 3, [v]) : e(v);
		} finally {
			Jt = t;
		}
	} : r, n && o) {
		let e = g, t = o === !0 ? Infinity : o;
		g = () => Zt(e(), t);
	}
	let x = be(), S = () => {
		m.stop(), x && x.active && c(x.effects, m);
	};
	if (s && n) {
		let e = n;
		n = (...t) => {
			e(...t), S();
		};
	}
	let C = b ? Array(e.length).fill(Kt) : Kt, w = (e) => {
		if (!(!(m.flags & 1) || !m.dirty && !e)) if (n) {
			let e = m.run();
			if (o || y || (b ? e.some((e, t) => ae(e, C[t])) : ae(e, C))) {
				_ && _();
				let t = Jt;
				Jt = m;
				try {
					let t = [
						e,
						C === Kt ? void 0 : b && C[0] === Kt ? [] : C,
						v
					];
					C = e, f ? f(n, 3, t) : n(...t);
				} finally {
					Jt = t;
				}
			}
		} else m.run();
	};
	return u && u(w), m = new Se(g), m.scheduler = l ? () => l(w, !1) : w, v = (e) => Yt(e, !1, m), _ = m.onStop = () => {
		let e = qt.get(m);
		if (e) {
			if (f) f(e, 4);
			else for (let t of e) t();
			qt.delete(m);
		}
	}, n ? a ? w(!0) : C = m.run() : l ? l(w.bind(null, !0), !0) : m.run(), S.pause = m.pause.bind(m), S.resume = m.resume.bind(m), S.stop = S, S;
}
function Zt(e, t = Infinity, n) {
	if (t <= 0 || !v(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ Rt(e)) Zt(e.value, t, n);
	else if (d(e)) for (let r = 0; r < e.length; r++) Zt(e[r], t, n);
	else if (p(e) || f(e)) e.forEach((e) => {
		Zt(e, t, n);
	});
	else if (C(e)) {
		for (let r in e) Zt(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && Zt(e[r], t, n);
	}
	return e;
}
//#endregion
//#region node_modules/.pnpm/@vue+runtime-core@3.5.30/node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
function Qt(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		en(e, t, n);
	}
}
function $t(e, t, n, r) {
	if (h(e)) {
		let i = Qt(e, t, n, r);
		return i && y(i) && i.catch((e) => {
			en(e, t, n);
		}), i;
	}
	if (d(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push($t(e[a], t, n, r));
		return i;
	}
}
function en(e, n, r, i = !0) {
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
			B(), Qt(o, null, 10, [
				e,
				i,
				a
			]), Ie();
			return;
		}
	}
	tn(e, r, a, i, s);
}
function tn(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var nn = [], rn = -1, an = [], on = null, sn = 0, cn = /* @__PURE__ */ Promise.resolve(), ln = null;
function un(e) {
	let t = ln || cn;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function dn(e) {
	let t = rn + 1, n = nn.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = nn[r], a = _n(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function fn(e) {
	if (!(e.flags & 1)) {
		let t = _n(e), n = nn[nn.length - 1];
		!n || !(e.flags & 2) && t >= _n(n) ? nn.push(e) : nn.splice(dn(t), 0, e), e.flags |= 1, pn();
	}
}
function pn() {
	ln ||= cn.then(vn);
}
function mn(e) {
	d(e) ? an.push(...e) : on && e.id === -1 ? on.splice(sn + 1, 0, e) : e.flags & 1 || (an.push(e), e.flags |= 1), pn();
}
function hn(e, t, n = rn + 1) {
	for (; n < nn.length; n++) {
		let t = nn[n];
		if (t && t.flags & 2) {
			if (e && t.id !== e.uid) continue;
			nn.splice(n, 1), n--, t.flags & 4 && (t.flags &= -2), t(), t.flags & 4 || (t.flags &= -2);
		}
	}
}
function gn(e) {
	if (an.length) {
		let e = [...new Set(an)].sort((e, t) => _n(e) - _n(t));
		if (an.length = 0, on) {
			on.push(...e);
			return;
		}
		for (on = e, sn = 0; sn < on.length; sn++) {
			let e = on[sn];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		on = null, sn = 0;
	}
}
var _n = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function vn(e) {
	try {
		for (rn = 0; rn < nn.length; rn++) {
			let e = nn[rn];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), Qt(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; rn < nn.length; rn++) {
			let e = nn[rn];
			e && (e.flags &= -2);
		}
		rn = -1, nn.length = 0, gn(e), ln = null, (nn.length || an.length) && vn(e);
	}
}
var yn = null, bn = null;
function xn(e) {
	let t = yn;
	return yn = e, bn = e && e.type.__scopeId || null, t;
}
function Sn(e, t = yn, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && Bi(-1);
		let i = xn(t), a;
		try {
			a = e(...n);
		} finally {
			xn(i), r._d && Bi(1);
		}
		return a;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function W(e, n) {
	if (yn === null) return e;
	let r = xa(yn), i = e.dirs ||= [];
	for (let e = 0; e < n.length; e++) {
		let [a, o, s, c = t] = n[e];
		a && (h(a) && (a = {
			mounted: a,
			updated: a
		}), a.deep && Zt(o), i.push({
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
function Cn(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (B(), $t(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), Ie());
	}
}
function wn(e, t) {
	if (aa) {
		let n = aa.provides, r = aa.parent && aa.parent.provides;
		r === n && (n = aa.provides = Object.create(r)), n[e] = t;
	}
}
function Tn(e, t, n = !1) {
	let r = oa();
	if (r || Ur) {
		let i = Ur ? Ur._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && h(t) ? t.call(r && r.proxy) : t;
	}
}
var En = /* @__PURE__ */ Symbol.for("v-scx"), Dn = () => Tn(En);
function On(e, t, n) {
	return kn(e, t, n);
}
function kn(e, n, i = t) {
	let { immediate: a, deep: o, flush: c, once: l } = i, u = s({}, i), d = n && a || !n && c !== "post", f;
	if (fa) {
		if (c === "sync") {
			let e = Dn();
			f = e.__watcherHandles ||= [];
		} else if (!d) {
			let e = () => {};
			return e.stop = r, e.resume = r, e.pause = r, e;
		}
	}
	let p = aa;
	u.call = (e, t, n) => $t(e, p, t, n);
	let m = !1;
	c === "post" ? u.scheduler = (e) => {
		bi(e, p && p.suspense);
	} : c !== "sync" && (m = !0, u.scheduler = (e, t) => {
		t ? e() : fn(e);
	}), u.augmentJob = (e) => {
		n && (e.flags |= 4), m && (e.flags |= 2, p && (e.id = p.uid, e.i = p));
	};
	let h = Xt(e, n, u);
	return fa && (f ? f.push(h) : d && h()), h;
}
function An(e, t, n) {
	let r = this.proxy, i = g(e) ? e.includes(".") ? jn(r, e) : () => r[e] : e.bind(r, r), a;
	h(t) ? a = t : (a = t.handler, n = t);
	let o = la(this), s = kn(i, a.bind(r), n);
	return o(), s;
}
function jn(e, t) {
	let n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t;
	};
}
var Mn = /* @__PURE__ */ Symbol("_vte"), Nn = (e) => e.__isTeleport, Pn = /* @__PURE__ */ Symbol("_leaveCb"), Fn = /* @__PURE__ */ Symbol("_enterCb");
function In() {
	let e = {
		isMounted: !1,
		isLeaving: !1,
		isUnmounting: !1,
		leavingVNodes: /* @__PURE__ */ new Map()
	};
	return ur(() => {
		e.isMounted = !0;
	}), pr(() => {
		e.isUnmounting = !0;
	}), e;
}
var Ln = [Function, Array], Rn = {
	mode: String,
	appear: Boolean,
	persisted: Boolean,
	onBeforeEnter: Ln,
	onEnter: Ln,
	onAfterEnter: Ln,
	onEnterCancelled: Ln,
	onBeforeLeave: Ln,
	onLeave: Ln,
	onAfterLeave: Ln,
	onLeaveCancelled: Ln,
	onBeforeAppear: Ln,
	onAppear: Ln,
	onAfterAppear: Ln,
	onAppearCancelled: Ln
}, zn = (e) => {
	let t = e.subTree;
	return t.component ? zn(t.component) : t;
}, Bn = {
	name: "BaseTransition",
	props: Rn,
	setup(e, { slots: t }) {
		let n = oa(), r = In();
		return () => {
			let i = t.default && Jn(t.default(), !0);
			if (!i || !i.length) return;
			let a = Vn(i), o = /* @__PURE__ */ H(e), { mode: s } = o;
			if (r.isLeaving) return Gn(a);
			let c = Kn(a);
			if (!c) return Gn(a);
			let l = Wn(c, o, r, n, (e) => l = e);
			c.type !== Pi && qn(c, l);
			let u = n.subTree && Kn(n.subTree);
			if (u && u.type !== Pi && !Wi(u, c) && zn(n).type !== Pi) {
				let e = Wn(u, o, r, n);
				if (qn(u, e), s === "out-in" && c.type !== Pi) return r.isLeaving = !0, e.afterLeave = () => {
					r.isLeaving = !1, n.job.flags & 8 || n.update(), delete e.afterLeave, u = void 0;
				}, Gn(a);
				s === "in-out" && c.type !== Pi ? e.delayLeave = (e, t, n) => {
					let i = Un(r, u);
					i[String(u.key)] = u, e[Pn] = () => {
						t(), e[Pn] = void 0, delete l.delayedLeave, u = void 0;
					}, l.delayedLeave = () => {
						n(), delete l.delayedLeave, u = void 0;
					};
				} : u = void 0;
			} else u &&= void 0;
			return a;
		};
	}
};
function Vn(e) {
	let t = e[0];
	if (e.length > 1) {
		for (let n of e) if (n.type !== Pi) {
			t = n;
			break;
		}
	}
	return t;
}
var Hn = Bn;
function Un(e, t) {
	let { leavingVNodes: n } = e, r = n.get(t.type);
	return r || (r = /* @__PURE__ */ Object.create(null), n.set(t.type, r)), r;
}
function Wn(e, t, n, r, i) {
	let { appear: a, mode: o, persisted: s = !1, onBeforeEnter: c, onEnter: l, onAfterEnter: u, onEnterCancelled: f, onBeforeLeave: p, onLeave: m, onAfterLeave: h, onLeaveCancelled: g, onBeforeAppear: _, onAppear: v, onAfterAppear: y, onAppearCancelled: b } = t, x = String(e.key), S = Un(n, e), C = (e, t) => {
		e && $t(e, r, 9, t);
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
			t[Pn] && t[Pn](!0);
			let i = S[x];
			i && Wi(e, i) && i.el[Pn] && i.el[Pn](), C(r, [t]);
		},
		enter(t) {
			if (S[x] === e) return;
			let r = l, i = u, o = f;
			if (!n.isMounted) if (a) r = v || l, i = y || u, o = b || f;
			else return;
			let s = !1;
			t[Fn] = (e) => {
				s || (s = !0, C(e ? o : i, [t]), ee.delayedLeave && ee.delayedLeave(), t[Fn] = void 0);
			};
			let c = t[Fn].bind(null, !1);
			r ? w(r, [t, c]) : c();
		},
		leave(t, r) {
			let i = String(e.key);
			if (t[Fn] && t[Fn](!0), n.isUnmounting) return r();
			C(p, [t]);
			let a = !1;
			t[Pn] = (n) => {
				a || (a = !0, r(), C(n ? g : h, [t]), t[Pn] = void 0, S[i] === e && delete S[i]);
			};
			let o = t[Pn].bind(null, !1);
			S[i] = e, m ? w(m, [t, o]) : o();
		},
		clone(e) {
			let a = Wn(e, t, n, r, i);
			return i && i(a), a;
		}
	};
	return ee;
}
function Gn(e) {
	if (nr(e)) return e = Xi(e), e.children = null, e;
}
function Kn(e) {
	if (!nr(e)) return Nn(e.type) && e.children ? Vn(e.children) : e;
	if (e.component) return e.component.subTree;
	let { shapeFlag: t, children: n } = e;
	if (n) {
		if (t & 16) return n[0];
		if (t & 32 && h(n.default)) return n.default();
	}
}
function qn(e, t) {
	e.shapeFlag & 6 && e.component ? (e.transition = t, qn(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Jn(e, t = !1, n) {
	let r = [], i = 0;
	for (let a = 0; a < e.length; a++) {
		let o = e[a], s = n == null ? o.key : String(n) + String(o.key == null ? a : o.key);
		o.type === K ? (o.patchFlag & 128 && i++, r = r.concat(Jn(o.children, t, s))) : (t || o.type !== Pi) && r.push(s == null ? o : Xi(o, { key: s }));
	}
	if (i > 1) for (let e = 0; e < r.length; e++) r[e].patchFlag = -2;
	return r;
}
/* @__NO_SIDE_EFFECTS__ */
function Yn(e, t) {
	return h(e) ? s({ name: e.name }, t, { setup: e }) : e;
}
function Xn(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function Zn(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var Qn = /* @__PURE__ */ new WeakMap();
function $n(e, n, r, a, o = !1) {
	if (d(e)) {
		e.forEach((e, t) => $n(e, n && (d(n) ? n[t] : n), r, a, o));
		return;
	}
	if (tr(a) && !o) {
		a.shapeFlag & 512 && a.type.__asyncResolved && a.component.subTree.component && $n(e, n, r, a.component.subTree);
		return;
	}
	let s = a.shapeFlag & 4 ? xa(a.component) : a.el, l = o ? null : s, { i: f, r: p } = e, m = n && n.r, _ = f.refs === t ? f.refs = {} : f.refs, v = f.setupState, y = /* @__PURE__ */ H(v), b = v === t ? i : (e) => Zn(_, e) ? !1 : u(y, e), x = (e, t) => !(t && Zn(_, t));
	if (m != null && m !== p) {
		if (er(n), g(m)) _[m] = null, b(m) && (v[m] = null);
		else if (/* @__PURE__ */ Rt(m)) {
			let e = n;
			x(m, e.k) && (m.value = null), e.k && (_[e.k] = null);
		}
	}
	if (h(p)) Qt(p, f, 12, [l, _]);
	else {
		let t = g(p), n = /* @__PURE__ */ Rt(p);
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
					i(), Qn.delete(e);
				};
				t.id = -1, Qn.set(e, t), bi(t, r);
			} else er(e), i();
		}
	}
}
function er(e) {
	let t = Qn.get(e);
	t && (t.flags |= 8, Qn.delete(e));
}
ue().requestIdleCallback, ue().cancelIdleCallback;
var tr = (e) => !!e.type.__asyncLoader, nr = (e) => e.type.__isKeepAlive;
function rr(e, t) {
	ar(e, "a", t);
}
function ir(e, t) {
	ar(e, "da", t);
}
function ar(e, t, n = aa) {
	let r = e.__wdc ||= () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent;
		}
		return e();
	};
	if (sr(t, r, n), n) {
		let e = n.parent;
		for (; e && e.parent;) nr(e.parent.vnode) && or(r, t, n, e), e = e.parent;
	}
}
function or(e, t, n, r) {
	let i = sr(t, e, r, !0);
	mr(() => {
		c(r[t], i);
	}, n);
}
function sr(e, t, n = aa, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			B();
			let i = la(n), a = $t(t, n, e, r);
			return i(), Ie(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var cr = (e) => (t, n = aa) => {
	(!fa || e === "sp") && sr(e, (...e) => t(...e), n);
}, lr = cr("bm"), ur = cr("m"), dr = cr("bu"), fr = cr("u"), pr = cr("bum"), mr = cr("um"), hr = cr("sp"), gr = cr("rtg"), _r = cr("rtc");
function vr(e, t = aa) {
	sr("ec", e, t);
}
var yr = /* @__PURE__ */ Symbol.for("v-ndc");
function G(e, t, n, r) {
	let i, a = n && n[r], o = d(e);
	if (o || g(e)) {
		let n = o && /* @__PURE__ */ jt(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ Nt(e), s = /* @__PURE__ */ Mt(e), e = Je(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? Lt(It(e[n])) : It(e[n]) : e[n], n, void 0, a && a[n]);
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
var br = (e) => e ? da(e) ? xa(e) : br(e.parent) : null, xr = /* @__PURE__ */ s(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => br(e.parent),
	$root: (e) => br(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => Ar(e),
	$forceUpdate: (e) => e.f ||= () => {
		fn(e.update);
	},
	$nextTick: (e) => e.n ||= un.bind(e.proxy),
	$watch: (e) => An.bind(e)
}), Sr = (e, n) => e !== t && !e.__isScriptSetup && u(e, n), Cr = {
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
			else if (Sr(i, n)) return s[n] = 1, i[n];
			else if (a !== t && u(a, n)) return s[n] = 2, a[n];
			else if (u(o, n)) return s[n] = 3, o[n];
			else if (r !== t && u(r, n)) return s[n] = 4, r[n];
			else Tr && (s[n] = 0);
		}
		let d = xr[n], f, p;
		if (d) return n === "$attrs" && Ge(e.attrs, "get", ""), d(e);
		if ((f = c.__cssModules) && (f = f[n])) return f;
		if (r !== t && u(r, n)) return s[n] = 4, r[n];
		if (p = l.config.globalProperties, u(p, n)) return p[n];
	},
	set({ _: e }, n, r) {
		let { data: i, setupState: a, ctx: o } = e;
		return Sr(a, n) ? (a[n] = r, !0) : i !== t && u(i, n) ? (i[n] = r, !0) : u(e.props, n) || n[0] === "$" && n.slice(1) in e ? !1 : (o[n] = r, !0);
	},
	has({ _: { data: e, setupState: n, accessCache: r, ctx: i, appContext: a, props: o, type: s } }, c) {
		let l;
		return !!(r[c] || e !== t && c[0] !== "$" && u(e, c) || Sr(n, c) || u(o, c) || u(i, c) || u(xr, c) || u(a.config.globalProperties, c) || (l = s.__cssModules) && l[c]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? u(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
};
function wr(e) {
	return d(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
var Tr = !0;
function Er(e) {
	let t = Ar(e), n = e.proxy, i = e.ctx;
	Tr = !1, t.beforeCreate && Or(t.beforeCreate, e, "bc");
	let { data: a, computed: o, methods: s, watch: c, provide: l, inject: u, created: f, beforeMount: p, mounted: m, beforeUpdate: g, updated: _, activated: y, deactivated: b, beforeDestroy: x, beforeUnmount: S, destroyed: C, unmounted: w, render: ee, renderTracked: te, renderTriggered: ne, errorCaptured: T, serverPrefetch: E, expose: D, inheritAttrs: re, components: ie, directives: ae, filters: oe } = t;
	if (u && Dr(u, i, null), s) for (let e in s) {
		let t = s[e];
		h(t) && (i[e] = t.bind(n));
	}
	if (a) {
		let t = a.call(n, n);
		v(t) && (e.data = /* @__PURE__ */ Dt(t));
	}
	if (Tr = !0, o) for (let e in o) {
		let t = o[e], a = Ca({
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
	if (c) for (let e in c) kr(c[e], i, n, e);
	if (l) {
		let e = h(l) ? l.call(n) : l;
		Reflect.ownKeys(e).forEach((t) => {
			wn(t, e[t]);
		});
	}
	f && Or(f, e, "c");
	function O(e, t) {
		d(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (O(lr, p), O(ur, m), O(dr, g), O(fr, _), O(rr, y), O(ir, b), O(vr, T), O(_r, te), O(gr, ne), O(pr, S), O(mr, w), O(hr, E), d(D)) if (D.length) {
		let t = e.exposed ||= {};
		D.forEach((e) => {
			Object.defineProperty(t, e, {
				get: () => n[e],
				set: (t) => n[e] = t,
				enumerable: !0
			});
		});
	} else e.exposed ||= {};
	ee && e.render === r && (e.render = ee), re != null && (e.inheritAttrs = re), ie && (e.components = ie), ae && (e.directives = ae), E && Xn(e);
}
function Dr(e, t, n = r) {
	d(e) && (e = Fr(e));
	for (let n in e) {
		let r = e[n], i;
		i = v(r) ? "default" in r ? Tn(r.from || n, r.default, !0) : Tn(r.from || n) : Tn(r), /* @__PURE__ */ Rt(i) ? Object.defineProperty(t, n, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		}) : t[n] = i;
	}
}
function Or(e, t, n) {
	$t(d(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function kr(e, t, n, r) {
	let i = r.includes(".") ? jn(n, r) : () => n[r];
	if (g(e)) {
		let n = t[e];
		h(n) && On(i, n);
	} else if (h(e)) On(i, e.bind(n));
	else if (v(e)) if (d(e)) e.forEach((e) => kr(e, t, n, r));
	else {
		let r = h(e.handler) ? e.handler.bind(n) : t[e.handler];
		h(r) && On(i, r, e);
	}
}
function Ar(e) {
	let t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: a, config: { optionMergeStrategies: o } } = e.appContext, s = a.get(t), c;
	return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach((e) => jr(c, e, o, !0)), jr(c, t, o)), v(t) && a.set(t, c), c;
}
function jr(e, t, n, r = !1) {
	let { mixins: i, extends: a } = t;
	a && jr(e, a, n, !0), i && i.forEach((t) => jr(e, t, n, !0));
	for (let i in t) if (!(r && i === "expose")) {
		let r = Mr[i] || n && n[i];
		e[i] = r ? r(e[i], t[i]) : t[i];
	}
	return e;
}
var Mr = {
	data: Nr,
	props: Rr,
	emits: Rr,
	methods: Lr,
	computed: Lr,
	beforeCreate: Ir,
	created: Ir,
	beforeMount: Ir,
	mounted: Ir,
	beforeUpdate: Ir,
	updated: Ir,
	beforeDestroy: Ir,
	beforeUnmount: Ir,
	destroyed: Ir,
	unmounted: Ir,
	activated: Ir,
	deactivated: Ir,
	errorCaptured: Ir,
	serverPrefetch: Ir,
	components: Lr,
	directives: Lr,
	watch: zr,
	provide: Nr,
	inject: Pr
};
function Nr(e, t) {
	return t ? e ? function() {
		return s(h(e) ? e.call(this, this) : e, h(t) ? t.call(this, this) : t);
	} : t : e;
}
function Pr(e, t) {
	return Lr(Fr(e), Fr(t));
}
function Fr(e) {
	if (d(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function Ir(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function Lr(e, t) {
	return e ? s(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Rr(e, t) {
	return e ? d(e) && d(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : s(/* @__PURE__ */ Object.create(null), wr(e), wr(t ?? {})) : t;
}
function zr(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = s(/* @__PURE__ */ Object.create(null), e);
	for (let r in t) n[r] = Ir(e[r], t[r]);
	return n;
}
function Br() {
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
var Vr = 0;
function Hr(e, t) {
	return function(n, r = null) {
		h(n) || (n = s({}, n)), r != null && !v(r) && (r = null);
		let i = Br(), a = /* @__PURE__ */ new WeakSet(), o = [], c = !1, l = i.app = {
			_uid: Vr++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: Ta,
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
					let u = l._ceVNode || qi(n, r);
					return u.appContext = i, s === !0 ? s = "svg" : s === !1 && (s = void 0), o && t ? t(u, a) : e(u, a, s), c = !0, l._container = a, a.__vue_app__ = l, xa(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				c && ($t(o, l._instance, 16), e(null, l._container), delete l._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, l;
			},
			runWithContext(e) {
				let t = Ur;
				Ur = l;
				try {
					return e();
				} finally {
					Ur = t;
				}
			}
		};
		return l;
	};
}
var Ur = null, Wr = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${T(t)}Modifiers`] || e[`${D(t)}Modifiers`];
function Gr(e, n, ...r) {
	if (e.isUnmounted) return;
	let i = e.vnode.props || t, a = r, o = n.startsWith("update:"), s = o && Wr(i, n.slice(7));
	s && (s.trim && (a = r.map((e) => g(e) ? e.trim() : e)), s.number && (a = r.map(se)));
	let c, l = i[c = ie(n)] || i[c = ie(T(n))];
	!l && o && (l = i[c = ie(D(n))]), l && $t(l, e, 6, a);
	let u = i[c + "Once"];
	if (u) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[c]) return;
		e.emitted[c] = !0, $t(u, e, 6, a);
	}
}
var Kr = /* @__PURE__ */ new WeakMap();
function qr(e, t, n = !1) {
	let r = n ? Kr : t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {}, c = !1;
	if (!h(e)) {
		let r = (e) => {
			let n = qr(e, t, !0);
			n && (c = !0, s(o, n));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !a && !c ? (v(e) && r.set(e, null), null) : (d(a) ? a.forEach((e) => o[e] = null) : s(o, a), v(e) && r.set(e, o), o);
}
function Jr(e, t) {
	return !e || !a(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), u(e, t[0].toLowerCase() + t.slice(1)) || u(e, D(t)) || u(e, t));
}
function Yr(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: s, attrs: c, emit: l, render: u, renderCache: d, props: f, data: p, setupState: m, ctx: h, inheritAttrs: g } = e, _ = xn(e), v, y;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			v = Zi(u.call(t, e, d, f, m, p, h)), y = c;
		} else {
			let e = t;
			v = Zi(e.length > 1 ? e(f, {
				attrs: c,
				slots: s,
				emit: l
			}) : e(f, null)), y = t.props ? c : Xr(c);
		}
	} catch (t) {
		Ii.length = 0, en(t, e, 1), v = qi(Pi);
	}
	let b = v;
	if (y && g !== !1) {
		let e = Object.keys(y), { shapeFlag: t } = b;
		e.length && t & 7 && (a && e.some(o) && (y = Zr(y, a)), b = Xi(b, y, !1, !0));
	}
	return n.dirs && (b = Xi(b, null, !1, !0), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && qn(b, n.transition), v = b, xn(_), v;
}
var Xr = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || a(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, Zr = (e, t) => {
	let n = {};
	for (let r in e) (!o(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
	return n;
};
function Qr(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? $r(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (ei(o, r, n) && !Jr(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? o ? $r(r, o, l) : !0 : !!o;
	return !1;
}
function $r(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (ei(t, e, a) && !Jr(n, a)) return !0;
	}
	return !1;
}
function ei(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && v(r) && v(i) ? !P(r, i) : r !== i;
}
function ti({ vnode: e, parent: t }, n) {
	for (; t;) {
		let r = t.subTree;
		if (r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e) (e = t.vnode).el = n, t = t.parent;
		else break;
	}
}
var ni = {}, ri = () => Object.create(ni), ii = (e) => Object.getPrototypeOf(e) === ni;
function ai(e, t, n, r = !1) {
	let i = {}, a = ri();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), si(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	n ? e.props = r ? i : /* @__PURE__ */ Ot(i) : e.type.props ? e.props = i : e.props = a, e.attrs = a;
}
function oi(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ H(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (Jr(e.emitsOptions, o)) continue;
				let d = t[o];
				if (c) if (u(a, o)) d !== a[o] && (a[o] = d, l = !0);
				else {
					let t = T(o);
					i[t] = ci(c, s, t, d, e, !1);
				}
				else d !== a[o] && (a[o] = d, l = !0);
			}
		}
	} else {
		si(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) (!t || !u(t, a) && ((r = D(a)) === a || !u(t, r))) && (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = ci(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) (!t || !u(t, e)) && (delete a[e], l = !0);
	}
	l && Ke(e.attrs, "set", "");
}
function si(e, n, r, i) {
	let [a, o] = e.propsOptions, s = !1, c;
	if (n) for (let t in n) {
		if (ee(t)) continue;
		let l = n[t], d;
		a && u(a, d = T(t)) ? !o || !o.includes(d) ? r[d] = l : (c ||= {})[d] = l : Jr(e.emitsOptions, t) || (!(t in i) || l !== i[t]) && (i[t] = l, s = !0);
	}
	if (o) {
		let n = /* @__PURE__ */ H(r), i = c || t;
		for (let t = 0; t < o.length; t++) {
			let s = o[t];
			r[s] = ci(a, n, s, i[s], e, !u(i, s));
		}
	}
	return s;
}
function ci(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = u(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && h(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = la(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === D(n)) && (r = !0));
	}
	return r;
}
var li = /* @__PURE__ */ new WeakMap();
function ui(e, r, i = !1) {
	let a = i ? li : r.propsCache, o = a.get(e);
	if (o) return o;
	let c = e.props, l = {}, f = [], p = !1;
	if (!h(e)) {
		let t = (e) => {
			p = !0;
			let [t, n] = ui(e, r, !0);
			s(l, t), n && f.push(...n);
		};
		!i && r.mixins.length && r.mixins.forEach(t), e.extends && t(e.extends), e.mixins && e.mixins.forEach(t);
	}
	if (!c && !p) return v(e) && a.set(e, n), n;
	if (d(c)) for (let e = 0; e < c.length; e++) {
		let n = T(c[e]);
		di(n) && (l[n] = t);
	}
	else if (c) for (let e in c) {
		let t = T(e);
		if (di(t)) {
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
function di(e) {
	return e[0] !== "$" && !ee(e);
}
var fi = (e) => e === "_" || e === "_ctx" || e === "$stable", pi = (e) => d(e) ? e.map(Zi) : [Zi(e)], mi = (e, t, n) => {
	if (t._n) return t;
	let r = Sn((...e) => pi(t(...e)), n);
	return r._c = !1, r;
}, hi = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (fi(n)) continue;
		let i = e[n];
		if (h(i)) t[n] = mi(n, i, r);
		else if (i != null) {
			let e = pi(i);
			t[n] = () => e;
		}
	}
}, gi = (e, t) => {
	let n = pi(t);
	e.slots.default = () => n;
}, _i = (e, t, n) => {
	for (let r in t) (n || !fi(r)) && (e[r] = t[r]);
}, vi = (e, t, n) => {
	let r = e.slots = ri();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (_i(r, t, n), n && O(r, "_", e, !0)) : hi(t, r);
	} else t && gi(e, t);
}, yi = (e, n, r) => {
	let { vnode: i, slots: a } = e, o = !0, s = t;
	if (i.shapeFlag & 32) {
		let e = n._;
		e ? r && e === 1 ? o = !1 : _i(a, n, r) : (o = !n.$stable, hi(n, a)), s = n;
	} else n && (gi(e, n), s = { default: 1 });
	if (o) for (let e in a) !fi(e) && s[e] == null && delete a[e];
}, bi = Mi;
function xi(e) {
	return Si(e);
}
function Si(e, i) {
	let a = ue();
	a.__VUE__ = !0;
	let { insert: o, remove: s, patchProp: c, createElement: l, createText: u, createComment: d, setText: f, setElementText: p, parentNode: m, nextSibling: h, setScopeId: g = r, insertStaticContent: _ } = e, v = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !Wi(e, t) && (r = he(e), fe(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null);
		let { type: l, ref: u, shapeFlag: d } = t;
		switch (l) {
			case Ni:
				y(e, t, n, r);
				break;
			case Pi:
				b(e, t, n, r);
				break;
			case Fi:
				e ?? x(t, n, r, o);
				break;
			case K:
				ie(e, t, n, r, i, a, o, s, c);
				break;
			default: d & 1 ? w(e, t, n, r, i, a, o, s, c) : d & 6 ? ae(e, t, n, r, i, a, o, s, c) : (d & 64 || d & 128) && l.process(e, t, n, r, i, a, o, s, c, ge);
		}
		u != null && i ? $n(u, e && e.ref, a, t || e, !t) : u == null && e && e.ref != null && $n(e.ref, null, a, e, !0);
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
		if (d = e.el = l(e.type, a, m && m.is, m), h & 8 ? p(d, e.children) : h & 16 && T(e.children, d, null, r, i, Ci(e, a), s, u), _ && Cn(e, null, r, "created"), ne(d, e, e.scopeId, s, r), m) {
			for (let e in m) e !== "value" && !ee(e) && c(d, e, null, m[e], a, r);
			"value" in m && c(d, "value", null, m.value, a), (f = m.onVnodeBeforeMount) && ta(f, r, e);
		}
		_ && Cn(e, null, r, "beforeMount");
		let v = Ti(i, g);
		v && g.beforeEnter(d), o(d, t, n), ((f = m && m.onVnodeMounted) || v || _) && bi(() => {
			f && ta(f, r, e), v && g.enter(d), _ && Cn(e, null, r, "mounted");
		}, i);
	}, ne = (e, t, n, r, i) => {
		if (n && g(e, n), r) for (let t = 0; t < r.length; t++) g(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || ji(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				ne(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, T = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) v(null, e[l] = s ? Qi(e[l]) : Zi(e[l]), t, n, r, i, a, o, s);
	}, E = (e, n, r, i, a, o, s) => {
		let l = n.el = e.el, { patchFlag: u, dynamicChildren: d, dirs: f } = n;
		u |= e.patchFlag & 16;
		let m = e.props || t, h = n.props || t, g;
		if (r && wi(r, !1), (g = h.onVnodeBeforeUpdate) && ta(g, r, n, e), f && Cn(n, e, r, "beforeUpdate"), r && wi(r, !0), (m.innerHTML && h.innerHTML == null || m.textContent && h.textContent == null) && p(l, ""), d ? D(e.dynamicChildren, d, l, r, i, Ci(n, a), o) : s || k(e, n, l, null, r, i, Ci(n, a), o, !1), u > 0) {
			if (u & 16) re(l, m, h, r, a);
			else if (u & 2 && m.class !== h.class && c(l, "class", null, h.class, a), u & 4 && c(l, "style", m.style, h.style, a), u & 8) {
				let e = n.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let n = e[t], i = m[n], o = h[n];
					(o !== i || n === "value") && c(l, n, i, o, a, r);
				}
			}
			u & 1 && e.children !== n.children && p(l, n.children);
		} else !s && d == null && re(l, m, h, r, a);
		((g = h.onVnodeUpdated) || f) && bi(() => {
			g && ta(g, r, n, e), f && Cn(n, e, r, "updated");
		}, i);
	}, D = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s];
			v(c, l, c.el && (c.type === K || !Wi(c, l) || c.shapeFlag & 198) ? m(c.el) : n, null, r, i, a, o, !0);
		}
	}, re = (e, n, r, i, a) => {
		if (n !== r) {
			if (n !== t) for (let t in n) !ee(t) && !(t in r) && c(e, t, n[t], null, a, i);
			for (let t in r) {
				if (ee(t)) continue;
				let o = r[t], s = n[t];
				o !== s && t !== "value" && c(e, t, s, o, a, i);
			}
			"value" in r && c(e, "value", n.value, r.value, a);
		}
	}, ie = (e, t, n, r, i, a, s, c, l) => {
		let d = t.el = e ? e.el : u(""), f = t.anchor = e ? e.anchor : u(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (c = c ? c.concat(h) : h), e == null ? (o(d, n, r), o(f, n, r), T(t.children || [], n, f, i, a, s, c, l)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (D(e.dynamicChildren, m, n, i, a, s, c), (t.key != null || i && t === i.subTree) && Ei(e, t, !0)) : k(e, t, n, f, i, a, s, c, l);
	}, ae = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : O(t, n, r, i, a, o, c) : se(e, t, c);
	}, O = (e, t, n, r, i, a, o) => {
		let s = e.component = ia(e, r, i);
		if (nr(e) && (s.ctx.renderer = ge), pa(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, ce, o), !e.el) {
				let r = s.subTree = qi(Pi);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else ce(s, e, t, n, i, a, o);
	}, se = (e, t, n) => {
		let r = t.component = e.component;
		if (Qr(e, t, n)) if (r.asyncDep && !r.asyncResolved) {
			le(r, t, n);
			return;
		} else r.next = t, r.update();
		else t.el = e.el, r.vnode = t;
	}, ce = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = Oi(e);
					if (n) {
						t && (t.el = c.el, le(e, t, o)), n.asyncDep.then(() => {
							bi(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, d;
				wi(e, !1), t ? (t.el = c.el, le(e, t, o)) : t = c, n && oe(n), (d = t.props && t.props.onVnodeBeforeUpdate) && ta(d, s, t, c), wi(e, !0);
				let f = Yr(e), p = e.subTree;
				e.subTree = f, v(p, f, m(p.el), he(p), e, i, a), t.el = f.el, u === null && ti(e, f.el), r && bi(r, i), (d = t.props && t.props.onVnodeUpdated) && bi(() => ta(d, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = tr(t);
				if (wi(e, !1), l && oe(l), !m && (o = c && c.onVnodeBeforeMount) && ta(o, d, t), wi(e, !0), s && _e) {
					let t = () => {
						e.subTree = Yr(e), _e(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = Yr(e);
					v(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && bi(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					bi(() => ta(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && tr(d.vnode) && d.vnode.shapeFlag & 256) && e.a && bi(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new Se(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => fn(u), wi(e, !0), l();
	}, le = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, oi(e, t.props, r, n), yi(e, t.children, n), B(), hn(e), Ie();
	}, k = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, u = e ? e.shapeFlag : 0, d = t.children, { patchFlag: f, shapeFlag: m } = t;
		if (f > 0) {
			if (f & 128) {
				j(l, d, n, r, i, a, o, s, c);
				return;
			} else if (f & 256) {
				A(l, d, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (u & 16 && me(l, i, a), d !== l && p(n, d)) : u & 16 ? m & 16 ? j(l, d, n, r, i, a, o, s, c) : me(l, i, a, !0) : (u & 8 && p(n, ""), m & 16 && T(d, n, r, i, a, o, s, c));
	}, A = (e, t, r, i, a, o, s, c, l) => {
		e ||= n, t ||= n;
		let u = e.length, d = t.length, f = Math.min(u, d), p;
		for (p = 0; p < f; p++) {
			let n = t[p] = l ? Qi(t[p]) : Zi(t[p]);
			v(e[p], n, r, null, a, o, s, c, l);
		}
		u > d ? me(e, a, o, !0, !1, f) : T(t, r, i, a, o, s, c, l, f);
	}, j = (e, t, r, i, a, o, s, c, l) => {
		let u = 0, d = t.length, f = e.length - 1, p = d - 1;
		for (; u <= f && u <= p;) {
			let n = e[u], i = t[u] = l ? Qi(t[u]) : Zi(t[u]);
			if (Wi(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			u++;
		}
		for (; u <= f && u <= p;) {
			let n = e[f], i = t[p] = l ? Qi(t[p]) : Zi(t[p]);
			if (Wi(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			f--, p--;
		}
		if (u > f) {
			if (u <= p) {
				let e = p + 1, n = e < d ? t[e].el : i;
				for (; u <= p;) v(null, t[u] = l ? Qi(t[u]) : Zi(t[u]), r, n, a, o, s, c, l), u++;
			}
		} else if (u > p) for (; u <= f;) fe(e[u], a, o, !0), u++;
		else {
			let m = u, h = u, g = /* @__PURE__ */ new Map();
			for (u = h; u <= p; u++) {
				let e = t[u] = l ? Qi(t[u]) : Zi(t[u]);
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
				else for (_ = h; _ <= p; _++) if (C[_ - h] === 0 && Wi(n, t[_])) {
					i = _;
					break;
				}
				i === void 0 ? fe(n, a, o, !0) : (C[i - h] = u + 1, i >= S ? S = i : x = !0, v(n, t[i], r, null, a, o, s, c, l), y++);
			}
			let w = x ? Di(C) : n;
			for (_ = w.length - 1, u = b - 1; u >= 0; u--) {
				let e = h + u, n = t[e], f = t[e + 1], p = e + 1 < d ? f.el || Ai(f) : i;
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
			c.move(e, t, n, ge);
			return;
		}
		if (c === K) {
			o(a, t, n);
			for (let e = 0; e < u.length; e++) de(u[e], t, n, r);
			o(e.anchor, t, n);
			return;
		}
		if (c === Fi) {
			S(e, t, n);
			return;
		}
		if (r !== 2 && d & 1 && l) if (r === 0) l.beforeEnter(a), o(a, t, n), bi(() => l.enter(a), i);
		else {
			let { leave: r, delayLeave: i, afterLeave: c } = l, u = () => {
				e.ctx.isUnmounted ? s(a) : o(a, t, n);
			}, d = () => {
				a._isLeaving && a[Pn](!0), r(a, () => {
					u(), c && c();
				});
			};
			i ? i(a, u, d) : d();
		}
		else o(a, t, n);
	}, fe = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p } = e;
		if (d === -2 && (i = !1), s != null && (B(), $n(s, null, n, e, !0), Ie()), p != null && (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let m = u & 1 && f, h = !tr(e), g;
		if (h && (g = o && o.onVnodeBeforeUnmount) && ta(g, t, e), u & 6) pe(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			m && Cn(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, ge, r) : l && !l.hasOnce && (a !== K || d > 0 && d & 64) ? me(l, t, n, !1, !0) : (a === K && d & 384 || !i && u & 16) && me(c, t, n), r && M(e);
		}
		(h && (g = o && o.onVnodeUnmounted) || m) && bi(() => {
			g && ta(g, t, e), m && Cn(e, null, t, "unmounted");
		}, n);
	}, M = (e) => {
		let { type: t, el: n, anchor: r, transition: i } = e;
		if (t === K) {
			N(n, r);
			return;
		}
		if (t === Fi) {
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
	}, N = (e, t) => {
		let n;
		for (; e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, pe = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		ki(c), ki(l), r && oe(r), i.stop(), a && (a.flags |= 8, fe(o, e, t, n)), s && bi(s, t), bi(() => {
			e.isUnmounted = !0;
		}, t);
	}, me = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) fe(e[o], t, n, r, i);
	}, he = (e) => {
		if (e.shapeFlag & 6) return he(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = h(e.anchor || e.el), n = t && t[Mn];
		return n ? h(n) : t;
	}, P = !1, F = (e, t, n) => {
		let r;
		e == null ? t._vnode && (fe(t._vnode, null, null, !0), r = t._vnode.component) : v(t._vnode || null, e, t, null, null, null, n), t._vnode = e, P ||= (P = !0, hn(r), gn(), !1);
	}, ge = {
		p: v,
		um: fe,
		m: de,
		r: M,
		mt: O,
		mc: T,
		pc: k,
		pbc: D,
		n: he,
		o: e
	}, I, _e;
	return i && ([I, _e] = i(ge)), {
		render: F,
		hydrate: I,
		createApp: Hr(F, I)
	};
}
function Ci({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function wi({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Ti(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ei(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (d(r) && d(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = Qi(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && Ei(t, a)), a.type === Ni && (a.patchFlag === -1 && (a = i[e] = Qi(a)), a.el = t.el), a.type === Pi && !a.el && (a.el = t.el);
	}
}
function Di(e) {
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
function Oi(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : Oi(t);
}
function ki(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Ai(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? Ai(t.subTree) : null;
}
var ji = (e) => e.__isSuspense;
function Mi(e, t) {
	t && t.pendingBranch ? d(e) ? t.effects.push(...e) : t.effects.push(e) : mn(e);
}
var K = /* @__PURE__ */ Symbol.for("v-fgt"), Ni = /* @__PURE__ */ Symbol.for("v-txt"), Pi = /* @__PURE__ */ Symbol.for("v-cmt"), Fi = /* @__PURE__ */ Symbol.for("v-stc"), Ii = [], Li = null;
function q(e = !1) {
	Ii.push(Li = e ? null : []);
}
function Ri() {
	Ii.pop(), Li = Ii[Ii.length - 1] || null;
}
var zi = 1;
function Bi(e, t = !1) {
	zi += e, e < 0 && Li && t && (Li.hasOnce = !0);
}
function Vi(e) {
	return e.dynamicChildren = zi > 0 ? Li || n : null, Ri(), zi > 0 && Li && Li.push(e), e;
}
function J(e, t, n, r, i, a) {
	return Vi(Y(e, t, n, r, i, a, !0));
}
function Hi(e, t, n, r, i) {
	return Vi(qi(e, t, n, r, i, !0));
}
function Ui(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function Wi(e, t) {
	return e.type === t.type && e.key === t.key;
}
var Gi = ({ key: e }) => e ?? null, Ki = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : g(e) || /* @__PURE__ */ Rt(e) || h(e) ? {
	i: yn,
	r: e,
	k: t,
	f: !!n
} : e);
function Y(e, t = null, n = null, r = 0, i = null, a = e === K ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && Gi(t),
		ref: t && Ki(t),
		scopeId: bn,
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
		ctx: yn
	};
	return s ? ($i(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= g(n) ? 8 : 16), zi > 0 && !o && Li && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && Li.push(c), c;
}
var qi = Ji;
function Ji(e, t = null, n = null, r = 0, i = null, a = !1) {
	if ((!e || e === yr) && (e = Pi), Ui(e)) {
		let r = Xi(e, t, !0);
		return n && $i(r, n), zi > 0 && !a && Li && (r.shapeFlag & 6 ? Li[Li.indexOf(e)] = r : Li.push(r)), r.patchFlag = -2, r;
	}
	if (Sa(e) && (e = e.__vccOpts), t) {
		t = Yi(t);
		let { class: e, style: n } = t;
		e && !g(e) && (t.class = M(e)), v(n) && (/* @__PURE__ */ Pt(n) && !d(n) && (n = s({}, n)), t.style = k(n));
	}
	let o = g(e) ? 1 : ji(e) ? 128 : Nn(e) ? 64 : v(e) ? 4 : h(e) ? 2 : 0;
	return Y(e, t, n, r, i, o, a, !0);
}
function Yi(e) {
	return e ? /* @__PURE__ */ Pt(e) || ii(e) ? s({}, e) : e : null;
}
function Xi(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? ea(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && Gi(l),
		ref: t && t.ref ? n && a ? d(a) ? a.concat(Ki(t)) : [a, Ki(t)] : Ki(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== K ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && Xi(e.ssContent),
		ssFallback: e.ssFallback && Xi(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce
	};
	return c && r && qn(u, c.clone(u)), u;
}
function X(e = " ", t = 0) {
	return qi(Ni, null, e, t);
}
function Z(e = "", t = !1) {
	return t ? (q(), Hi(Pi, null, e)) : qi(Pi, null, e);
}
function Zi(e) {
	return e == null || typeof e == "boolean" ? qi(Pi) : d(e) ? qi(K, null, e.slice()) : Ui(e) ? Qi(e) : qi(Ni, null, String(e));
}
function Qi(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : Xi(e);
}
function $i(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (d(t)) n = 16;
	else if (typeof t == "object") if (r & 65) {
		let n = t.default;
		n && (n._c && (n._d = !1), $i(e, n()), n._c && (n._d = !0));
		return;
	} else {
		n = 32;
		let r = t._;
		!r && !ii(t) ? t._ctx = yn : r === 3 && yn && (yn.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
	}
	else h(t) ? (t = {
		default: t,
		_ctx: yn
	}, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [X(t)]) : n = 8);
	e.children = t, e.shapeFlag |= n;
}
function ea(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = M([t.class, r.class]));
		else if (e === "style") t.style = k([t.style, r.style]);
		else if (a(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(d(n) && n.includes(i)) && (t[e] = n ? [].concat(n, i) : i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function ta(e, t, n, r = null) {
	$t(e, t, 7, [n, r]);
}
var na = Br(), ra = 0;
function ia(e, n, r) {
	let i = e.type, a = (n ? n.appContext : e.appContext) || na, o = {
		uid: ra++,
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
		scope: new ye(!0),
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
		propsOptions: ui(i, a),
		emitsOptions: qr(i, a),
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
	return o.ctx = { _: o }, o.root = n ? n.root : o, o.emit = Gr.bind(null, o), e.ce && e.ce(o), o;
}
var aa = null, oa = () => aa || yn, sa, ca;
{
	let e = ue(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	sa = t("__VUE_INSTANCE_SETTERS__", (e) => aa = e), ca = t("__VUE_SSR_SETTERS__", (e) => fa = e);
}
var la = (e) => {
	let t = aa;
	return sa(e), e.scope.on(), () => {
		e.scope.off(), sa(t);
	};
}, ua = () => {
	aa && aa.scope.off(), sa(null);
};
function da(e) {
	return e.vnode.shapeFlag & 4;
}
var fa = !1;
function pa(e, t = !1, n = !1) {
	t && ca(t);
	let { props: r, children: i } = e.vnode, a = da(e);
	ai(e, r, a, t), vi(e, i, n || t);
	let o = a ? ma(e, t) : void 0;
	return t && ca(!1), o;
}
function ma(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Cr);
	let { setup: r } = n;
	if (r) {
		B();
		let n = e.setupContext = r.length > 1 ? ba(e) : null, i = la(e), a = Qt(r, e, 0, [e.props, n]), o = y(a);
		if (Ie(), i(), (o || e.sp) && !tr(e) && Xn(e), o) {
			if (a.then(ua, ua), t) return a.then((n) => {
				ha(e, n, t);
			}).catch((t) => {
				en(t, e, 0);
			});
			e.asyncDep = a;
		} else ha(e, a, t);
	} else va(e, t);
}
function ha(e, t, n) {
	h(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : v(t) && (e.setupState = Ut(t)), va(e, n);
}
var ga, _a;
function va(e, t, n) {
	let i = e.type;
	if (!e.render) {
		if (!t && ga && !i.render) {
			let t = i.template || Ar(e).template;
			if (t) {
				let { isCustomElement: n, compilerOptions: r } = e.appContext.config, { delimiters: a, compilerOptions: o } = i;
				i.render = ga(t, s(s({
					isCustomElement: n,
					delimiters: a
				}, r), o));
			}
		}
		e.render = i.render || r, _a && _a(e);
	}
	{
		let t = la(e);
		B();
		try {
			Er(e);
		} finally {
			Ie(), t();
		}
	}
}
var ya = { get(e, t) {
	return Ge(e, "get", ""), e[t];
} };
function ba(e) {
	return {
		attrs: new Proxy(e.attrs, ya),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function xa(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(Ut(Ft(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in xr) return xr[n](e);
		},
		has(e, t) {
			return t in e || t in xr;
		}
	}) : e.proxy;
}
function Sa(e) {
	return h(e) && "__vccOpts" in e;
}
var Ca = (e, t) => /* @__PURE__ */ Gt(e, t, fa);
function wa(e, t, n) {
	try {
		Bi(-1);
		let r = arguments.length;
		return r === 2 ? v(t) && !d(t) ? Ui(t) ? qi(e, null, [t]) : qi(e, t) : qi(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && Ui(n) && (n = [n]), qi(e, t, n));
	} finally {
		Bi(1);
	}
}
var Ta = "3.5.30", Ea = void 0, Da = typeof window < "u" && window.trustedTypes;
if (Da) try {
	Ea = /* @__PURE__ */ Da.createPolicy("vue", { createHTML: (e) => e });
} catch {}
var Oa = Ea ? (e) => Ea.createHTML(e) : (e) => e, ka = "http://www.w3.org/2000/svg", Aa = "http://www.w3.org/1998/Math/MathML", ja = typeof document < "u" ? document : null, Ma = ja && /* @__PURE__ */ ja.createElement("template"), Na = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? ja.createElementNS(ka, e) : t === "mathml" ? ja.createElementNS(Aa, e) : n ? ja.createElement(e, { is: n }) : ja.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => ja.createTextNode(e),
	createComment: (e) => ja.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => ja.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), !(i === a || !(i = i.nextSibling)););
		else {
			Ma.innerHTML = Oa(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = Ma.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, Pa = "transition", Fa = "animation", Ia = /* @__PURE__ */ Symbol("_vtc"), La = {
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
}, Ra = /* @__PURE__ */ s({}, Rn, La), za = /* @__PURE__ */ ((e) => (e.displayName = "Transition", e.props = Ra, e))((e, { slots: t }) => wa(Hn, Ha(e), t)), Ba = (e, t = []) => {
	d(e) ? e.forEach((e) => e(...t)) : e && e(...t);
}, Va = (e) => e ? d(e) ? e.some((e) => e.length > 1) : e.length > 1 : !1;
function Ha(e) {
	let t = {};
	for (let n in e) n in La || (t[n] = e[n]);
	if (e.css === !1) return t;
	let { name: n = "v", type: r, duration: i, enterFromClass: a = `${n}-enter-from`, enterActiveClass: o = `${n}-enter-active`, enterToClass: c = `${n}-enter-to`, appearFromClass: l = a, appearActiveClass: u = o, appearToClass: d = c, leaveFromClass: f = `${n}-leave-from`, leaveActiveClass: p = `${n}-leave-active`, leaveToClass: m = `${n}-leave-to` } = e, h = Ua(i), g = h && h[0], _ = h && h[1], { onBeforeEnter: v, onEnter: y, onEnterCancelled: b, onLeave: x, onLeaveCancelled: S, onBeforeAppear: C = v, onAppear: w = y, onAppearCancelled: ee = b } = t, te = (e, t, n, r) => {
		e._enterCancelled = r, Ka(e, t ? d : c), Ka(e, t ? u : o), n && n();
	}, ne = (e, t) => {
		e._isLeaving = !1, Ka(e, f), Ka(e, m), Ka(e, p), t && t();
	}, T = (e) => (t, n) => {
		let i = e ? w : y, o = () => te(t, e, n);
		Ba(i, [t, o]), qa(() => {
			Ka(t, e ? l : a), Ga(t, e ? d : c), Va(i) || Ya(t, r, g, o);
		});
	};
	return s(t, {
		onBeforeEnter(e) {
			Ba(v, [e]), Ga(e, a), Ga(e, o);
		},
		onBeforeAppear(e) {
			Ba(C, [e]), Ga(e, l), Ga(e, u);
		},
		onEnter: T(!1),
		onAppear: T(!0),
		onLeave(e, t) {
			e._isLeaving = !0;
			let n = () => ne(e, t);
			Ga(e, f), e._enterCancelled ? (Ga(e, p), $a(e)) : ($a(e), Ga(e, p)), qa(() => {
				e._isLeaving && (Ka(e, f), Ga(e, m), Va(x) || Ya(e, r, _, n));
			}), Ba(x, [e, n]);
		},
		onEnterCancelled(e) {
			te(e, !1, void 0, !0), Ba(b, [e]);
		},
		onAppearCancelled(e) {
			te(e, !0, void 0, !0), Ba(ee, [e]);
		},
		onLeaveCancelled(e) {
			ne(e), Ba(S, [e]);
		}
	});
}
function Ua(e) {
	if (e == null) return null;
	if (v(e)) return [Wa(e.enter), Wa(e.leave)];
	{
		let t = Wa(e);
		return [t, t];
	}
}
function Wa(e) {
	return ce(e);
}
function Ga(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.add(t)), (e[Ia] || (e[Ia] = /* @__PURE__ */ new Set())).add(t);
}
function Ka(e, t) {
	t.split(/\s+/).forEach((t) => t && e.classList.remove(t));
	let n = e[Ia];
	n && (n.delete(t), n.size || (e[Ia] = void 0));
}
function qa(e) {
	requestAnimationFrame(() => {
		requestAnimationFrame(e);
	});
}
var Ja = 0;
function Ya(e, t, n, r) {
	let i = e._endId = ++Ja, a = () => {
		i === e._endId && r();
	};
	if (n != null) return setTimeout(a, n);
	let { type: o, timeout: s, propCount: c } = Xa(e, t);
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
function Xa(e, t) {
	let n = window.getComputedStyle(e), r = (e) => (n[e] || "").split(", "), i = r(`${Pa}Delay`), a = r(`${Pa}Duration`), o = Za(i, a), s = r(`${Fa}Delay`), c = r(`${Fa}Duration`), l = Za(s, c), u = null, d = 0, f = 0;
	t === Pa ? o > 0 && (u = Pa, d = o, f = a.length) : t === Fa ? l > 0 && (u = Fa, d = l, f = c.length) : (d = Math.max(o, l), u = d > 0 ? o > l ? Pa : Fa : null, f = u ? u === Pa ? a.length : c.length : 0);
	let p = u === Pa && /\b(?:transform|all)(?:,|$)/.test(r(`${Pa}Property`).toString());
	return {
		type: u,
		timeout: d,
		propCount: f,
		hasTransform: p
	};
}
function Za(e, t) {
	for (; e.length < t.length;) e = e.concat(e);
	return Math.max(...t.map((t, n) => Qa(t) + Qa(e[n])));
}
function Qa(e) {
	return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function $a(e) {
	return (e ? e.ownerDocument : document).body.offsetHeight;
}
function eo(e, t, n) {
	let r = e[Ia];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var to = /* @__PURE__ */ Symbol("_vod"), no = /* @__PURE__ */ Symbol("_vsh"), ro = {
	name: "show",
	beforeMount(e, { value: t }, { transition: n }) {
		e[to] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : io(e, t);
	},
	mounted(e, { value: t }, { transition: n }) {
		n && t && n.enter(e);
	},
	updated(e, { value: t, oldValue: n }, { transition: r }) {
		!t != !n && (r ? t ? (r.beforeEnter(e), io(e, !0), r.enter(e)) : r.leave(e, () => {
			io(e, !1);
		}) : io(e, t));
	},
	beforeUnmount(e, { value: t }) {
		io(e, t);
	}
};
function io(e, t) {
	e.style.display = t ? e[to] : "none", e[no] = !t;
}
var ao = /* @__PURE__ */ Symbol(""), oo = /(?:^|;)\s*display\s*:/;
function so(e, t, n) {
	let r = e.style, i = g(n), a = !1;
	if (n && !i) {
		if (t) if (g(t)) for (let e of t.split(";")) {
			let t = e.slice(0, e.indexOf(":")).trim();
			n[t] ?? lo(r, t, "");
		}
		else for (let e in t) n[e] ?? lo(r, e, "");
		for (let e in n) e === "display" && (a = !0), lo(r, e, n[e]);
	} else if (i) {
		if (t !== n) {
			let e = r[ao];
			e && (n += ";" + e), r.cssText = n, a = oo.test(n);
		}
	} else t && e.removeAttribute("style");
	to in e && (e[to] = a ? r.display : "", e[no] && (r.display = "none"));
}
var co = /\s*!important$/;
function lo(e, t, n) {
	if (d(n)) n.forEach((n) => lo(e, t, n));
	else if (n ??= "", t.startsWith("--")) e.setProperty(t, n);
	else {
		let r = po(e, t);
		co.test(n) ? e.setProperty(D(r), n.replace(co, ""), "important") : e[r] = n;
	}
}
var uo = [
	"Webkit",
	"Moz",
	"ms"
], fo = {};
function po(e, t) {
	let n = fo[t];
	if (n) return n;
	let r = T(t);
	if (r !== "filter" && r in e) return fo[t] = r;
	r = re(r);
	for (let n = 0; n < uo.length; n++) {
		let i = uo[n] + r;
		if (i in e) return fo[t] = i;
	}
	return t;
}
var mo = "http://www.w3.org/1999/xlink";
function ho(e, t, n, r, i, a = pe(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(mo, t.slice(6, t.length)) : e.setAttributeNS(mo, t, n) : n == null || a && !me(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : _(n) ? String(n) : n);
}
function go(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? Oa(n) : n);
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
		r === "boolean" ? n = me(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
	}
	try {
		e[t] = n;
	} catch {}
	o && e.removeAttribute(i || t);
}
function _o(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function vo(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var yo = /* @__PURE__ */ Symbol("_vei");
function bo(e, t, n, r, i = null) {
	let a = e[yo] || (e[yo] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = So(t);
		r ? _o(e, n, a[t] = Eo(r, i), s) : o && (vo(e, n, o, s), a[t] = void 0);
	}
}
var xo = /(?:Once|Passive|Capture)$/;
function So(e) {
	let t;
	if (xo.test(e)) {
		t = {};
		let n;
		for (; n = e.match(xo);) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
	}
	return [e[2] === ":" ? e.slice(3) : D(e.slice(2)), t];
}
var Co = 0, wo = /* @__PURE__ */ Promise.resolve(), To = () => Co ||= (wo.then(() => Co = 0), Date.now());
function Eo(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		$t(Do(e, n.value), t, 5, [e]);
	};
	return n.value = e, n.attached = To(), n;
}
function Do(e, t) {
	if (d(t)) {
		let n = e.stopImmediatePropagation;
		return e.stopImmediatePropagation = () => {
			n.call(e), e._stopped = !0;
		}, t.map((e) => (t) => !t._stopped && e && e(t));
	} else return t;
}
var Oo = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, ko = (e, t, n, r, i, s) => {
	let c = i === "svg";
	t === "class" ? eo(e, r, c) : t === "style" ? so(e, n, r) : a(t) ? o(t) || bo(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Ao(e, t, r, c)) ? (go(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && ho(e, t, r, c, s, t !== "value")) : e._isVueCE && (jo(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !g(r))) ? go(e, T(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), ho(e, t, r, c));
};
function Ao(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && Oo(t) && h(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return Oo(t) && g(n) ? !1 : t in e;
}
function jo(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = T(t);
	return Array.isArray(n) ? n.some((e) => T(e) === r) : Object.keys(n).some((e) => T(e) === r);
}
var Mo = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return d(t) ? (e) => oe(t, e) : t;
};
function No(e) {
	e.target.composing = !0;
}
function Po(e) {
	let t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var Fo = /* @__PURE__ */ Symbol("_assign");
function Io(e, t, n) {
	return t && (e = e.trim()), n && (e = se(e)), e;
}
var Q = {
	created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
		e[Fo] = Mo(i);
		let a = r || i.props && i.props.type === "number";
		_o(e, t ? "change" : "input", (t) => {
			t.target.composing || e[Fo](Io(e.value, n, a));
		}), (n || a) && _o(e, "change", () => {
			e.value = Io(e.value, n, a);
		}), t || (_o(e, "compositionstart", No), _o(e, "compositionend", Po), _o(e, "change", Po));
	},
	mounted(e, { value: t }) {
		e.value = t ?? "";
	},
	beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: i, number: a } }, o) {
		if (e[Fo] = Mo(o), e.composing) return;
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? se(e.value) : e.value, c = t ?? "";
		s !== c && (document.activeElement === e && e.type !== "range" && (r && t === n || i && e.value.trim() === c) || (e.value = c));
	}
}, Lo = {
	deep: !0,
	created(e, t, n) {
		e[Fo] = Mo(n), _o(e, "change", () => {
			let t = e._modelValue, n = Ho(e), r = e.checked, i = e[Fo];
			if (d(t)) {
				let e = F(t, n), a = e !== -1;
				if (r && !a) i(t.concat(n));
				else if (!r && a) {
					let n = [...t];
					n.splice(e, 1), i(n);
				}
			} else if (p(t)) {
				let e = new Set(t);
				r ? e.add(n) : e.delete(n), i(e);
			} else i(Uo(e, r));
		});
	},
	mounted: Ro,
	beforeUpdate(e, t, n) {
		e[Fo] = Mo(n), Ro(e, t, n);
	}
};
function Ro(e, { value: t, oldValue: n }, r) {
	e._modelValue = t;
	let i;
	if (d(t)) i = F(t, r.props.value) > -1;
	else if (p(t)) i = t.has(r.props.value);
	else {
		if (t === n) return;
		i = P(t, Uo(e, !0));
	}
	e.checked !== i && (e.checked = i);
}
var zo = {
	created(e, { value: t }, n) {
		e.checked = P(t, n.props.value), e[Fo] = Mo(n), _o(e, "change", () => {
			e[Fo](Ho(e));
		});
	},
	beforeUpdate(e, { value: t, oldValue: n }, r) {
		e[Fo] = Mo(r), t !== n && (e.checked = P(t, r.props.value));
	}
}, Bo = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		let i = p(t);
		_o(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? se(Ho(e)) : Ho(e));
			e[Fo](e.multiple ? i ? new Set(t) : t : t[0]), e._assigning = !0, un(() => {
				e._assigning = !1;
			});
		}), e[Fo] = Mo(r);
	},
	mounted(e, { value: t }) {
		Vo(e, t);
	},
	beforeUpdate(e, t, n) {
		e[Fo] = Mo(n);
	},
	updated(e, { value: t }) {
		e._assigning || Vo(e, t);
	}
};
function Vo(e, t) {
	let n = e.multiple, r = d(t);
	if (!(n && !r && !p(t))) {
		for (let i = 0, a = e.options.length; i < a; i++) {
			let a = e.options[i], o = Ho(a);
			if (n) if (r) {
				let e = typeof o;
				e === "string" || e === "number" ? a.selected = t.some((e) => String(e) === String(o)) : a.selected = F(t, o) > -1;
			} else a.selected = t.has(o);
			else if (P(Ho(a), t)) {
				e.selectedIndex !== i && (e.selectedIndex = i);
				return;
			}
		}
		!n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
	}
}
function Ho(e) {
	return "_value" in e ? e._value : e.value;
}
function Uo(e, t) {
	let n = t ? "_trueValue" : "_falseValue";
	return n in e ? e[n] : t;
}
var Wo = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], Go = {
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
	exact: (e, t) => Wo.some((n) => e[`${n}Key`] && !t.includes(n))
}, Ko = (e, t) => {
	if (!e) return e;
	let n = e._withMods ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n, ...r) => {
		for (let e = 0; e < t.length; e++) {
			let r = Go[t[e]];
			if (r && r(n, t)) return;
		}
		return e(n, ...r);
	}));
}, qo = {
	esc: "escape",
	space: " ",
	up: "arrow-up",
	left: "arrow-left",
	right: "arrow-right",
	down: "arrow-down",
	delete: "backspace"
}, Jo = (e, t) => {
	let n = e._withKeys ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n) => {
		if (!("key" in n)) return;
		let r = D(n.key);
		if (t.some((e) => e === r || qo[e] === r)) return e(n);
	}));
}, Yo = /* @__PURE__ */ s({ patchProp: ko }, Na), Xo;
function Zo() {
	return Xo ||= xi(Yo);
}
var Qo = ((...e) => {
	let t = Zo().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = es(e);
		if (!r) return;
		let i = t._component;
		!h(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, $o(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
});
function $o(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function es(e) {
	return g(e) ? document.querySelector(e) : e;
}
//#endregion
//#region src/seven-days1/bridge.ts
var $ = /* @__PURE__ */ Dt({
	isReady: !1,
	latestMesId: -1,
	mvuDataMap: {}
}), ts = () => {
	try {
		if (window.SillyTavern !== void 0) return window.SillyTavern;
		if (window.top && window.top.SillyTavern !== void 0) return window.top.SillyTavern;
		if (window.parent && window.parent.SillyTavern !== void 0) return window.parent.SillyTavern;
	} catch {}
	return null;
}, ns = (e) => {
	let t = ts()?.getContext?.();
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
}, rs = (e) => {
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
}, is = { class: "pm-pda-wrapper" }, as = { class: "pm-pda-controls" }, os = { class: "stb-pm-wrapper" }, ss = { class: "stb-pm-header" }, cs = { style: {
	display: "flex",
	"flex-direction": "column",
	gap: "5px",
	flex: "1"
} }, ls = { class: "stb-pm-location" }, us = {
	class: "stb-pm-env-col",
	style: {
		"align-items": "flex-start",
		"flex-direction": "row"
	}
}, ds = { class: "stb-pm-tag stb-pm-tag-time" }, fs = { class: "stb-pm-tag stb-pm-tag-weather" }, ps = {
	class: "stb-pm-dm-avatar-box",
	title: "观测者正在注视着你..."
}, ms = ["src"], hs = { class: "stb-pm-bgm-container" }, gs = { class: "stb-pm-actions" }, _s = { class: "stb-pm-tabs-container" }, vs = { class: "stb-pm-tab-label" }, ys = ["name"], bs = { class: "stb-pm-tab-content" }, xs = { class: "stb-pm-badges" }, Ss = { class: "stb-pm-badge stb-pm-badge-title" }, Cs = { class: "stb-pm-badge" }, ws = { class: "stb-pm-badge" }, Ts = { class: "stb-pm-panel" }, Es = { class: "stb-pm-bar-container" }, Ds = { class: "stb-pm-bar-header" }, Os = { class: "stb-pm-terminal-data" }, ks = { class: "stb-pm-bar-track" }, As = { class: "stb-pm-bar-container" }, js = { class: "stb-pm-bar-header" }, Ms = { class: "stb-pm-terminal-data" }, Ns = { class: "stb-pm-bar-track" }, Ps = { class: "stb-pm-bar-container" }, Fs = { class: "stb-pm-bar-header" }, Is = { class: "stb-pm-terminal-data" }, Ls = { class: "stb-pm-bar-track" }, Rs = {
	class: "stb-pm-info-row",
	style: {
		"margin-top": "10px",
		border: "none"
	}
}, zs = {
	class: "stb-pm-terminal-data",
	style: {
		color: "#fff59d",
		"font-size": "16px"
	}
}, Bs = {
	class: "stb-pm-panel",
	style: { "border-left-color": "#ce93d8" }
}, Vs = ["innerHTML"], Hs = { class: "stb-pm-panel" }, Us = { class: "stb-pm-limbs-grid" }, Ws = ["data-status"], Gs = { class: "stb-pm-limb-name" }, Ks = { class: "stb-pm-limb-stat" }, qs = { class: "stb-pm-panel" }, Js = ["innerHTML"], Ys = { class: "stb-pm-tab-label" }, Xs = ["name"], Zs = { class: "stb-pm-tab-content" }, Qs = { class: "stb-pm-panel" }, $s = { class: "stb-pm-stats-grid" }, ec = { class: "stb-pm-stat-box" }, tc = { class: "stb-pm-stat-value" }, nc = { class: "stb-pm-stat-box" }, rc = { class: "stb-pm-stat-value" }, ic = { class: "stb-pm-stat-box" }, ac = { class: "stb-pm-stat-value" }, oc = { class: "stb-pm-stat-box" }, sc = { class: "stb-pm-stat-value" }, cc = { class: "stb-pm-stat-box" }, lc = { class: "stb-pm-stat-value" }, uc = { class: "stb-pm-stat-box" }, dc = { class: "stb-pm-stat-value" }, fc = { class: "stb-pm-panel" }, pc = { class: "stb-pm-folder-content stb-pm-terminal-data" }, mc = { class: "stb-pm-folder-content stb-pm-terminal-data" }, hc = { class: "stb-pm-folder-content stb-pm-terminal-data" }, gc = { key: 1 }, _c = { class: "stb-pm-folder-content stb-pm-terminal-data" }, vc = { style: { color: "#ce93d8" } }, yc = { key: 1 }, bc = { class: "stb-pm-panel" }, xc = { class: "stb-pm-folder-content stb-pm-terminal-data" }, Sc = { key: 1 }, Cc = { class: "stb-pm-tab-label" }, wc = ["name"], Tc = { class: "stb-pm-tab-content" }, Ec = { class: "stb-pm-panel" }, Dc = { class: "stb-pm-info-row" }, Oc = { class: "stb-pm-info-value stb-pm-evolution" }, kc = {
	class: "stb-pm-info-row",
	style: {
		"border-bottom": "none",
		"margin-bottom": "0"
	}
}, Ac = { class: "stb-pm-info-value" }, jc = { class: "stb-pm-panel" }, Mc = { class: "stb-pm-terminal-data stb-pm-terminal-data-red" }, Nc = { key: 1 }, Pc = { class: "stb-pm-panel stb-panel-echo" }, Fc = { class: "stb-pm-echo-container" }, Ic = ["innerHTML"], Lc = { class: "stb-pm-tab-label" }, Rc = ["name"], zc = { class: "stb-pm-tab-content" }, Bc = { class: "stb-pm-panel" }, Vc = { class: "stb-pm-folder-content stb-pm-terminal-data" }, Hc = { key: 1 }, Uc = { class: "stb-pm-folder-content" }, Wc = {
	key: 0,
	style: { background: "rgba(129, 212, 250, 0.1)" }
}, Gc = { style: { color: "#81d4fa" } }, Kc = {
	key: 1,
	class: "stb-pm-folder-content stb-pm-terminal-data"
}, qc = { style: {
	display: "flex",
	gap: "10px",
	"margin-bottom": "10px"
} }, Jc = ["src"], Yc = { style: {
	flex: "1",
	display: "flex",
	"flex-direction": "column",
	gap: "5px"
} }, Xc = ["onUpdate:modelValue"], Zc = ["onClick"], Qc = { style: {
	color: "#ff6b6b",
	"font-weight": "bold"
} }, $c = { style: {
	color: "#aaa",
	"font-style": "italic",
	margin: "8px 0",
	"border-left": "3px solid #81d4fa",
	"padding-left": "8px",
	background: "rgba(0,0,0,0.3)",
	"padding-top": "4px",
	"padding-bottom": "4px"
} }, el = { style: {
	"margin-top": "8px",
	"border-top": "1px dashed #444",
	"padding-top": "8px",
	display: "flex",
	"justify-content": "space-between",
	color: "#ccc"
} }, tl = { style: {
	"margin-top": "10px",
	display: "flex",
	gap: "5px"
} }, nl = ["onUpdate:modelValue", "onKeyup"], rl = ["onClick"], il = {
	key: 1,
	class: "stb-pm-terminal-data"
}, al = { class: "stb-pm-folder-content" }, ol = {
	key: 0,
	style: { background: "rgba(212, 175, 55, 0.1)" }
}, sl = { style: { color: "#d4af37" } }, cl = {
	key: 1,
	class: "stb-pm-folder-content stb-pm-terminal-data"
}, ll = { style: {
	display: "flex",
	gap: "10px",
	"margin-bottom": "10px"
} }, ul = ["src"], dl = { style: {
	flex: "1",
	display: "flex",
	"flex-direction": "column",
	gap: "5px"
} }, fl = ["onUpdate:modelValue"], pl = ["onClick"], ml = { style: {
	color: "#ff6b6b",
	"font-weight": "bold"
} }, hl = { style: {
	color: "#aaa",
	"font-style": "italic",
	margin: "8px 0",
	"border-left": "3px solid #d4af37",
	"padding-left": "8px",
	background: "rgba(0,0,0,0.3)",
	"padding-top": "4px",
	"padding-bottom": "4px"
} }, gl = { style: {
	"margin-top": "8px",
	"border-top": "1px dashed #444",
	"padding-top": "8px",
	display: "flex",
	"justify-content": "space-between",
	color: "#ccc"
} }, _l = { style: {
	"margin-top": "10px",
	display: "flex",
	gap: "5px"
} }, vl = ["onUpdate:modelValue", "onKeyup"], yl = ["onClick"], bl = {
	key: 1,
	class: "stb-pm-terminal-data"
}, xl = { class: "stb-pm-tab-label" }, Sl = ["name"], Cl = { class: "stb-pm-tab-content" }, wl = { class: "stb-pm-panel" }, Tl = { class: "stb-pm-info-row" }, El = { class: "stb-pm-info-value" }, Dl = { class: "stb-pm-info-row" }, Ol = { class: "stb-pm-info-value" }, kl = {
	class: "stb-pm-info-row",
	style: {
		"border-bottom": "none",
		"margin-bottom": "0"
	}
}, Al = {
	class: "stb-pm-info-value",
	style: { color: "#81d4fa" }
}, jl = { class: "stb-pm-panel" }, Ml = { class: "stb-pm-folder-content stb-pm-terminal-data stb-pm-terminal-data-red" }, Nl = { key: 1 }, Pl = { class: "stb-pm-tab-label" }, Fl = ["name"], Il = { class: "stb-pm-tab-content" }, Ll = { class: "stb-pm-panel" }, Rl = { class: "stb-pm-info-row" }, zl = {
	class: "stb-pm-info-value",
	style: { color: "#ff6b6b" }
}, Bl = {
	class: "stb-pm-info-row",
	style: {
		"border-bottom": "none",
		"margin-bottom": "0"
	}
}, Vl = { class: "stb-pm-info-value" }, Hl = { class: "stb-pm-panel" }, Ul = { class: "stb-pm-folder-content stb-pm-terminal-data" }, Wl = { key: 1 }, Gl = {
	class: "stb-pm-panel",
	style: { "border-left-color": "#d4af37" }
}, Kl = { class: "stb-pm-rumor-card" }, ql = ["innerHTML"], Jl = { class: "stb-pm-rumor-card" }, Yl = ["innerHTML"], Xl = {
	class: "stb-pm-rumor-card",
	style: { "margin-bottom": "0" }
}, Zl = ["innerHTML"], Ql = /* @__PURE__ */ Yn({
	__name: "App",
	props: { mesId: {
		type: Number,
		required: !0
	} },
	setup(e) {
		let t = e, n = /* @__PURE__ */ U("tab1"), r = /* @__PURE__ */ U(!1), i = /* @__PURE__ */ U(null), a = /* @__PURE__ */ U(localStorage.getItem("pm_dm_avatar_v1") || "https://files.catbox.moe/wfjl6u.png"), o = Ca(() => $.mvuDataMap[t.mesId] || {}), s = Ca(() => $.latestMesId === t.mesId), c = Ca(() => Object.keys(o.value).length > 0), l = Ca(() => t.mesId), u = /* @__PURE__ */ U({
			focus: "",
			echo: "",
			status: "",
			rumor1: "",
			rumor2: "",
			rumor3: "",
			bgm: ""
		}), d = /* @__PURE__ */ U(!1), f = /* @__PURE__ */ Dt({}), p = /* @__PURE__ */ Dt({}), m = Ca(() => {
			let e = o.value?.当前处境 || {};
			return {
				focus: u.value.focus || e.战术聚焦 || "",
				echo: u.value.echo || e.精神回响 || "",
				status: u.value.status || e.特殊状态 || "",
				rumor1: u.value.rumor1 || e.旧巷余声 || "",
				rumor2: u.value.rumor2 || e.暗箱微光 || "",
				rumor3: u.value.rumor3 || e.远钟残响 || "",
				bgm: u.value.bgm || e.环境音轨 || ""
			};
		}), h = () => {
			try {
				let e = (window.top?.SillyTavern?.getContext?.()?.chat || window.SillyTavern?.chat || [])[t.mesId];
				if (e && e.mes) {
					let t = e.mes, n = /<initvar>|pm-master-container|id="pm-app"/i.test(t), r = /<statusbar_data>|战术聚焦[:：]|statusplaceholderimpl/i.test(t);
					if (d.value = !n && r, d.value) {
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
						u.value = {
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
		}, g = (e, t) => {
			let n = Number(e) || 0, r = Number(t) || 1;
			return r === 0 ? "0%" : Math.min(100, Math.max(0, Math.round(n / r * 100))) + "%";
		}, _ = (e) => {
			ns(e);
		}, v = (e) => {
			let t = f[e];
			t && (_(`【终端通讯：发送给 ${e}】\n<pda_msg sender="我">"${t}"</pda_msg>`), f[e] = "");
		}, y = (e, t) => {
			let n = p[e];
			n && (_(`【系统指令：更新立绘】\n<UpdateVariable>\n_.set('${t ? `核心同伴.${e}.立绘URL` : `社交网络.NPC羁绊.${e}.立绘URL`}', '${n}');\n</UpdateVariable>\n(已将 ${e} 的立绘更新为指定图像)`), p[e] = "");
		}, b = () => {
			let e = window.top?.document || document;
			e.fullscreenElement ? e.exitFullscreen && e.exitFullscreen() : e.documentElement.requestFullscreen().catch((e) => {
				console.warn(`Error attempting to enable fullscreen: ${e.message}`);
			});
		}, x = (e, t) => {
			if (!i.value) return;
			let n = e, r = t ? "1" : "0";
			if (n.includes("<iframe") || n.includes("<audio")) n = n.replace(/auto=\d/g, `auto=${r}`), t && !n.includes("allow=\"autoplay\"") && (n = n.replace("<iframe", "<iframe allow=\"autoplay\"")), i.value.innerHTML = n;
			else if (n.startsWith("http") || n.startsWith("//")) {
				let e = n;
				e.includes("auto=") ? e = e.replace(/auto=\d/, `auto=${r}`) : e += e.includes("?") ? `&auto=${r}` : `?auto=${r}`, i.value.innerHTML = `<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width="100%" height="86" src="${e}" allow="autoplay"></iframe>`;
			} else i.value.innerHTML = "";
		}, S = () => {
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
		return On(() => $.mvuDataMap[t.mesId], () => {
			h();
		}, {
			deep: !0,
			immediate: !0
		}), On([() => m.value.bgm, s], ([e, t]) => {
			e && un(() => {
				x(e, t), t && S();
			});
		}, { immediate: !0 }), ur(() => {
			h(), s.value && un(() => S());
		}), (e, t) => W((q(), J("div", is, [Y("div", as, [Y("div", {
			class: "pm-fullscreen-btn",
			onClick: b
		}, " ⛶ 真全屏 "), Y("div", {
			class: "pm-pda-toggle-btn",
			onClick: t[0] ||= (e) => r.value = !r.value
		}, " 👁️ 观测终端 " + I(r.value ? "▼" : "▲"), 1)]), W(Y("div", os, [
			Y("div", ss, [Y("div", cs, [Y("div", ls, I(o.value.当前处境?.当前地点 || "未知"), 1), Y("div", us, [Y("div", ds, "T+" + I(o.value.当前处境?.累计小时数 || 0) + "H", 1), Y("div", fs, I(o.value.当前处境?.当前天象 || "未知"), 1)])]), Y("div", ps, [Y("img", {
				src: a.value,
				class: "stb-pm-dm-avatar",
				onError: t[1] ||= (e) => a.value = "https://files.catbox.moe/wfjl6u.png"
			}, null, 40, ms), t[23] ||= Y("div", { class: "stb-pm-dm-label" }, "DM", -1)])]),
			W(Y("div", hs, [Y("details", {
				open: "",
				onClick: t[2] ||= Ko(() => {}, ["stop"])
			}, [t[24] ||= Y("summary", null, [Y("span", null, "🎵 环境音轨 (BGM)"), Y("span", { class: "stb-pm-bgm-arrow" }, "▼")], -1), Y("div", {
				ref_key: "bgmContainerRef",
				ref: i,
				class: "stb-pm-bgm-content"
			}, null, 512)])], 512), [[ro, m.value.bgm]]),
			Y("div", gs, [Y("a", {
				href: "#",
				class: "stb-pm-btn stb-pm-btn-guide",
				onClick: t[3] ||= Ko((e) => _("【系统指令：呼唤骰娘】请求向导指引"), ["prevent", "stop"])
			}, "◆ 呼唤观测者"), Y("a", {
				href: "#",
				class: "stb-pm-btn stb-pm-btn-mirror",
				onClick: t[4] ||= Ko((e) => _("【系统指令：使用镜面发生器】进入心灵镜牢"), ["prevent", "stop"])
			}, "◇ 潜入心灵镜牢")]),
			Y("div", _s, [
				Y("label", vs, [
					W(Y("input", {
						"onUpdate:modelValue": t[5] ||= (e) => n.value = e,
						type: "radio",
						name: "pm-tabs_" + l.value,
						value: "tab1",
						class: "stb-pm-tab-radio"
					}, null, 8, ys), [[zo, n.value]]),
					t[36] ||= Y("div", { class: "stb-tab-btn" }, "观测主屏", -1),
					Y("div", bs, [
						Y("div", xs, [
							Y("div", Ss, [t[25] ||= Y("strong", null, "Title:", -1), X(" " + I(o.value.玩家角色?.基础属性?.称号 || "未知"), 1)]),
							Y("div", Cs, [t[26] ||= Y("strong", null, "Lv.", -1), X(" " + I(o.value.玩家角色?.基础属性?.等级 || 1), 1)]),
							Y("div", ws, [t[27] ||= Y("strong", null, "Dice:", -1), X(" " + I(o.value.玩家角色?.基础属性?.骰子点数 || 0), 1)])
						]),
						Y("div", Ts, [
							t[32] ||= Y("div", { class: "stb-pm-panel-title" }, "Vital Signs", -1),
							Y("div", Es, [Y("div", Ds, [t[28] ||= Y("span", {
								class: "stb-pm-bar-label",
								style: { color: "#ff6b6b" }
							}, "HP", -1), Y("span", Os, I(o.value.玩家角色?.基础属性?.当前HP ?? 0) + " / " + I(o.value.玩家角色?.基础属性?.最大HP ?? 0), 1)]), Y("div", ks, [Y("div", {
								class: "stb-pm-bar-fill stb-pm-bar-hp",
								style: k({ width: g(o.value.玩家角色?.基础属性?.当前HP, o.value.玩家角色?.基础属性?.最大HP) })
							}, null, 4)])]),
							Y("div", As, [Y("div", js, [t[29] ||= Y("span", {
								class: "stb-pm-bar-label",
								style: { color: "#81d4fa" }
							}, "MP", -1), Y("span", Ms, I(o.value.玩家角色?.基础属性?.当前MP ?? 0) + " / " + I(o.value.玩家角色?.基础属性?.最大MP ?? 0), 1)]), Y("div", Ns, [Y("div", {
								class: "stb-pm-bar-fill stb-pm-bar-mp",
								style: k({ width: g(o.value.玩家角色?.基础属性?.当前MP, o.value.玩家角色?.基础属性?.最大MP) })
							}, null, 4)])]),
							Y("div", Ps, [Y("div", Fs, [t[30] ||= Y("span", {
								class: "stb-pm-bar-label",
								style: { color: "#81c784" }
							}, "SP", -1), Y("span", Is, I(o.value.玩家角色?.基础属性?.理智值 ?? 0) + " / 20", 1)]), Y("div", Ls, [Y("div", {
								class: "stb-pm-bar-fill stb-pm-bar-sp",
								style: k({ width: g(o.value.玩家角色?.基础属性?.理智值, 20) })
							}, null, 4)])]),
							Y("div", Rs, [t[31] ||= Y("span", {
								class: "stb-pm-info-label",
								style: {
									color: "#fbc02d",
									"font-weight": "bold"
								}
							}, "XP (经验值)", -1), Y("span", zs, I(o.value.玩家角色?.基础属性?.经验值 ?? 0), 1)])
						]),
						W(Y("div", Bs, [t[33] ||= Y("div", {
							class: "stb-pm-panel-title",
							style: {
								color: "#ce93d8",
								"border-bottom-color": "rgba(206, 147, 216, 0.3)"
							}
						}, "Special Status", -1), Y("div", {
							class: "stb-pm-status-list",
							innerHTML: m.value.status
						}, null, 8, Vs)], 512), [[ro, m.value.status]]),
						Y("div", Hs, [t[34] ||= Y("div", { class: "stb-pm-panel-title" }, "Biometric Scan", -1), Y("div", Us, [(q(), J(K, null, G([
							"头部",
							"胸部",
							"左臂",
							"右臂",
							"左腿",
							"右腿"
						], (e) => Y("div", {
							key: e,
							"data-status": o.value.玩家角色?.肢体伤病?.[e] || "完好",
							class: "stb-pm-limb-card"
						}, [Y("div", Gs, I(e), 1), Y("div", Ks, I(o.value.玩家角色?.肢体伤病?.[e] || "完好"), 1)], 8, Ws)), 64))])]),
						W(Y("div", qs, [t[35] ||= Y("div", { class: "stb-pm-panel-title" }, "Tactical Focus", -1), Y("div", {
							class: "stb-pm-text-block",
							innerHTML: m.value.focus
						}, null, 8, Js)], 512), [[ro, m.value.focus]])
					])
				]),
				Y("label", Ys, [
					W(Y("input", {
						"onUpdate:modelValue": t[6] ||= (e) => n.value = e,
						type: "radio",
						name: "pm-tabs_" + l.value,
						value: "tab2",
						class: "stb-pm-tab-radio"
					}, null, 8, Xs), [[zo, n.value]]),
					t[51] ||= Y("div", { class: "stb-tab-btn" }, "武装档案", -1),
					Y("div", Zs, [
						Y("div", Qs, [t[43] ||= Y("div", { class: "stb-pm-panel-title" }, "Core Attributes", -1), Y("div", $s, [
							Y("div", ec, [t[37] ||= Y("span", { class: "stb-pm-stat-label" }, "STR", -1), Y("span", tc, I(o.value.玩家角色?.基础属性?.六维?.力量 || 10), 1)]),
							Y("div", nc, [t[38] ||= Y("span", { class: "stb-pm-stat-label" }, "DEX", -1), Y("span", rc, I(o.value.玩家角色?.基础属性?.六维?.敏捷 || 10), 1)]),
							Y("div", ic, [t[39] ||= Y("span", { class: "stb-pm-stat-label" }, "CON", -1), Y("span", ac, I(o.value.玩家角色?.基础属性?.六维?.体质 || 10), 1)]),
							Y("div", oc, [t[40] ||= Y("span", { class: "stb-pm-stat-label" }, "INT", -1), Y("span", sc, I(o.value.玩家角色?.基础属性?.六维?.智力 || 10), 1)]),
							Y("div", cc, [t[41] ||= Y("span", { class: "stb-pm-stat-label" }, "WIS", -1), Y("span", lc, I(o.value.玩家角色?.基础属性?.六维?.感知 || 10), 1)]),
							Y("div", uc, [t[42] ||= Y("span", { class: "stb-pm-stat-label" }, "CHA", -1), Y("span", dc, I(o.value.玩家角色?.基础属性?.六维?.魅力 || 10), 1)])
						])]),
						Y("div", fc, [
							t[48] ||= Y("div", { class: "stb-pm-panel-title" }, "Equipped Gear", -1),
							Y("details", {
								class: "stb-pm-folder",
								open: "",
								onClick: t[7] ||= Ko(() => {}, ["stop"])
							}, [t[44] ||= Y("summary", null, [Y("span", null, "⚔️ 主武器"), Y("span", { class: "stb-pm-folder-arrow" }, "▼")], -1), Y("div", pc, I(o.value.玩家角色?.武装战力?.主武器 || "空"), 1)]),
							Y("details", {
								class: "stb-pm-folder",
								open: "",
								onClick: t[8] ||= Ko(() => {}, ["stop"])
							}, [t[45] ||= Y("summary", null, [Y("span", null, "🛡️ 防具"), Y("span", { class: "stb-pm-folder-arrow" }, "▼")], -1), Y("div", mc, I(o.value.玩家角色?.武装战力?.防具 || "空"), 1)]),
							Y("details", {
								class: "stb-pm-folder",
								open: "",
								onClick: t[9] ||= Ko(() => {}, ["stop"])
							}, [t[46] ||= Y("summary", null, [Y("span", null, "💍 饰品"), Y("span", { class: "stb-pm-folder-arrow" }, "▼")], -1), Y("div", hc, [Object.keys(o.value.玩家角色?.武装战力?.饰品 || {}).length > 0 ? (q(!0), J(K, { key: 0 }, G(o.value.玩家角色?.武装战力?.饰品, (e, t) => (q(), J("div", { key: t }, "👉 " + I(t) + ": " + I(e), 1))), 128)) : (q(), J("div", gc, "空"))])]),
							Y("details", {
								class: "stb-pm-folder",
								open: "",
								onClick: t[10] ||= Ko(() => {}, ["stop"])
							}, [t[47] ||= Y("summary", null, [Y("span", { style: { color: "#ce93d8" } }, "✨ 技能/战技"), Y("span", { class: "stb-pm-folder-arrow" }, "▼")], -1), Y("div", _c, [Object.keys(o.value.玩家角色?.武装战力?.技能列表 || {}).length > 0 ? (q(!0), J(K, { key: 0 }, G(o.value.玩家角色?.武装战力?.技能列表, (e, t) => (q(), J("div", {
								key: t,
								style: { "margin-bottom": "5px" }
							}, [Y("strong", vc, "[" + I(t) + "]", 1), X(": " + I(e), 1)]))), 128)) : (q(), J("div", yc, "无"))])])
						]),
						Y("div", bc, [t[50] ||= Y("div", { class: "stb-pm-panel-title" }, "Inventory", -1), Y("details", {
							class: "stb-pm-folder",
							open: "",
							onClick: t[11] ||= Ko(() => {}, ["stop"])
						}, [t[49] ||= Y("summary", null, [Y("span", null, "🎒 背包道具"), Y("span", { class: "stb-pm-folder-arrow" }, "▼")], -1), Y("div", xc, [Object.keys(o.value.玩家角色?.武装战力?.背包道具 || {}).length > 0 ? (q(!0), J(K, { key: 0 }, G(o.value.玩家角色?.武装战力?.背包道具, (e, t) => (q(), J("div", { key: t }, " 🍱 " + I(t) + " (" + I(e?.数量 || 1) + ") - " + I(e?.描述 || "无"), 1))), 128)) : (q(), J("div", Sc, "无"))])])])
					])
				]),
				Y("label", Cc, [
					W(Y("input", {
						"onUpdate:modelValue": t[12] ||= (e) => n.value = e,
						type: "radio",
						name: "pm-tabs_" + l.value,
						value: "tab3",
						class: "stb-pm-tab-radio"
					}, null, 8, wc), [[zo, n.value]]),
					t[57] ||= Y("div", { class: "stb-tab-btn" }, "深层意识", -1),
					Y("div", Tc, [
						Y("div", Ec, [
							t[54] ||= Y("div", { class: "stb-pm-panel-title" }, "Sanity Evolution", -1),
							Y("div", Dc, [t[52] ||= Y("span", { class: "stb-pm-info-label" }, "当前阶段", -1), Y("span", Oc, I(o.value.玩家角色?.理智演化?.当前阶段 || "正常"), 1)]),
							Y("div", kc, [t[53] ||= Y("span", { class: "stb-pm-info-label" }, "理智稳定性", -1), Y("span", Ac, I(o.value.玩家角色?.基础属性?.理智稳定性 || 100) + " / 100", 1)])
						]),
						Y("div", jc, [t[55] ||= Y("div", { class: "stb-pm-panel-title" }, "Karma (专属业障)", -1), Y("div", Mc, [Object.keys(o.value.玩家角色?.基础属性?.专属业障 || {}).length > 0 ? (q(!0), J(K, { key: 0 }, G(o.value.玩家角色?.基础属性?.专属业障, (e, t) => (q(), J("div", { key: t }, "⚡ [" + I(t) + "] " + I(e), 1))), 128)) : (q(), J("div", Nc, "无"))])]),
						W(Y("div", Pc, [t[56] ||= Y("div", {
							class: "stb-pm-panel-title",
							style: {
								color: "#ff6b6b",
								"border-bottom-color": "rgba(255, 107, 107, 0.3)"
							}
						}, "Mental Echo (精神回响)", -1), Y("div", Fc, [Y("div", {
							class: "stb-pm-echo-text",
							innerHTML: m.value.echo
						}, null, 8, Ic)])], 512), [[ro, m.value.echo]])
					])
				]),
				Y("label", Lc, [
					W(Y("input", {
						"onUpdate:modelValue": t[13] ||= (e) => n.value = e,
						type: "radio",
						name: "pm-tabs_" + l.value,
						value: "tab4",
						class: "stb-pm-tab-radio"
					}, null, 8, Rc), [[zo, n.value]]),
					t[64] ||= Y("div", { class: "stb-tab-btn" }, "社交与通讯", -1),
					Y("div", zc, [Y("div", Bc, [
						t[63] ||= Y("div", { class: "stb-pm-panel-title" }, "Social Network & PDA", -1),
						Y("details", {
							class: "stb-pm-folder",
							open: "",
							onClick: t[14] ||= Ko(() => {}, ["stop"])
						}, [t[58] ||= Y("summary", null, [Y("span", null, "🏛️ 势力声望"), Y("span", { class: "stb-pm-folder-arrow" }, "▼")], -1), Y("div", Vc, [Object.keys(o.value.社交网络?.势力声望 || {}).length > 0 ? (q(!0), J(K, { key: 0 }, G(o.value.社交网络?.势力声望, (e, t) => (q(), J("div", { key: t }, "🏛️ " + I(t) + ": " + I(e ?? 0), 1))), 128)) : (q(), J("div", Hc, "无"))])]),
						Y("details", {
							class: "stb-pm-folder",
							open: "",
							onClick: t[16] ||= Ko(() => {}, ["stop"])
						}, [t[60] ||= Y("summary", null, [Y("span", null, "👥 核心同伴 (通讯录)"), Y("span", { class: "stb-pm-folder-arrow" }, "▼")], -1), Y("div", Uc, [Object.keys(o.value.核心同伴 || {}).length > 0 ? (q(!0), J(K, { key: 0 }, G(o.value.核心同伴, (e, n) => (q(), J("details", {
							key: n,
							class: "stb-pm-folder",
							style: {
								"border-color": "#81d4fa",
								"margin-top": "5px"
							},
							onClick: t[15] ||= Ko(() => {}, ["stop"])
						}, [n !== "$meta" && n !== "无" ? (q(), J("summary", Wc, [Y("span", Gc, "👥 " + I(n) + " (Lv." + I(e?.等级 ?? 1) + ")", 1), t[59] ||= Y("span", { class: "stb-pm-folder-arrow" }, "▼", -1)])) : Z("", !0), n !== "$meta" && n !== "无" ? (q(), J("div", Kc, [
							Y("div", qc, [e?.立绘URL ? (q(), J("img", {
								key: 0,
								src: e.立绘URL,
								style: {
									width: "80px",
									height: "80px",
									"object-fit": "cover",
									border: "2px solid #81d4fa",
									"border-radius": "8px"
								}
							}, null, 8, Jc)) : Z("", !0), Y("div", Yc, [W(Y("input", {
								"onUpdate:modelValue": (e) => p[String(n)] = e,
								type: "text",
								placeholder: "输入图片URL更新立绘...",
								style: {
									width: "100%",
									background: "rgba(0,0,0,0.5)",
									border: "1px solid #81d4fa",
									color: "#fff",
									padding: "4px",
									"border-radius": "4px",
									"font-size": "12px"
								}
							}, null, 8, Xc), [[Q, p[String(n)]]]), Y("button", {
								style: {
									background: "#81d4fa",
									color: "#000",
									border: "none",
									padding: "4px",
									"border-radius": "4px",
									cursor: "pointer",
									"font-weight": "bold",
									"font-size": "12px"
								},
								onClick: (e) => y(String(n), !0)
							}, "更新立绘", 8, Zc)])]),
							Y("div", Qc, "🩸 HP: " + I(e?.当前HP ?? "?") + "/" + I(e?.最大HP ?? "?") + " | 🧠 SP: " + I(e?.理智值 ?? "?"), 1),
							Y("div", $c, "💭 心里话: \"" + I(e?.心里话 || "...") + "\"", 1),
							Y("div", el, [
								Y("span", null, "好感: " + I(e?.好感度 ?? 0), 1),
								Y("span", null, "恐惧: " + I(e?.恐惧度 ?? 0), 1),
								Y("span", null, "信任: " + I(e?.信任度 ?? 0), 1),
								Y("span", null, "欲望: " + I(e?.欲望度 ?? 0), 1)
							]),
							Y("div", tl, [W(Y("input", {
								"onUpdate:modelValue": (e) => f[String(n)] = e,
								type: "text",
								placeholder: "发送终端短信...",
								style: {
									flex: "1",
									background: "rgba(0,0,0,0.5)",
									border: "1px solid #555",
									color: "#fff",
									padding: "6px",
									"border-radius": "4px",
									"font-size": "13px"
								},
								onKeyup: Jo((e) => v(String(n)), ["enter"])
							}, null, 40, nl), [[Q, f[String(n)]]]), Y("button", {
								style: {
									background: "var(--pm-gold)",
									color: "#000",
									border: "none",
									padding: "0 15px",
									"border-radius": "4px",
									cursor: "pointer",
									"font-weight": "bold"
								},
								onClick: (e) => v(String(n))
							}, "发送", 8, rl)])
						])) : Z("", !0)]))), 128)) : (q(), J("div", il, "无"))])]),
						Y("details", {
							class: "stb-pm-folder",
							open: "",
							onClick: t[18] ||= Ko(() => {}, ["stop"])
						}, [t[62] ||= Y("summary", null, [Y("span", null, "🔗 NPC羁绊 (通讯录)"), Y("span", { class: "stb-pm-folder-arrow" }, "▼")], -1), Y("div", al, [Object.keys(o.value.社交网络?.NPC羁绊 || {}).length > 0 ? (q(!0), J(K, { key: 0 }, G(o.value.社交网络?.NPC羁绊, (e, n) => (q(), J("details", {
							key: n,
							class: "stb-pm-folder",
							style: {
								"border-color": "#d4af37",
								"margin-top": "5px"
							},
							onClick: t[17] ||= Ko(() => {}, ["stop"])
						}, [n !== "$meta" && n !== "无" ? (q(), J("summary", ol, [Y("span", sl, "🔗 " + I(n) + " (Lv." + I(e?.等级 ?? "?") + ")", 1), t[61] ||= Y("span", { class: "stb-pm-folder-arrow" }, "▼", -1)])) : Z("", !0), n !== "$meta" && n !== "无" ? (q(), J("div", cl, [
							Y("div", ll, [e?.立绘URL ? (q(), J("img", {
								key: 0,
								src: e.立绘URL,
								style: {
									width: "80px",
									height: "80px",
									"object-fit": "cover",
									border: "2px solid #d4af37",
									"border-radius": "8px"
								}
							}, null, 8, ul)) : Z("", !0), Y("div", dl, [W(Y("input", {
								"onUpdate:modelValue": (e) => p[String(n)] = e,
								type: "text",
								placeholder: "输入图片URL更新立绘...",
								style: {
									width: "100%",
									background: "rgba(0,0,0,0.5)",
									border: "1px solid #d4af37",
									color: "#fff",
									padding: "4px",
									"border-radius": "4px",
									"font-size": "12px"
								}
							}, null, 8, fl), [[Q, p[String(n)]]]), Y("button", {
								style: {
									background: "#d4af37",
									color: "#000",
									border: "none",
									padding: "4px",
									"border-radius": "4px",
									cursor: "pointer",
									"font-weight": "bold",
									"font-size": "12px"
								},
								onClick: (e) => y(String(n), !1)
							}, "更新立绘", 8, pl)])]),
							Y("div", ml, "🩸 HP: " + I(e?.当前HP ?? "?") + "/" + I(e?.最大HP ?? "?"), 1),
							Y("div", hl, "💭 心里话: \"" + I(e?.心里话 || "...") + "\"", 1),
							Y("div", gl, [
								Y("span", null, "好感: " + I(e?.好感度 ?? 0), 1),
								Y("span", null, "恐惧: " + I(e?.恐惧度 ?? 0), 1),
								Y("span", null, "信任: " + I(e?.信任度 ?? 0), 1),
								Y("span", null, "欲望: " + I(e?.欲望度 ?? 0), 1)
							]),
							Y("div", _l, [W(Y("input", {
								"onUpdate:modelValue": (e) => f[String(n)] = e,
								type: "text",
								placeholder: "发送终端短信...",
								style: {
									flex: "1",
									background: "rgba(0,0,0,0.5)",
									border: "1px solid #555",
									color: "#fff",
									padding: "6px",
									"border-radius": "4px",
									"font-size": "13px"
								},
								onKeyup: Jo((e) => v(String(n)), ["enter"])
							}, null, 40, vl), [[Q, f[String(n)]]]), Y("button", {
								style: {
									background: "var(--pm-gold)",
									color: "#000",
									border: "none",
									padding: "0 15px",
									"border-radius": "4px",
									cursor: "pointer",
									"font-weight": "bold"
								},
								onClick: (e) => v(String(n))
							}, "发送", 8, yl)])
						])) : Z("", !0)]))), 128)) : (q(), J("div", bl, "无"))])])
					])])
				]),
				Y("label", xl, [
					W(Y("input", {
						"onUpdate:modelValue": t[19] ||= (e) => n.value = e,
						type: "radio",
						name: "pm-tabs_" + l.value,
						value: "tab5",
						class: "stb-pm-tab-radio"
					}, null, 8, Sl), [[zo, n.value]]),
					t[71] ||= Y("div", { class: "stb-tab-btn" }, "据点收容", -1),
					Y("div", Cl, [Y("div", wl, [
						t[68] ||= Y("div", { class: "stb-pm-panel-title" }, "Facility Status", -1),
						Y("div", Tl, [t[65] ||= Y("span", { class: "stb-pm-info-label" }, "供电等级", -1), Y("span", El, I(o.value.据点收容?.设施状态?.供电等级 || "未知"), 1)]),
						Y("div", Dl, [t[66] ||= Y("span", { class: "stb-pm-info-label" }, "防御等级", -1), Y("span", Ol, "Lv." + I(o.value.据点收容?.设施状态?.防御等级 || 0), 1)]),
						Y("div", kl, [t[67] ||= Y("span", { class: "stb-pm-info-label" }, "脑啡肽储量", -1), Y("span", Al, I(o.value.据点收容?.资源储备?.脑啡肽储量 || 0), 1)])
					]), Y("div", jl, [t[70] ||= Y("div", { class: "stb-pm-panel-title" }, "Containment Units", -1), Y("details", {
						class: "stb-pm-folder",
						open: "",
						onClick: t[20] ||= Ko(() => {}, ["stop"])
					}, [t[69] ||= Y("summary", null, [Y("span", null, "📦 收容单元列表"), Y("span", { class: "stb-pm-folder-arrow" }, "▼")], -1), Y("div", Ml, [Object.keys(o.value.据点收容?.收容单元 || {}).length > 0 ? (q(!0), J(K, { key: 0 }, G(o.value.据点收容?.收容单元, (e, t) => (q(), J("div", { key: t }, " ⚠️ [" + I(t) + "] 危险:" + I(e?.危险等级 || "未知") + " | 状态:" + I(e?.状态 || "未知"), 1))), 128)) : (q(), J("div", Nl, "无"))])])])])
				]),
				Y("label", Pl, [
					W(Y("input", {
						"onUpdate:modelValue": t[21] ||= (e) => n.value = e,
						type: "radio",
						name: "pm-tabs_" + l.value,
						value: "tab6",
						class: "stb-pm-tab-radio"
					}, null, 8, Fl), [[zo, n.value]]),
					t[81] ||= Y("div", { class: "stb-tab-btn" }, "任务异闻", -1),
					Y("div", Il, [
						Y("div", Ll, [
							t[74] ||= Y("div", { class: "stb-pm-panel-title" }, "Current Encounter", -1),
							Y("div", Rl, [t[72] ||= Y("span", { class: "stb-pm-info-label" }, "状态", -1), Y("span", zl, I(o.value.当前处境?.当前遭遇?.状态 || "未知"), 1)]),
							Y("div", Bl, [t[73] ||= Y("span", { class: "stb-pm-info-label" }, "危险度", -1), Y("span", Vl, I(o.value.当前处境?.当前遭遇?.危险度 || "未知"), 1)])
						]),
						Y("div", Hl, [t[76] ||= Y("div", { class: "stb-pm-panel-title" }, "Active Quests", -1), Y("details", {
							class: "stb-pm-folder",
							open: "",
							onClick: t[22] ||= Ko(() => {}, ["stop"])
						}, [t[75] ||= Y("summary", null, [Y("span", null, "📜 任务列表"), Y("span", { class: "stb-pm-folder-arrow" }, "▼")], -1), Y("div", Ul, [Object.keys(o.value.当前处境?.任务列表 || {}).length > 0 ? (q(!0), J(K, { key: 0 }, G(o.value.当前处境?.任务列表, (e, t) => (q(), J("div", { key: t }, " 📌 [" + I(t) + "] 评级:" + I(e?.评级 || "未知") + " | 状态:" + I(e?.状态 || "未知"), 1))), 128)) : (q(), J("div", Wl, "无"))])])]),
						W(Y("div", Gl, [
							t[80] ||= Y("div", {
								class: "stb-pm-panel-title",
								style: {
									color: "#d4af37",
									"border-bottom-color": "rgba(212, 175, 55, 0.3)"
								}
							}, "Urban Rumors (都市截获)", -1),
							W(Y("div", Kl, [t[77] ||= Y("div", { class: "stb-pm-rumor-title" }, "旧巷余声", -1), Y("div", {
								class: "stb-pm-rumor-text",
								innerHTML: m.value.rumor1
							}, null, 8, ql)], 512), [[ro, m.value.rumor1]]),
							W(Y("div", Jl, [t[78] ||= Y("div", { class: "stb-pm-rumor-title" }, "暗箱微光", -1), Y("div", {
								class: "stb-pm-rumor-text",
								innerHTML: m.value.rumor2
							}, null, 8, Yl)], 512), [[ro, m.value.rumor2]]),
							W(Y("div", Xl, [t[79] ||= Y("div", { class: "stb-pm-rumor-title" }, "远钟残响", -1), Y("div", {
								class: "stb-pm-rumor-text",
								innerHTML: m.value.rumor3
							}, null, 8, Zl)], 512), [[ro, m.value.rumor3]])
						], 512), [[ro, m.value.rumor1 || m.value.rumor2 || m.value.rumor3]])
					])
				])
			])
		], 512), [[ro, r.value]])], 512)), [[ro, s.value && (d.value || c.value)]]);
	}
}), $l = {
	key: 0,
	class: "pm-master-container"
}, eu = ["innerHTML"], tu = {
	key: 0,
	class: "modal-overlay"
}, nu = { class: "modal-content" }, ru = ["value"], iu = {
	key: "already_started",
	class: "page-check"
}, au = {
	key: "check",
	class: "page-check"
}, ou = { class: "sys-check-box" }, su = { style: { color: "var(--pm-gold)" } }, cu = {
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
	style: { color: "#ff4444" }
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
	"margin-bottom": "15px",
	color: "var(--pm-gold)"
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
		color: "#ff4444",
		"font-weight": "bold",
		"margin-top": "15px"
	}
}, kp = ["disabled"], Ap = {
	key: "settings",
	class: "page-settings"
}, jp = { style: {
	"font-size": "1.2em",
	color: "var(--pm-gold)",
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
}, qp = /* @__PURE__ */ Yn({
	__name: "SetupModal",
	setup(e) {
		let t = /* @__PURE__ */ U(!0), n = /* @__PURE__ */ U("check"), r = /* @__PURE__ */ U(!1), i = /* @__PURE__ */ U(!1), a = /* @__PURE__ */ U(!1), o = /* @__PURE__ */ U(!1), s = /* @__PURE__ */ U(""), c = /* @__PURE__ */ U(""), l = /* @__PURE__ */ U(localStorage.getItem("pm_dm_avatar_v1") || "https://files.catbox.moe/wfjl6u.png"), u = /* @__PURE__ */ U(null), d = () => {
			u.value && u.value.click();
		}, f = (e) => {
			let t = e.target.files?.[0];
			if (!t) return;
			let n = new FileReader();
			n.onload = (e) => {
				e.target?.result && (l.value = e.target.result, localStorage.setItem("pm_dm_avatar_v1", l.value));
			}, n.readAsDataURL(t), e.target.value = "";
		}, p = /* @__PURE__ */ U(""), m = /* @__PURE__ */ U(null), h = () => {
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
		}, v = /* @__PURE__ */ Dt([{
			id: "dom",
			label: "⚙️ 观测者终端连接",
			status: "loading",
			statusText: "检测中"
		}, {
			id: "mvu",
			label: "🧩 变量引擎 (MVU)",
			status: "loading",
			statusText: "检测中"
		}]), y = /* @__PURE__ */ U({}), b = /* @__PURE__ */ U(""), x = Ca(() => Object.keys(y.value).length > 0), S = Ca(() => v[0].status === "ok"), C = () => {
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
		ur(() => {
			ee(), ye();
		}), mr(() => {
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
		], E = /* @__PURE__ */ Dt({
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
		}), D = /* @__PURE__ */ U(null), re = () => {
			D.value && D.value.focus();
		}, ie = Ca(() => {
			if (E.character === "custom") return A.name || "自定义(命运掷骰)";
			let e = T.find((e) => e.id === E.character);
			return e ? e.name : "未知";
		}), ae = (e) => {
			E.character = e, n.value = "settings";
		}, oe = /* @__PURE__ */ U("pre-roll"), O = /* @__PURE__ */ U(!1), se = /* @__PURE__ */ U(0), ce = /* @__PURE__ */ U(0), le = {
			str: "力量",
			dex: "敏捷",
			con: "体质",
			int: "智力",
			wis: "感知",
			cha: "魅力"
		}, ue = {
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
		}, k = /* @__PURE__ */ Dt({ ...ue }), A = /* @__PURE__ */ Dt({
			name: "",
			race: "",
			profession: "",
			desc: ""
		}), j = /* @__PURE__ */ Dt({
			enabled: !1,
			name: "",
			desc: ""
		}), de = [
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
		], fe = [
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
		], N = /* @__PURE__ */ Dt({
			traits: [],
			weapons: [],
			armors: [],
			items: [],
			karmas: [],
			skills: []
		}), pe = (e) => {
			N[e].push({
				name: "",
				desc: "",
				tier: "",
				cost: 0,
				refund: 0,
				rolled: !1
			});
		}, me = (e, t) => {
			N[e].splice(t, 1);
		}, he = (e, t) => {
			let n = N[e][t];
			if (!n.tier) return;
			let r = (e === "karmas" ? fe : de).find((e) => e.label === n.tier);
			if (r) {
				let t = Math.floor(Math.random() * (r.max - r.min + 1)) + r.min;
				e === "karmas" ? n.refund = t : n.cost = t, n.rolled = !0;
			}
		}, P = /* @__PURE__ */ Dt({
			backgrounds: [],
			egos: [],
			karmas: [],
			skills: []
		}), F = /* @__PURE__ */ Dt({
			backgrounds: [],
			egos: [],
			karmas: [],
			skills: []
		}), ge = /* @__PURE__ */ U(""), _e = /* @__PURE__ */ U([]), ve = /* @__PURE__ */ U(-1), L = /* @__PURE__ */ U(""), ye = () => {
			try {
				let e = localStorage.getItem("pm_custom_presets_v5");
				e && (_e.value = JSON.parse(e));
			} catch (e) {
				console.warn("无法读取本地预设", e);
			}
		}, be = () => {
			if (!L.value) return;
			let e = {
				name: L.value,
				stats: { ...k },
				persona: { ...A },
				companion: { ...j },
				diy: JSON.parse(JSON.stringify(N)),
				idea: ge.value,
				selectedItems: {
					backgrounds: [...F.backgrounds],
					egos: [...F.egos],
					karmas: [...F.karmas],
					skills: [...F.skills]
				}
			};
			_e.value.push(e);
			try {
				localStorage.setItem("pm_custom_presets_v5", JSON.stringify(_e.value)), alert("预设保存成功！"), L.value = "", ve.value = _e.value.length - 1;
			} catch {
				alert("保存失败，可能是浏览器限制了本地存储。");
			}
		}, R = () => {
			if (ve.value === -1) return;
			let e = _e.value[ve.value];
			e && (Object.assign(k, e.stats), Object.assign(A, e.persona), Object.assign(j, e.companion), e.diy && [
				"traits",
				"weapons",
				"armors",
				"items",
				"karmas",
				"skills"
			].forEach((t) => {
				N[t].splice(0, N[t].length), e.diy[t] && e.diy[t].length > 0 && N[t].push(...JSON.parse(JSON.stringify(e.diy[t])));
			}), ge.value = e.idea || "", e.selectedItems && (F.backgrounds.splice(0, F.backgrounds.length, ...e.selectedItems.backgrounds || []), F.egos.splice(0, F.egos.length, ...e.selectedItems.egos || []), F.karmas.splice(0, F.karmas.length, ...e.selectedItems.karmas || []), F.skills.splice(0, F.skills.length, ...e.selectedItems.skills || []), e.selectedItems.backgrounds.forEach((e) => {
				P.backgrounds.find((t) => t.name === e.name) || P.backgrounds.push(e);
			}), e.selectedItems.egos.forEach((e) => {
				P.egos.find((t) => t.name === e.name) || P.egos.push(e);
			}), e.selectedItems.karmas.forEach((e) => {
				P.karmas.find((t) => t.name === e.name) || P.karmas.push(e);
			}), e.selectedItems.skills.forEach((e) => {
				P.skills.find((t) => t.name === e.name) || P.skills.push(e);
			})), alert("预设读取成功！"));
		}, xe = () => {
			E.character = "custom", n.value = "custom_char";
		}, Se = [
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
		], Ce = [
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
		], we = [
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
		], Te = [
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
		], Ee = (e, t, n) => [...e.filter((e) => !e.minQ || n >= e.minQ)].sort(() => .5 - Math.random()).slice(0, t), De = () => {
			O.value = !0, setTimeout(() => {
				se.value = Math.floor(Math.random() * 8999) + 1e3, ce.value = Math.floor(Math.random() * 100) + 1, P.backgrounds = Ee(Se, 3, ce.value), P.egos = Ee(Ce, 3, ce.value), P.karmas = Ee(we, 3, ce.value), P.skills = Ee(Te, 2, ce.value), O.value = !1, oe.value = "shopping";
			}, 1500);
		}, Oe = Ca(() => {
			let e = ce.value;
			return e <= 50 ? "普通 (最高HE级)" : e <= 85 ? "好运 (必出WAW级或强力奇点)" : e <= 95 ? "极运 (必出ALEPH级残片或色彩级背景)" : "深渊注视 (出现完整ALEPH级神装)";
		}), ke = (e, t) => {
			let n = 0;
			for (let r = e + 1; r <= t; r++) n += r <= 15 ? 50 : 150;
			return n;
		}, Ae = Ca(() => {
			let e = se.value;
			return e -= (k.level - ue.level) * 100, e -= (k.hp - ue.hp) / 10 * 20, e -= (k.mp - ue.mp) / 10 * 20, e -= (k.sp - ue.sp) * 50, e -= (k.stability - ue.stability) / 5 * 30, [
				"str",
				"dex",
				"con",
				"int",
				"wis",
				"cha"
			].forEach((t) => {
				e -= ke(ue[t], k[t]);
			}), F.backgrounds.forEach((t) => e -= t.cost), F.egos.forEach((t) => e -= t.cost), F.karmas.forEach((t) => e += t.refund), F.skills.forEach((t) => e -= t.cost), N.traits.forEach((t) => {
				t.rolled && (e -= t.cost);
			}), N.weapons.forEach((t) => {
				t.rolled && (e -= t.cost);
			}), N.armors.forEach((t) => {
				t.rolled && (e -= t.cost);
			}), N.items.forEach((t) => {
				t.rolled && (e -= t.cost);
			}), N.karmas.forEach((t) => {
				t.rolled && (e += t.refund);
			}), N.skills.forEach((t) => {
				t.rolled && (e -= t.cost);
			}), j.enabled && (e -= 2e3), e;
		}), je = (e, t) => {
			let n = F[e].findIndex((e) => e.name === t.name);
			n > -1 ? F[e].splice(n, 1) : F[e].push(t);
		}, Me = (e, t) => F[e].some((e) => e.name === t.name), Ne = Ca(() => F.karmas.length > 0 || N.karmas.some((e) => e.name && e.rolled)), Pe = () => {
			let e = (e) => e.some((e) => e.name && !e.rolled);
			if (e(N.traits) || e(N.weapons) || e(N.armors) || e(N.items) || e(N.karmas) || e(N.skills)) {
				alert("您有自定义的 DIY 项目尚未点击【评估代价 (Roll)】，请先 Roll 点获取命运的标价！");
				return;
			}
			n.value = "settings";
		}, z = /* @__PURE__ */ Dt({
			ei: "I",
			sn: "N",
			tf: "T",
			jp: "J"
		}), Fe = Ca(() => `${z.ei}${z.sn}${z.tf}${z.jp}`), B = /* @__PURE__ */ U("硬核 (Hardcore)"), Ie = () => {
			navigator.clipboard.writeText(s.value).catch(() => {}), o.value = !1, C();
		}, Le = async () => {
			if (r.value) return;
			r.value = !0;
			let e = "";
			try {
				let t = Object.entries(E.sensitiveToggles).filter(([e, t]) => t).map(([e]) => e).join(", ") || "完全纯净无敏感内容", i = String(ie.value).replace(/[\r\n]+/g, " "), a = String(E.dmPersonality).replace(/[\r\n]+/g, " "), c = [
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
					f.玩家角色.基础属性.等级 = k.level || 1, f.玩家角色.基础属性.最大HP = k.hp || 100, f.玩家角色.基础属性.当前HP = k.hp || 100, f.玩家角色.基础属性.最大MP = k.mp || 50, f.玩家角色.基础属性.当前MP = k.mp || 50, f.玩家角色.基础属性.理智值 = k.sp || 20, f.玩家角色.基础属性.理智稳定性 = k.stability || 50, f.玩家角色.基础属性.骰子点数 = Ae.value || 0, Object.assign(f.玩家角色.基础属性.六维, {
						力量: k.str || 10,
						敏捷: k.dex || 10,
						体质: k.con || 10,
						智力: k.int || 10,
						感知: k.wis || 10,
						魅力: k.cha || 10
					}), f.玩家角色.基础属性.称号 = A.name || "自定义异端";
					let e = {};
					(F.karmas || []).forEach((t) => {
						t && t.name && (e[d(t.name)] = t.desc);
					}), N.karmas.forEach((t) => {
						t.rolled && t.name && (e[d(t.name)] = t.desc);
					}), Object.keys(e).length > 0 && (f.玩家角色.基础属性.专属业障 = e);
					let t = [];
					F.egos && t.push(...F.egos), N.weapons.forEach((e) => {
						e.rolled && e.name && t.push(e);
					}), t.length > 0 && (f.玩家角色.武装战力.主武器 = `"${V(t[0].name)} [${V(t[0].tier || "未知评级")}]"`, t.slice(1).forEach((e) => {
						f.玩家角色.武装战力.背包道具[d(e.name)] = {
							数量: 1,
							描述: `"[${V(e.tier || "未知评级")}] ${V(e.desc || "未知")}"`
						};
					}));
					let n = [];
					N.armors.forEach((e) => {
						e.rolled && e.name && n.push(e);
					}), n.length > 0 && (f.玩家角色.武装战力.防具 = `"${V(n[0].name)} [${V(n[0].tier || "未知评级")}]"`, n.slice(1).forEach((e) => {
						f.玩家角色.武装战力.背包道具[d(e.name)] = {
							数量: 1,
							描述: `"[${V(e.tier || "未知评级")}] ${V(e.desc || "未知")}"`
						};
					})), N.items.forEach((e) => {
						e.rolled && e.name && (f.玩家角色.武装战力.背包道具[d(e.name)] = {
							数量: 1,
							描述: `"[${V(e.tier || "未知评级")}] ${V(e.desc || "未知")}"`
						});
					});
					let r = [];
					F.skills && r.push(...F.skills), N.skills.forEach((e) => {
						e.rolled && e.name && r.push(e);
					}), r.length > 0 && (delete f.玩家角色.武装战力.技能列表.无, r.forEach((e) => {
						f.玩家角色.武装战力.技能列表[d(e.name)] = `"[${V(e.tier || "未知评级")}] ${V(e.desc || "未知")}"`;
					}));
					let i = [];
					F.backgrounds && F.backgrounds.forEach((e) => i.push(`【${e.name}】: ${e.desc}`)), N.traits.forEach((e) => {
						e.rolled && e.name && i.push(`【${e.name}】(${e.tier}): ${e.desc}`);
					}), j.enabled && j.name && (delete f.核心同伴.无, f.核心同伴[d(j.name)] = {
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
					}, u += `\n📌 **同行伙伴：** 【${j.name}】 - ${j.desc}`), t.length > 0 && (u += "\n📌 **携带武器：** " + t.map((e) => `【${e.name}】(${e.tier}): ${e.desc}`).join(" | ")), n.length > 0 && (u += "\n📌 **防具装备：** " + n.map((e) => `【${e.name}】(${e.tier}): ${e.desc}`).join(" | "));
					let a = N.items.filter((e) => e.rolled && e.name).map((e) => `【${e.name}】: ${e.desc}`);
					a.length > 0 && (u += "\n📌 **背包道具：** " + a.join(" | ")), r.length > 0 && (u += "\n📌 **掌握技能：** " + r.map((e) => `【${e.name}】: ${e.desc}`).join(" | ")), u += `\n📌 **种族/职业：** ${A.race || "未知"} / ${A.profession || "未知"}`, u += `\n📌 **外貌与性格：** ${A.desc || "无"}`, i.length > 0 && (u += "\n📌 **专属特质/背景：**\n  - " + i.join("\n  - ")), ge.value && (u += `\n📌 **自定义脑洞：** ${ge.value}`), p.value && (p.value.startsWith("data:image") ? u += "\n📌 **玩家角色立绘参考：** [玩家已上传本地立绘，请根据外貌特征描述进行合理想象]" : u += `\n📌 **玩家角色立绘参考：** ${p.value}`);
					let o = "\n\n🔥 **【DM核心裁定法则（AI必读）】** 🔥\n";
					o += "1. **数值自动补全：** 若玩家在自定义的武器/防具/道具/特质中未明确写出具体的骰子数值（如1d8、1d10+2、护甲减免%等），请DM务必根据其选择的【评级】和世界书规则，在开局描述时自动为其赋予合理的具体数值！\n", o += "2. **合理性惩罚（等价交换）：** DM拥有绝对的解释与修改权！若玩家填写的物品强度与所选【评级】严重不符（例如：选了普通级却写着秒杀全场），或者高评级神装未写明致命代价，DM必须在开局时强行修改其效果，或为其附加极其惨烈的隐藏代价（如：每次使用扣除半管血、引来首脑注视等）。\n", Ae.value < 0 && (o += `3. **命运负债清算：** 玩家当前透支了 ${Math.abs(Ae.value)} 点数。透支越多，开局遭遇的厄运越致命。请DM在开局或后续流程中，安排高维存在、黑市商人或极端环境来强行索要这笔债务！\n`), u += o;
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
				u += `\n📌 **心理锚点(MBTI)：** ${Fe.value}\n📌 **世界难度：** ${B.value}`;
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
					ns(e), n.value = "already_started", C(), r.value = !1;
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
		}, V = (e) => typeof e == "string" ? e.replace(/"/g, "\\\"").replace(/\n/g, " ") : e;
		return (e, w) => t.value ? (q(), J("div", $l, [
			Y("div", {
				class: M(["bgm-player", { "is-visible": a.value }]),
				innerHTML: c.value
			}, null, 10, eu),
			o.value ? (q(), J("div", tu, [Y("div", nu, [
				w[49] ||= Y("div", { class: "modal-title" }, "⚠️ 沙盒环境限制：请手动复制指令", -1),
				w[50] ||= Y("p", { style: {
					color: "#555",
					"margin-bottom": "10px",
					"text-align": "center"
				} }, "由于当前环境的安全策略，无法自动发送。请全选下方文本框内容，复制后粘贴到酒馆聊天框发送。", -1),
				Y("textarea", {
					readonly: "",
					value: s.value,
					class: "modal-textarea",
					onFocus: w[0] ||= (e) => e.target?.select()
				}, null, 40, ru),
				Y("button", {
					class: "modal-btn",
					onClick: Ie
				}, "一键复制并关闭")
			])])) : Z("", !0),
			qi(za, {
				name: "fade",
				mode: "out-in"
			}, {
				default: Sn(() => [n.value === "already_started" ? (q(), J("div", iu, [
					w[51] ||= Y("div", { class: "sys-title" }, "旅程已在进行中", -1),
					w[52] ||= Y("div", { class: "sys-subtitle" }, "The Journey Has Already Begun", -1),
					w[53] ||= Y("p", { style: {
						color: "#ccc",
						"font-size": "1.2em",
						"text-align": "center",
						"max-width": "600px",
						"line-height": "1.8"
					} }, [
						X(" 观测者已经记录了你的降临姿态。"),
						Y("br"),
						X(" 请在下方的聊天框中继续你的废土生存，或者使用【系统指令】呼出面板。 ")
					], -1),
					Y("button", {
						class: "sys-btn sys-btn-primary",
						style: { "margin-top": "30px" },
						onClick: C
					}, "关闭界面")
				])) : n.value === "check" ? (q(), J("div", au, [
					w[54] ||= Y("div", { class: "sys-title" }, "白夜黑昼七日谈", -1),
					w[55] ||= Y("div", { class: "sys-subtitle" }, "The Seven Days of White Night and Dark Day", -1),
					Y("div", ou, [(q(!0), J(K, null, G(v, (e) => (q(), J("div", {
						key: e.id,
						class: "sys-row"
					}, [Y("span", su, I(e.label), 1), Y("span", null, [e.status === "loading" ? (q(), J("span", cu, "Checking...")) : (q(), J("span", {
						key: 1,
						class: M(e.status === "ok" ? "status-ok" : "status-warn")
					}, I(e.statusText), 3))])]))), 128))]),
					Y("div", lu, [Y("button", {
						disabled: i.value,
						class: "sys-btn",
						onClick: Ko(te, ["prevent"])
					}, "重新检查", 8, uu), Y("button", {
						disabled: !S.value || i.value,
						class: "sys-btn sys-btn-primary",
						onClick: ne
					}, I(S.value ? "开始游戏" : "环境异常或校验中..."), 9, du)])
				])) : n.value === "transition" ? (q(), J("div", fu, [...w[56] ||= [Y("div", { class: "note-title" }, "【系统提示：来自梓墨的笔记簿】", -1), Y("ul", { class: "note-content" }, [
					Y("li", null, [Y("strong", null, "RP（玩家输入）："), X("在很大程度上决定了逆转生死的关键，只小小输入几句话的话旅人sama是不会成为真正的英雄的哦~")]),
					Y("li", null, [
						Y("strong", null, "BGM自定义："),
						X("你可以随时发送 "),
						Y("code", null, "【系统指令：设置BGM】场景：Boss战，链接："),
						X(" 来替换内置音乐。")
					]),
					Y("li", null, [Y("strong", null, "快捷操作："), X("状态栏顶部的 [呼唤观测者] 和 [潜入心灵镜牢] 按钮可直接点击。")]),
					Y("li", null, [
						Y("strong", null, "装备管理："),
						X("在【武装档案】Tab中，点击装备面板的"),
						Y("q", null, "“卸下/管理”"),
						X("按钮，可一键脱下装备或使用背包道具。")
					]),
					Y("li", null, [Y("strong", null, "极端复杂的世界模拟与情感管理系统："), X("你所遇见的，都是一个个鲜活的个体，请好好善待她/他/它们吧~")])
				], -1)]])) : n.value === "library" ? (q(), J("div", pu, [Y("div", mu, [
					x.value ? (q(), J(K, { key: 1 }, [
						w[64] ||= Y("p", null, "骨骼断裂的回音与神经烧焦的幻痛依然在脑海深处轰鸣。但此刻，你只是静静地站在温暖的图书室内，面前是那位戴着单片眼镜的少女。", -1),
						Y("p", null, [
							Y("q", null, [
								w[60] ||= X("“死亡并未宽恕你，", -1),
								Y("span", hu, I(b.value ? b.value : "伤痕累累的轮回者"), 1),
								w[61] ||= X("。”", -1)
							]),
							w[62] ||= X("她微微欠身，目光扫过你灵魂上烙印的扭曲伤痕，", -1),
							w[63] ||= Y("q", null, "“看来地狱的法则又一次让你回到了起点。”", -1)
						]),
						(q(!0), J(K, null, G(y.value, (e, t) => (q(), J("div", {
							key: t,
							class: "trauma-text"
						}, "⚠️ 永久精神创伤 [" + I(t) + "]: " + I(e), 1))), 128))
					], 64)) : (q(), J(K, { key: 0 }, [
						w[57] ||= Y("p", null, "当眼前的黑暗如潮水般褪去，刺鼻的机油味与血腥味并未如期而至。取而代之的，是纸张的醇香与壁炉中木柴燃烧的噼啪声。你发现自己站在一间古旧而温暖的图书室内，高耸入云的书架上摆满了散发着微光的典籍。", -1),
						w[58] ||= Y("p", null, "在房间中央的红木长桌后，坐着一位戴着单片眼镜的少女。她合上手中那本厚重的《至理之书》，抬起头，用一种仿佛能看穿灵魂的目光注视着你。", -1),
						w[59] ||= Y("p", null, [
							Y("q", null, [
								X("欢迎来到这座被时间遗忘的藏书阁，"),
								Y("span", { class: "highlight-gold" }, "迷途的旅人"),
								X("。")
							]),
							X("她微微欠身，嘴角勾起一抹优雅却难以捉摸的弧度，"),
							Y("q", null, "我是你的观测者，也是这场剧目的记录员。你可以称呼我为‘跑团娘’。")
						], -1)
					], 64)),
					w[65] ||= Y("p", null, [X("她站起身，指尖在虚空中轻轻一划，周围的书架瞬间化作一片燃烧的废墟幻影。"), Y("q", null, [
						X("你即将踏入的舞台，是L巢的废墟。那里没有童话，只有永无止境的"),
						Y("span", { class: "highlight-red" }, "极昼与极夜"),
						X("，以及七天一次的残酷轮回。你的剧本很简单：活下去。在七天的倒计时结束前，寻找光之种的碎片，或者在清道夫的咀嚼声中化为驱动都市的燃料。")
					])], -1),
					w[66] ||= Y("p", null, [Y("q", null, "在这里，每一次挥剑都可能伴随着肢体的断裂，每一次绝望都可能引来卡门的低语。但请记住，你遇到的每一个灵魂，都有着自己的恐惧与渴望。你的选择，将决定他们是成为你的利刃，还是刺入你后背的毒牙。")], -1),
					w[67] ||= Y("p", null, "幻影散去，她重新坐回桌后，从抽屉里取出了五枚质地各异的档案夹，在桌面上依次排开。", -1),
					w[68] ||= Y("p", null, [Y("q", null, "那么，演出即将开始。请翻开你的‘档案’，决定你将以何种姿态，降临这片绝望的焦土。")], -1),
					l.value ? (q(), J("div", gu, [Y("img", {
						src: l.value,
						class: "dm-portrait-img",
						alt: "DM Sprite",
						onError: w[1] ||= (e) => l.value = ""
					}, null, 40, _u)])) : Z("", !0)
				]), Y("div", vu, [(q(), J(K, null, G(T, (e) => Y("details", {
					key: e.id,
					name: "char-accordion",
					class: "dossier-folder"
				}, [Y("summary", yu, [
					Y("span", bu, I(e.type), 1),
					Y("span", xu, I(e.name), 1),
					Y("span", Su, I(e.desc), 1)
				]), Y("div", Cu, [
					e.quote ? (q(), J("div", wu, [Y("q", null, I(e.quote), 1)])) : Z("", !0),
					Y("div", Tu, [Y("div", Eu, [w[69] ||= Y("div", { class: "cp-box-title" }, "核心概念", -1), Y("div", Du, I(e.concept), 1)]), Y("div", Ou, [w[70] ||= Y("div", { class: "cp-box-title" }, "生存难度", -1), Y("div", ku, I(e.diff), 1)])]),
					Y("div", Au, [Y("div", {
						class: "cp-btn-confirm",
						onClick: (t) => ae(e.id)
					}, "确认降临", 8, ju)])
				])])), 64)), Y("div", {
					class: "dossier-custom",
					onClick: xe
				}, [...w[71] ||= [Y("span", { class: "ds-type" }, "CUSTOM", -1), Y("span", { class: "ds-name" }, "命运掷骰 (自定义车卡)", -1)]])])])) : n.value === "custom_char" ? (q(), J("div", Mu, [oe.value === "pre-roll" ? (q(), J("div", Nu, [
					w[72] ||= Y("h2", {
						class: "settings-title",
						style: { border: "none" }
					}, "命运的掷骰", -1),
					w[73] ||= Y("p", { style: {
						color: "#888",
						"margin-bottom": "40px"
					} }, "“在都市中，出生便决定了大部分的命运。来吧，看看你的底牌。”", -1),
					Y("div", {
						class: M([{ rolling: O.value }, "roll-btn"]),
						onClick: De
					}, [O.value ? (q(), J("span", Fu, "...")) : (q(), J("span", Pu, "ROLL"))], 2)
				])) : Z("", !0), oe.value === "shopping" ? (q(), J("div", Iu, [
					Y("div", Lu, [Y("div", null, [w[75] ||= Y("h2", null, "黑市终端", -1), Y("div", Ru, [w[74] ||= X("商店品质评级: ", -1), Y("span", zu, I(Oe.value) + " (Roll: " + I(ce.value) + ")", 1)])]), Y("div", Bu, [w[76] ||= Y("div", { style: {
						"font-size": "0.8em",
						opacity: "0.8"
					} }, "剩余可用点数", -1), Y("div", { class: M([{ negative: Ae.value < 0 }, "points-display"]) }, I(Ae.value), 3)])]),
					Y("div", Vu, [Y("div", Hu, [
						w[78] ||= Y("span", { style: {
							"font-weight": "bold",
							color: "var(--pm-gold)"
						} }, "本地预设:", -1),
						W(Y("select", {
							"onUpdate:modelValue": w[2] ||= (e) => ve.value = e,
							class: "preset-select"
						}, [w[77] ||= Y("option", { value: -1 }, "-- 选择预设 --", -1), (q(!0), J(K, null, G(_e.value, (e, t) => (q(), J("option", {
							key: t,
							value: t
						}, I(e.name), 9, Uu))), 128))], 512), [[Bo, ve.value]]),
						Y("button", {
							disabled: ve.value === -1,
							class: "preset-btn",
							onClick: R
						}, "读取", 8, Wu)
					]), Y("div", Gu, [W(Y("input", {
						"onUpdate:modelValue": w[3] ||= (e) => L.value = e,
						type: "text",
						class: "preset-input",
						placeholder: "输入预设名称..."
					}, null, 512), [[Q, L.value]]), Y("button", {
						disabled: !L.value,
						class: "preset-btn",
						onClick: be
					}, "保存当前配置", 8, Ku)])]),
					Y("div", qu, [
						Y("div", Ju, [
							w[79] ||= Y("div", { class: "shop-title" }, "身份档案 (Profile)", -1),
							Y("div", Yu, [Y("div", Xu, [
								Y("div", Zu, [p.value ? (q(), J("img", {
									key: 0,
									src: p.value,
									class: "player-portrait-img",
									onError: w[4] ||= (e) => p.value = ""
								}, null, 40, Qu)) : (q(), J("div", $u, "玩家无图"))]),
								Y("input", {
									ref_key: "playerFileInput",
									ref: m,
									type: "file",
									accept: "image/*",
									style: { display: "none" },
									onChange: g
								}, null, 544),
								Y("button", {
									class: "pm-btn-small",
									onClick: h
								}, "📁 上传玩家立绘"),
								p.value ? (q(), J("button", {
									key: 0,
									class: "pm-btn-small",
									onClick: w[5] ||= (e) => p.value = ""
								}, "🗑️ 清除")) : Z("", !0)
							]), Y("div", ed, [
								Y("div", td, [l.value ? (q(), J("img", {
									key: 0,
									src: l.value,
									class: "player-portrait-img",
									onError: w[6] ||= (e) => l.value = ""
								}, null, 40, nd)) : (q(), J("div", rd, "DM无图"))]),
								Y("input", {
									ref_key: "dmFileInput",
									ref: u,
									type: "file",
									accept: "image/*",
									style: { display: "none" },
									onChange: f
								}, null, 544),
								Y("button", {
									class: "pm-btn-small",
									style: {
										"border-color": "#8a0303",
										color: "#8a0303"
									},
									onClick: d
								}, "📁 上传DM立绘"),
								l.value ? (q(), J("button", {
									key: 0,
									class: "pm-btn-small",
									style: {
										"border-color": "#8a0303",
										color: "#8a0303"
									},
									onClick: w[7] ||= (e) => l.value = ""
								}, "🗑️ 清除")) : Z("", !0)
							])]),
							Y("div", id, [
								W(Y("input", {
									"onUpdate:modelValue": w[8] ||= (e) => A.name = e,
									type: "text",
									class: "pm-input",
									placeholder: "姓名 (如: 罗兰)"
								}, null, 512), [[Q, A.name]]),
								W(Y("input", {
									"onUpdate:modelValue": w[9] ||= (e) => A.race = e,
									type: "text",
									class: "pm-input",
									placeholder: "种族 (如: 人类/改造人)"
								}, null, 512), [[Q, A.race]]),
								W(Y("input", {
									"onUpdate:modelValue": w[10] ||= (e) => A.profession = e,
									type: "text",
									class: "pm-input",
									placeholder: "职业 (如: 九阶收尾人)"
								}, null, 512), [[Q, A.profession]])
							]),
							W(Y("textarea", {
								"onUpdate:modelValue": w[11] ||= (e) => A.desc = e,
								class: "pm-textarea",
								placeholder: "外貌特征与性格描述... (如: 穿着黑色西装，总是带着疲惫的笑容，极度厌恶背叛)"
							}, null, 512), [[Q, A.desc]]),
							w[80] ||= Y("p", { style: {
								color: "#888",
								"font-size": "0.85em",
								"margin-top": "5px"
							} }, "* 开局降临坐标将由命运（系统）在L巢废墟及周边区域中随机空投。", -1)
						]),
						Y("div", ad, [
							w[91] ||= Y("div", { class: "shop-title" }, "常驻市价表 (基础属性)", -1),
							Y("div", od, [
								Y("div", sd, [
									w[81] ||= Y("span", { class: "stat-name" }, "等级 (Max 30)", -1),
									Y("div", cd, [
										Y("button", {
											disabled: k.level <= 1,
											class: "stat-btn",
											onClick: w[12] ||= (e) => k.level--
										}, "-", 8, ld),
										Y("span", ud, I(k.level), 1),
										Y("button", {
											disabled: k.level >= 30,
											class: "stat-btn",
											onClick: w[13] ||= (e) => k.level++
										}, "+", 8, dd)
									]),
									w[82] ||= Y("span", { class: "stat-cost" }, "100/级", -1)
								]),
								Y("div", fd, [
									w[83] ||= Y("span", { class: "stat-name" }, "最大 HP", -1),
									Y("div", pd, [
										Y("button", {
											disabled: k.hp <= 10,
											class: "stat-btn",
											onClick: w[14] ||= (e) => k.hp -= 10
										}, "-", 8, md),
										Y("span", hd, I(k.hp), 1),
										Y("button", {
											class: "stat-btn",
											onClick: w[15] ||= (e) => k.hp += 10
										}, "+")
									]),
									w[84] ||= Y("span", { class: "stat-cost" }, "20/点", -1)
								]),
								Y("div", gd, [
									w[85] ||= Y("span", { class: "stat-name" }, "最大 MP", -1),
									Y("div", _d, [
										Y("button", {
											disabled: k.mp <= 10,
											class: "stat-btn",
											onClick: w[16] ||= (e) => k.mp -= 10
										}, "-", 8, vd),
										Y("span", yd, I(k.mp), 1),
										Y("button", {
											class: "stat-btn",
											onClick: w[17] ||= (e) => k.mp += 10
										}, "+")
									]),
									w[86] ||= Y("span", { class: "stat-cost" }, "20/点", -1)
								]),
								Y("div", bd, [
									w[87] ||= Y("span", { class: "stat-name" }, "理智值 (SP)", -1),
									Y("div", xd, [
										Y("button", {
											disabled: k.sp <= 10,
											class: "stat-btn",
											onClick: w[18] ||= (e) => k.sp--
										}, "-", 8, Sd),
										Y("span", Cd, I(k.sp), 1),
										Y("button", {
											disabled: k.sp >= 50,
											class: "stat-btn",
											onClick: w[19] ||= (e) => k.sp++
										}, "+", 8, wd)
									]),
									w[88] ||= Y("span", { class: "stat-cost" }, "50/点", -1)
								]),
								Y("div", Td, [
									w[89] ||= Y("span", { class: "stat-name" }, "理智稳定性", -1),
									Y("div", Ed, [
										Y("button", {
											disabled: k.stability <= 10,
											class: "stat-btn",
											onClick: w[20] ||= (e) => k.stability -= 5
										}, "-", 8, Dd),
										Y("span", Od, I(k.stability), 1),
										Y("button", {
											disabled: k.stability >= 100,
											class: "stat-btn",
											onClick: w[21] ||= (e) => k.stability += 5
										}, "+", 8, kd)
									]),
									w[90] ||= Y("span", { class: "stat-cost" }, "30/点", -1)
								])
							]),
							w[92] ||= Y("div", {
								class: "shop-title",
								style: {
									"margin-top": "20px",
									"font-size": "1.2em"
								}
							}, "六维属性 (10-15: 50点/级 | 16-20: 150点/级)", -1),
							Y("div", Ad, [(q(), J(K, null, G([
								"str",
								"dex",
								"con",
								"int",
								"wis",
								"cha"
							], (e) => Y("div", {
								key: e,
								class: "stat-row"
							}, [Y("span", jd, I(le[e]), 1), Y("div", Md, [
								Y("button", {
									disabled: k[e] <= 10,
									class: "stat-btn",
									onClick: (t) => k[e]--
								}, "-", 8, Nd),
								Y("span", Pd, I(k[e]), 1),
								Y("button", {
									disabled: k[e] >= 20,
									class: "stat-btn",
									onClick: (t) => k[e]++
								}, "+", 8, Fd)
							])])), 64))])
						]),
						Y("div", Id, [
							w[105] ||= Y("div", { class: "shop-title" }, "DIY 锻造与深渊契约端口", -1),
							w[106] ||= Y("div", { class: "dm-warning" }, [
								Y("strong", null, "【跑团娘的善意提醒】"),
								X(" 想要手搓 ALEPH 级神装？可以。但如果你敢在描述里写“毫无副作用”，我保证你拔剑的瞬间就会被奇点反噬切成肉沫。越强大的力量，需要越扭曲的代价来平衡。"),
								Y("br"),
								Y("span", { style: { color: "var(--pm-gold)" } }, "* 提示：如果你不知道具体的伤害数值（如1d8），可以只写效果，AI 会根据你选择的评级自动为你补全合理的数值。")
							], -1),
							Y("div", Ld, [
								w[94] ||= Y("div", {
									class: "shop-title",
									style: {
										"font-size": "1.2em",
										border: "none",
										"margin-bottom": "5px",
										"margin-top": "20px"
									}
								}, "自定义技能 / 战技", -1),
								(q(!0), J(K, null, G(N.skills, (e, t) => (q(), J("div", {
									key: "skill" + t,
									class: "diy-box"
								}, [
									Y("div", Rd, [Y("span", zd, "技能 #" + I(t + 1), 1), Y("div", Bd, [
										e.rolled ? (q(), J("span", Vd, "-" + I(e.cost) + " 点", 1)) : Z("", !0),
										Y("button", {
											disabled: !e.tier,
											class: "diy-roll-btn",
											onClick: (e) => he("skills", t)
										}, "评估代价 (Roll)", 8, Hd),
										Y("button", {
											class: "btn-remove-diy",
											title: "删除",
											onClick: (e) => me("skills", t)
										}, "×", 8, Ud)
									])]),
									W(Y("input", {
										"onUpdate:modelValue": (t) => e.name = t,
										type: "text",
										class: "pm-input",
										placeholder: "技能名称 (如: 拔刀斩)",
										onInput: (t) => e.rolled = !1
									}, null, 40, Wd), [[Q, e.name]]),
									W(Y("textarea", {
										"onUpdate:modelValue": (t) => e.desc = t,
										class: "pm-textarea",
										placeholder: "技能效果与消耗描述... (如: 消耗5MP，造成1d10伤害)",
										onInput: (t) => e.rolled = !1
									}, null, 40, Gd), [[Q, e.desc]]),
									W(Y("select", {
										"onUpdate:modelValue": (t) => e.tier = t,
										class: "pm-select",
										onChange: (t) => e.rolled = !1
									}, [w[93] ||= Y("option", { value: "" }, "-- 选择评级区间 --", -1), (q(), J(K, null, G(de, (e) => Y("option", {
										key: e.label,
										value: e.label
									}, I(e.label), 9, qd)), 64))], 40, Kd), [[Bo, e.tier]])
								]))), 128)),
								Y("button", {
									class: "btn-add-diy",
									onClick: w[22] ||= (e) => pe("skills")
								}, "➕ 添加自定义技能")
							]),
							Y("div", Jd, [
								w[96] ||= Y("div", {
									class: "shop-title",
									style: {
										"font-size": "1.2em",
										border: "none",
										"margin-bottom": "5px",
										"margin-top": "20px"
									}
								}, "自定义背景 / 特质", -1),
								(q(!0), J(K, null, G(N.traits, (e, t) => (q(), J("div", {
									key: "trait" + t,
									class: "diy-box"
								}, [
									Y("div", Yd, [Y("span", Xd, "特质 #" + I(t + 1), 1), Y("div", Zd, [
										e.rolled ? (q(), J("span", Qd, "-" + I(e.cost) + " 点", 1)) : Z("", !0),
										Y("button", {
											disabled: !e.tier,
											class: "diy-roll-btn",
											onClick: (e) => he("traits", t)
										}, "评估代价 (Roll)", 8, $d),
										Y("button", {
											class: "btn-remove-diy",
											title: "删除",
											onClick: (e) => me("traits", t)
										}, "×", 8, ef)
									])]),
									W(Y("input", {
										"onUpdate:modelValue": (t) => e.name = t,
										type: "text",
										class: "pm-input",
										placeholder: "特质名称 (如: 异想体血肉共生)",
										onInput: (t) => e.rolled = !1
									}, null, 40, tf), [[Q, e.name]]),
									W(Y("textarea", {
										"onUpdate:modelValue": (t) => e.desc = t,
										class: "pm-textarea",
										placeholder: "特质效果描述...",
										onInput: (t) => e.rolled = !1
									}, null, 40, nf), [[Q, e.desc]]),
									W(Y("select", {
										"onUpdate:modelValue": (t) => e.tier = t,
										class: "pm-select",
										onChange: (t) => e.rolled = !1
									}, [w[95] ||= Y("option", { value: "" }, "-- 选择评级区间 --", -1), (q(), J(K, null, G(de, (e) => Y("option", {
										key: e.label,
										value: e.label
									}, I(e.label), 9, af)), 64))], 40, rf), [[Bo, e.tier]])
								]))), 128)),
								Y("button", {
									class: "btn-add-diy",
									onClick: w[23] ||= (e) => pe("traits")
								}, "➕ 添加自定义特质")
							]),
							Y("div", of, [
								w[98] ||= Y("div", {
									class: "shop-title",
									style: {
										"font-size": "1.2em",
										border: "none",
										"margin-bottom": "5px",
										"margin-top": "20px"
									}
								}, "自定义武器 / E.G.O", -1),
								(q(!0), J(K, null, G(N.weapons, (e, t) => (q(), J("div", {
									key: "weapon" + t,
									class: "diy-box"
								}, [
									Y("div", sf, [Y("span", cf, "武器 #" + I(t + 1), 1), Y("div", lf, [
										e.rolled ? (q(), J("span", uf, "-" + I(e.cost) + " 点", 1)) : Z("", !0),
										Y("button", {
											disabled: !e.tier,
											class: "diy-roll-btn",
											onClick: (e) => he("weapons", t)
										}, "评估代价 (Roll)", 8, df),
										Y("button", {
											class: "btn-remove-diy",
											title: "删除",
											onClick: (e) => me("weapons", t)
										}, "×", 8, ff)
									])]),
									W(Y("input", {
										"onUpdate:modelValue": (t) => e.name = t,
										type: "text",
										class: "pm-input",
										placeholder: "武器名称 (如: ALEPH级·拟态幼体)",
										onInput: (t) => e.rolled = !1
									}, null, 40, pf), [[Q, e.name]]),
									W(Y("textarea", {
										"onUpdate:modelValue": (t) => e.desc = t,
										class: "pm-textarea",
										placeholder: "武器效果与【副作用代价】描述... (未写明伤害骰子AI将自动补全)",
										onInput: (t) => e.rolled = !1
									}, null, 40, mf), [[Q, e.desc]]),
									W(Y("select", {
										"onUpdate:modelValue": (t) => e.tier = t,
										class: "pm-select",
										onChange: (t) => e.rolled = !1
									}, [w[97] ||= Y("option", { value: "" }, "-- 选择评级区间 --", -1), (q(), J(K, null, G(de, (e) => Y("option", {
										key: e.label,
										value: e.label
									}, I(e.label), 9, gf)), 64))], 40, hf), [[Bo, e.tier]])
								]))), 128)),
								Y("button", {
									class: "btn-add-diy",
									onClick: w[24] ||= (e) => pe("weapons")
								}, "➕ 添加自定义武器")
							]),
							Y("div", _f, [
								w[100] ||= Y("div", {
									class: "shop-title",
									style: {
										"font-size": "1.2em",
										border: "none",
										"margin-bottom": "5px",
										"margin-top": "20px"
									}
								}, "自定义防具 / 服饰", -1),
								(q(!0), J(K, null, G(N.armors, (e, t) => (q(), J("div", {
									key: "armor" + t,
									class: "diy-box"
								}, [
									Y("div", vf, [Y("span", yf, "防具 #" + I(t + 1), 1), Y("div", bf, [
										e.rolled ? (q(), J("span", xf, "-" + I(e.cost) + " 点", 1)) : Z("", !0),
										Y("button", {
											disabled: !e.tier,
											class: "diy-roll-btn",
											onClick: (e) => he("armors", t)
										}, "评估代价 (Roll)", 8, Sf),
										Y("button", {
											class: "btn-remove-diy",
											title: "删除",
											onClick: (e) => me("armors", t)
										}, "×", 8, Cf)
									])]),
									W(Y("input", {
										"onUpdate:modelValue": (t) => e.name = t,
										type: "text",
										class: "pm-input",
										placeholder: "防具名称 (如: W公司清剿服)",
										onInput: (t) => e.rolled = !1
									}, null, 40, wf), [[Q, e.name]]),
									W(Y("textarea", {
										"onUpdate:modelValue": (t) => e.desc = t,
										class: "pm-textarea",
										placeholder: "防具效果与代价描述...",
										onInput: (t) => e.rolled = !1
									}, null, 40, Tf), [[Q, e.desc]]),
									W(Y("select", {
										"onUpdate:modelValue": (t) => e.tier = t,
										class: "pm-select",
										onChange: (t) => e.rolled = !1
									}, [w[99] ||= Y("option", { value: "" }, "-- 选择评级区间 --", -1), (q(), J(K, null, G(de, (e) => Y("option", {
										key: e.label,
										value: e.label
									}, I(e.label), 9, Df)), 64))], 40, Ef), [[Bo, e.tier]])
								]))), 128)),
								Y("button", {
									class: "btn-add-diy",
									onClick: w[25] ||= (e) => pe("armors")
								}, "➕ 添加自定义防具")
							]),
							Y("div", Of, [
								w[102] ||= Y("div", {
									class: "shop-title",
									style: {
										"font-size": "1.2em",
										border: "none",
										"margin-bottom": "5px",
										"margin-top": "20px"
									}
								}, "自定义道具 / 消耗品", -1),
								(q(!0), J(K, null, G(N.items, (e, t) => (q(), J("div", {
									key: "item" + t,
									class: "diy-box"
								}, [
									Y("div", kf, [Y("span", Af, "道具 #" + I(t + 1), 1), Y("div", jf, [
										e.rolled ? (q(), J("span", Mf, "-" + I(e.cost) + " 点", 1)) : Z("", !0),
										Y("button", {
											disabled: !e.tier,
											class: "diy-roll-btn",
											onClick: (e) => he("items", t)
										}, "评估代价 (Roll)", 8, Nf),
										Y("button", {
											class: "btn-remove-diy",
											title: "删除",
											onClick: (e) => me("items", t)
										}, "×", 8, Pf)
									])]),
									W(Y("input", {
										"onUpdate:modelValue": (t) => e.name = t,
										type: "text",
										class: "pm-input",
										placeholder: "道具名称 (如: K公司高浓度安瓿)",
										onInput: (t) => e.rolled = !1
									}, null, 40, Ff), [[Q, e.name]]),
									W(Y("textarea", {
										"onUpdate:modelValue": (t) => e.desc = t,
										class: "pm-textarea",
										placeholder: "道具效果描述...",
										onInput: (t) => e.rolled = !1
									}, null, 40, If), [[Q, e.desc]]),
									W(Y("select", {
										"onUpdate:modelValue": (t) => e.tier = t,
										class: "pm-select",
										onChange: (t) => e.rolled = !1
									}, [w[101] ||= Y("option", { value: "" }, "-- 选择评级区间 --", -1), (q(), J(K, null, G(de, (e) => Y("option", {
										key: e.label,
										value: e.label
									}, I(e.label), 9, Rf)), 64))], 40, Lf), [[Bo, e.tier]])
								]))), 128)),
								Y("button", {
									class: "btn-add-diy",
									onClick: w[26] ||= (e) => pe("items")
								}, "➕ 添加自定义道具")
							]),
							Y("div", zf, [
								w[104] ||= Y("div", {
									class: "shop-title",
									style: {
										"font-size": "1.2em",
										border: "none",
										"margin-bottom": "5px",
										"margin-top": "20px",
										color: "#ff4444"
									}
								}, "自定义专属业障 (返还点数)", -1),
								(q(!0), J(K, null, G(N.karmas, (e, t) => (q(), J("div", {
									key: "karma" + t,
									class: "diy-box",
									style: {
										"border-color": "#ff4444",
										background: "rgba(139, 0, 0, 0.1)"
									}
								}, [
									Y("div", Bf, [Y("span", Vf, "业障 #" + I(t + 1), 1), Y("div", Hf, [
										e.rolled ? (q(), J("span", Uf, "+" + I(e.refund) + " 点", 1)) : Z("", !0),
										Y("button", {
											disabled: !e.tier,
											class: "diy-roll-btn",
											style: {
												background: "#8b0000",
												"border-color": "#ff4444",
												color: "#fff"
											},
											onClick: (e) => he("karmas", t)
										}, "评估返还 (Roll)", 8, Wf),
										Y("button", {
											class: "btn-remove-diy",
											title: "删除",
											onClick: (e) => me("karmas", t)
										}, "×", 8, Gf)
									])]),
									W(Y("input", {
										"onUpdate:modelValue": (t) => e.name = t,
										type: "text",
										class: "pm-input",
										placeholder: "业障名称 (如: 注定的扭曲)",
										onInput: (t) => e.rolled = !1
									}, null, 40, Kf), [[Q, e.name]]),
									W(Y("textarea", {
										"onUpdate:modelValue": (t) => e.desc = t,
										class: "pm-textarea",
										placeholder: "业障的负面效果与触发条件描述...",
										onInput: (t) => e.rolled = !1
									}, null, 40, qf), [[Q, e.desc]]),
									W(Y("select", {
										"onUpdate:modelValue": (t) => e.tier = t,
										class: "pm-select",
										onChange: (t) => e.rolled = !1
									}, [w[103] ||= Y("option", { value: "" }, "-- 选择痛苦评级 --", -1), (q(), J(K, null, G(fe, (e) => Y("option", {
										key: e.label,
										value: e.label
									}, I(e.label), 9, Yf)), 64))], 40, Jf), [[Bo, e.tier]])
								]))), 128)),
								Y("button", {
									class: "btn-add-diy",
									style: {
										"border-color": "#ff4444",
										color: "#ff4444"
									},
									onClick: w[27] ||= (e) => pe("karmas")
								}, "➕ 添加自定义业障")
							])
						]),
						Y("div", Xf, [
							w[107] ||= Y("div", { class: "shop-title" }, "本局限定商品 (Roguelike 刷新池)", -1),
							w[108] ||= Y("p", { style: {
								color: "#ccc",
								"font-size": "0.9em",
								"margin-bottom": "15px"
							} }, "如果你懒得自己写，可以直接从黑市商人这里购买现成的。", -1),
							w[109] ||= Y("h4", { style: {
								color: "var(--pm-gold)",
								"margin-bottom": "10px"
							} }, "特殊背景 / 特质", -1),
							Y("div", Zf, [(q(!0), J(K, null, G(P.backgrounds, (e) => (q(), J("div", {
								key: e.name,
								class: M([{ selected: Me("backgrounds", e) }, "rl-card"]),
								onClick: (t) => je("backgrounds", e)
							}, [
								Y("div", $f, I(e.type), 1),
								Y("div", ep, I(e.name), 1),
								Y("div", tp, I(e.desc), 1),
								Y("div", np, "-" + I(e.cost) + " 点", 1)
							], 10, Qf))), 128))]),
							w[110] ||= Y("h4", { style: {
								color: "var(--pm-gold)",
								"margin-top": "25px",
								"margin-bottom": "10px"
							} }, "稀有遗物 / E.G.O", -1),
							Y("div", rp, [(q(!0), J(K, null, G(P.egos, (e) => (q(), J("div", {
								key: e.name,
								class: M([{ selected: Me("egos", e) }, "rl-card"]),
								onClick: (t) => je("egos", e)
							}, [
								Y("div", ap, I(e.type), 1),
								Y("div", op, I(e.name), 1),
								Y("div", sp, I(e.desc), 1),
								Y("div", cp, "-" + I(e.cost) + " 点", 1)
							], 10, ip))), 128))]),
							w[111] ||= Y("h4", { style: {
								color: "var(--pm-gold)",
								"margin-top": "25px",
								"margin-bottom": "10px"
							} }, "失落战技 / 奇点魔法", -1),
							Y("div", lp, [(q(!0), J(K, null, G(P.skills, (e) => (q(), J("div", {
								key: e.name,
								class: M([{ selected: Me("skills", e) }, "rl-card"]),
								onClick: (t) => je("skills", e)
							}, [
								Y("div", dp, I(e.type), 1),
								Y("div", fp, I(e.name), 1),
								Y("div", pp, I(e.desc), 1),
								Y("div", mp, "-" + I(e.cost) + " 点", 1)
							], 10, up))), 128))]),
							w[112] ||= Y("h4", { style: {
								color: "#ff4444",
								"margin-top": "25px",
								"margin-bottom": "10px"
							} }, "专属业障 (必须至少选择一项，可返还点数)", -1),
							Y("div", hp, [(q(!0), J(K, null, G(P.karmas, (e) => (q(), J("div", {
								key: e.name,
								class: M([{ selected: Me("karmas", e) }, "rl-card"]),
								onClick: (t) => je("karmas", e)
							}, [
								Y("div", _p, I(e.type), 1),
								Y("div", vp, I(e.name), 1),
								Y("div", yp, I(e.desc), 1),
								Y("div", bp, "+" + I(e.refund) + " 点", 1)
							], 10, gp))), 128))])
						]),
						Y("div", xp, [
							w[114] ||= Y("div", { class: "shop-title" }, "同行伙伴 (Companion) - 消耗 2000 点", -1),
							Y("label", Sp, [W(Y("input", {
								"onUpdate:modelValue": w[28] ||= (e) => j.enabled = e,
								type: "checkbox",
								style: {
									width: "20px",
									height: "20px"
								}
							}, null, 512), [[Lo, j.enabled]]), w[113] ||= X(" 携带一名自定义伙伴降临废土 ", -1)]),
							j.enabled ? (q(), J("div", Cp, [W(Y("input", {
								"onUpdate:modelValue": w[29] ||= (e) => j.name = e,
								type: "text",
								class: "pm-input",
								style: { margin: "0" },
								placeholder: "伙伴姓名 (如: 安吉拉)"
							}, null, 512), [[Q, j.name]]), W(Y("textarea", {
								"onUpdate:modelValue": w[30] ||= (e) => j.desc = e,
								class: "pm-textarea",
								style: { margin: "0" },
								placeholder: "伙伴的身份、能力与性格设定..."
							}, null, 512), [[Q, j.desc]])])) : Z("", !0)
						]),
						Y("div", wp, [
							w[115] ||= Y("div", { class: "shop-title" }, "完全自定义议约", -1),
							w[116] ||= Y("p", { style: {
								color: "#ccc",
								"font-size": "0.9em"
							} }, [
								X("如果你对上面的商品不满意，可以在此写下你疯狂的脑洞（例如：“我想扮演一个被W公司列车切碎后又被环指拼凑起来的缝合怪”）。"),
								Y("br"),
								X("注意：DM 会在游戏开始后为你进行点数估价，并强行缝合一个恶毒的专属业障。")
							], -1),
							Y("div", Tp, [W(Y("textarea", {
								"onUpdate:modelValue": w[31] ||= (e) => ge.value = e,
								placeholder: "在此输入你的自定义设定..."
							}, null, 512), [[Q, ge.value]])])
						])
					]),
					Y("div", Ep, [
						Ae.value < 0 ? (q(), J("div", Dp, [...w[117] ||= [
							X(" 【跑团娘的嘲弄】哎呀呀，点数透支了呢？没关系，你可以带着这身华丽的负债降临。", -1),
							Y("br", null, null, -1),
							X(" 只不过……开局负数骰子意味着你已经被都市的厄运标记。准备好在『心灵镜牢』里打一辈子黑工还债了吗，可怜的耗子？ ", -1)
						]])) : Z("", !0),
						!Ne.value && !ge.value ? (q(), J("p", Op, "必须至少选择一项【专属业障】（商店或DIY），或填写【自定义议约】。")) : Z("", !0),
						Y("button", {
							disabled: !Ne.value && !ge.value,
							class: "pm-btn-embark",
							onClick: Pe
						}, "确认降临姿态", 8, kp)
					])
				])) : Z("", !0)])) : n.value === "settings" ? (q(), J("div", Ap, [
					w[125] ||= Y("div", { class: "settings-title" }, "契约与法则", -1),
					w[126] ||= Y("div", { class: "settings-warning" }, "“深渊的边界由你划定。一旦铭刻，不可反悔。”", -1),
					Y("div", jp, [w[118] ||= X("已选定降临姿态：", -1), Y("span", Mp, I(ie.value), 1)]),
					Y("div", Np, [Y("div", Pp, [
						w[119] ||= Y("div", {
							class: "dm-title",
							style: {
								"font-size": "1.2em",
								"margin-bottom": "10px"
							}
						}, "心理锚点 (MBTI)", -1),
						w[120] ||= Y("p", { style: {
							"font-size": "0.85em",
							color: "#ccc",
							"margin-bottom": "15px"
						} }, "决定你的理智恢复机制与卡门破防逻辑。", -1),
						Y("div", Fp, [Y("button", {
							class: M([{ active: z.ei === "E" }, "mbti-btn"]),
							onClick: w[32] ||= (e) => z.ei = "E"
						}, "E (外向)", 2), Y("button", {
							class: M([{ active: z.ei === "I" }, "mbti-btn"]),
							onClick: w[33] ||= (e) => z.ei = "I"
						}, "I (内向)", 2)]),
						Y("div", Ip, [Y("button", {
							class: M([{ active: z.sn === "S" }, "mbti-btn"]),
							onClick: w[34] ||= (e) => z.sn = "S"
						}, "S (感觉)", 2), Y("button", {
							class: M([{ active: z.sn === "N" }, "mbti-btn"]),
							onClick: w[35] ||= (e) => z.sn = "N"
						}, "N (直觉)", 2)]),
						Y("div", Lp, [Y("button", {
							class: M([{ active: z.tf === "T" }, "mbti-btn"]),
							onClick: w[36] ||= (e) => z.tf = "T"
						}, "T (思考)", 2), Y("button", {
							class: M([{ active: z.tf === "F" }, "mbti-btn"]),
							onClick: w[37] ||= (e) => z.tf = "F"
						}, "F (情感)", 2)]),
						Y("div", Rp, [Y("button", {
							class: M([{ active: z.jp === "J" }, "mbti-btn"]),
							onClick: w[38] ||= (e) => z.jp = "J"
						}, "J (判断)", 2), Y("button", {
							class: M([{ active: z.jp === "P" }, "mbti-btn"]),
							onClick: w[39] ||= (e) => z.jp = "P"
						}, "P (知觉)", 2)]),
						Y("div", zp, I(Fe.value), 1)
					]), Y("div", Bp, [
						w[121] ||= Y("div", {
							class: "dm-title",
							style: {
								"font-size": "1.2em",
								"margin-bottom": "10px"
							}
						}, "世界难度选择", -1),
						w[122] ||= Y("p", { style: {
							"font-size": "0.85em",
							color: "#ccc",
							"margin-bottom": "15px"
						} }, "决定废土对你的残酷程度。", -1),
						Y("button", {
							class: M([{ active: B.value === "剧情 (Story)" }, "diff-btn"]),
							onClick: w[40] ||= (e) => B.value = "剧情 (Story)"
						}, "剧情 (Story) - 侧重体验，资源较多", 2),
						Y("button", {
							class: M([{ active: B.value === "普通 (Normal)" }, "diff-btn"]),
							onClick: w[41] ||= (e) => B.value = "普通 (Normal)"
						}, "普通 (Normal) - 标准的废土生存", 2),
						Y("button", {
							class: M([{ active: B.value === "硬核 (Hardcore)" }, "diff-btn"]),
							onClick: w[42] ||= (e) => B.value = "硬核 (Hardcore)"
						}, "硬核 (Hardcore) - 极易断肢，资源匮乏", 2),
						Y("button", {
							class: M([{ active: B.value === "地狱 (Hell)" }, "diff-btn"]),
							onClick: w[43] ||= (e) => B.value = "地狱 (Hell)"
						}, "地狱 (Hell) - 机制杀频发，卡门时刻注视", 2)
					])]),
					Y("div", Vp, [(q(!0), J(K, null, G(E.sensitiveToggles, (e, t) => (q(), J("div", {
						key: t,
						class: M(["toggle-btn", { active: e }]),
						onClick: (n) => E.sensitiveToggles[t] = !e
					}, I(String(t).replace(/_/g, " / ")), 11, Hp))), 128))]),
					Y("div", Up, [
						w[123] ||= Y("div", { class: "dm-title" }, "观测者化身设定", -1),
						w[124] ||= Y("div", { class: "dm-desc" }, "“接下来，我的化身将与你同行，但她只会作为无情的DM存在。你希望她用什么态度来见证你的挣扎？”", -1),
						Y("div", Wp, [
							Y("button", {
								class: M([{ active: E.dmPersonality === "三无机娘，冷酷客观，毫无感情波动" }, "pm-preset-btn"]),
								onClick: w[44] ||= (e) => E.dmPersonality = "三无机娘，冷酷客观，毫无感情波动"
							}, "三无机娘", 2),
							Y("button", {
								class: M([{ active: E.dmPersonality === "腹黑乐子人，喜欢看玩家挣扎，语气带有优雅的嘲讽" }, "pm-preset-btn"]),
								onClick: w[45] ||= (e) => E.dmPersonality = "腹黑乐子人，喜欢看玩家挣扎，语气带有优雅的嘲讽"
							}, "腹黑乐子人", 2),
							Y("button", {
								class: M([{ active: E.dmPersonality === "温柔病娇，一边哭泣一边宣告你的断头，极度排外" }, "pm-preset-btn"]),
								onClick: w[46] ||= (e) => E.dmPersonality = "温柔病娇，一边哭泣一边宣告你的断头，极度排外"
							}, "温柔病娇", 2),
							Y("button", {
								class: M([{ active: E.dmPersonality === "暴躁老姐，满口粗话，大骂着把你的内脏扯出来" }, "pm-preset-btn"]),
								onClick: w[47] ||= (e) => E.dmPersonality = "暴躁老姐，满口粗话，大骂着把你的内脏扯出来"
							}, "暴躁老姐", 2),
							Y("button", {
								class: "pm-preset-btn custom-btn",
								onClick: re
							}, "✍️ 自定义(手动输入)")
						]),
						W(Y("input", {
							ref_key: "dmInputRef",
							ref: D,
							"onUpdate:modelValue": w[48] ||= (e) => E.dmPersonality = e,
							type: "text",
							class: "pm-input",
							placeholder: "或在此处写入你自定义的傲娇、病娇等设定..."
						}, null, 512), [[Q, E.dmPersonality]])
					]),
					Y("button", {
						disabled: r.value,
						class: "pm-btn-embark",
						onClick: Le
					}, I(r.value ? "引擎连接中..." : "踏上旅程"), 9, Gp)
				])) : Z("", !0)]),
				_: 1
			}),
			n.value !== "check" && n.value !== "already_started" && n.value !== "transition" ? (q(), J("div", Kp, [Y("button", {
				class: "pm-btn-back-stealth",
				onClick: _
			}, " [ ◀ 重新选择命运轨迹 ] ")])) : Z("", !0)
		])) : Z("", !0);
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
		t || (t = e.createElement("style"), t.id = "pm-global-styles", e.head.appendChild(t)), t.innerHTML = "\n      /* 隐藏原生标签 */\n      .mes_text initvar, .mes_text updatevariable, .mes_text variable_log,\n      .mes_text statusbar_data, .mes_text context_options, .mes_text context_summary {\n          display: none !important;\n      }\n      .mes_text narrative { display: block !important; }\n\n      /* =========================================\n         全局酒馆羊皮纸化与动态字体 (The Atmosphere)\n         ========================================= */\n      body.pm-global-active {\n        background: radial-gradient(circle at center, #2c241b 0%, #1a1105 100%) !important;\n        background-image: url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"noiseFilter\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23noiseFilter)\" opacity=\"0.08\"/></svg>'), radial-gradient(circle at center, #2c241b 0%, #1a1105 100%) !important;\n        background-attachment: fixed !important;\n      }\n      .pm-global-active .mes { background: transparent !important; border: none !important; }\n      .pm-global-active .mes_text {\n        font-family: 'Noto Serif SC', 'Songti SC', 'Times New Roman', serif !important;\n        font-size: 1.08em !important;\n        line-height: 1.8 !important;\n        color: #e0d8c8 !important;\n        text-shadow: 0 1px 2px rgba(0,0,0,0.8) !important;\n      }\n\n      /* =========================================\n         全屏演出特效 (Screen Shake, Blood, Carmen)\n         ========================================= */\n      @keyframes pm-shake {\n        0% { transform: translate(1px, 1px) rotate(0deg); }\n        10% { transform: translate(-1px, -2px) rotate(-1deg); }\n        20% { transform: translate(-3px, 0px) rotate(1deg); }\n        30% { transform: translate(3px, 2px) rotate(0deg); }\n        40% { transform: translate(1px, -1px) rotate(1deg); }\n        50% { transform: translate(-1px, 2px) rotate(-1deg); }\n        60% { transform: translate(-3px, 1px) rotate(0deg); }\n        70% { transform: translate(3px, 1px) rotate(-1deg); }\n        80% { transform: translate(-1px, -1px) rotate(1deg); }\n        90% { transform: translate(1px, 2px) rotate(0deg); }\n        100% { transform: translate(1px, -2px) rotate(-1deg); }\n      }\n      .pm-screen-shake { animation: pm-shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }\n\n      .pm-blood-splatter {\n        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 99999;\n        background: radial-gradient(circle, transparent 40%, rgba(139,0,0,0.6) 80%, rgba(139,0,0,0.9) 100%);\n        box-shadow: inset 0 0 100px rgba(255,0,0,0.5);\n        animation: pm-fade-out 2s forwards;\n      }\n      @keyframes pm-fade-out { 0% { opacity: 1; } 100% { opacity: 0; } }\n\n      .pm-carmen-whisper {\n        font-family: 'Courier New', monospace !important;\n        font-size: 1.3em !important;\n        color: #ff4444 !important;\n        text-shadow: 2px 0px 5px rgba(255,0,0,0.8), -2px 0px 5px rgba(139,0,0,0.8) !important;\n        animation: pm-glitch-anim 3s infinite linear alternate-reverse, pm-breathe 4s infinite ease-in-out;\n        display: block; margin: 15px 0; padding: 10px; border-left: 4px solid #ff4444; background: rgba(139,0,0,0.1);\n      }\n      @keyframes pm-breathe { 0% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.02); opacity: 1; } 100% { transform: scale(1); opacity: 0.8; } }\n\n      /* =========================================\n         交互式悬念骰子 (Interactive Dice)\n         ========================================= */\n      .pm-interactive-dice {\n        cursor: pointer; background: rgba(212,175,55,0.15); border: 1px solid var(--pm-gold);\n        padding: 2px 10px; border-radius: 4px; position: relative; display: inline-block;\n        font-family: 'Courier New', monospace; font-weight: bold; color: var(--pm-gold);\n        box-shadow: 0 0 8px rgba(212,175,55,0.3); transition: all 0.3s; user-select: none;\n      }\n      .pm-interactive-dice:hover { background: rgba(212,175,55,0.3); box-shadow: 0 0 15px rgba(212,175,55,0.6); }\n      .pm-interactive-dice .pm-dice-result { display: none; }\n      .pm-interactive-dice.revealed .pm-dice-cover { display: none; }\n      .pm-interactive-dice.revealed .pm-dice-result { display: inline; animation: pm-pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }\n      @keyframes pm-pop-in { 0% { transform: scale(0.5); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }\n\n      /* 塔罗牌选项 (Tarot Options) */\n      .pm-tarot-container { display: flex; gap: 15px; flex-wrap: wrap; margin: 20px 0; justify-content: center; }\n      .pm-tarot-card {\n        background: rgba(15, 15, 18, 0.8); backdrop-filter: blur(10px); border: 1px solid var(--pm-gold);\n        border-radius: 8px; padding: 15px; width: 200px; cursor: pointer; transition: all 0.3s;\n        box-shadow: 0 5px 15px rgba(0,0,0,0.5); text-align: center; position: relative; overflow: hidden;\n      }\n      .pm-tarot-card::before { content: ''; position: absolute; top:0; left:0; right:0; height: 3px; background: var(--pm-gold); }\n      .pm-tarot-card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(212,175,55,0.4); border-color: #fff; }\n      .pm-tarot-card h3 { color: var(--pm-gold); margin: 0 0 10px 0; font-size: 1.1em; font-family: 'Noto Serif SC', serif; }\n      .pm-tarot-card p { color: #ccc; font-size: 0.9em; margin: 0; font-family: 'Noto Sans SC', sans-serif; }\n\n      /* =========================================\n         开场白基底 (保持原样)\n         ========================================= */\n      :root {\n        --pm-gold: #d4af37;\n        --pm-dark-red: #8b0000;\n        --pm-black: #1a1105;\n        --pm-text: #2c241b;\n        --pm-bg-light: #ffffff;\n        --pm-bg-mid: #fcfaf5;\n        --pm-bg-dark: #f4ebd8;\n      }\n\n      .pm-master-container {\n        position: relative; width: 100%; min-height: 100vh; border-radius: 12px; border: 2px solid var(--pm-gold);\n        z-index: 10; background: radial-gradient(circle at center, var(--pm-bg-light) 0%, var(--pm-bg-mid) 50%, var(--pm-bg-dark) 100%);\n        padding: 20px; box-sizing: border-box; color: var(--pm-text); overflow-x: hidden;\n        box-shadow: inset 0 0 40px rgba(255, 255, 255, 1); display: flex; flex-direction: column; align-items: center;\n        font-family: 'Noto Serif SC', 'Songti SC', serif; margin-top: 15px; margin-bottom: 15px;\n      }\n      .pm-master-container::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; border: 3px solid rgba(212, 175, 55, 0.8); border-radius: 12px; animation: pm-border-glow 4s infinite alternate ease-in-out; pointer-events: none; z-index: 2; }\n      .pm-master-container::after { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-radius: 12px; background-image: url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"noiseFilter\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23noiseFilter)\" opacity=\"0.05\"/></svg>'); pointer-events: none; z-index: 1; }\n      @keyframes pm-border-glow { 0% { box-shadow: inset 0 0 15px rgba(212, 175, 55, 0.1), 0 0 15px rgba(212, 175, 55, 0.2); border-color: rgba(212, 175, 55, 0.4); } 100% { box-shadow: inset 0 0 40px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.5); border-color: rgba(212, 175, 55, 1); } }\n\n      /* =========================================\n         PDA 悬浮终端样式 (App.vue 重构)\n         ========================================= */\n      .pm-pda-wrapper {\n        position: fixed; right: 20px; bottom: 20px; z-index: 99999; display: flex; flex-direction: column; align-items: flex-end; pointer-events: none;\n      }\n      .pm-pda-controls { display: flex; gap: 10px; margin-bottom: 10px; pointer-events: auto; }\n      .pm-pda-toggle-btn, .pm-fullscreen-btn {\n        background: rgba(15, 15, 18, 0.85); backdrop-filter: blur(10px); border: 1px solid var(--pm-gold);\n        color: var(--pm-gold); padding: 10px 15px; border-radius: 30px; cursor: pointer; font-weight: bold;\n        box-shadow: 0 4px 15px rgba(0,0,0,0.5); transition: all 0.3s; display: flex; align-items: center; gap: 5px;\n      }\n      .pm-pda-toggle-btn:hover, .pm-fullscreen-btn:hover { background: rgba(139, 0, 0, 0.8); border-color: #ff4444; color: #fff; box-shadow: 0 0 20px rgba(139,0,0,0.6); }\n\n      .stb-pm-wrapper {\n        width: 400px; max-height: 75vh; overflow-y: auto; pointer-events: auto;\n        background: rgba(10, 10, 12, 0.9); backdrop-filter: blur(15px); border: 1px solid #333;\n        border-top: 4px solid #8a0303; border-bottom: 4px solid #d4af37; border-radius: 12px;\n        font-family: 'Noto Sans SC', sans-serif; color: #d0d0d0; padding: 16px;\n        box-shadow: 0 10px 40px rgba(0,0,0,0.8), inset 0 0 20px rgba(255,255,255,0.02);\n        scrollbar-width: thin; scrollbar-color: var(--pm-gold) transparent;\n      }\n      @media (max-width: 768px) { .stb-pm-wrapper { width: 90vw; right: 5vw; } }\n\n      /* 🚨 字体优化：将原本丑陋的等宽字体替换为更平滑的无衬线字体 */\n      .stb-pm-terminal-data { font-family: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif; font-size: 13.5px; color: #81d4fa; white-space: pre-wrap; word-break: break-all; line-height: 1.6; letter-spacing: 0.5px; }\n      .stb-pm-terminal-data-gold { color: #f4e7c1; }\n      .stb-pm-terminal-data-red { color: #ff6b6b; }\n\n      .stb-pm-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid rgba(212, 175, 55, 0.2); padding-bottom: 12px; margin-bottom: 12px; position: relative; }\n      .stb-pm-header::after { content: ''; position: absolute; bottom: -1px; left: 0; width: 30%; height: 2px; background: #d4af37; box-shadow: 0 0 10px #d4af37; border-radius: 2px; }\n      .stb-pm-location { font-family: 'Noto Serif SC', serif; font-size: clamp(16px, 4vw, 18px); font-weight: bold; color: #d4af37; letter-spacing: 1px; text-shadow: 0 0 12px rgba(212, 175, 55, 0.6); word-break: break-word; display: flex; align-items: center; gap: 8px; flex: 1; }\n      .stb-pm-location::before { content: '◆'; font-size: 12px; color: #8a0303; text-shadow: 0 0 6px #8a0303; }\n      .stb-pm-env-col { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; flex-shrink: 0; }\n      .stb-pm-tag { background: rgba(0, 0, 0, 0.8); border: 1px solid #444; padding: 4px 10px; border-radius: 12px; white-space: nowrap; font-size: 12px; box-shadow: inset 0 0 8px rgba(255, 255, 255, 0.05); letter-spacing: 0.5px; }\n      .stb-pm-tag-time { color: #aaa; border-color: #555; }\n      .stb-pm-tag-weather { color: #ff6b6b; border-color: #8a0303; text-shadow: 0 0 5px rgba(138, 3, 3, 0.8); }\n\n      /* DM 头像 */\n      .stb-pm-dm-avatar-box { position: absolute; top: -10px; right: -10px; width: 60px; height: 60px; border-radius: 50%; border: 2px solid var(--pm-gold); overflow: hidden; box-shadow: 0 0 15px rgba(212, 175, 55, 0.5); z-index: 10; background: #000; }\n      .stb-pm-dm-avatar { width: 100%; height: 100%; object-fit: cover; }\n      .stb-pm-dm-label { position: absolute; bottom: 0; left: 0; width: 100%; background: rgba(138, 3, 3, 0.8); color: #fff; font-size: 10px; text-align: center; font-weight: bold; letter-spacing: 1px; }\n\n      /* BGM 播放器 */\n      .stb-pm-bgm-container { margin-bottom: 16px; }\n      .stb-pm-bgm-container details { background: linear-gradient(90deg, rgba(255, 255, 255, 0.03), rgba(0, 0, 0, 0.5)); border: 1px solid #333; border-left: 3px solid #81d4fa; border-radius: 8px; overflow: hidden; transition: all 0.3s ease; }\n      .stb-pm-bgm-container summary { padding: 12px 16px; font-size: 14px; color: #81d4fa; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; font-weight: bold; }\n      .stb-pm-bgm-container summary::-webkit-details-marker { display: none; }\n      .stb-pm-bgm-container summary:hover { background: rgba(129, 212, 250, 0.1); }\n      .stb-pm-bgm-arrow { transition: transform 0.3s ease; }\n      .stb-pm-bgm-container details[open] .stb-pm-bgm-arrow { transform: rotate(180deg); }\n      .stb-pm-bgm-content { padding: 12px; border-top: 1px solid #333; display: flex; justify-content: center; background: #000; overflow: hidden; }\n      .stb-pm-bgm-content > iframe, .stb-pm-bgm-content > audio { width: 100% !important; max-width: 330px; height: 86px; border-radius: 6px; outline: none; border: none; }\n\n      /* 按钮与徽章 */\n      @keyframes stb-btn-breathe-gold { 0% { box-shadow: 0 0 5px rgba(212, 175, 55, 0.2); } 50% { box-shadow: 0 0 15px rgba(212, 175, 55, 0.6); } 100% { box-shadow: 0 0 5px rgba(212, 175, 55, 0.2); } }\n      @keyframes stb-btn-breathe-blue { 0% { box-shadow: 0 0 5px rgba(129, 212, 250, 0.2); } 50% { box-shadow: 0 0 15px rgba(129, 212, 250, 0.6); } 100% { box-shadow: 0 0 5px rgba(129, 212, 250, 0.2); } }\n      .stb-pm-actions { display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap; }\n      .stb-pm-btn { flex: 1; min-width: 140px; height: 40px; display: flex; align-items: center; justify-content: center; text-decoration: none; font-size: 14px; font-weight: bold; letter-spacing: 1px; border-radius: 20px; transition: all 0.2s ease; cursor: pointer; touch-action: manipulation; }\n      .stb-pm-btn:active { transform: scale(0.96); }\n      .stb-pm-btn-guide { background: linear-gradient(180deg, rgba(212, 175, 55, 0.15), rgba(0, 0, 0, 0.8)); border: 1px solid #d4af37; color: #f4e7c1; animation: stb-btn-breathe-gold 3s infinite ease-in-out; }\n      .stb-pm-btn-mirror { background: linear-gradient(180deg, rgba(129, 212, 250, 0.15), rgba(0, 0, 0, 0.8)); border: 1px solid #81d4fa; color: #e1f5fe; animation: stb-btn-breathe-blue 3s infinite ease-in-out; }\n      .stb-pm-badges { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 16px; }\n      .stb-pm-badge { background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.5)); border: 1px solid #333; border-left: 3px solid #d4af37; padding: 8px 14px; border-radius: 8px; font-size: 14px; color: #e0e0e0; display: flex; align-items: center; gap: 8px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5); }\n      .stb-pm-badge strong { color: #d4af37; font-weight: bold; }\n      .stb-pm-badge-title { flex: 1 1 100%; border-left-color: #81d4fa; }\n      .stb-pm-badge-title strong { color: #81d4fa; }\n\n      /* Tabs 切换 */\n      .stb-pm-tabs-container { display: flex; flex-wrap: wrap; gap: 4px; position: relative; width: 100%; }\n      .stb-pm-tab-label { display: contents; }\n      .stb-pm-tab-radio { display: none; }\n      .stb-tab-btn { order: 1; padding: 10px 12px; font-size: 13px; color: #777; background: linear-gradient(to bottom, #0a0a0a, #111); border: 1px solid #222; border-bottom: none; border-radius: 8px 8px 0 0; cursor: pointer; white-space: nowrap; transition: all 0.3s ease; position: relative; letter-spacing: 1px; user-select: none; flex-grow: 1; text-align: center; }\n      .stb-pm-tab-content { order: 2; width: 100%; display: none; flex-direction: column; gap: 16px; padding-top: 16px; border-top: 1px solid #222; }\n      .stb-pm-tab-radio:checked ~ .stb-tab-btn { color: #fff; background: linear-gradient(to bottom, rgba(138, 3, 3, 0.25), #0a0a0a); border-color: #555; text-shadow: 0 0 6px rgba(255, 255, 255, 0.6); font-weight: bold; }\n      .stb-pm-tab-radio:checked ~ .stb-tab-btn::after { content: ''; position: absolute; bottom: -1px; left: 0; width: 100%; height: 3px; background: #d4af37; box-shadow: 0 -2px 12px #d4af37, 0 0 6px #fff; border-radius: 2px; z-index: 2; }\n      .stb-pm-tab-radio:checked ~ .stb-pm-tab-content { display: flex; }\n\n      /* 面板与进度条 */\n      .stb-pm-panel { background: rgba(15, 15, 18, 0.8); border: 1px solid #222; border-left: 4px solid #555; border-radius: 8px; padding: 16px; min-width: 0; box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8); transition: border-color 0.3s ease, box-shadow 0.3s ease; position: relative; }\n      .stb-pm-panel:hover { border-left-color: #d4af37; box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8), -3px 0 12px rgba(212, 175, 55, 0.25); }\n      .stb-pm-panel-title { font-size: 13px; color: #999; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px; border-bottom: 1px dashed rgba(255, 255, 255, 0.15); padding-bottom: 6px; display: flex; align-items: center; font-weight: bold; }\n      .stb-pm-panel-title::before { content: '■'; font-size: 10px; margin-right: 8px; color: #555; }\n      .stb-pm-bar-container { margin-bottom: 14px; }\n      .stb-pm-bar-header { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 6px; }\n      .stb-pm-bar-label { font-weight: bold; text-shadow: 0 0 5px currentColor; letter-spacing: 1px; }\n      .stb-pm-bar-value { font-family: 'Courier New', Courier, monospace; font-size: 14px; color: #ccc; }\n      .stb-pm-bar-track { width: 100%; height: 14px; background: #0a0a0a; border: 1px solid #333; border-radius: 7px; overflow: hidden; box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.9), 0 1px 0 rgba(255, 255, 255, 0.05); position: relative; }\n      .stb-pm-bar-fill { height: 100%; transition: width 0.5s ease; border-radius: 7px; }\n      .stb-pm-bar-hp { background: linear-gradient(90deg, #ff6b6b, #8a0303); box-shadow: 0 0 8px rgba(255, 107, 107, 0.6); }\n      .stb-pm-bar-mp { background: linear-gradient(90deg, #81d4fa, #0277bd); box-shadow: 0 0 8px rgba(129, 212, 250, 0.6); }\n      .stb-pm-bar-sp { background: linear-gradient(90deg, #81c784, #2e7d32); box-shadow: 0 0 8px rgba(129, 199, 132, 0.6); }\n      .stb-pm-bar-xp { background: linear-gradient(90deg, #fff59d, #fbc02d); box-shadow: 0 0 8px rgba(255, 245, 157, 0.6); }\n\n      /* 肢体状态 */\n      .stb-pm-limbs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }\n      @keyframes stb-critical-flash { 0% { border-color: #ff4444; box-shadow: 0 0 10px rgba(255, 68, 68, 0.7); background: rgba(255, 68, 68, 0.15); } 50% { border-color: #550000; box-shadow: none; background: rgba(255, 68, 68, 0.05); } 100% { border-color: #ff4444; box-shadow: 0 0 10px rgba(255, 68, 68, 0.7); background: rgba(255, 68, 68, 0.15); } }\n      .stb-pm-limb-card { background: linear-gradient(180deg, #1a1a1a, #0d0d0d); border: 1px solid #333; border-radius: 8px; padding: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; transition: transform 0.2s ease, border-color 0.2s ease; position: relative; overflow: hidden; }\n      .stb-pm-limb-card::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: #333; }\n      .stb-pm-limb-name { font-size: 12px; color: #888; margin-bottom: 6px; letter-spacing: 1px; text-transform: uppercase; }\n      .stb-pm-limb-stat { font-size: 14px; font-weight: bold; text-align: center; word-break: break-word; white-space: normal; }\n      .stb-pm-limb-card[data-status*='完好']::before { background: #555; }\n      .stb-pm-limb-card[data-status*='完好'] .stb-pm-limb-stat { color: #999; }\n      .stb-pm-limb-card[data-status*='轻度']::before { background: #aaa; }\n      .stb-pm-limb-card[data-status*='轻度'] .stb-pm-limb-stat { color: #ddd; text-shadow: 0 0 4px rgba(255, 255, 255, 0.3); }\n      .stb-pm-limb-card[data-status*='重伤'] { border-color: #ffb74d; }\n      .stb-pm-limb-card[data-status*='重伤']::before { background: #ffb74d; box-shadow: 0 0 6px #ffb74d; }\n      .stb-pm-limb-card[data-status*='重伤'] .stb-pm-limb-stat { color: #ffcc80; text-shadow: 0 0 6px rgba(255, 204, 128, 0.6); }\n      .stb-pm-limb-card[data-status*='残废'], .stb-pm-limb-card[data-status*='断裂'] { animation: stb-critical-flash 1s infinite; }\n      .stb-pm-limb-card[data-status*='残废']::before, .stb-pm-limb-card[data-status*='断裂']::before { background: #ff4444; }\n      .stb-pm-limb-card[data-status*='残废'] .stb-pm-limb-stat, .stb-pm-limb-card[data-status*='断裂'] .stb-pm-limb-stat { color: #ff6b6b; text-decoration: line-through; }\n      .stb-pm-limb-card[data-status*='义体'], .stb-pm-limb-card[data-status*='同化'], .stb-pm-limb-card[data-status*='再生'] { border-color: #d4af37; background: rgba(212, 175, 55, 0.05); }\n      .stb-pm-limb-card[data-status*='义体']::before, .stb-pm-limb-card[data-status*='同化']::before, .stb-pm-limb-card[data-status*='再生']::before { background: #d4af37; box-shadow: 0 0 6px #d4af37; }\n      .stb-pm-limb-card[data-status*='义体'] .stb-pm-limb-stat, .stb-pm-limb-card[data-status*='同化'] .stb-pm-limb-stat, .stb-pm-limb-card[data-status*='再生'] .stb-pm-limb-stat { color: #f4e7c1; text-shadow: 0 0 6px rgba(212, 175, 55, 0.5); }\n\n      /* 属性与折叠夹 */\n      .stb-pm-stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 16px; }\n      .stb-pm-stat-box { background: rgba(255, 255, 255, 0.02); border: 1px solid #333; border-radius: 6px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5); }\n      .stb-pm-stat-label { font-size: 13px; color: #888; text-transform: uppercase; font-weight: bold; }\n      .stb-pm-stat-value { font-size: 16px; font-weight: bold; color: #d4af37; font-family: monospace; text-shadow: 0 0 5px rgba(212, 175, 55, 0.4); }\n      .stb-pm-folder { background: rgba(255, 255, 255, 0.03); border: 1px solid #333; border-radius: 6px; margin-bottom: 10px; overflow: hidden; transition: all 0.3s ease; }\n      .stb-pm-folder summary { padding: 12px 14px; font-size: 14px; color: #eee; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; font-weight: bold; background: rgba(0, 0, 0, 0.4); }\n      .stb-pm-folder summary::-webkit-details-marker { display: none; }\n      .stb-pm-folder summary:hover { background: rgba(255, 255, 255, 0.05); }\n      .stb-pm-folder-arrow { transition: transform 0.3s ease; color: #888; font-size: 12px; }\n      .stb-pm-folder[open] > summary > .stb-pm-folder-arrow { transform: rotate(180deg); }\n      .stb-pm-folder-content { padding: 12px; border-top: 1px solid #333; }\n\n      /* 文本与传闻卡片 */\n      .stb-pm-text-block { font-size: 15px; color: #ccc; line-height: 1.6; word-wrap: break-word; white-space: normal; }\n      .stb-pm-rumor-card { background: linear-gradient(90deg, rgba(212, 175, 55, 0.08), rgba(0, 0, 0, 0.6)); border: 1px solid #222; border-left: 4px solid #d4af37; padding: 12px 16px; margin-bottom: 12px; border-radius: 4px 8px 8px 4px; transition: all 0.3s ease; position: relative; }\n      .stb-pm-rumor-card::after { content: ''; position: absolute; top: 0; right: 0; width: 30px; height: 100%; background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.9)); }\n      .stb-pm-rumor-card:hover { background: linear-gradient(90deg, rgba(212, 175, 55, 0.15), rgba(0, 0, 0, 0.6)); border-left-width: 6px; transform: translateX(4px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6); }\n      .stb-pm-rumor-title { color: #d4af37; font-size: 14px; margin-bottom: 8px; font-weight: bold; letter-spacing: 1.5px; }\n      .stb-pm-rumor-text { color: #ddd; font-size: 15px; line-height: 1.6; position: relative; z-index: 1; }\n      .stb-pm-info-row { display: flex; flex-direction: row; justify-content: space-between; margin-bottom: 8px; border-bottom: 1px dashed #333; padding-bottom: 4px; }\n      .stb-pm-info-label { font-size: 14px; color: #999; }\n      .stb-pm-info-value { font-size: 14px; font-weight: bold; color: #ccc; }\n\n      /* 🚨 骰子特效 CSS */\n      @keyframes pm-glitch-anim {\n        0% { clip-path: inset(10% 0 80% 0); transform: translate(-2px, 2px); }\n        20% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }\n        40% { clip-path: inset(40% 0 40% 0); transform: translate(2px, 2px); }\n        60% { clip-path: inset(20% 0 60% 0); transform: translate(-2px, -2px); }\n        80% { clip-path: inset(60% 0 20% 0); transform: translate(2px, 2px); }\n        100% { clip-path: inset(10% 0 80% 0); transform: translate(-2px, -2px); }\n      }\n      .pm-crit-success {\n        display: inline-block; font-weight: 900; color: #fff; background: linear-gradient(45deg, #d4af37, #ffeb3b);\n        padding: 2px 8px; border-radius: 4px; text-shadow: 0 0 10px #fff; box-shadow: 0 0 15px rgba(212, 175, 55, 0.8);\n        animation: pulse 1.5s infinite;\n      }\n      .pm-crit-fail {\n        display: inline-block; font-weight: 900; color: #fff; background: linear-gradient(45deg, #8b0000, #ff4444);\n        padding: 2px 8px; border-radius: 4px; text-shadow: 0 0 10px #fff; box-shadow: 0 0 15px rgba(139, 0, 0, 0.8);\n        position: relative;\n      }\n      .pm-crit-fail::before {\n        content: attr(data-text); position: absolute; left: -2px; text-shadow: 2px 0 red; top: 0; color: white;\n        background: transparent; overflow: hidden; animation: pm-glitch-anim 2s infinite linear alternate-reverse;\n      }\n    ";
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
			let a = rs(i), o = $.mvuDataMap[i];
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
				if (e.classList && e.classList.contains("pm-pda-wrapper") || e.hasAttribute("data-pm-parsed")) return;
				let t = e.textContent || "", n = t.toUpperCase().trim();
				if ((n.startsWith("战术聚焦:") || n.startsWith("战术聚焦：") || n.includes("战术聚焦:")) && t.length < 1e3) {
					e.style.display = "none", e.setAttribute("data-pm-parsed", "true");
					return;
				}
				if (n.includes("_.SET(") || n.includes("UPDATEVARIABLE") || n.includes("STATUSBAR_DATA")) {
					e.style.display = "none", e.setAttribute("data-pm-parsed", "true");
					return;
				}
				if (!c && e.innerHTML) {
					let t = e.innerHTML, n = !1;
					if (/检定[:：]\s*\d+/i.test(t) && !t.includes("pm-interactive-dice") ? (t = t.replace(/(检定[:：]\s*\d+)/gi, "<span class=\"pm-interactive-dice\" onclick=\"this.classList.add('revealed')\"><span class=\"pm-dice-cover\">🎲 点击揭晓</span><span class=\"pm-dice-result\">$1</span></span>"), n = !0) : /(1d100|1d20|1d10|1d8|1d6|1d4)/i.test(t) && !t.includes("pm-interactive-dice") && (t = t.replace(/(1d100|1d20|1d10|1d8|1d6|1d4)/gi, "<span class=\"pm-interactive-dice\" onclick=\"this.classList.add('revealed')\"><span class=\"pm-dice-cover\">🎲 掷骰</span><span class=\"pm-dice-result\">$&</span></span>"), n = !0), t.includes("大成功") && !t.includes("pm-crit-success") && (t = t.replace(/大成功/g, "<span class=\"pm-crit-success\">大成功</span>"), n = !0), t.includes("大失败") && !t.includes("pm-crit-fail") && (t = t.replace(/大失败/g, "<span class=\"pm-crit-fail\" data-text=\"大失败\">大失败</span>"), n = !0, i === $.latestMesId)) {
						r.body.classList.add("pm-screen-shake"), setTimeout(() => r.body.classList.remove("pm-screen-shake"), 500);
						let e = r.createElement("div");
						e.className = "pm-blood-splatter", r.body.appendChild(e), setTimeout(() => e.remove(), 2e3);
					}
					if (t.includes("<carmen_whisper>") && (t = t.replace(/<carmen_whisper>([\s\S]*?)<\/carmen_whisper>/gi, "<div class=\"pm-carmen-whisper\">$1</div>"), n = !0), t.includes("<CONTEXT_OPTIONS>")) {
						let e = t.match(/<CONTEXT_OPTIONS>([\s\S]*?)<\/CONTEXT_OPTIONS>/i);
						if (e) {
							let r = e[1].split("\n").filter((e) => e.trim().length > 0), i = "<div class=\"pm-tarot-container\">";
							r.forEach((e) => {
								let t = e.replace(/^\d+\.\s*/, "").trim();
								if (t) {
									let e = t.match(/^(.*?)(?:\((.*?)\))?$/), n = e ? e[1].trim() : t, r = e && e[2] ? e[2].trim() : "命运的抉择";
									i += `<div class="pm-tarot-card" onclick="window.sendChatMessage('我选择：${n.replace(/'/g, "\\'")}')"><h3>${n}</h3><p>${r}</p></div>`;
								}
							}), i += "</div>", t = t.replace(/<CONTEXT_OPTIONS>[\s\S]*?<\/CONTEXT_OPTIONS>/i, i), n = !0;
						}
					}
					n && (e.innerHTML = t);
				}
				e.setAttribute("data-pm-parsed", "true");
			}), s.includes("pm-custom-char-mount-point")) {
				let n = `pm-setup-root-${i}`, a = r.getElementById(n);
				a || (a = r.createElement("div"), a.id = n, a.style.cssText = "margin-top: 15px; width: 100%; position: relative; clear: both;", u.appendChild(a), t = Qo(qp), t.mount(a), e.set(`setup_${i}`, t));
			}
			if (!c && !l) {
				let t = `pm-app-${i}`, n = r.getElementById(t);
				if (!n) {
					n = r.createElement("div"), n.className = "pm-pda-mount-point", n.id = t, n.style.cssText = "width: 100%; clear: both;", u.appendChild(n);
					let a = Qo(Ql, { mesId: i });
					a.mount(n), e.set(i, a);
				}
			}
		});
	}, a = () => {
		let t = n(), r = t.getElementById("chat");
		if (!r) {
			setTimeout(a, 1e3);
			return;
		}
		t.body.classList.add("pm-global-active"), $.isReady = !0, setInterval(() => {
			if ($.isReady) {
				for (let t of e.keys()) if (typeof t == "number") {
					let e = rs(t), n = $.mvuDataMap[t];
					try {
						JSON.stringify(e) !== JSON.stringify(n) && ($.mvuDataMap[t] = e);
					} catch {
						$.mvuDataMap[t] = e;
					}
				}
			}
		}, 1e3);
		let o = !1, s = !1, c = () => {
			i(), o = !0, setTimeout(() => {
				o = !1, s && (s = !1, c());
			}, 500);
		};
		new MutationObserver((e) => {
			e.every((e) => {
				let t = e.target;
				return typeof t?.className == "string" && t.className.includes("pm-pda-mount-point") || typeof t?.id == "string" && (t.id.includes("pm-app-") || t.id.includes("pm-setup-root-"));
			}) || (o ? s = !0 : c());
		}).observe(r, {
			childList: !0,
			subtree: !0,
			characterData: !0
		}), i();
	};
	window.sendChatMessage = ns, r(), a();
}
//#endregion
