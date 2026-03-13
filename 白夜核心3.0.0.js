
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
}, l = Object.prototype.hasOwnProperty, u = (e, t) => l.call(e, t), d = Array.isArray, f = (e) => x(e) === "[object Map]", p = (e) => x(e) === "[object Set]", m = (e) => x(e) === "[object Date]", h = (e) => typeof e == "function", g = (e) => typeof e == "string", _ = (e) => typeof e == "symbol", v = (e) => typeof e == "object" && !!e, y = (e) => (v(e) || h(e)) && h(e.then) && h(e.catch), b = Object.prototype.toString, x = (e) => b.call(e), S = (e) => x(e).slice(8, -1), C = (e) => x(e) === "[object Object]", w = (e) => g(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, T = /* @__PURE__ */ e(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), ee = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, te = /-\w/g, E = ee((e) => e.replace(te, (e) => e.slice(1).toUpperCase())), ne = /\B([A-Z])/g, D = ee((e) => e.replace(ne, "-$1").toLowerCase()), re = ee((e) => e.charAt(0).toUpperCase() + e.slice(1)), ie = ee((e) => e ? `on${re(e)}` : ""), O = (e, t) => !Object.is(e, t), ae = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, k = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, A = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, j = (e) => {
	let t = g(e) ? Number(e) : NaN;
	return isNaN(t) ? e : t;
}, M, oe = () => M ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
function se(e) {
	if (d(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = g(r) ? ue(r) : se(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	} else if (g(e) || v(e)) return e;
}
var N = /;(?![^(]*\))/g, ce = /:([^]+)/, le = /\/\*[^]*?\*\//g;
function ue(e) {
	let t = {};
	return e.replace(le, "").split(N).forEach((e) => {
		if (e) {
			let n = e.split(ce);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function P(e) {
	let t = "";
	if (g(e)) t = e;
	else if (d(e)) for (let n = 0; n < e.length; n++) {
		let r = P(e[n]);
		r && (t += r + " ");
	}
	else if (v(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
var de = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", F = /* @__PURE__ */ e(de);
de + "";
function fe(e) {
	return !!e || e === "";
}
function pe(e, t) {
	if (e.length !== t.length) return !1;
	let n = !0;
	for (let r = 0; n && r < e.length; r++) n = I(e[r], t[r]);
	return n;
}
function I(e, t) {
	if (e === t) return !0;
	let n = m(e), r = m(t);
	if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
	if (n = _(e), r = _(t), n || r) return e === t;
	if (n = d(e), r = d(t), n || r) return n && r ? pe(e, t) : !1;
	if (n = v(e), r = v(t), n || r) {
		if (!n || !r || Object.keys(e).length !== Object.keys(t).length) return !1;
		for (let n in e) {
			let r = e.hasOwnProperty(n), i = t.hasOwnProperty(n);
			if (r && !i || !r && i || !I(e[n], t[n])) return !1;
		}
	}
	return String(e) === String(t);
}
function me(e, t) {
	return e.findIndex((e) => I(e, t));
}
var he = (e) => !!(e && e.__v_isRef === !0), L = (e) => g(e) ? e : e == null ? "" : d(e) || v(e) && (e.toString === b || !h(e.toString)) ? he(e) ? L(e.value) : JSON.stringify(e, ge, 2) : String(e), ge = (e, t) => he(t) ? ge(e, t.value) : f(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[_e(t, r) + " =>"] = n, e), {}) } : p(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => _e(e)) } : _(t) ? _e(t) : v(t) && !d(t) && !C(t) ? String(t) : t, _e = (e, t = "") => _(e) ? `Symbol(${e.description ?? t})` : e, ve, ye = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.__v_skip = !0, this.parent = ve, !e && ve && (this.index = (ve.scopes ||= []).push(this) - 1);
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
			let t = ve;
			try {
				return ve = this, e();
			} finally {
				ve = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = ve, ve = this);
	}
	off() {
		this._on > 0 && --this._on === 0 && (ve = this.prevScope, this.prevScope = void 0);
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
	return ve;
}
var R, xe = /* @__PURE__ */ new WeakSet(), Se = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ve && ve.active && ve.effects.push(this);
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
		let e = R, t = B;
		R = this, B = !0;
		try {
			return this.fn();
		} finally {
			z(this), R = e, B = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) Me(e);
			this.deps = this.depsTail = void 0, Le(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? xe.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		Ae(this) && this.run();
	}
	get dirty() {
		return Ae(this);
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
function z(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), Me(r), Ne(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function Ae(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (je(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function je(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Re) || (e.globalVersion = Re, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Ae(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = R, r = B;
	R = e, B = !0;
	try {
		ke(e);
		let n = e.fn(e._value);
		(t.version === 0 || O(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		R = n, B = r, z(e), e.flags &= -3;
	}
}
function Me(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) Me(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function Ne(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var B = !0, Pe = [];
function Fe() {
	Pe.push(B), B = !1;
}
function Ie() {
	let e = Pe.pop();
	B = e === void 0 ? !0 : e;
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
var Re = 0, ze = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, Be = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!R || !B || R === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== R) t = this.activeLink = new ze(R, this), R.deps ? (t.prevDep = R.depsTail, R.depsTail.nextDep = t, R.depsTail = t) : R.deps = R.depsTail = t, Ve(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = R.depsTail, t.nextDep = void 0, R.depsTail.nextDep = t, R.depsTail = t, R.deps === t && (R.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, Re++, this.notify(e);
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
function V(e, t, n) {
	if (B && R) {
		let t = He.get(e);
		t || He.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new Be()), r.map = t, r.key = n), r.track();
	}
}
function Ke(e, t, n, r, i, a) {
	let o = He.get(e);
	if (!o) {
		Re++;
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
	Oe();
}
function qe(e) {
	let t = /* @__PURE__ */ H(e);
	return t === e ? t : (V(t, "iterate", Ge), /* @__PURE__ */ Nt(e) ? t : t.map(It));
}
function Je(e) {
	return V(e = /* @__PURE__ */ H(e), "iterate", Ge), e;
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
	V(r, "iterate", Ge);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ Pt(n[0]) ? (n[0] = /* @__PURE__ */ H(n[0]), r[t](...n)) : i;
}
function nt(e, t, n = []) {
	Fe(), De();
	let r = (/* @__PURE__ */ H(e))[t].apply(e, n);
	return Oe(), Ie(), r;
}
var rt = /* @__PURE__ */ e("__proto__,__v_isRef,__isVue"), it = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(_));
function at(e) {
	_(e) || (e = String(e));
	let t = /* @__PURE__ */ H(this);
	return V(t, "has", e), t.hasOwnProperty(e);
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
		let o = Reflect.get(e, t, /* @__PURE__ */ U(e) ? e : n);
		if ((_(t) ? it.has(t) : rt(t)) || (r || V(e, "get", t), i)) return o;
		if (/* @__PURE__ */ U(o)) {
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
			if (!/* @__PURE__ */ Nt(n) && !/* @__PURE__ */ Mt(n) && (i = /* @__PURE__ */ H(i), n = /* @__PURE__ */ H(n)), !a && /* @__PURE__ */ U(i) && !/* @__PURE__ */ U(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : u(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ U(e) ? e : r);
		return e === /* @__PURE__ */ H(r) && (o ? O(n, i) && Ke(e, "set", t, n, i) : Ke(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = u(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && Ke(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return (!_(t) || !it.has(t)) && V(e, "has", t), n;
	}
	ownKeys(e) {
		return V(e, "iterate", d(e) ? "length" : Ue), Reflect.ownKeys(e);
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
		return !t && V(a, "iterate", l ? We : Ue), s(Object.create(u), { next() {
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
			e || (O(n, a) && V(i, "get", n), V(i, "get", a));
			let { has: o } = pt(i), s = t ? ft : e ? Lt : It;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && V(/* @__PURE__ */ H(t), "iterate", Ue), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ H(n), i = /* @__PURE__ */ H(t);
			return e || (O(t, i) && V(r, "has", t), V(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ H(a), s = t ? ft : e ? Lt : It;
			return !e && V(o, "iterate", Ue), a.forEach((e, t) => n.call(r, s(e), s(t), i));
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
			return r.has.call(n, a) || O(e, a) && r.has.call(n, e) || O(i, a) && r.has.call(n, i) || (n.add(a), Ke(n, "add", a, a)), this;
		},
		set(e, n) {
			!t && !/* @__PURE__ */ Nt(n) && !/* @__PURE__ */ Mt(n) && (n = /* @__PURE__ */ H(n));
			let r = /* @__PURE__ */ H(this), { has: i, get: a } = pt(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ H(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? O(n, s) && Ke(r, "set", e, n, s) : Ke(r, "add", e, n), this;
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
	return !u(e, "__v_skip") && Object.isExtensible(e) && k(e, "__v_skip", !0), e;
}
var It = (e) => v(e) ? /* @__PURE__ */ Dt(e) : e, Lt = (e) => v(e) ? /* @__PURE__ */ kt(e) : e;
/* @__NO_SIDE_EFFECTS__ */
function U(e) {
	return e ? e.__v_isRef === !0 : !1;
}
/* @__NO_SIDE_EFFECTS__ */
function W(e) {
	return Rt(e, !1);
}
function Rt(e, t) {
	return /* @__PURE__ */ U(e) ? e : new zt(e, t);
}
var zt = class {
	constructor(e, t) {
		this.dep = new Be(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ H(e), this._value = t ? e : It(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Nt(e) || /* @__PURE__ */ Mt(e);
		e = n ? e : /* @__PURE__ */ H(e), O(e, t) && (this._rawValue = e, this._value = n ? e : It(e), this.dep.trigger());
	}
};
function Bt(e) {
	return /* @__PURE__ */ U(e) ? e.value : e;
}
var Vt = {
	get: (e, t, n) => t === "__v_raw" ? e : Bt(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ U(i) && !/* @__PURE__ */ U(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function Ht(e) {
	return /* @__PURE__ */ jt(e) ? e : new Proxy(e, Vt);
}
var Ut = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new Be(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Re - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && R !== this) return Ee(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return je(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter && this.setter(e);
	}
};
/* @__NO_SIDE_EFFECTS__ */
function Wt(e, t, n = !1) {
	let r, i;
	return h(e) ? r = e : (r = e.get, i = e.set), new Ut(r, i, n);
}
var Gt = {}, Kt = /* @__PURE__ */ new WeakMap(), qt = void 0;
function Jt(e, t = !1, n = qt) {
	if (n) {
		let t = Kt.get(n);
		t || Kt.set(n, t = []), t.push(e);
	}
}
function Yt(e, n, i = t) {
	let { immediate: a, deep: o, once: s, scheduler: l, augmentJob: u, call: f } = i, p = (e) => o ? e : /* @__PURE__ */ Nt(e) || o === !1 || o === 0 ? Xt(e, 1) : Xt(e), m, g, _, v, y = !1, b = !1;
	if (/* @__PURE__ */ U(e) ? (g = () => e.value, y = /* @__PURE__ */ Nt(e)) : /* @__PURE__ */ jt(e) ? (g = () => p(e), y = !0) : d(e) ? (b = !0, y = e.some((e) => /* @__PURE__ */ jt(e) || /* @__PURE__ */ Nt(e)), g = () => e.map((e) => {
		if (/* @__PURE__ */ U(e)) return e.value;
		if (/* @__PURE__ */ jt(e)) return p(e);
		if (h(e)) return f ? f(e, 2) : e();
	})) : g = h(e) ? n ? f ? () => f(e, 2) : e : () => {
		if (_) {
			Fe();
			try {
				_();
			} finally {
				Ie();
			}
		}
		let t = qt;
		qt = m;
		try {
			return f ? f(e, 3, [v]) : e(v);
		} finally {
			qt = t;
		}
	} : r, n && o) {
		let e = g, t = o === !0 ? Infinity : o;
		g = () => Xt(e(), t);
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
	let C = b ? Array(e.length).fill(Gt) : Gt, w = (e) => {
		if (!(!(m.flags & 1) || !m.dirty && !e)) if (n) {
			let e = m.run();
			if (o || y || (b ? e.some((e, t) => O(e, C[t])) : O(e, C))) {
				_ && _();
				let t = qt;
				qt = m;
				try {
					let t = [
						e,
						C === Gt ? void 0 : b && C[0] === Gt ? [] : C,
						v
					];
					C = e, f ? f(n, 3, t) : n(...t);
				} finally {
					qt = t;
				}
			}
		} else m.run();
	};
	return u && u(w), m = new Se(g), m.scheduler = l ? () => l(w, !1) : w, v = (e) => Jt(e, !1, m), _ = m.onStop = () => {
		let e = Kt.get(m);
		if (e) {
			if (f) f(e, 4);
			else for (let t of e) t();
			Kt.delete(m);
		}
	}, n ? a ? w(!0) : C = m.run() : l ? l(w.bind(null, !0), !0) : m.run(), S.pause = m.pause.bind(m), S.resume = m.resume.bind(m), S.stop = S, S;
}
function Xt(e, t = Infinity, n) {
	if (t <= 0 || !v(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ U(e)) Xt(e.value, t, n);
	else if (d(e)) for (let r = 0; r < e.length; r++) Xt(e[r], t, n);
	else if (p(e) || f(e)) e.forEach((e) => {
		Xt(e, t, n);
	});
	else if (C(e)) {
		for (let r in e) Xt(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && Xt(e[r], t, n);
	}
	return e;
}
//#endregion
//#region node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
function Zt(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		$t(e, t, n);
	}
}
function Qt(e, t, n, r) {
	if (h(e)) {
		let i = Zt(e, t, n, r);
		return i && y(i) && i.catch((e) => {
			$t(e, t, n);
		}), i;
	}
	if (d(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(Qt(e[a], t, n, r));
		return i;
	}
}
function $t(e, n, r, i = !0) {
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
			Fe(), Zt(o, null, 10, [
				e,
				i,
				a
			]), Ie();
			return;
		}
	}
	en(e, r, a, i, s);
}
function en(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var tn = [], nn = -1, rn = [], an = null, on = 0, sn = /* @__PURE__ */ Promise.resolve(), cn = null;
function ln(e) {
	let t = cn || sn;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function un(e) {
	let t = nn + 1, n = tn.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = tn[r], a = gn(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function dn(e) {
	if (!(e.flags & 1)) {
		let t = gn(e), n = tn[tn.length - 1];
		!n || !(e.flags & 2) && t >= gn(n) ? tn.push(e) : tn.splice(un(t), 0, e), e.flags |= 1, fn();
	}
}
function fn() {
	cn ||= sn.then(_n);
}
function pn(e) {
	d(e) ? rn.push(...e) : an && e.id === -1 ? an.splice(on + 1, 0, e) : e.flags & 1 || (rn.push(e), e.flags |= 1), fn();
}
function mn(e, t, n = nn + 1) {
	for (; n < tn.length; n++) {
		let t = tn[n];
		if (t && t.flags & 2) {
			if (e && t.id !== e.uid) continue;
			tn.splice(n, 1), n--, t.flags & 4 && (t.flags &= -2), t(), t.flags & 4 || (t.flags &= -2);
		}
	}
}
function hn(e) {
	if (rn.length) {
		let e = [...new Set(rn)].sort((e, t) => gn(e) - gn(t));
		if (rn.length = 0, an) {
			an.push(...e);
			return;
		}
		for (an = e, on = 0; on < an.length; on++) {
			let e = an[on];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		an = null, on = 0;
	}
}
var gn = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function _n(e) {
	try {
		for (nn = 0; nn < tn.length; nn++) {
			let e = tn[nn];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), Zt(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; nn < tn.length; nn++) {
			let e = tn[nn];
			e && (e.flags &= -2);
		}
		nn = -1, tn.length = 0, hn(e), cn = null, (tn.length || rn.length) && _n(e);
	}
}
var vn = null, yn = null;
function bn(e) {
	let t = vn;
	return vn = e, yn = e && e.type.__scopeId || null, t;
}
function xn(e, t = vn, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && zi(-1);
		let i = bn(t), a;
		try {
			a = e(...n);
		} finally {
			bn(i), r._d && zi(1);
		}
		return a;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function G(e, n) {
	if (vn === null) return e;
	let r = xa(vn), i = e.dirs ||= [];
	for (let e = 0; e < n.length; e++) {
		let [a, o, s, c = t] = n[e];
		a && (h(a) && (a = {
			mounted: a,
			updated: a
		}), a.deep && Xt(o), i.push({
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
function Sn(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (Fe(), Qt(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), Ie());
	}
}
function Cn(e, t) {
	if (aa) {
		let n = aa.provides, r = aa.parent && aa.parent.provides;
		r === n && (n = aa.provides = Object.create(r)), n[e] = t;
	}
}
function wn(e, t, n = !1) {
	let r = oa();
	if (r || Hr) {
		let i = Hr ? Hr._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && h(t) ? t.call(r && r.proxy) : t;
	}
}
var Tn = /* @__PURE__ */ Symbol.for("v-scx"), En = () => wn(Tn);
function Dn(e, t, n) {
	return On(e, t, n);
}
function On(e, n, i = t) {
	let { immediate: a, deep: o, flush: c, once: l } = i, u = s({}, i), d = n && a || !n && c !== "post", f;
	if (fa) {
		if (c === "sync") {
			let e = En();
			f = e.__watcherHandles ||= [];
		} else if (!d) {
			let e = () => {};
			return e.stop = r, e.resume = r, e.pause = r, e;
		}
	}
	let p = aa;
	u.call = (e, t, n) => Qt(e, p, t, n);
	let m = !1;
	c === "post" ? u.scheduler = (e) => {
		yi(e, p && p.suspense);
	} : c !== "sync" && (m = !0, u.scheduler = (e, t) => {
		t ? e() : dn(e);
	}), u.augmentJob = (e) => {
		n && (e.flags |= 4), m && (e.flags |= 2, p && (e.id = p.uid, e.i = p));
	};
	let h = Yt(e, n, u);
	return fa && (f ? f.push(h) : d && h()), h;
}
function kn(e, t, n) {
	let r = this.proxy, i = g(e) ? e.includes(".") ? An(r, e) : () => r[e] : e.bind(r, r), a;
	h(t) ? a = t : (a = t.handler, n = t);
	let o = la(this), s = On(i, a.bind(r), n);
	return o(), s;
}
function An(e, t) {
	let n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t;
	};
}
var jn = /* @__PURE__ */ Symbol("_vte"), Mn = (e) => e.__isTeleport, Nn = /* @__PURE__ */ Symbol("_leaveCb"), Pn = /* @__PURE__ */ Symbol("_enterCb");
function Fn() {
	let e = {
		isMounted: !1,
		isLeaving: !1,
		isUnmounting: !1,
		leavingVNodes: /* @__PURE__ */ new Map()
	};
	return lr(() => {
		e.isMounted = !0;
	}), fr(() => {
		e.isUnmounting = !0;
	}), e;
}
var In = [Function, Array], Ln = {
	mode: String,
	appear: Boolean,
	persisted: Boolean,
	onBeforeEnter: In,
	onEnter: In,
	onAfterEnter: In,
	onEnterCancelled: In,
	onBeforeLeave: In,
	onLeave: In,
	onAfterLeave: In,
	onLeaveCancelled: In,
	onBeforeAppear: In,
	onAppear: In,
	onAfterAppear: In,
	onAppearCancelled: In
}, Rn = (e) => {
	let t = e.subTree;
	return t.component ? Rn(t.component) : t;
}, zn = {
	name: "BaseTransition",
	props: Ln,
	setup(e, { slots: t }) {
		let n = oa(), r = Fn();
		return () => {
			let i = t.default && qn(t.default(), !0);
			if (!i || !i.length) return;
			let a = Bn(i), o = /* @__PURE__ */ H(e), { mode: s } = o;
			if (r.isLeaving) return Wn(a);
			let c = Gn(a);
			if (!c) return Wn(a);
			let l = Un(c, o, r, n, (e) => l = e);
			c.type !== Ni && Kn(c, l);
			let u = n.subTree && Gn(n.subTree);
			if (u && u.type !== Ni && !Ui(u, c) && Rn(n).type !== Ni) {
				let e = Un(u, o, r, n);
				if (Kn(u, e), s === "out-in" && c.type !== Ni) return r.isLeaving = !0, e.afterLeave = () => {
					r.isLeaving = !1, n.job.flags & 8 || n.update(), delete e.afterLeave, u = void 0;
				}, Wn(a);
				s === "in-out" && c.type !== Ni ? e.delayLeave = (e, t, n) => {
					let i = Hn(r, u);
					i[String(u.key)] = u, e[Nn] = () => {
						t(), e[Nn] = void 0, delete l.delayedLeave, u = void 0;
					}, l.delayedLeave = () => {
						n(), delete l.delayedLeave, u = void 0;
					};
				} : u = void 0;
			} else u &&= void 0;
			return a;
		};
	}
};
function Bn(e) {
	let t = e[0];
	if (e.length > 1) {
		for (let n of e) if (n.type !== Ni) {
			t = n;
			break;
		}
	}
	return t;
}
var Vn = zn;
function Hn(e, t) {
	let { leavingVNodes: n } = e, r = n.get(t.type);
	return r || (r = /* @__PURE__ */ Object.create(null), n.set(t.type, r)), r;
}
function Un(e, t, n, r, i) {
	let { appear: a, mode: o, persisted: s = !1, onBeforeEnter: c, onEnter: l, onAfterEnter: u, onEnterCancelled: f, onBeforeLeave: p, onLeave: m, onAfterLeave: h, onLeaveCancelled: g, onBeforeAppear: _, onAppear: v, onAfterAppear: y, onAppearCancelled: b } = t, x = String(e.key), S = Hn(n, e), C = (e, t) => {
		e && Qt(e, r, 9, t);
	}, w = (e, t) => {
		let n = t[1];
		C(e, t), d(e) ? e.every((e) => e.length <= 1) && n() : e.length <= 1 && n();
	}, T = {
		mode: o,
		persisted: s,
		beforeEnter(t) {
			let r = c;
			if (!n.isMounted) if (a) r = _ || c;
			else return;
			t[Nn] && t[Nn](!0);
			let i = S[x];
			i && Ui(e, i) && i.el[Nn] && i.el[Nn](), C(r, [t]);
		},
		enter(t) {
			if (S[x] === e) return;
			let r = l, i = u, o = f;
			if (!n.isMounted) if (a) r = v || l, i = y || u, o = b || f;
			else return;
			let s = !1;
			t[Pn] = (e) => {
				s || (s = !0, C(e ? o : i, [t]), T.delayedLeave && T.delayedLeave(), t[Pn] = void 0);
			};
			let c = t[Pn].bind(null, !1);
			r ? w(r, [t, c]) : c();
		},
		leave(t, r) {
			let i = String(e.key);
			if (t[Pn] && t[Pn](!0), n.isUnmounting) return r();
			C(p, [t]);
			let a = !1;
			t[Nn] = (n) => {
				a || (a = !0, r(), C(n ? g : h, [t]), t[Nn] = void 0, S[i] === e && delete S[i]);
			};
			let o = t[Nn].bind(null, !1);
			S[i] = e, m ? w(m, [t, o]) : o();
		},
		clone(e) {
			let a = Un(e, t, n, r, i);
			return i && i(a), a;
		}
	};
	return T;
}
function Wn(e) {
	if (tr(e)) return e = Yi(e), e.children = null, e;
}
function Gn(e) {
	if (!tr(e)) return Mn(e.type) && e.children ? Bn(e.children) : e;
	if (e.component) return e.component.subTree;
	let { shapeFlag: t, children: n } = e;
	if (n) {
		if (t & 16) return n[0];
		if (t & 32 && h(n.default)) return n.default();
	}
}
function Kn(e, t) {
	e.shapeFlag & 6 && e.component ? (e.transition = t, Kn(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function qn(e, t = !1, n) {
	let r = [], i = 0;
	for (let a = 0; a < e.length; a++) {
		let o = e[a], s = n == null ? o.key : String(n) + String(o.key == null ? a : o.key);
		o.type === q ? (o.patchFlag & 128 && i++, r = r.concat(qn(o.children, t, s))) : (t || o.type !== Ni) && r.push(s == null ? o : Yi(o, { key: s }));
	}
	if (i > 1) for (let e = 0; e < r.length; e++) r[e].patchFlag = -2;
	return r;
}
/* @__NO_SIDE_EFFECTS__ */
function Jn(e, t) {
	return h(e) ? s({ name: e.name }, t, { setup: e }) : e;
}
function Yn(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function Xn(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var Zn = /* @__PURE__ */ new WeakMap();
function Qn(e, n, r, a, o = !1) {
	if (d(e)) {
		e.forEach((e, t) => Qn(e, n && (d(n) ? n[t] : n), r, a, o));
		return;
	}
	if (er(a) && !o) {
		a.shapeFlag & 512 && a.type.__asyncResolved && a.component.subTree.component && Qn(e, n, r, a.component.subTree);
		return;
	}
	let s = a.shapeFlag & 4 ? xa(a.component) : a.el, l = o ? null : s, { i: f, r: p } = e, m = n && n.r, _ = f.refs === t ? f.refs = {} : f.refs, v = f.setupState, y = /* @__PURE__ */ H(v), b = v === t ? i : (e) => Xn(_, e) ? !1 : u(y, e), x = (e, t) => !(t && Xn(_, t));
	if (m != null && m !== p) {
		if ($n(n), g(m)) _[m] = null, b(m) && (v[m] = null);
		else if (/* @__PURE__ */ U(m)) {
			let e = n;
			x(m, e.k) && (m.value = null), e.k && (_[e.k] = null);
		}
	}
	if (h(p)) Zt(p, f, 12, [l, _]);
	else {
		let t = g(p), n = /* @__PURE__ */ U(p);
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
					i(), Zn.delete(e);
				};
				t.id = -1, Zn.set(e, t), yi(t, r);
			} else $n(e), i();
		}
	}
}
function $n(e) {
	let t = Zn.get(e);
	t && (t.flags |= 8, Zn.delete(e));
}
oe().requestIdleCallback, oe().cancelIdleCallback;
var er = (e) => !!e.type.__asyncLoader, tr = (e) => e.type.__isKeepAlive;
function nr(e, t) {
	ir(e, "a", t);
}
function rr(e, t) {
	ir(e, "da", t);
}
function ir(e, t, n = aa) {
	let r = e.__wdc ||= () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent;
		}
		return e();
	};
	if (or(t, r, n), n) {
		let e = n.parent;
		for (; e && e.parent;) tr(e.parent.vnode) && ar(r, t, n, e), e = e.parent;
	}
}
function ar(e, t, n, r) {
	let i = or(t, e, r, !0);
	pr(() => {
		c(r[t], i);
	}, n);
}
function or(e, t, n = aa, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			Fe();
			let i = la(n), a = Qt(t, n, e, r);
			return i(), Ie(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var sr = (e) => (t, n = aa) => {
	(!fa || e === "sp") && or(e, (...e) => t(...e), n);
}, cr = sr("bm"), lr = sr("m"), ur = sr("bu"), dr = sr("u"), fr = sr("bum"), pr = sr("um"), mr = sr("sp"), hr = sr("rtg"), gr = sr("rtc");
function _r(e, t = aa) {
	or("ec", e, t);
}
var vr = /* @__PURE__ */ Symbol.for("v-ndc");
function K(e, t, n, r) {
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
var yr = (e) => e ? da(e) ? xa(e) : yr(e.parent) : null, br = /* @__PURE__ */ s(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => yr(e.parent),
	$root: (e) => yr(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => kr(e),
	$forceUpdate: (e) => e.f ||= () => {
		dn(e.update);
	},
	$nextTick: (e) => e.n ||= ln.bind(e.proxy),
	$watch: (e) => kn.bind(e)
}), xr = (e, n) => e !== t && !e.__isScriptSetup && u(e, n), Sr = {
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
			else if (xr(i, n)) return s[n] = 1, i[n];
			else if (a !== t && u(a, n)) return s[n] = 2, a[n];
			else if (u(o, n)) return s[n] = 3, o[n];
			else if (r !== t && u(r, n)) return s[n] = 4, r[n];
			else wr && (s[n] = 0);
		}
		let d = br[n], f, p;
		if (d) return n === "$attrs" && V(e.attrs, "get", ""), d(e);
		if ((f = c.__cssModules) && (f = f[n])) return f;
		if (r !== t && u(r, n)) return s[n] = 4, r[n];
		if (p = l.config.globalProperties, u(p, n)) return p[n];
	},
	set({ _: e }, n, r) {
		let { data: i, setupState: a, ctx: o } = e;
		return xr(a, n) ? (a[n] = r, !0) : i !== t && u(i, n) ? (i[n] = r, !0) : u(e.props, n) || n[0] === "$" && n.slice(1) in e ? !1 : (o[n] = r, !0);
	},
	has({ _: { data: e, setupState: n, accessCache: r, ctx: i, appContext: a, props: o, type: s } }, c) {
		let l;
		return !!(r[c] || e !== t && c[0] !== "$" && u(e, c) || xr(n, c) || u(o, c) || u(i, c) || u(br, c) || u(a.config.globalProperties, c) || (l = s.__cssModules) && l[c]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? u(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
};
function Cr(e) {
	return d(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
var wr = !0;
function Tr(e) {
	let t = kr(e), n = e.proxy, i = e.ctx;
	wr = !1, t.beforeCreate && Dr(t.beforeCreate, e, "bc");
	let { data: a, computed: o, methods: s, watch: c, provide: l, inject: u, created: f, beforeMount: p, mounted: m, beforeUpdate: g, updated: _, activated: y, deactivated: b, beforeDestroy: x, beforeUnmount: S, destroyed: C, unmounted: w, render: T, renderTracked: ee, renderTriggered: te, errorCaptured: E, serverPrefetch: ne, expose: D, inheritAttrs: re, components: ie, directives: O, filters: ae } = t;
	if (u && Er(u, i, null), s) for (let e in s) {
		let t = s[e];
		h(t) && (i[e] = t.bind(n));
	}
	if (a) {
		let t = a.call(n, n);
		v(t) && (e.data = /* @__PURE__ */ Dt(t));
	}
	if (wr = !0, o) for (let e in o) {
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
	if (c) for (let e in c) Or(c[e], i, n, e);
	if (l) {
		let e = h(l) ? l.call(n) : l;
		Reflect.ownKeys(e).forEach((t) => {
			Cn(t, e[t]);
		});
	}
	f && Dr(f, e, "c");
	function k(e, t) {
		d(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (k(cr, p), k(lr, m), k(ur, g), k(dr, _), k(nr, y), k(rr, b), k(_r, E), k(gr, ee), k(hr, te), k(fr, S), k(pr, w), k(mr, ne), d(D)) if (D.length) {
		let t = e.exposed ||= {};
		D.forEach((e) => {
			Object.defineProperty(t, e, {
				get: () => n[e],
				set: (t) => n[e] = t,
				enumerable: !0
			});
		});
	} else e.exposed ||= {};
	T && e.render === r && (e.render = T), re != null && (e.inheritAttrs = re), ie && (e.components = ie), O && (e.directives = O), ne && Yn(e);
}
function Er(e, t, n = r) {
	d(e) && (e = Pr(e));
	for (let n in e) {
		let r = e[n], i;
		i = v(r) ? "default" in r ? wn(r.from || n, r.default, !0) : wn(r.from || n) : wn(r), /* @__PURE__ */ U(i) ? Object.defineProperty(t, n, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		}) : t[n] = i;
	}
}
function Dr(e, t, n) {
	Qt(d(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Or(e, t, n, r) {
	let i = r.includes(".") ? An(n, r) : () => n[r];
	if (g(e)) {
		let n = t[e];
		h(n) && Dn(i, n);
	} else if (h(e)) Dn(i, e.bind(n));
	else if (v(e)) if (d(e)) e.forEach((e) => Or(e, t, n, r));
	else {
		let r = h(e.handler) ? e.handler.bind(n) : t[e.handler];
		h(r) && Dn(i, r, e);
	}
}
function kr(e) {
	let t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: a, config: { optionMergeStrategies: o } } = e.appContext, s = a.get(t), c;
	return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach((e) => Ar(c, e, o, !0)), Ar(c, t, o)), v(t) && a.set(t, c), c;
}
function Ar(e, t, n, r = !1) {
	let { mixins: i, extends: a } = t;
	a && Ar(e, a, n, !0), i && i.forEach((t) => Ar(e, t, n, !0));
	for (let i in t) if (!(r && i === "expose")) {
		let r = jr[i] || n && n[i];
		e[i] = r ? r(e[i], t[i]) : t[i];
	}
	return e;
}
var jr = {
	data: Mr,
	props: Lr,
	emits: Lr,
	methods: Ir,
	computed: Ir,
	beforeCreate: Fr,
	created: Fr,
	beforeMount: Fr,
	mounted: Fr,
	beforeUpdate: Fr,
	updated: Fr,
	beforeDestroy: Fr,
	beforeUnmount: Fr,
	destroyed: Fr,
	unmounted: Fr,
	activated: Fr,
	deactivated: Fr,
	errorCaptured: Fr,
	serverPrefetch: Fr,
	components: Ir,
	directives: Ir,
	watch: Rr,
	provide: Mr,
	inject: Nr
};
function Mr(e, t) {
	return t ? e ? function() {
		return s(h(e) ? e.call(this, this) : e, h(t) ? t.call(this, this) : t);
	} : t : e;
}
function Nr(e, t) {
	return Ir(Pr(e), Pr(t));
}
function Pr(e) {
	if (d(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function Fr(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function Ir(e, t) {
	return e ? s(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Lr(e, t) {
	return e ? d(e) && d(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : s(/* @__PURE__ */ Object.create(null), Cr(e), Cr(t ?? {})) : t;
}
function Rr(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = s(/* @__PURE__ */ Object.create(null), e);
	for (let r in t) n[r] = Fr(e[r], t[r]);
	return n;
}
function zr() {
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
var Br = 0;
function Vr(e, t) {
	return function(n, r = null) {
		h(n) || (n = s({}, n)), r != null && !v(r) && (r = null);
		let i = zr(), a = /* @__PURE__ */ new WeakSet(), o = [], c = !1, l = i.app = {
			_uid: Br++,
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
					let u = l._ceVNode || Ki(n, r);
					return u.appContext = i, s === !0 ? s = "svg" : s === !1 && (s = void 0), o && t ? t(u, a) : e(u, a, s), c = !0, l._container = a, a.__vue_app__ = l, xa(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				c && (Qt(o, l._instance, 16), e(null, l._container), delete l._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, l;
			},
			runWithContext(e) {
				let t = Hr;
				Hr = l;
				try {
					return e();
				} finally {
					Hr = t;
				}
			}
		};
		return l;
	};
}
var Hr = null, Ur = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${E(t)}Modifiers`] || e[`${D(t)}Modifiers`];
function Wr(e, n, ...r) {
	if (e.isUnmounted) return;
	let i = e.vnode.props || t, a = r, o = n.startsWith("update:"), s = o && Ur(i, n.slice(7));
	s && (s.trim && (a = r.map((e) => g(e) ? e.trim() : e)), s.number && (a = r.map(A)));
	let c, l = i[c = ie(n)] || i[c = ie(E(n))];
	!l && o && (l = i[c = ie(D(n))]), l && Qt(l, e, 6, a);
	let u = i[c + "Once"];
	if (u) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[c]) return;
		e.emitted[c] = !0, Qt(u, e, 6, a);
	}
}
var Gr = /* @__PURE__ */ new WeakMap();
function Kr(e, t, n = !1) {
	let r = n ? Gr : t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {}, c = !1;
	if (!h(e)) {
		let r = (e) => {
			let n = Kr(e, t, !0);
			n && (c = !0, s(o, n));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !a && !c ? (v(e) && r.set(e, null), null) : (d(a) ? a.forEach((e) => o[e] = null) : s(o, a), v(e) && r.set(e, o), o);
}
function qr(e, t) {
	return !e || !a(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), u(e, t[0].toLowerCase() + t.slice(1)) || u(e, D(t)) || u(e, t));
}
function Jr(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: s, attrs: c, emit: l, render: u, renderCache: d, props: f, data: p, setupState: m, ctx: h, inheritAttrs: g } = e, _ = bn(e), v, y;
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
			}) : e(f, null)), y = t.props ? c : Yr(c);
		}
	} catch (t) {
		Fi.length = 0, $t(t, e, 1), v = Ki(Ni);
	}
	let b = v;
	if (y && g !== !1) {
		let e = Object.keys(y), { shapeFlag: t } = b;
		e.length && t & 7 && (a && e.some(o) && (y = Xr(y, a)), b = Yi(b, y, !1, !0));
	}
	return n.dirs && (b = Yi(b, null, !1, !0), b.dirs = b.dirs ? b.dirs.concat(n.dirs) : n.dirs), n.transition && Kn(b, n.transition), v = b, bn(_), v;
}
var Yr = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || a(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, Xr = (e, t) => {
	let n = {};
	for (let r in e) (!o(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
	return n;
};
function Zr(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? Qr(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if ($r(o, r, n) && !qr(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? o ? Qr(r, o, l) : !0 : !!o;
	return !1;
}
function Qr(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if ($r(t, e, a) && !qr(n, a)) return !0;
	}
	return !1;
}
function $r(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && v(r) && v(i) ? !I(r, i) : r !== i;
}
function ei({ vnode: e, parent: t }, n) {
	for (; t;) {
		let r = t.subTree;
		if (r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e) (e = t.vnode).el = n, t = t.parent;
		else break;
	}
}
var ti = {}, ni = () => Object.create(ti), ri = (e) => Object.getPrototypeOf(e) === ti;
function ii(e, t, n, r = !1) {
	let i = {}, a = ni();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), oi(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	n ? e.props = r ? i : /* @__PURE__ */ Ot(i) : e.type.props ? e.props = i : e.props = a, e.attrs = a;
}
function ai(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ H(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (qr(e.emitsOptions, o)) continue;
				let d = t[o];
				if (c) if (u(a, o)) d !== a[o] && (a[o] = d, l = !0);
				else {
					let t = E(o);
					i[t] = si(c, s, t, d, e, !1);
				}
				else d !== a[o] && (a[o] = d, l = !0);
			}
		}
	} else {
		oi(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) (!t || !u(t, a) && ((r = D(a)) === a || !u(t, r))) && (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = si(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) (!t || !u(t, e)) && (delete a[e], l = !0);
	}
	l && Ke(e.attrs, "set", "");
}
function oi(e, n, r, i) {
	let [a, o] = e.propsOptions, s = !1, c;
	if (n) for (let t in n) {
		if (T(t)) continue;
		let l = n[t], d;
		a && u(a, d = E(t)) ? !o || !o.includes(d) ? r[d] = l : (c ||= {})[d] = l : qr(e.emitsOptions, t) || (!(t in i) || l !== i[t]) && (i[t] = l, s = !0);
	}
	if (o) {
		let n = /* @__PURE__ */ H(r), i = c || t;
		for (let t = 0; t < o.length; t++) {
			let s = o[t];
			r[s] = si(a, n, s, i[s], e, !u(i, s));
		}
	}
	return s;
}
function si(e, t, n, r, i, a) {
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
var ci = /* @__PURE__ */ new WeakMap();
function li(e, r, i = !1) {
	let a = i ? ci : r.propsCache, o = a.get(e);
	if (o) return o;
	let c = e.props, l = {}, f = [], p = !1;
	if (!h(e)) {
		let t = (e) => {
			p = !0;
			let [t, n] = li(e, r, !0);
			s(l, t), n && f.push(...n);
		};
		!i && r.mixins.length && r.mixins.forEach(t), e.extends && t(e.extends), e.mixins && e.mixins.forEach(t);
	}
	if (!c && !p) return v(e) && a.set(e, n), n;
	if (d(c)) for (let e = 0; e < c.length; e++) {
		let n = E(c[e]);
		ui(n) && (l[n] = t);
	}
	else if (c) for (let e in c) {
		let t = E(e);
		if (ui(t)) {
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
function ui(e) {
	return e[0] !== "$" && !T(e);
}
var di = (e) => e === "_" || e === "_ctx" || e === "$stable", fi = (e) => d(e) ? e.map(Zi) : [Zi(e)], pi = (e, t, n) => {
	if (t._n) return t;
	let r = xn((...e) => fi(t(...e)), n);
	return r._c = !1, r;
}, mi = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (di(n)) continue;
		let i = e[n];
		if (h(i)) t[n] = pi(n, i, r);
		else if (i != null) {
			let e = fi(i);
			t[n] = () => e;
		}
	}
}, hi = (e, t) => {
	let n = fi(t);
	e.slots.default = () => n;
}, gi = (e, t, n) => {
	for (let r in t) (n || !di(r)) && (e[r] = t[r]);
}, _i = (e, t, n) => {
	let r = e.slots = ni();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (gi(r, t, n), n && k(r, "_", e, !0)) : mi(t, r);
	} else t && hi(e, t);
}, vi = (e, n, r) => {
	let { vnode: i, slots: a } = e, o = !0, s = t;
	if (i.shapeFlag & 32) {
		let e = n._;
		e ? r && e === 1 ? o = !1 : gi(a, n, r) : (o = !n.$stable, mi(n, a)), s = n;
	} else n && (hi(e, n), s = { default: 1 });
	if (o) for (let e in a) !di(e) && s[e] == null && delete a[e];
}, yi = ji;
function bi(e) {
	return xi(e);
}
function xi(e, i) {
	let a = oe();
	a.__VUE__ = !0;
	let { insert: o, remove: s, patchProp: c, createElement: l, createText: u, createComment: d, setText: f, setElementText: p, parentNode: m, nextSibling: h, setScopeId: g = r, insertStaticContent: _ } = e, v = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !Ui(e, t) && (r = pe(e), ue(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null);
		let { type: l, ref: u, shapeFlag: d } = t;
		switch (l) {
			case Mi:
				y(e, t, n, r);
				break;
			case Ni:
				b(e, t, n, r);
				break;
			case Pi:
				e ?? x(t, n, r, o);
				break;
			case q:
				ie(e, t, n, r, i, a, o, s, c);
				break;
			default: d & 1 ? w(e, t, n, r, i, a, o, s, c) : d & 6 ? O(e, t, n, r, i, a, o, s, c) : (d & 64 || d & 128) && l.process(e, t, n, r, i, a, o, s, c, he);
		}
		u != null && i ? Qn(u, e && e.ref, a, t || e, !t) : u == null && e && e.ref != null && Qn(e.ref, null, a, e, !0);
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
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) ee(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), ne(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, ee = (e, t, n, r, i, a, s, u) => {
		let d, f, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (d = e.el = l(e.type, a, m && m.is, m), h & 8 ? p(d, e.children) : h & 16 && E(e.children, d, null, r, i, Si(e, a), s, u), _ && Sn(e, null, r, "created"), te(d, e, e.scopeId, s, r), m) {
			for (let e in m) e !== "value" && !T(e) && c(d, e, null, m[e], a, r);
			"value" in m && c(d, "value", null, m.value, a), (f = m.onVnodeBeforeMount) && ta(f, r, e);
		}
		_ && Sn(e, null, r, "beforeMount");
		let v = wi(i, g);
		v && g.beforeEnter(d), o(d, t, n), ((f = m && m.onVnodeMounted) || v || _) && yi(() => {
			f && ta(f, r, e), v && g.enter(d), _ && Sn(e, null, r, "mounted");
		}, i);
	}, te = (e, t, n, r, i) => {
		if (n && g(e, n), r) for (let t = 0; t < r.length; t++) g(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || Ai(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				te(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, E = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) v(null, e[l] = s ? Qi(e[l]) : Zi(e[l]), t, n, r, i, a, o, s);
	}, ne = (e, n, r, i, a, o, s) => {
		let l = n.el = e.el, { patchFlag: u, dynamicChildren: d, dirs: f } = n;
		u |= e.patchFlag & 16;
		let m = e.props || t, h = n.props || t, g;
		if (r && Ci(r, !1), (g = h.onVnodeBeforeUpdate) && ta(g, r, n, e), f && Sn(n, e, r, "beforeUpdate"), r && Ci(r, !0), (m.innerHTML && h.innerHTML == null || m.textContent && h.textContent == null) && p(l, ""), d ? D(e.dynamicChildren, d, l, r, i, Si(n, a), o) : s || se(e, n, l, null, r, i, Si(n, a), o, !1), u > 0) {
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
		((g = h.onVnodeUpdated) || f) && yi(() => {
			g && ta(g, r, n, e), f && Sn(n, e, r, "updated");
		}, i);
	}, D = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s];
			v(c, l, c.el && (c.type === q || !Ui(c, l) || c.shapeFlag & 198) ? m(c.el) : n, null, r, i, a, o, !0);
		}
	}, re = (e, n, r, i, a) => {
		if (n !== r) {
			if (n !== t) for (let t in n) !T(t) && !(t in r) && c(e, t, n[t], null, a, i);
			for (let t in r) {
				if (T(t)) continue;
				let o = r[t], s = n[t];
				o !== s && t !== "value" && c(e, t, s, o, a, i);
			}
			"value" in r && c(e, "value", n.value, r.value, a);
		}
	}, ie = (e, t, n, r, i, a, s, c, l) => {
		let d = t.el = e ? e.el : u(""), f = t.anchor = e ? e.anchor : u(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (c = c ? c.concat(h) : h), e == null ? (o(d, n, r), o(f, n, r), E(t.children || [], n, f, i, a, s, c, l)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (D(e.dynamicChildren, m, n, i, a, s, c), (t.key != null || i && t === i.subTree) && Ti(e, t, !0)) : se(e, t, n, f, i, a, s, c, l);
	}, O = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : k(t, n, r, i, a, o, c) : A(e, t, c);
	}, k = (e, t, n, r, i, a, o) => {
		let s = e.component = ia(e, r, i);
		if (tr(e) && (s.ctx.renderer = he), pa(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, j, o), !e.el) {
				let r = s.subTree = Ki(Ni);
				b(null, r, t, n), e.placeholder = r.el;
			}
		} else j(s, e, t, n, i, a, o);
	}, A = (e, t, n) => {
		let r = t.component = e.component;
		if (Zr(e, t, n)) if (r.asyncDep && !r.asyncResolved) {
			M(r, t, n);
			return;
		} else r.next = t, r.update();
		else t.el = e.el, r.vnode = t;
	}, j = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = Di(e);
					if (n) {
						t && (t.el = c.el, M(e, t, o)), n.asyncDep.then(() => {
							yi(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, d;
				Ci(e, !1), t ? (t.el = c.el, M(e, t, o)) : t = c, n && ae(n), (d = t.props && t.props.onVnodeBeforeUpdate) && ta(d, s, t, c), Ci(e, !0);
				let f = Jr(e), p = e.subTree;
				e.subTree = f, v(p, f, m(p.el), pe(p), e, i, a), t.el = f.el, u === null && ei(e, f.el), r && yi(r, i), (d = t.props && t.props.onVnodeUpdated) && yi(() => ta(d, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = er(t);
				if (Ci(e, !1), l && ae(l), !m && (o = c && c.onVnodeBeforeMount) && ta(o, d, t), Ci(e, !0), s && ge) {
					let t = () => {
						e.subTree = Jr(e), ge(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = Jr(e);
					v(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && yi(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					yi(() => ta(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && er(d.vnode) && d.vnode.shapeFlag & 256) && e.a && yi(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new Se(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => dn(u), Ci(e, !0), l();
	}, M = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, ai(e, t.props, r, n), vi(e, t.children, n), Fe(), mn(e), Ie();
	}, se = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, u = e ? e.shapeFlag : 0, d = t.children, { patchFlag: f, shapeFlag: m } = t;
		if (f > 0) {
			if (f & 128) {
				ce(l, d, n, r, i, a, o, s, c);
				return;
			} else if (f & 256) {
				N(l, d, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (u & 16 && fe(l, i, a), d !== l && p(n, d)) : u & 16 ? m & 16 ? ce(l, d, n, r, i, a, o, s, c) : fe(l, i, a, !0) : (u & 8 && p(n, ""), m & 16 && E(d, n, r, i, a, o, s, c));
	}, N = (e, t, r, i, a, o, s, c, l) => {
		e ||= n, t ||= n;
		let u = e.length, d = t.length, f = Math.min(u, d), p;
		for (p = 0; p < f; p++) {
			let n = t[p] = l ? Qi(t[p]) : Zi(t[p]);
			v(e[p], n, r, null, a, o, s, c, l);
		}
		u > d ? fe(e, a, o, !0, !1, f) : E(t, r, i, a, o, s, c, l, f);
	}, ce = (e, t, r, i, a, o, s, c, l) => {
		let u = 0, d = t.length, f = e.length - 1, p = d - 1;
		for (; u <= f && u <= p;) {
			let n = e[u], i = t[u] = l ? Qi(t[u]) : Zi(t[u]);
			if (Ui(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			u++;
		}
		for (; u <= f && u <= p;) {
			let n = e[f], i = t[p] = l ? Qi(t[p]) : Zi(t[p]);
			if (Ui(n, i)) v(n, i, r, null, a, o, s, c, l);
			else break;
			f--, p--;
		}
		if (u > f) {
			if (u <= p) {
				let e = p + 1, n = e < d ? t[e].el : i;
				for (; u <= p;) v(null, t[u] = l ? Qi(t[u]) : Zi(t[u]), r, n, a, o, s, c, l), u++;
			}
		} else if (u > p) for (; u <= f;) ue(e[u], a, o, !0), u++;
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
					ue(n, a, o, !0);
					continue;
				}
				let i;
				if (n.key != null) i = g.get(n.key);
				else for (_ = h; _ <= p; _++) if (C[_ - h] === 0 && Ui(n, t[_])) {
					i = _;
					break;
				}
				i === void 0 ? ue(n, a, o, !0) : (C[i - h] = u + 1, i >= S ? S = i : x = !0, v(n, t[i], r, null, a, o, s, c, l), y++);
			}
			let w = x ? Ei(C) : n;
			for (_ = w.length - 1, u = b - 1; u >= 0; u--) {
				let e = h + u, n = t[e], f = t[e + 1], p = e + 1 < d ? f.el || ki(f) : i;
				C[u] === 0 ? v(null, n, r, p, a, o, s, c, l) : x && (_ < 0 || u !== w[_] ? le(n, r, p, 2) : _--);
			}
		}
	}, le = (e, t, n, r, i = null) => {
		let { el: a, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) {
			le(e.component.subTree, t, n, r);
			return;
		}
		if (d & 128) {
			e.suspense.move(t, n, r);
			return;
		}
		if (d & 64) {
			c.move(e, t, n, he);
			return;
		}
		if (c === q) {
			o(a, t, n);
			for (let e = 0; e < u.length; e++) le(u[e], t, n, r);
			o(e.anchor, t, n);
			return;
		}
		if (c === Pi) {
			S(e, t, n);
			return;
		}
		if (r !== 2 && d & 1 && l) if (r === 0) l.beforeEnter(a), o(a, t, n), yi(() => l.enter(a), i);
		else {
			let { leave: r, delayLeave: i, afterLeave: c } = l, u = () => {
				e.ctx.isUnmounted ? s(a) : o(a, t, n);
			}, d = () => {
				a._isLeaving && a[Nn](!0), r(a, () => {
					u(), c && c();
				});
			};
			i ? i(a, u, d) : d();
		}
		else o(a, t, n);
	}, ue = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p } = e;
		if (d === -2 && (i = !1), s != null && (Fe(), Qn(s, null, n, e, !0), Ie()), p != null && (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let m = u & 1 && f, h = !er(e), g;
		if (h && (g = o && o.onVnodeBeforeUnmount) && ta(g, t, e), u & 6) F(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			m && Sn(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, he, r) : l && !l.hasOnce && (a !== q || d > 0 && d & 64) ? fe(l, t, n, !1, !0) : (a === q && d & 384 || !i && u & 16) && fe(c, t, n), r && P(e);
		}
		(h && (g = o && o.onVnodeUnmounted) || m) && yi(() => {
			g && ta(g, t, e), m && Sn(e, null, t, "unmounted");
		}, n);
	}, P = (e) => {
		let { type: t, el: n, anchor: r, transition: i } = e;
		if (t === q) {
			de(n, r);
			return;
		}
		if (t === Pi) {
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
	}, de = (e, t) => {
		let n;
		for (; e !== t;) n = h(e), s(e), e = n;
		s(t);
	}, F = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		Oi(c), Oi(l), r && ae(r), i.stop(), a && (a.flags |= 8, ue(o, e, t, n)), s && yi(s, t), yi(() => {
			e.isUnmounted = !0;
		}, t);
	}, fe = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) ue(e[o], t, n, r, i);
	}, pe = (e) => {
		if (e.shapeFlag & 6) return pe(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = h(e.anchor || e.el), n = t && t[jn];
		return n ? h(n) : t;
	}, I = !1, me = (e, t, n) => {
		let r;
		e == null ? t._vnode && (ue(t._vnode, null, null, !0), r = t._vnode.component) : v(t._vnode || null, e, t, null, null, null, n), t._vnode = e, I ||= (I = !0, mn(r), hn(), !1);
	}, he = {
		p: v,
		um: ue,
		m: le,
		r: P,
		mt: k,
		mc: E,
		pc: se,
		pbc: D,
		n: pe,
		o: e
	}, L, ge;
	return i && ([L, ge] = i(he)), {
		render: me,
		hydrate: L,
		createApp: Vr(me, L)
	};
}
function Si({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Ci({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function wi(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ti(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (d(r) && d(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = Qi(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && Ti(t, a)), a.type === Mi && (a.patchFlag === -1 && (a = i[e] = Qi(a)), a.el = t.el), a.type === Ni && !a.el && (a.el = t.el);
	}
}
function Ei(e) {
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
function Di(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : Di(t);
}
function Oi(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function ki(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? ki(t.subTree) : null;
}
var Ai = (e) => e.__isSuspense;
function ji(e, t) {
	t && t.pendingBranch ? d(e) ? t.effects.push(...e) : t.effects.push(e) : pn(e);
}
var q = /* @__PURE__ */ Symbol.for("v-fgt"), Mi = /* @__PURE__ */ Symbol.for("v-txt"), Ni = /* @__PURE__ */ Symbol.for("v-cmt"), Pi = /* @__PURE__ */ Symbol.for("v-stc"), Fi = [], Ii = null;
function J(e = !1) {
	Fi.push(Ii = e ? null : []);
}
function Li() {
	Fi.pop(), Ii = Fi[Fi.length - 1] || null;
}
var Ri = 1;
function zi(e, t = !1) {
	Ri += e, e < 0 && Ii && t && (Ii.hasOnce = !0);
}
function Bi(e) {
	return e.dynamicChildren = Ri > 0 ? Ii || n : null, Li(), Ri > 0 && Ii && Ii.push(e), e;
}
function Y(e, t, n, r, i, a) {
	return Bi(X(e, t, n, r, i, a, !0));
}
function Vi(e, t, n, r, i) {
	return Bi(Ki(e, t, n, r, i, !0));
}
function Hi(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function Ui(e, t) {
	return e.type === t.type && e.key === t.key;
}
var Wi = ({ key: e }) => e ?? null, Gi = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : g(e) || /* @__PURE__ */ U(e) || h(e) ? {
	i: vn,
	r: e,
	k: t,
	f: !!n
} : e);
function X(e, t = null, n = null, r = 0, i = null, a = e === q ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && Wi(t),
		ref: t && Gi(t),
		scopeId: yn,
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
		ctx: vn
	};
	return s ? ($i(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= g(n) ? 8 : 16), Ri > 0 && !o && Ii && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && Ii.push(c), c;
}
var Ki = qi;
function qi(e, t = null, n = null, r = 0, i = null, a = !1) {
	if ((!e || e === vr) && (e = Ni), Hi(e)) {
		let r = Yi(e, t, !0);
		return n && $i(r, n), Ri > 0 && !a && Ii && (r.shapeFlag & 6 ? Ii[Ii.indexOf(e)] = r : Ii.push(r)), r.patchFlag = -2, r;
	}
	if (Sa(e) && (e = e.__vccOpts), t) {
		t = Ji(t);
		let { class: e, style: n } = t;
		e && !g(e) && (t.class = P(e)), v(n) && (/* @__PURE__ */ Pt(n) && !d(n) && (n = s({}, n)), t.style = se(n));
	}
	let o = g(e) ? 1 : Ai(e) ? 128 : Mn(e) ? 64 : v(e) ? 4 : h(e) ? 2 : 0;
	return X(e, t, n, r, i, o, a, !0);
}
function Ji(e) {
	return e ? /* @__PURE__ */ Pt(e) || ri(e) ? s({}, e) : e : null;
}
function Yi(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? ea(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && Wi(l),
		ref: t && t.ref ? n && a ? d(a) ? a.concat(Gi(t)) : [a, Gi(t)] : Gi(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== q ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && Yi(e.ssContent),
		ssFallback: e.ssFallback && Yi(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce
	};
	return c && r && Kn(u, c.clone(u)), u;
}
function Z(e = " ", t = 0) {
	return Ki(Mi, null, e, t);
}
function Xi(e = "", t = !1) {
	return t ? (J(), Vi(Ni, null, e)) : Ki(Ni, null, e);
}
function Zi(e) {
	return e == null || typeof e == "boolean" ? Ki(Ni) : d(e) ? Ki(q, null, e.slice()) : Hi(e) ? Qi(e) : Ki(Mi, null, String(e));
}
function Qi(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : Yi(e);
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
		!r && !ri(t) ? t._ctx = vn : r === 3 && vn && (vn.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
	}
	else h(t) ? (t = {
		default: t,
		_ctx: vn
	}, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [Z(t)]) : n = 8);
	e.children = t, e.shapeFlag |= n;
}
function ea(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = P([t.class, r.class]));
		else if (e === "style") t.style = se([t.style, r.style]);
		else if (a(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(d(n) && n.includes(i)) && (t[e] = n ? [].concat(n, i) : i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function ta(e, t, n, r = null) {
	Qt(e, t, 7, [n, r]);
}
var na = zr(), ra = 0;
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
		propsOptions: li(i, a),
		emitsOptions: Kr(i, a),
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
	return o.ctx = { _: o }, o.root = n ? n.root : o, o.emit = Wr.bind(null, o), e.ce && e.ce(o), o;
}
var aa = null, oa = () => aa || vn, sa, ca;
{
	let e = oe(), t = (t, n) => {
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
	ii(e, r, a, t), _i(e, i, n || t);
	let o = a ? ma(e, t) : void 0;
	return t && ca(!1), o;
}
function ma(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Sr);
	let { setup: r } = n;
	if (r) {
		Fe();
		let n = e.setupContext = r.length > 1 ? ba(e) : null, i = la(e), a = Zt(r, e, 0, [e.props, n]), o = y(a);
		if (Ie(), i(), (o || e.sp) && !er(e) && Yn(e), o) {
			if (a.then(ua, ua), t) return a.then((n) => {
				ha(e, n, t);
			}).catch((t) => {
				$t(t, e, 0);
			});
			e.asyncDep = a;
		} else ha(e, a, t);
	} else va(e, t);
}
function ha(e, t, n) {
	h(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : v(t) && (e.setupState = Ht(t)), va(e, n);
}
var ga, _a;
function va(e, t, n) {
	let i = e.type;
	if (!e.render) {
		if (!t && ga && !i.render) {
			let t = i.template || kr(e).template;
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
		Fe();
		try {
			Tr(e);
		} finally {
			Ie(), t();
		}
	}
}
var ya = { get(e, t) {
	return V(e, "get", ""), e[t];
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
	return e.exposed ? e.exposeProxy ||= new Proxy(Ht(Ft(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in br) return br[n](e);
		},
		has(e, t) {
			return t in e || t in br;
		}
	}) : e.proxy;
}
function Sa(e) {
	return h(e) && "__vccOpts" in e;
}
var Ca = (e, t) => /* @__PURE__ */ Wt(e, t, fa);
function wa(e, t, n) {
	try {
		zi(-1);
		let r = arguments.length;
		return r === 2 ? v(t) && !d(t) ? Hi(t) ? Ki(e, null, [t]) : Ki(e, t) : Ki(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && Hi(n) && (n = [n]), Ki(e, t, n));
	} finally {
		zi(1);
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
}, Ra = /* @__PURE__ */ s({}, Ln, La), za = /* @__PURE__ */ ((e) => (e.displayName = "Transition", e.props = Ra, e))((e, { slots: t }) => wa(Vn, Ha(e), t)), Ba = (e, t = []) => {
	d(e) ? e.forEach((e) => e(...t)) : e && e(...t);
}, Va = (e) => e ? d(e) ? e.some((e) => e.length > 1) : e.length > 1 : !1;
function Ha(e) {
	let t = {};
	for (let n in e) n in La || (t[n] = e[n]);
	if (e.css === !1) return t;
	let { name: n = "v", type: r, duration: i, enterFromClass: a = `${n}-enter-from`, enterActiveClass: o = `${n}-enter-active`, enterToClass: c = `${n}-enter-to`, appearFromClass: l = a, appearActiveClass: u = o, appearToClass: d = c, leaveFromClass: f = `${n}-leave-from`, leaveActiveClass: p = `${n}-leave-active`, leaveToClass: m = `${n}-leave-to` } = e, h = Ua(i), g = h && h[0], _ = h && h[1], { onBeforeEnter: v, onEnter: y, onEnterCancelled: b, onLeave: x, onLeaveCancelled: S, onBeforeAppear: C = v, onAppear: w = y, onAppearCancelled: T = b } = t, ee = (e, t, n, r) => {
		e._enterCancelled = r, Ka(e, t ? d : c), Ka(e, t ? u : o), n && n();
	}, te = (e, t) => {
		e._isLeaving = !1, Ka(e, f), Ka(e, m), Ka(e, p), t && t();
	}, E = (e) => (t, n) => {
		let i = e ? w : y, o = () => ee(t, e, n);
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
		onEnter: E(!1),
		onAppear: E(!0),
		onLeave(e, t) {
			e._isLeaving = !0;
			let n = () => te(e, t);
			Ga(e, f), e._enterCancelled ? (Ga(e, p), $a(e)) : ($a(e), Ga(e, p)), qa(() => {
				e._isLeaving && (Ka(e, f), Ga(e, m), Va(x) || Ya(e, r, _, n));
			}), Ba(x, [e, n]);
		},
		onEnterCancelled(e) {
			ee(e, !1, void 0, !0), Ba(b, [e]);
		},
		onAppearCancelled(e) {
			ee(e, !0, void 0, !0), Ba(T, [e]);
		},
		onLeaveCancelled(e) {
			te(e), Ba(S, [e]);
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
	return j(e);
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
	let r = E(t);
	if (r !== "filter" && r in e) return fo[t] = r;
	r = re(r);
	for (let n = 0; n < uo.length; n++) {
		let i = uo[n] + r;
		if (i in e) return fo[t] = i;
	}
	return t;
}
var mo = "http://www.w3.org/1999/xlink";
function ho(e, t, n, r, i, a = F(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(mo, t.slice(6, t.length)) : e.setAttributeNS(mo, t, n) : n == null || a && !fe(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : _(n) ? String(n) : n);
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
		r === "boolean" ? n = fe(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
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
		Qt(Do(e, n.value), t, 5, [e]);
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
	t === "class" ? eo(e, r, c) : t === "style" ? so(e, n, r) : a(t) ? o(t) || bo(e, t, n, r, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Ao(e, t, r, c)) ? (go(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && ho(e, t, r, c, s, t !== "value")) : e._isVueCE && (jo(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !g(r))) ? go(e, E(t), r, s, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), ho(e, t, r, c));
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
	let r = E(t);
	return Array.isArray(n) ? n.some((e) => E(e) === r) : Object.keys(n).some((e) => E(e) === r);
}
var Mo = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return d(t) ? (e) => ae(t, e) : t;
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
	return t && (e = e.trim()), n && (e = A(e)), e;
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
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? A(e.value) : e.value, c = t ?? "";
		s !== c && (document.activeElement === e && e.type !== "range" && (r && t === n || i && e.value.trim() === c) || (e.value = c));
	}
}, Lo = {
	deep: !0,
	created(e, t, n) {
		e[Fo] = Mo(n), _o(e, "change", () => {
			let t = e._modelValue, n = Ho(e), r = e.checked, i = e[Fo];
			if (d(t)) {
				let e = me(t, n), a = e !== -1;
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
	if (d(t)) i = me(t, r.props.value) > -1;
	else if (p(t)) i = t.has(r.props.value);
	else {
		if (t === n) return;
		i = I(t, Uo(e, !0));
	}
	e.checked !== i && (e.checked = i);
}
var zo = {
	created(e, { value: t }, n) {
		e.checked = I(t, n.props.value), e[Fo] = Mo(n), _o(e, "change", () => {
			e[Fo](Ho(e));
		});
	},
	beforeUpdate(e, { value: t, oldValue: n }, r) {
		e[Fo] = Mo(r), t !== n && (e.checked = I(t, r.props.value));
	}
}, Bo = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		let i = p(t);
		_o(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? A(Ho(e)) : Ho(e));
			e[Fo](e.multiple ? i ? new Set(t) : t : t[0]), e._assigning = !0, ln(() => {
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
				e === "string" || e === "number" ? a.selected = t.some((e) => String(e) === String(o)) : a.selected = me(t, o) > -1;
			} else a.selected = t.has(o);
			else if (I(Ho(a), t)) {
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
}, qo = /* @__PURE__ */ s({ patchProp: ko }, Na), Jo;
function Yo() {
	return Jo ||= bi(qo);
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
var $ = /* @__PURE__ */ Ot({
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
	class: "stb-pm-panel",
	style: { "border-left-color": "#ce93d8" }
}, Ms = ["innerHTML"], Ns = { class: "stb-pm-panel" }, Ps = { class: "stb-pm-limbs-grid" }, Fs = ["data-status"], Is = { class: "stb-pm-limb-stat" }, Ls = ["data-status"], Rs = { class: "stb-pm-limb-stat" }, zs = ["data-status"], Bs = { class: "stb-pm-limb-stat" }, Vs = ["data-status"], Hs = { class: "stb-pm-limb-stat" }, Us = ["data-status"], Ws = { class: "stb-pm-limb-stat" }, Gs = ["data-status"], Ks = { class: "stb-pm-limb-stat" }, qs = { class: "stb-pm-panel" }, Js = ["innerHTML"], Ys = { class: "stb-pm-tab-label" }, Xs = ["name"], Zs = { class: "stb-pm-tab-content" }, Qs = { class: "stb-pm-panel" }, $s = { class: "stb-pm-stats-grid" }, ec = { class: "stb-pm-stat-box" }, tc = { class: "stb-pm-stat-value" }, nc = { class: "stb-pm-stat-box" }, rc = { class: "stb-pm-stat-value" }, ic = { class: "stb-pm-stat-box" }, ac = { class: "stb-pm-stat-value" }, oc = { class: "stb-pm-stat-box" }, sc = { class: "stb-pm-stat-value" }, cc = { class: "stb-pm-stat-box" }, lc = { class: "stb-pm-stat-value" }, uc = { class: "stb-pm-stat-box" }, dc = { class: "stb-pm-stat-value" }, fc = { class: "stb-pm-panel" }, pc = { class: "stb-pm-folder-content stb-pm-text-block" }, mc = { class: "stb-pm-folder-content stb-pm-text-block" }, hc = { class: "stb-pm-tab-label" }, gc = ["name"], _c = { class: "stb-pm-tab-content" }, vc = {
	class: "stb-pm-panel",
	style: { "border-left-color": "#d4af37" }
}, yc = { class: "stb-pm-rumor-card" }, bc = ["innerHTML"], xc = { class: "stb-pm-rumor-card" }, Sc = ["innerHTML"], Cc = {
	class: "stb-pm-rumor-card",
	style: { "margin-bottom": "0" }
}, wc = ["innerHTML"], Tc = /* @__PURE__ */ Jn({
	__name: "App",
	props: { mesId: {
		type: Number,
		required: !0
	} },
	setup(e) {
		let t = e, n = /* @__PURE__ */ W("tab1"), r = /* @__PURE__ */ W(null), i = Ca(() => $.mvuDataMap.get(t.mesId) || {}), a = Ca(() => $.latestMesId === t.mesId), o = Ca(() => Object.keys(i.value).length > 0), s = Ca(() => t.mesId), c = /* @__PURE__ */ W({
			focus: "",
			echo: "",
			status: "",
			rumor1: "",
			rumor2: "",
			rumor3: "",
			bgm: ""
		}), l = /* @__PURE__ */ W(!1), u = () => {
			try {
				let e = (window.top?.SillyTavern?.getContext?.()?.chat || window.SillyTavern?.chat || [])[t.mesId];
				if (e && e.mes) {
					let t = e.mes, n = /<initvar>|pm-master-container|id="pm-app"/i.test(t), r = /<statusbar_data>|战术聚焦[:：]|statusplaceholderimpl/i.test(t);
					if (l.value = !n && r, l.value) {
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
						c.value = {
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
			} catch (e) {
				console.warn("提取文本数据失败", e);
			}
		}, d = (e, t) => {
			let n = Number(e) || 0, r = Number(t) || 1;
			return r === 0 ? "0%" : Math.min(100, Math.max(0, Math.round(n / r * 100))) + "%";
		}, f = (e) => {
			es(e);
		}, p = (e, t) => {
			if (!r.value) return;
			let n = e, i = t ? "1" : "0";
			if (n.includes("<iframe") || n.includes("<audio")) n = n.replace(/auto=\d/g, `auto=${i}`), t && !n.includes("allow=\"autoplay\"") && (n = n.replace("<iframe", "<iframe allow=\"autoplay\"")), r.value.innerHTML = n;
			else if (n.startsWith("http") || n.startsWith("//")) {
				let e = n;
				e.includes("auto=") ? e = e.replace(/auto=\d/, `auto=${i}`) : e += e.includes("?") ? `&auto=${i}` : `?auto=${i}`, r.value.innerHTML = `<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width="100%" height="86" src="${e}" allow="autoplay"></iframe>`;
			} else r.value.innerHTML = "";
		}, m = () => {
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
			} catch (e) {
				console.warn("停止其他 BGM 时发生错误:", e);
			}
		};
		return Dn(() => $.mvuDataMap.get(t.mesId), () => {
			u();
		}, {
			deep: !0,
			immediate: !0
		}), Dn([() => c.value.bgm, a], ([e, t]) => {
			e && ln(() => {
				p(e, t), t && m();
			});
		}, { immediate: !0 }), lr(() => {
			u(), a.value && ln(() => m());
		}), (e, t) => G((J(), Y("div", ns, [
			X("div", rs, [X("div", is, L(i.value.当前处境?.当前地点 || "未知"), 1), X("div", as, [X("div", os, "T+" + L(i.value.当前处境?.累计小时数 || 0) + "H", 1), X("div", ss, L(i.value.当前处境?.当前天象 || "未知"), 1)])]),
			G(X("div", cs, [X("details", {
				open: "",
				onClick: t[0] ||= Ko(() => {}, ["stop"])
			}, [t[8] ||= X("summary", null, [X("span", null, "🎵 环境音轨 (BGM)"), X("span", { class: "stb-pm-bgm-arrow" }, "▼")], -1), X("div", {
				ref_key: "bgmContainerRef",
				ref: r,
				class: "stb-pm-bgm-content"
			}, null, 512)])], 512), [[ro, c.value.bgm]]),
			X("div", ls, [X("a", {
				href: "#",
				class: "stb-pm-btn stb-pm-btn-guide",
				onClick: t[1] ||= Ko((e) => f("【系统指令：呼唤骰娘】请求向导指引"), ["prevent", "stop"])
			}, "◆ 呼唤观测者"), X("a", {
				href: "#",
				class: "stb-pm-btn stb-pm-btn-mirror",
				onClick: t[2] ||= Ko((e) => f("【系统指令：使用镜面发生器】进入心灵镜牢"), ["prevent", "stop"])
			}, "◇ 潜入心灵镜牢")]),
			X("div", us, [
				X("label", ds, [
					G(X("input", {
						"onUpdate:modelValue": t[3] ||= (e) => n.value = e,
						type: "radio",
						name: "pm-tabs_" + s.value,
						value: "tab1",
						class: "stb-pm-tab-radio"
					}, null, 8, fs), [[zo, n.value]]),
					t[25] ||= X("div", { class: "stb-tab-btn" }, "观测主屏", -1),
					X("div", ps, [
						X("div", ms, [
							X("div", hs, [t[9] ||= X("strong", null, "Title:", -1), Z(" " + L(i.value.玩家角色?.基础属性?.称号 || "未知"), 1)]),
							X("div", gs, [t[10] ||= X("strong", null, "Lv.", -1), Z(" " + L(i.value.玩家角色?.基础属性?.等级 || 1), 1)]),
							X("div", _s, [t[11] ||= X("strong", null, "Dice:", -1), Z(" " + L(i.value.玩家角色?.基础属性?.骰子点数 || 0), 1)])
						]),
						X("div", vs, [
							t[15] ||= X("div", { class: "stb-pm-panel-title" }, "Vital Signs", -1),
							X("div", ys, [X("div", bs, [t[12] ||= X("span", {
								class: "stb-pm-bar-label",
								style: { color: "#ff6b6b" }
							}, "HP", -1), X("span", xs, L(i.value.玩家角色?.基础属性?.当前HP || 0) + " / " + L(i.value.玩家角色?.基础属性?.最大HP || 0), 1)]), X("div", Ss, [X("div", {
								class: "stb-pm-bar-fill stb-pm-bar-hp",
								style: se({ width: d(i.value.玩家角色?.基础属性?.当前HP, i.value.玩家角色?.基础属性?.最大HP) })
							}, null, 4)])]),
							X("div", Cs, [X("div", ws, [t[13] ||= X("span", {
								class: "stb-pm-bar-label",
								style: { color: "#81d4fa" }
							}, "MP", -1), X("span", Ts, L(i.value.玩家角色?.基础属性?.当前MP || 0) + " / " + L(i.value.玩家角色?.基础属性?.最大MP || 0), 1)]), X("div", Es, [X("div", {
								class: "stb-pm-bar-fill stb-pm-bar-mp",
								style: se({ width: d(i.value.玩家角色?.基础属性?.当前MP, i.value.玩家角色?.基础属性?.最大MP) })
							}, null, 4)])]),
							X("div", Ds, [X("div", Os, [t[14] ||= X("span", {
								class: "stb-pm-bar-label",
								style: { color: "#81c784" }
							}, "SP", -1), X("span", ks, L(i.value.玩家角色?.基础属性?.理智值 || 0) + " / 20", 1)]), X("div", As, [X("div", {
								class: "stb-pm-bar-fill stb-pm-bar-sp",
								style: se({ width: d(i.value.玩家角色?.基础属性?.理智值, 20) })
							}, null, 4)])])
						]),
						G(X("div", js, [t[16] ||= X("div", {
							class: "stb-pm-panel-title",
							style: {
								color: "#ce93d8",
								"border-bottom-color": "rgba(206, 147, 216, 0.3)"
							}
						}, "Special Status", -1), X("div", {
							class: "stb-pm-status-list",
							innerHTML: c.value.status
						}, null, 8, Ms)], 512), [[ro, c.value.status]]),
						X("div", Ns, [t[23] ||= X("div", { class: "stb-pm-panel-title" }, "Biometric Scan", -1), X("div", Ps, [
							X("div", {
								"data-status": i.value.玩家角色?.肢体伤病?.头部 || "完好",
								class: "stb-pm-limb-card"
							}, [t[17] ||= X("div", { class: "stb-pm-limb-name" }, "头部", -1), X("div", Is, L(i.value.玩家角色?.肢体伤病?.头部 || "完好"), 1)], 8, Fs),
							X("div", {
								"data-status": i.value.玩家角色?.肢体伤病?.胸部 || "完好",
								class: "stb-pm-limb-card"
							}, [t[18] ||= X("div", { class: "stb-pm-limb-name" }, "胸部", -1), X("div", Rs, L(i.value.玩家角色?.肢体伤病?.胸部 || "完好"), 1)], 8, Ls),
							X("div", {
								"data-status": i.value.玩家角色?.肢体伤病?.左臂 || "完好",
								class: "stb-pm-limb-card"
							}, [t[19] ||= X("div", { class: "stb-pm-limb-name" }, "左臂", -1), X("div", Bs, L(i.value.玩家角色?.肢体伤病?.左臂 || "完好"), 1)], 8, zs),
							X("div", {
								"data-status": i.value.玩家角色?.肢体伤病?.右臂 || "完好",
								class: "stb-pm-limb-card"
							}, [t[20] ||= X("div", { class: "stb-pm-limb-name" }, "右臂", -1), X("div", Hs, L(i.value.玩家角色?.肢体伤病?.右臂 || "完好"), 1)], 8, Vs),
							X("div", {
								"data-status": i.value.玩家角色?.肢体伤病?.左腿 || "完好",
								class: "stb-pm-limb-card"
							}, [t[21] ||= X("div", { class: "stb-pm-limb-name" }, "左腿", -1), X("div", Ws, L(i.value.玩家角色?.肢体伤病?.左腿 || "完好"), 1)], 8, Us),
							X("div", {
								"data-status": i.value.玩家角色?.肢体伤病?.右腿 || "完好",
								class: "stb-pm-limb-card"
							}, [t[22] ||= X("div", { class: "stb-pm-limb-name" }, "右腿", -1), X("div", Ks, L(i.value.玩家角色?.肢体伤病?.右腿 || "完好"), 1)], 8, Gs)
						])]),
						G(X("div", qs, [t[24] ||= X("div", { class: "stb-pm-panel-title" }, "Tactical Focus", -1), X("div", {
							class: "stb-pm-text-block",
							innerHTML: c.value.focus
						}, null, 8, Js)], 512), [[ro, c.value.focus]])
					])
				]),
				X("label", Ys, [
					G(X("input", {
						"onUpdate:modelValue": t[4] ||= (e) => n.value = e,
						type: "radio",
						name: "pm-tabs_" + s.value,
						value: "tab2",
						class: "stb-pm-tab-radio"
					}, null, 8, Xs), [[zo, n.value]]),
					t[36] ||= X("div", { class: "stb-tab-btn" }, "武装档案", -1),
					X("div", Zs, [X("div", Qs, [t[32] ||= X("div", { class: "stb-pm-panel-title" }, "Core Attributes", -1), X("div", $s, [
						X("div", ec, [t[26] ||= X("span", { class: "stb-pm-stat-label" }, "STR", -1), X("span", tc, L(i.value.玩家角色?.基础属性?.六维?.力量 || 10), 1)]),
						X("div", nc, [t[27] ||= X("span", { class: "stb-pm-stat-label" }, "DEX", -1), X("span", rc, L(i.value.玩家角色?.基础属性?.六维?.敏捷 || 10), 1)]),
						X("div", ic, [t[28] ||= X("span", { class: "stb-pm-stat-label" }, "CON", -1), X("span", ac, L(i.value.玩家角色?.基础属性?.六维?.体质 || 10), 1)]),
						X("div", oc, [t[29] ||= X("span", { class: "stb-pm-stat-label" }, "INT", -1), X("span", sc, L(i.value.玩家角色?.基础属性?.六维?.智力 || 10), 1)]),
						X("div", cc, [t[30] ||= X("span", { class: "stb-pm-stat-label" }, "WIS", -1), X("span", lc, L(i.value.玩家角色?.基础属性?.六维?.感知 || 10), 1)]),
						X("div", uc, [t[31] ||= X("span", { class: "stb-pm-stat-label" }, "CHA", -1), X("span", dc, L(i.value.玩家角色?.基础属性?.六维?.魅力 || 10), 1)])
					])]), X("div", fc, [
						t[35] ||= X("div", { class: "stb-pm-panel-title" }, "Equipped Gear", -1),
						X("details", {
							class: "stb-pm-folder",
							onClick: t[5] ||= Ko(() => {}, ["stop"])
						}, [t[33] ||= X("summary", null, [X("span", null, "⚔️ 主武器"), X("span", { class: "stb-pm-folder-arrow" }, "▼")], -1), X("div", pc, L(i.value.玩家角色?.武装战力?.主武器 || "空"), 1)]),
						X("details", {
							class: "stb-pm-folder",
							onClick: t[6] ||= Ko(() => {}, ["stop"])
						}, [t[34] ||= X("summary", null, [X("span", null, "🛡️ 防具"), X("span", { class: "stb-pm-folder-arrow" }, "▼")], -1), X("div", mc, L(i.value.玩家角色?.武装战力?.防具 || "空"), 1)])
					])])
				]),
				X("label", hc, [
					G(X("input", {
						"onUpdate:modelValue": t[7] ||= (e) => n.value = e,
						type: "radio",
						name: "pm-tabs_" + s.value,
						value: "tab3",
						class: "stb-pm-tab-radio"
					}, null, 8, gc), [[zo, n.value]]),
					t[41] ||= X("div", { class: "stb-tab-btn" }, "任务异闻", -1),
					X("div", _c, [G(X("div", vc, [
						t[40] ||= X("div", {
							class: "stb-pm-panel-title",
							style: {
								color: "#d4af37",
								"border-bottom-color": "rgba(212, 175, 55, 0.3)"
							}
						}, "Urban Rumors (都市截获)", -1),
						G(X("div", yc, [t[37] ||= X("div", { class: "stb-pm-rumor-title" }, "旧巷余声", -1), X("div", {
							class: "stb-pm-rumor-text",
							innerHTML: c.value.rumor1
						}, null, 8, bc)], 512), [[ro, c.value.rumor1]]),
						G(X("div", xc, [t[38] ||= X("div", { class: "stb-pm-rumor-title" }, "暗箱微光", -1), X("div", {
							class: "stb-pm-rumor-text",
							innerHTML: c.value.rumor2
						}, null, 8, Sc)], 512), [[ro, c.value.rumor2]]),
						G(X("div", Cc, [t[39] ||= X("div", { class: "stb-pm-rumor-title" }, "远钟残响", -1), X("div", {
							class: "stb-pm-rumor-text",
							innerHTML: c.value.rumor3
						}, null, 8, wc)], 512), [[ro, c.value.rumor3]])
					], 512), [[ro, c.value.rumor1 || c.value.rumor2 || c.value.rumor3]])])
				])
			])
		], 512)), [[ro, a.value && (l.value || o.value)]]);
	}
}), Ec = {
	key: 0,
	class: "pm-master-container"
}, Dc = ["innerHTML"], Oc = {
	key: 0,
	class: "modal-overlay"
}, kc = { class: "modal-content" }, Ac = ["value"], jc = {
	key: "already_started",
	class: "page-check"
}, Mc = {
	key: "check",
	class: "page-check"
}, Nc = { class: "sys-check-box" }, Pc = {
	key: 0,
	class: "status-loading"
}, Fc = { class: "sys-actions" }, Ic = ["disabled"], Lc = ["disabled"], Rc = {
	key: "transition",
	class: "transition-note"
}, zc = {
	key: "library",
	class: "library-scene"
}, Bc = {
	class: "scene-text",
	style: {
		position: "relative",
		"z-index": "1"
	}
}, Vc = { class: "highlight-gold" }, Hc = {
	key: 2,
	class: "dm-portrait-box"
}, Uc = ["src"], Wc = {
	class: "dossier-container",
	style: {
		position: "relative",
		"z-index": "1"
	}
}, Gc = { class: "dossier-summary" }, Kc = { class: "ds-type" }, qc = { class: "ds-name" }, Jc = { class: "ds-desc" }, Yc = { class: "dossier-content" }, Xc = {
	key: 0,
	class: "cp-quote"
}, Zc = { class: "cp-grid" }, Qc = { class: "cp-box" }, $c = { class: "cp-box-content" }, el = { class: "cp-box" }, tl = { class: "cp-box-content" }, nl = { class: "cp-actions" }, rl = ["onClick"], il = {
	key: "custom_char",
	class: "custom-char-page"
}, al = {
	key: 0,
	class: "roll-screen"
}, ol = { key: 0 }, sl = { key: 1 }, cl = {
	key: 1,
	style: { width: "100%" }
}, ll = { class: "points-header" }, ul = { style: {
	"font-size": "0.8em",
	opacity: "0.8"
} }, dl = { style: { color: "white" } }, fl = { style: { "text-align": "right" } }, pl = { class: "preset-bar" }, ml = { style: {
	display: "flex",
	gap: "10px",
	"align-items": "center"
} }, hl = ["value"], gl = ["disabled"], _l = { style: {
	display: "flex",
	gap: "10px",
	"align-items": "center"
} }, vl = ["disabled"], yl = { class: "shop-container" }, bl = { class: "shop-section" }, xl = { class: "image-upload-row" }, Sl = { class: "player-portrait-box" }, Cl = ["src"], wl = {
	key: 1,
	class: "player-portrait-placeholder"
}, Tl = { style: {
	display: "flex",
	"flex-direction": "column",
	gap: "10px",
	"justify-content": "center"
} }, El = { class: "persona-grid" }, Dl = { class: "shop-section" }, Ol = { class: "stat-grid" }, kl = { class: "stat-row" }, Al = { class: "stat-controls" }, jl = ["disabled"], Ml = { class: "stat-val" }, Nl = ["disabled"], Pl = { class: "stat-row" }, Fl = { class: "stat-controls" }, Il = ["disabled"], Ll = { class: "stat-val" }, Rl = { class: "stat-row" }, zl = { class: "stat-controls" }, Bl = ["disabled"], Vl = { class: "stat-val" }, Hl = { class: "stat-row" }, Ul = { class: "stat-controls" }, Wl = ["disabled"], Gl = { class: "stat-val" }, Kl = ["disabled"], ql = { class: "stat-row" }, Jl = { class: "stat-controls" }, Yl = ["disabled"], Xl = { class: "stat-val" }, Zl = ["disabled"], Ql = { class: "stat-grid" }, $l = { class: "stat-name" }, eu = { class: "stat-controls" }, tu = ["disabled", "onClick"], nu = { class: "stat-val" }, ru = ["disabled", "onClick"], iu = { class: "shop-section" }, au = { class: "diy-list" }, ou = { class: "diy-header" }, su = { class: "diy-title" }, cu = { style: {
	display: "flex",
	"align-items": "center",
	gap: "10px"
} }, lu = {
	key: 0,
	class: "diy-cost-display"
}, uu = ["disabled", "onClick"], du = ["onClick"], fu = ["onUpdate:modelValue", "onInput"], pu = ["onUpdate:modelValue", "onInput"], mu = ["onUpdate:modelValue", "onChange"], hu = ["value"], gu = { class: "diy-list" }, _u = { class: "diy-header" }, vu = { class: "diy-title" }, yu = { style: {
	display: "flex",
	"align-items": "center",
	gap: "10px"
} }, bu = {
	key: 0,
	class: "diy-cost-display"
}, xu = ["disabled", "onClick"], Su = ["onClick"], Cu = ["onUpdate:modelValue", "onInput"], wu = ["onUpdate:modelValue", "onInput"], Tu = ["onUpdate:modelValue", "onChange"], Eu = ["value"], Du = { class: "diy-list" }, Ou = { class: "diy-header" }, ku = { class: "diy-title" }, Au = { style: {
	display: "flex",
	"align-items": "center",
	gap: "10px"
} }, ju = {
	key: 0,
	class: "diy-cost-display"
}, Mu = ["disabled", "onClick"], Nu = ["onClick"], Pu = ["onUpdate:modelValue", "onInput"], Fu = ["onUpdate:modelValue", "onInput"], Iu = ["onUpdate:modelValue", "onChange"], Lu = ["value"], Ru = { class: "diy-list" }, zu = { class: "diy-header" }, Bu = { class: "diy-title" }, Vu = { style: {
	display: "flex",
	"align-items": "center",
	gap: "10px"
} }, Hu = {
	key: 0,
	class: "diy-cost-display"
}, Uu = ["disabled", "onClick"], Wu = ["onClick"], Gu = ["onUpdate:modelValue", "onInput"], Ku = ["onUpdate:modelValue", "onInput"], qu = ["onUpdate:modelValue", "onChange"], Ju = ["value"], Yu = { class: "diy-list" }, Xu = { class: "diy-header" }, Zu = {
	class: "diy-title",
	style: { color: "var(--pm-dark-red)" }
}, Qu = { style: {
	display: "flex",
	"align-items": "center",
	gap: "10px"
} }, $u = {
	key: 0,
	class: "diy-cost-display refund"
}, ed = ["disabled", "onClick"], td = ["onClick"], nd = ["onUpdate:modelValue", "onInput"], rd = ["onUpdate:modelValue", "onInput"], id = ["onUpdate:modelValue", "onChange"], ad = ["value"], od = { class: "shop-section" }, sd = { class: "rl-grid" }, cd = ["onClick"], ld = { class: "rl-type" }, ud = { class: "rl-name" }, dd = { class: "rl-desc" }, fd = { class: "rl-cost" }, pd = { class: "rl-grid" }, md = ["onClick"], hd = { class: "rl-type" }, gd = { class: "rl-name" }, _d = { class: "rl-desc" }, vd = { class: "rl-cost" }, yd = { class: "rl-grid" }, bd = ["onClick"], xd = { class: "rl-type" }, Sd = { class: "rl-name" }, Cd = { class: "rl-desc" }, wd = { class: "rl-cost refund" }, Td = { class: "shop-section" }, Ed = { style: {
	display: "flex",
	"align-items": "center",
	gap: "10px",
	cursor: "pointer",
	"font-weight": "bold",
	"margin-bottom": "15px"
} }, Dd = {
	key: 0,
	style: {
		display: "grid",
		gap: "15px"
	}
}, Od = { class: "shop-section" }, kd = { class: "custom-idea-box" }, Ad = { style: {
	"text-align": "center",
	"margin-top": "40px"
} }, jd = {
	key: 0,
	class: "negative-warning"
}, Md = {
	key: 1,
	style: {
		color: "red",
		"font-weight": "bold",
		"margin-top": "15px"
	}
}, Nd = ["disabled"], Pd = {
	key: "settings",
	class: "page-settings"
}, Fd = { style: {
	"font-size": "1.2em",
	color: "var(--pm-dark-red)",
	"font-weight": "bold",
	"margin-bottom": "30px"
} }, Id = { style: { "text-decoration": "underline" } }, Ld = { class: "mbti-diff-grid" }, Rd = { class: "mbti-box" }, zd = { class: "mbti-row" }, Bd = { class: "mbti-row" }, Vd = { class: "mbti-row" }, Hd = { class: "mbti-row" }, Ud = { class: "mbti-result" }, Wd = { class: "diff-box" }, Gd = { class: "toggles-grid" }, Kd = ["onClick"], qd = { class: "dm-section" }, Jd = { class: "dm-presets" }, Yd = ["disabled"], Xd = /* @__PURE__ */ Jn({
	__name: "SetupModal",
	setup(e) {
		let t = /* @__PURE__ */ W(!0), n = /* @__PURE__ */ W("check"), r = /* @__PURE__ */ W(!1), i = /* @__PURE__ */ W(!1), a = /* @__PURE__ */ W(!1), o = /* @__PURE__ */ W(!1), s = /* @__PURE__ */ W(""), c = /* @__PURE__ */ W(""), l = /* @__PURE__ */ W("https://files.catbox.moe/wfjl6u.png"), u = /* @__PURE__ */ W(""), d = /* @__PURE__ */ W(null), f = () => {
			d.value && d.value.click();
		}, p = (e) => {
			let t = e.target.files?.[0];
			if (!t) return;
			let n = new FileReader();
			n.onload = (e) => {
				e.target?.result && (u.value = e.target.result);
			}, n.readAsDataURL(t), e.target.value = "";
		}, m = /* @__PURE__ */ Dt([{
			id: "dom",
			label: "⚙️ 观测者终端连接",
			status: "loading",
			statusText: "检测中"
		}, {
			id: "mvu",
			label: "🧩 变量引擎 (MVU)",
			status: "loading",
			statusText: "检测中"
		}]), h = /* @__PURE__ */ W({}), g = /* @__PURE__ */ W(""), _ = Ca(() => Object.keys(h.value).length > 0), v = Ca(() => m[0].status === "ok"), y = () => {
			window.__PM_GLOBAL_AUDIO && (window.__PM_GLOBAL_AUDIO.pause(), window.__PM_GLOBAL_AUDIO.src = ""), c.value = "", t.value = !1;
		}, b = null, x = () => {
			i.value = !0, m.forEach((e) => {
				e.status = "loading", e.statusText = "验证中...";
			}), b = setInterval(() => {
				m[0].status = $.isReady ? "ok" : "warn", m[0].statusText = $.isReady ? "Ready" : "等待 DOM", m[1].status = "ok", m[1].statusText = "Active";
				let e = $.mvuDataMap.get($.latestMesId);
				if (e && e.玩家角色?.基础属性?.当前HP !== void 0) {
					n.value = "already_started", i.value = !1, b && clearInterval(b);
					return;
				}
				e && e.玩家角色?.轮回线索?.永久精神创伤 && (h.value = e.玩家角色.轮回线索.永久精神创伤), e && e.玩家角色?.基础属性?.称号 && (g.value = e.玩家角色.基础属性.称号), $.isReady && (i.value = !1, b && clearInterval(b));
			}, 500);
		};
		lr(() => {
			x(), he();
		}), pr(() => {
			b && clearInterval(b);
		});
		let S = () => {
			x();
		}, C = () => {
			window.__PM_GLOBAL_AUDIO && (window.__PM_GLOBAL_AUDIO.pause(), window.__PM_GLOBAL_AUDIO.src = ""), c.value = "<iframe frameborder=\"no\" border=\"0\" marginwidth=\"0\" marginheight=\"0\" width=280 height=52 src=\"https://music.163.com/outchain/player?type=3&id=3069914354&auto=1&height=32\" allow=\"autoplay\"></iframe>", n.value = "transition", setTimeout(() => {
				n.value = "library", a.value = !0;
			}, 5e3);
		}, w = [
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
		], T = /* @__PURE__ */ Dt({
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
		}), ee = /* @__PURE__ */ W(null), te = () => {
			ee.value && ee.value.focus();
		}, E = Ca(() => {
			if (T.character === "custom") return j.name || "自定义(命运掷骰)";
			let e = w.find((e) => e.id === T.character);
			return e ? e.name : "未知";
		}), ne = (e) => {
			T.character = e, n.value = "settings";
		}, D = /* @__PURE__ */ W("pre-roll"), re = /* @__PURE__ */ W(!1), ie = /* @__PURE__ */ W(0), O = /* @__PURE__ */ W(0), ae = {
			str: "力量",
			dex: "敏捷",
			con: "体质",
			int: "智力",
			wis: "感知",
			cha: "魅力"
		}, k = {
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
		}, A = /* @__PURE__ */ Dt({ ...k }), j = /* @__PURE__ */ Dt({
			name: "",
			race: "",
			profession: "",
			desc: ""
		}), M = /* @__PURE__ */ Dt({
			enabled: !1,
			name: "",
			desc: ""
		}), oe = [
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
		], se = [
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
			karmas: []
		}), ce = (e) => {
			N[e].push({
				name: "",
				desc: "",
				tier: "",
				cost: 0,
				refund: 0,
				rolled: !1
			});
		}, le = (e, t) => {
			N[e].splice(t, 1);
		}, ue = (e, t) => {
			let n = N[e][t];
			if (!n.tier) return;
			let r = (e === "karmas" ? se : oe).find((e) => e.label === n.tier);
			if (r) {
				let t = Math.floor(Math.random() * (r.max - r.min + 1)) + r.min;
				e === "karmas" ? n.refund = t : n.cost = t, n.rolled = !0;
			}
		}, de = /* @__PURE__ */ Dt({
			backgrounds: [],
			egos: [],
			karmas: []
		}), F = /* @__PURE__ */ Dt({
			backgrounds: [],
			egos: [],
			karmas: []
		}), fe = /* @__PURE__ */ W(""), pe = /* @__PURE__ */ W([]), I = /* @__PURE__ */ W(-1), me = /* @__PURE__ */ W(""), he = () => {
			try {
				let e = localStorage.getItem("pm_custom_presets_v5");
				e && (pe.value = JSON.parse(e));
			} catch (e) {
				console.warn("无法读取本地预设", e);
			}
		}, ge = () => {
			if (!me.value) return;
			let e = {
				name: me.value,
				stats: { ...A },
				persona: { ...j },
				companion: { ...M },
				diy: JSON.parse(JSON.stringify(N)),
				idea: fe.value,
				selectedItems: {
					backgrounds: [...F.backgrounds],
					egos: [...F.egos],
					karmas: [...F.karmas]
				}
			};
			pe.value.push(e);
			try {
				localStorage.setItem("pm_custom_presets_v5", JSON.stringify(pe.value)), alert("预设保存成功！"), me.value = "", I.value = pe.value.length - 1;
			} catch {
				alert("保存失败，可能是浏览器限制了本地存储。");
			}
		}, _e = () => {
			if (I.value === -1) return;
			let e = pe.value[I.value];
			e && (Object.assign(A, e.stats), Object.assign(j, e.persona), Object.assign(M, e.companion), e.diy && [
				"traits",
				"weapons",
				"armors",
				"items",
				"karmas"
			].forEach((t) => {
				N[t].splice(0, N[t].length), e.diy[t] && e.diy[t].length > 0 && N[t].push(...JSON.parse(JSON.stringify(e.diy[t])));
			}), fe.value = e.idea || "", e.selectedItems && (F.backgrounds.splice(0, F.backgrounds.length, ...e.selectedItems.backgrounds || []), F.egos.splice(0, F.egos.length, ...e.selectedItems.egos || []), F.karmas.splice(0, F.karmas.length, ...e.selectedItems.karmas || []), e.selectedItems.backgrounds.forEach((e) => {
				de.backgrounds.find((t) => t.name === e.name) || de.backgrounds.push(e);
			}), e.selectedItems.egos.forEach((e) => {
				de.egos.find((t) => t.name === e.name) || de.egos.push(e);
			}), e.selectedItems.karmas.forEach((e) => {
				de.karmas.find((t) => t.name === e.name) || de.karmas.push(e);
			})), alert("预设读取成功！"));
		}, ve = () => {
			T.character = "custom", n.value = "custom_char";
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
			},
			{
				type: "遗物 / 奇点",
				name: "便携镜面终端",
				desc: "允许在非安全区强行潜入心灵镜牢，但每次使用会永久扣除5点理智上限，并引来异想体的注视。",
				cost: 4e3,
				minQ: 51
			}
		], R = [
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
		], xe = (e, t, n) => [...e.filter((e) => !e.minQ || n >= e.minQ)].sort(() => .5 - Math.random()).slice(0, t), Se = () => {
			re.value = !0, setTimeout(() => {
				ie.value = Math.floor(Math.random() * 8999) + 1e3, O.value = Math.floor(Math.random() * 100) + 1, de.backgrounds = xe(ye, 3, O.value), de.egos = xe(be, 3, O.value), de.karmas = xe(R, 3, O.value), re.value = !1, D.value = "shopping";
			}, 1500);
		}, Ce = Ca(() => {
			let e = O.value;
			return e <= 50 ? "普通 (最高HE级)" : e <= 85 ? "好运 (必出WAW级或强力奇点)" : e <= 95 ? "极运 (必出ALEPH级残片或色彩级背景)" : "深渊注视 (出现完整ALEPH级神装)";
		}), we = (e, t) => {
			let n = 0;
			for (let r = e + 1; r <= t; r++) n += r <= 15 ? 50 : 150;
			return n;
		}, Te = Ca(() => {
			let e = ie.value;
			return e -= (A.level - k.level) * 100, e -= (A.hp - k.hp) / 10 * 20, e -= (A.mp - k.mp) / 10 * 20, e -= (A.sp - k.sp) * 50, e -= (A.stability - k.stability) / 5 * 30, [
				"str",
				"dex",
				"con",
				"int",
				"wis",
				"cha"
			].forEach((t) => {
				e -= we(k[t], A[t]);
			}), F.backgrounds.forEach((t) => e -= t.cost), F.egos.forEach((t) => e -= t.cost), F.karmas.forEach((t) => e += t.refund), N.traits.forEach((t) => {
				t.rolled && (e -= t.cost);
			}), N.weapons.forEach((t) => {
				t.rolled && (e -= t.cost);
			}), N.armors.forEach((t) => {
				t.rolled && (e -= t.cost);
			}), N.items.forEach((t) => {
				t.rolled && (e -= t.cost);
			}), N.karmas.forEach((t) => {
				t.rolled && (e += t.refund);
			}), M.enabled && (e -= 2e3), e;
		}), Ee = (e, t) => {
			let n = F[e].findIndex((e) => e.name === t.name);
			n > -1 ? F[e].splice(n, 1) : F[e].push(t);
		}, De = (e, t) => F[e].some((e) => e.name === t.name), Oe = Ca(() => F.karmas.length > 0 || N.karmas.some((e) => e.name && e.rolled)), ke = () => {
			let e = (e) => e.some((e) => e.name && !e.rolled);
			if (e(N.traits) || e(N.weapons) || e(N.armors) || e(N.items) || e(N.karmas)) {
				alert("您有自定义的 DIY 项目尚未点击【评估代价 (Roll)】，请先 Roll 点获取命运的标价！");
				return;
			}
			n.value = "settings";
		}, z = /* @__PURE__ */ Dt({
			ei: "I",
			sn: "N",
			tf: "T",
			jp: "J"
		}), Ae = Ca(() => `${z.ei}${z.sn}${z.tf}${z.jp}`), je = /* @__PURE__ */ W("硬核 (Hardcore)"), Me = () => {
			navigator.clipboard.writeText(s.value).catch(() => {}), o.value = !1, y();
		}, Ne = async () => {
			if (r.value) return;
			r.value = !0;
			let e = "";
			try {
				let t = Object.entries(T.sensitiveToggles).filter(([e, t]) => t).map(([e]) => e).join(", ") || "完全纯净无敏感内容", i = String(E.value).replace(/[\r\n]+/g, " "), a = String(T.dmPersonality).replace(/[\r\n]+/g, " "), c = [
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
				], l = c[Math.floor(Math.random() * c.length)], d = "", f = (e) => typeof e == "string" ? e.replace(/\./g, "_") : e, p = {
					$$meta: { recursiveExtensible: !0 },
					当前处境: {
						累计小时数: 0,
						当前天象: "极昼",
						当前地点: l,
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
								BL_GL_BG: !!T.sensitiveToggles.BL_GL_BG,
								异种_Furry: !!T.sensitiveToggles.异种_Furry,
								R18G_猎奇: !!T.sensitiveToggles.R18G_猎奇,
								非自愿_催眠_调教: !!T.sensitiveToggles.非自愿_催眠_调教,
								NTR_NTL: !!T.sensitiveToggles.NTR_NTL,
								卖春_奴隶: !!T.sensitiveToggles.卖春_奴隶
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
				if (T.character === "custom") {
					p.玩家角色.基础属性.等级 = A.level || 1, p.玩家角色.基础属性.最大HP = A.hp || 100, p.玩家角色.基础属性.当前HP = A.hp || 100, p.玩家角色.基础属性.最大MP = A.mp || 50, p.玩家角色.基础属性.当前MP = A.mp || 50, p.玩家角色.基础属性.理智值 = A.sp || 20, p.玩家角色.基础属性.理智稳定性 = A.stability || 50, p.玩家角色.基础属性.骰子点数 = Te.value || 0, Object.assign(p.玩家角色.基础属性.六维, {
						力量: A.str || 10,
						敏捷: A.dex || 10,
						体质: A.con || 10,
						智力: A.int || 10,
						感知: A.wis || 10,
						魅力: A.cha || 10
					}), p.玩家角色.基础属性.称号 = j.name || "自定义异端";
					let e = {};
					(F.karmas || []).forEach((t) => {
						t && t.name && (e[f(t.name)] = t.desc);
					}), N.karmas.forEach((t) => {
						t.rolled && t.name && (e[f(t.name)] = t.desc);
					}), Object.keys(e).length > 0 && (p.玩家角色.基础属性.专属业障 = e);
					let t = [];
					F.egos && t.push(...F.egos), N.weapons.forEach((e) => {
						e.rolled && e.name && t.push(e);
					}), t.length > 0 && (p.玩家角色.武装战力.主武器 = `"${B(t[0].name)} [${B(t[0].tier || "未知评级")}]"`, t.slice(1).forEach((e) => {
						p.玩家角色.武装战力.背包道具[f(e.name)] = {
							数量: 1,
							描述: `"[${B(e.tier || "未知评级")}] ${B(e.desc || "未知")}"`
						};
					}));
					let n = [];
					N.armors.forEach((e) => {
						e.rolled && e.name && n.push(e);
					}), n.length > 0 && (p.玩家角色.武装战力.防具 = `"${B(n[0].name)} [${B(n[0].tier || "未知评级")}]"`, n.slice(1).forEach((e) => {
						p.玩家角色.武装战力.背包道具[f(e.name)] = {
							数量: 1,
							描述: `"[${B(e.tier || "未知评级")}] ${B(e.desc || "未知")}"`
						};
					})), N.items.forEach((e) => {
						e.rolled && e.name && (p.玩家角色.武装战力.背包道具[f(e.name)] = {
							数量: 1,
							描述: `"[${B(e.tier || "未知评级")}] ${B(e.desc || "未知")}"`
						});
					});
					let r = [];
					F.backgrounds && F.backgrounds.forEach((e) => r.push(`【${e.name}】: ${e.desc}`)), N.traits.forEach((e) => {
						e.rolled && e.name && r.push(`【${e.name}】(${e.tier}): ${e.desc}`);
					}), M.enabled && M.name && (delete p.核心同伴.无, p.核心同伴[f(M.name)] = {
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
					}, d += `\n📌 **同行伙伴：** 【${M.name}】 - ${M.desc}`), t.length > 0 && (d += "\n📌 **携带武器：** " + t.map((e) => `【${e.name}】(${e.tier}): ${e.desc}`).join(" | ")), n.length > 0 && (d += "\n📌 **防具装备：** " + n.map((e) => `【${e.name}】(${e.tier}): ${e.desc}`).join(" | "));
					let i = N.items.filter((e) => e.rolled && e.name).map((e) => `【${e.name}】: ${e.desc}`);
					i.length > 0 && (d += "\n📌 **背包道具：** " + i.join(" | ")), d += `\n📌 **种族/职业：** ${j.race || "未知"} / ${j.profession || "未知"}`, d += `\n📌 **外貌与性格：** ${j.desc || "无"}`, r.length > 0 && (d += "\n📌 **专属特质/背景：**\n  - " + r.join("\n  - ")), fe.value && (d += `\n📌 **自定义脑洞：** ${fe.value}`), u.value && (u.value.startsWith("data:image") ? d += "\n📌 **玩家角色立绘参考：** [玩家已上传本地立绘，请根据外貌特征描述进行合理想象]" : d += `\n📌 **玩家角色立绘参考：** ${u.value}`);
					let a = "\n\n🔥 **【DM核心裁定法则（AI必读）】** 🔥\n";
					a += "1. **数值自动补全：** 若玩家在自定义的武器/防具/道具/特质中未明确写出具体的骰子数值（如1d8、1d10+2、护甲减免%等），请DM务必根据其选择的【评级】和世界书规则，在开局描述时自动为其赋予合理的具体数值！\n", a += "2. **合理性惩罚（等价交换）：** DM拥有绝对的解释与修改权！若玩家填写的物品强度与所选【评级】严重不符（例如：选了普通级却写着秒杀全场），或者高评级神装未写明致命代价，DM必须在开局时强行修改其效果，或为其附加极其惨烈的隐藏代价（如：每次使用扣除半管血、引来首脑注视等）。\n", Te.value < 0 && (a += `3. **命运负债清算：** 玩家当前透支了 ${Math.abs(Te.value)} 点数。透支越多，开局遭遇的厄运越致命。请DM在开局或后续流程中，安排高维存在、黑市商人或极端环境来强行索要这笔债务！\n`), d += a;
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
					}[T.character];
					e && (p.玩家角色.基础属性.称号 = `"${e.name}"`, p.玩家角色.基础属性.最大HP = e.hp, p.玩家角色.基础属性.当前HP = e.currentHp, p.玩家角色.基础属性.最大MP = e.mp, p.玩家角色.基础属性.当前MP = e.currentMp, p.玩家角色.基础属性.理智值 = e.sp, p.玩家角色.基础属性.理智稳定性 = e.stability, p.玩家角色.基础属性.六维 = {
						力量: e.str,
						敏捷: e.dex,
						体质: e.con,
						智力: e.int,
						感知: e.wis,
						魅力: e.cha
					}, p.玩家角色.武装战力.主武器 = e.weapon, p.玩家角色.武装战力.防具 = e.armor, p.玩家角色.基础属性.专属业障 = e.karma);
				}
				d += `\n📌 **心理锚点(MBTI)：** ${Ae.value}\n📌 **世界难度：** ${je.value}`;
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
				h(JSON.parse(JSON.stringify(p)));
				let g = `\n<UpdateVariable>\n${m}</UpdateVariable>\n`;
				e = `【系统指令：契约已签订，降临开始】\n\n📌 **我的降临姿态：** ${i}\n📌 **初始降临坐标：** ${l}\n📌 **已解禁敏感内容：** ${t}\n📌 **观测者(DM)性格：** ${a}${d}\n\n请根据以上设定，正式开启第一天的废土生存，向我描述初始的周遭环境与我的起始状态！\n${g}`;
				try {
					es(e), n.value = "already_started", y(), r.value = !1;
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
		return (e, b) => t.value ? (J(), Y("div", Ec, [
			X("div", {
				class: P(["bgm-player", { "is-visible": a.value }]),
				innerHTML: c.value
			}, null, 10, Dc),
			o.value ? (J(), Y("div", Oc, [X("div", kc, [
				b[46] ||= X("div", { class: "modal-title" }, "⚠️ 沙盒环境限制：请手动复制指令", -1),
				b[47] ||= X("p", { style: {
					color: "#555",
					"margin-bottom": "10px",
					"text-align": "center"
				} }, "由于当前环境的安全策略，无法自动发送。请全选下方文本框内容，复制后粘贴到酒馆聊天框发送。", -1),
				X("textarea", {
					readonly: "",
					value: s.value,
					class: "modal-textarea",
					onFocus: b[0] ||= (e) => e.target?.select()
				}, null, 40, Ac),
				X("button", {
					class: "modal-btn",
					onClick: Me
				}, "一键复制并关闭")
			])])) : Xi("", !0),
			Ki(za, {
				name: "fade",
				mode: "out-in"
			}, {
				default: xn(() => [n.value === "already_started" ? (J(), Y("div", jc, [
					b[48] ||= X("div", { class: "sys-title" }, "旅程已在进行中", -1),
					b[49] ||= X("div", { class: "sys-subtitle" }, "The Journey Has Already Begun", -1),
					b[50] ||= X("p", { style: {
						color: "#555",
						"font-size": "1.2em",
						"text-align": "center",
						"max-width": "600px",
						"line-height": "1.8"
					} }, [
						Z(" 观测者已经记录了你的降临姿态。"),
						X("br"),
						Z(" 请在下方的聊天框中继续你的废土生存，或者使用【系统指令】呼出面板。 ")
					], -1),
					X("button", {
						class: "sys-btn sys-btn-primary",
						style: { "margin-top": "30px" },
						onClick: y
					}, "关闭界面")
				])) : n.value === "check" ? (J(), Y("div", Mc, [
					b[51] ||= X("div", { class: "sys-title" }, "白夜黑昼七日谈", -1),
					b[52] ||= X("div", { class: "sys-subtitle" }, "The Seven Days of White Night and Dark Day", -1),
					X("div", Nc, [(J(!0), Y(q, null, K(m, (e) => (J(), Y("div", {
						key: e.id,
						class: "sys-row"
					}, [X("span", null, L(e.label), 1), X("span", null, [e.status === "loading" ? (J(), Y("span", Pc, "Checking...")) : (J(), Y("span", {
						key: 1,
						class: P(e.status === "ok" ? "status-ok" : "status-warn")
					}, L(e.statusText), 3))])]))), 128))]),
					X("div", Fc, [X("button", {
						disabled: i.value,
						class: "sys-btn",
						onClick: Ko(S, ["prevent"])
					}, "重新检查", 8, Ic), X("button", {
						disabled: !v.value || i.value,
						class: "sys-btn sys-btn-primary",
						onClick: C
					}, L(v.value ? "开始游戏" : "环境异常或校验中..."), 9, Lc)])
				])) : n.value === "transition" ? (J(), Y("div", Rc, [...b[53] ||= [X("div", { class: "note-title" }, "【系统提示：来自梓墨的笔记簿】", -1), X("ul", { class: "note-content" }, [
					X("li", null, [X("strong", null, "RP（玩家输入）："), Z("在很大程度上决定了逆转生死的关键，只小小输入几句话的话旅人sama是不会成为真正的英雄的哦~")]),
					X("li", null, [
						X("strong", null, "BGM自定义："),
						Z("你可以随时发送 "),
						X("code", null, "【系统指令：设置BGM】场景：Boss战，链接："),
						Z(" 来替换内置音乐。")
					]),
					X("li", null, [X("strong", null, "快捷操作："), Z("状态栏顶部的 [呼唤观测者] 和 [潜入心灵镜牢] 按钮可直接点击。")]),
					X("li", null, [
						X("strong", null, "装备管理："),
						Z("在【武装档案】Tab中，点击装备面板的"),
						X("q", null, "“卸下/管理”"),
						Z("按钮，可一键脱下装备或使用背包道具。")
					]),
					X("li", null, [X("strong", null, "极端复杂的世界模拟与情感管理系统："), Z("你所遇见的，都是一个个鲜活的个体，请好好善待她/他/它们吧~")])
				], -1)]])) : n.value === "library" ? (J(), Y("div", zc, [X("div", Bc, [
					_.value ? (J(), Y(q, { key: 1 }, [
						b[61] ||= X("p", null, "骨骼断裂的回音与神经烧焦的幻痛依然在脑海深处轰鸣。但此刻，你只是静静地站在温暖的图书室内，面前是那位戴着单片眼镜的少女。", -1),
						X("p", null, [
							X("q", null, [
								b[57] ||= Z("“死亡并未宽恕你，", -1),
								X("span", Vc, L(g.value ? g.value : "伤痕累累的轮回者"), 1),
								b[58] ||= Z("。”", -1)
							]),
							b[59] ||= Z("她微微欠身，目光扫过你灵魂上烙印的扭曲伤痕，", -1),
							b[60] ||= X("q", null, "“看来地狱的法则又一次让你回到了起点。”", -1)
						]),
						(J(!0), Y(q, null, K(h.value, (e, t) => (J(), Y("div", {
							key: t,
							class: "trauma-text"
						}, "⚠️ 永久精神创伤 [" + L(t) + "]: " + L(e), 1))), 128))
					], 64)) : (J(), Y(q, { key: 0 }, [
						b[54] ||= X("p", null, "当眼前的黑暗如潮水般褪去，刺鼻的机油味与血腥味并未如期而至。取而代之的，是纸张的醇香与壁炉中木柴燃烧的噼啪声。你发现自己站在一间古旧而温暖的图书室内，高耸入云的书架上摆满了散发着微光的典籍。", -1),
						b[55] ||= X("p", null, "在房间中央的红木长桌后，坐着一位戴着单片眼镜的少女。她合上手中那本厚重的《至理之书》，抬起头，用一种仿佛能看穿灵魂的目光注视着你。", -1),
						b[56] ||= X("p", null, [
							X("q", null, [
								Z("欢迎来到这座被时间遗忘的藏书阁，"),
								X("span", { class: "highlight-gold" }, "迷途的旅人"),
								Z("。")
							]),
							Z("她微微欠身，嘴角勾起一抹优雅却难以捉摸的弧度，"),
							X("q", null, "我是你的观测者，也是这场剧目的记录员。你可以称呼我为‘跑团娘’。")
						], -1)
					], 64)),
					b[62] ||= X("p", null, [Z("她站起身，指尖在虚空中轻轻一划，周围的书架瞬间化作一片燃烧的废墟幻影。"), X("q", null, [
						Z("你即将踏入的舞台，是L巢的废墟。那里没有童话，只有永无止境的"),
						X("span", { class: "highlight-red" }, "极昼与极夜"),
						Z("，以及七天一次的残酷轮回。你的剧本很简单：活下去。在七天的倒计时结束前，寻找光之种的碎片，或者在清道夫的咀嚼声中化为驱动都市的燃料。")
					])], -1),
					b[63] ||= X("p", null, [X("q", null, "在这里，每一次挥剑都可能伴随着肢体的断裂，每一次绝望都可能引来卡门的低语。但请记住，你遇到的每一个灵魂，都有着自己的恐惧与渴望。你的选择，将决定他们是成为你的利刃，还是刺入你后背的毒牙。")], -1),
					b[64] ||= X("p", null, "幻影散去，她重新坐回桌后，从抽屉里取出了五枚质地各异的档案夹，在桌面上依次排开。", -1),
					b[65] ||= X("p", null, [X("q", null, "那么，演出即将开始。请翻开你的‘档案’，决定你将以何种姿态，降临这片绝望的焦土。")], -1),
					l.value ? (J(), Y("div", Hc, [X("img", {
						src: l.value,
						class: "dm-portrait-img",
						alt: "DM Sprite",
						onError: b[1] ||= (e) => l.value = ""
					}, null, 40, Uc)])) : Xi("", !0)
				]), X("div", Wc, [(J(), Y(q, null, K(w, (e) => X("details", {
					key: e.id,
					name: "char-accordion",
					class: "dossier-folder"
				}, [X("summary", Gc, [
					X("span", Kc, L(e.type), 1),
					X("span", qc, L(e.name), 1),
					X("span", Jc, L(e.desc), 1)
				]), X("div", Yc, [
					e.quote ? (J(), Y("div", Xc, [X("q", null, L(e.quote), 1)])) : Xi("", !0),
					X("div", Zc, [X("div", Qc, [b[66] ||= X("div", { class: "cp-box-title" }, "核心概念", -1), X("div", $c, L(e.concept), 1)]), X("div", el, [b[67] ||= X("div", { class: "cp-box-title" }, "生存难度", -1), X("div", tl, L(e.diff), 1)])]),
					X("div", nl, [X("div", {
						class: "cp-btn-confirm",
						onClick: (t) => ne(e.id)
					}, "确认降临", 8, rl)])
				])])), 64)), X("div", {
					class: "dossier-custom",
					onClick: ve
				}, [...b[68] ||= [X("span", { class: "ds-type" }, "CUSTOM", -1), X("span", { class: "ds-name" }, "命运掷骰 (自定义车卡)", -1)]])])])) : n.value === "custom_char" ? (J(), Y("div", il, [D.value === "pre-roll" ? (J(), Y("div", al, [
					b[69] ||= X("h2", {
						class: "settings-title",
						style: { border: "none" }
					}, "命运的掷骰", -1),
					b[70] ||= X("p", { style: {
						color: "#888",
						"margin-bottom": "40px"
					} }, "“在都市中，出生便决定了大部分的命运。来吧，看看你的底牌。”", -1),
					X("div", {
						class: P([{ rolling: re.value }, "roll-btn"]),
						onClick: Se
					}, [re.value ? (J(), Y("span", sl, "...")) : (J(), Y("span", ol, "ROLL"))], 2)
				])) : Xi("", !0), D.value === "shopping" ? (J(), Y("div", cl, [
					X("div", ll, [X("div", null, [b[72] ||= X("h2", null, "黑市终端", -1), X("div", ul, [b[71] ||= Z("商店品质评级: ", -1), X("span", dl, L(Ce.value) + " (Roll: " + L(O.value) + ")", 1)])]), X("div", fl, [b[73] ||= X("div", { style: {
						"font-size": "0.8em",
						opacity: "0.8"
					} }, "剩余可用点数", -1), X("div", { class: P([{ negative: Te.value < 0 }, "points-display"]) }, L(Te.value), 3)])]),
					X("div", pl, [X("div", ml, [
						b[75] ||= X("span", { style: {
							"font-weight": "bold",
							color: "var(--pm-dark-red)"
						} }, "本地预设:", -1),
						G(X("select", {
							"onUpdate:modelValue": b[2] ||= (e) => I.value = e,
							class: "preset-select"
						}, [b[74] ||= X("option", { value: -1 }, "-- 选择预设 --", -1), (J(!0), Y(q, null, K(pe.value, (e, t) => (J(), Y("option", {
							key: t,
							value: t
						}, L(e.name), 9, hl))), 128))], 512), [[Bo, I.value]]),
						X("button", {
							disabled: I.value === -1,
							class: "preset-btn",
							onClick: _e
						}, "读取", 8, gl)
					]), X("div", _l, [G(X("input", {
						"onUpdate:modelValue": b[3] ||= (e) => me.value = e,
						type: "text",
						class: "preset-input",
						placeholder: "输入预设名称..."
					}, null, 512), [[Q, me.value]]), X("button", {
						disabled: !me.value,
						class: "preset-btn",
						onClick: ge
					}, "保存当前配置", 8, vl)])]),
					b[112] ||= X("details", { class: "price-table-details" }, [X("summary", { class: "price-table-summary" }, "📜 点击查看：黑市物价与评级参考表"), X("div", { class: "price-table-content" }, [X("div", { style: {
						display: "grid",
						"grid-template-columns": "1fr 1fr",
						gap: "20px"
					} }, [X("div", null, [X("strong", null, "基础属性市价："), X("ul", null, [
						X("li", null, "提升 1 级：100 点"),
						X("li", null, "提升 10 点 HP/MP：20 点"),
						X("li", null, "提升 1 点 理智值(SP)：50 点"),
						X("li", null, "提升 5 点 理智稳定性：30 点"),
						X("li", null, "六维属性 (10-15区间)：50 点/级"),
						X("li", null, "六维属性 (16-20区间)：150 点/级")
					])]), X("div", null, [X("strong", null, "装备/特质评级消耗："), X("ul", null, [
						X("li", null, "ZAYIN / 普通：0 - 500 点"),
						X("li", null, "TETH / 精良：501 - 1500 点"),
						X("li", null, "HE / 稀有：1501 - 3500 点"),
						X("li", null, "WAW / 史诗：3501 - 7500 点"),
						X("li", null, "ALEPH / 神器：7501 - 9999 点")
					])])])])], -1),
					X("div", yl, [
						X("div", bl, [
							b[76] ||= X("div", { class: "shop-title" }, "身份档案 (Profile)", -1),
							X("div", xl, [X("div", Sl, [u.value ? (J(), Y("img", {
								key: 0,
								src: u.value,
								class: "player-portrait-img",
								onError: b[4] ||= (e) => u.value = ""
							}, null, 40, Cl)) : (J(), Y("div", wl, "无图"))]), X("div", Tl, [
								X("input", {
									ref_key: "playerFileInput",
									ref: d,
									type: "file",
									accept: "image/*",
									style: { display: "none" },
									onChange: p
								}, null, 544),
								X("button", {
									class: "pm-btn-small",
									onClick: f
								}, "📁 上传玩家立绘"),
								u.value ? (J(), Y("button", {
									key: 0,
									class: "pm-btn-small",
									onClick: b[5] ||= (e) => u.value = ""
								}, "🗑️ 清除")) : Xi("", !0)
							])]),
							X("div", El, [
								G(X("input", {
									"onUpdate:modelValue": b[6] ||= (e) => j.name = e,
									type: "text",
									class: "pm-input",
									placeholder: "姓名 (如: 罗兰)"
								}, null, 512), [[Q, j.name]]),
								G(X("input", {
									"onUpdate:modelValue": b[7] ||= (e) => j.race = e,
									type: "text",
									class: "pm-input",
									placeholder: "种族 (如: 人类/改造人)"
								}, null, 512), [[Q, j.race]]),
								G(X("input", {
									"onUpdate:modelValue": b[8] ||= (e) => j.profession = e,
									type: "text",
									class: "pm-input",
									placeholder: "职业 (如: 九阶收尾人)"
								}, null, 512), [[Q, j.profession]])
							]),
							G(X("textarea", {
								"onUpdate:modelValue": b[9] ||= (e) => j.desc = e,
								class: "pm-textarea",
								placeholder: "外貌特征与性格描述... (如: 穿着黑色西装，总是带着疲惫的笑容，极度厌恶背叛)"
							}, null, 512), [[Q, j.desc]]),
							b[77] ||= X("p", { style: {
								color: "#888",
								"font-size": "0.85em",
								"margin-top": "5px"
							} }, "* 开局降临坐标将由命运（系统）在L巢废墟及周边区域中随机空投。", -1)
						]),
						X("div", Dl, [
							b[88] ||= X("div", { class: "shop-title" }, "常驻市价表 (基础属性)", -1),
							X("div", Ol, [
								X("div", kl, [
									b[78] ||= X("span", { class: "stat-name" }, "等级 (Max 30)", -1),
									X("div", Al, [
										X("button", {
											disabled: A.level <= 1,
											class: "stat-btn",
											onClick: b[10] ||= (e) => A.level--
										}, "-", 8, jl),
										X("span", Ml, L(A.level), 1),
										X("button", {
											disabled: A.level >= 30,
											class: "stat-btn",
											onClick: b[11] ||= (e) => A.level++
										}, "+", 8, Nl)
									]),
									b[79] ||= X("span", { class: "stat-cost" }, "100/级", -1)
								]),
								X("div", Pl, [
									b[80] ||= X("span", { class: "stat-name" }, "最大 HP", -1),
									X("div", Fl, [
										X("button", {
											disabled: A.hp <= 10,
											class: "stat-btn",
											onClick: b[12] ||= (e) => A.hp -= 10
										}, "-", 8, Il),
										X("span", Ll, L(A.hp), 1),
										X("button", {
											class: "stat-btn",
											onClick: b[13] ||= (e) => A.hp += 10
										}, "+")
									]),
									b[81] ||= X("span", { class: "stat-cost" }, "20/点", -1)
								]),
								X("div", Rl, [
									b[82] ||= X("span", { class: "stat-name" }, "最大 MP", -1),
									X("div", zl, [
										X("button", {
											disabled: A.mp <= 10,
											class: "stat-btn",
											onClick: b[14] ||= (e) => A.mp -= 10
										}, "-", 8, Bl),
										X("span", Vl, L(A.mp), 1),
										X("button", {
											class: "stat-btn",
											onClick: b[15] ||= (e) => A.mp += 10
										}, "+")
									]),
									b[83] ||= X("span", { class: "stat-cost" }, "20/点", -1)
								]),
								X("div", Hl, [
									b[84] ||= X("span", { class: "stat-name" }, "理智值 (SP)", -1),
									X("div", Ul, [
										X("button", {
											disabled: A.sp <= 10,
											class: "stat-btn",
											onClick: b[16] ||= (e) => A.sp--
										}, "-", 8, Wl),
										X("span", Gl, L(A.sp), 1),
										X("button", {
											disabled: A.sp >= 50,
											class: "stat-btn",
											onClick: b[17] ||= (e) => A.sp++
										}, "+", 8, Kl)
									]),
									b[85] ||= X("span", { class: "stat-cost" }, "50/点", -1)
								]),
								X("div", ql, [
									b[86] ||= X("span", { class: "stat-name" }, "理智稳定性", -1),
									X("div", Jl, [
										X("button", {
											disabled: A.stability <= 10,
											class: "stat-btn",
											onClick: b[18] ||= (e) => A.stability -= 5
										}, "-", 8, Yl),
										X("span", Xl, L(A.stability), 1),
										X("button", {
											disabled: A.stability >= 100,
											class: "stat-btn",
											onClick: b[19] ||= (e) => A.stability += 5
										}, "+", 8, Zl)
									]),
									b[87] ||= X("span", { class: "stat-cost" }, "30/点", -1)
								])
							]),
							b[89] ||= X("div", {
								class: "shop-title",
								style: {
									"margin-top": "20px",
									"font-size": "1.2em"
								}
							}, "六维属性 (10-15: 50点/级 | 16-20: 150点/级)", -1),
							X("div", Ql, [(J(), Y(q, null, K([
								"str",
								"dex",
								"con",
								"int",
								"wis",
								"cha"
							], (e) => X("div", {
								key: e,
								class: "stat-row"
							}, [X("span", $l, L(ae[e]), 1), X("div", eu, [
								X("button", {
									disabled: A[e] <= 10,
									class: "stat-btn",
									onClick: (t) => A[e]--
								}, "-", 8, tu),
								X("span", nu, L(A[e]), 1),
								X("button", {
									disabled: A[e] >= 20,
									class: "stat-btn",
									onClick: (t) => A[e]++
								}, "+", 8, ru)
							])])), 64))])
						]),
						X("div", iu, [
							b[100] ||= X("div", { class: "shop-title" }, "DIY 锻造与深渊契约端口", -1),
							b[101] ||= X("div", { class: "dm-warning" }, [
								X("strong", null, "【跑团娘的善意提醒】"),
								Z(" 想要手搓 ALEPH 级神装？可以。但如果你敢在描述里写“毫无副作用”，我保证你拔剑的瞬间就会被奇点反噬切成肉沫。越强大的力量，需要越扭曲的代价来平衡。"),
								X("br"),
								X("span", { style: { color: "var(--pm-dark-red)" } }, "* 提示：如果你不知道具体的伤害数值（如1d8），可以只写效果，AI 会根据你选择的评级自动为你补全合理的数值。")
							], -1),
							X("div", au, [
								b[91] ||= X("div", {
									class: "shop-title",
									style: {
										"font-size": "1.2em",
										border: "none",
										"margin-bottom": "5px"
									}
								}, "自定义背景 / 特质", -1),
								(J(!0), Y(q, null, K(N.traits, (e, t) => (J(), Y("div", {
									key: "trait" + t,
									class: "diy-box"
								}, [
									X("div", ou, [X("span", su, "特质 #" + L(t + 1), 1), X("div", cu, [
										e.rolled ? (J(), Y("span", lu, "-" + L(e.cost) + " 点", 1)) : Xi("", !0),
										X("button", {
											disabled: !e.tier,
											class: "diy-roll-btn",
											onClick: (e) => ue("traits", t)
										}, "评估代价 (Roll)", 8, uu),
										X("button", {
											class: "btn-remove-diy",
											title: "删除",
											onClick: (e) => le("traits", t)
										}, "×", 8, du)
									])]),
									G(X("input", {
										"onUpdate:modelValue": (t) => e.name = t,
										type: "text",
										class: "pm-input",
										placeholder: "特质名称 (如: 异想体血肉共生)",
										onInput: (t) => e.rolled = !1
									}, null, 40, fu), [[Q, e.name]]),
									G(X("textarea", {
										"onUpdate:modelValue": (t) => e.desc = t,
										class: "pm-textarea",
										placeholder: "特质效果描述...",
										onInput: (t) => e.rolled = !1
									}, null, 40, pu), [[Q, e.desc]]),
									G(X("select", {
										"onUpdate:modelValue": (t) => e.tier = t,
										class: "pm-select",
										onChange: (t) => e.rolled = !1
									}, [b[90] ||= X("option", { value: "" }, "-- 选择评级区间 --", -1), (J(), Y(q, null, K(oe, (e) => X("option", {
										key: e.label,
										value: e.label
									}, L(e.label), 9, hu)), 64))], 40, mu), [[Bo, e.tier]])
								]))), 128)),
								X("button", {
									class: "btn-add-diy",
									onClick: b[20] ||= (e) => ce("traits")
								}, "➕ 添加自定义特质")
							]),
							X("div", gu, [
								b[93] ||= X("div", {
									class: "shop-title",
									style: {
										"font-size": "1.2em",
										border: "none",
										"margin-bottom": "5px",
										"margin-top": "20px"
									}
								}, "自定义武器 / E.G.O", -1),
								(J(!0), Y(q, null, K(N.weapons, (e, t) => (J(), Y("div", {
									key: "weapon" + t,
									class: "diy-box"
								}, [
									X("div", _u, [X("span", vu, "武器 #" + L(t + 1), 1), X("div", yu, [
										e.rolled ? (J(), Y("span", bu, "-" + L(e.cost) + " 点", 1)) : Xi("", !0),
										X("button", {
											disabled: !e.tier,
											class: "diy-roll-btn",
											onClick: (e) => ue("weapons", t)
										}, "评估代价 (Roll)", 8, xu),
										X("button", {
											class: "btn-remove-diy",
											title: "删除",
											onClick: (e) => le("weapons", t)
										}, "×", 8, Su)
									])]),
									G(X("input", {
										"onUpdate:modelValue": (t) => e.name = t,
										type: "text",
										class: "pm-input",
										placeholder: "武器名称 (如: ALEPH级·拟态幼体)",
										onInput: (t) => e.rolled = !1
									}, null, 40, Cu), [[Q, e.name]]),
									G(X("textarea", {
										"onUpdate:modelValue": (t) => e.desc = t,
										class: "pm-textarea",
										placeholder: "武器效果与【副作用代价】描述... (未写明伤害骰子AI将自动补全)",
										onInput: (t) => e.rolled = !1
									}, null, 40, wu), [[Q, e.desc]]),
									G(X("select", {
										"onUpdate:modelValue": (t) => e.tier = t,
										class: "pm-select",
										onChange: (t) => e.rolled = !1
									}, [b[92] ||= X("option", { value: "" }, "-- 选择评级区间 --", -1), (J(), Y(q, null, K(oe, (e) => X("option", {
										key: e.label,
										value: e.label
									}, L(e.label), 9, Eu)), 64))], 40, Tu), [[Bo, e.tier]])
								]))), 128)),
								X("button", {
									class: "btn-add-diy",
									onClick: b[21] ||= (e) => ce("weapons")
								}, "➕ 添加自定义武器")
							]),
							X("div", Du, [
								b[95] ||= X("div", {
									class: "shop-title",
									style: {
										"font-size": "1.2em",
										border: "none",
										"margin-bottom": "5px",
										"margin-top": "20px"
									}
								}, "自定义防具 / 服饰", -1),
								(J(!0), Y(q, null, K(N.armors, (e, t) => (J(), Y("div", {
									key: "armor" + t,
									class: "diy-box"
								}, [
									X("div", Ou, [X("span", ku, "防具 #" + L(t + 1), 1), X("div", Au, [
										e.rolled ? (J(), Y("span", ju, "-" + L(e.cost) + " 点", 1)) : Xi("", !0),
										X("button", {
											disabled: !e.tier,
											class: "diy-roll-btn",
											onClick: (e) => ue("armors", t)
										}, "评估代价 (Roll)", 8, Mu),
										X("button", {
											class: "btn-remove-diy",
											title: "删除",
											onClick: (e) => le("armors", t)
										}, "×", 8, Nu)
									])]),
									G(X("input", {
										"onUpdate:modelValue": (t) => e.name = t,
										type: "text",
										class: "pm-input",
										placeholder: "防具名称 (如: W公司清剿服)",
										onInput: (t) => e.rolled = !1
									}, null, 40, Pu), [[Q, e.name]]),
									G(X("textarea", {
										"onUpdate:modelValue": (t) => e.desc = t,
										class: "pm-textarea",
										placeholder: "防具效果与代价描述...",
										onInput: (t) => e.rolled = !1
									}, null, 40, Fu), [[Q, e.desc]]),
									G(X("select", {
										"onUpdate:modelValue": (t) => e.tier = t,
										class: "pm-select",
										onChange: (t) => e.rolled = !1
									}, [b[94] ||= X("option", { value: "" }, "-- 选择评级区间 --", -1), (J(), Y(q, null, K(oe, (e) => X("option", {
										key: e.label,
										value: e.label
									}, L(e.label), 9, Lu)), 64))], 40, Iu), [[Bo, e.tier]])
								]))), 128)),
								X("button", {
									class: "btn-add-diy",
									onClick: b[22] ||= (e) => ce("armors")
								}, "➕ 添加自定义防具")
							]),
							X("div", Ru, [
								b[97] ||= X("div", {
									class: "shop-title",
									style: {
										"font-size": "1.2em",
										border: "none",
										"margin-bottom": "5px",
										"margin-top": "20px"
									}
								}, "自定义道具 / 消耗品", -1),
								(J(!0), Y(q, null, K(N.items, (e, t) => (J(), Y("div", {
									key: "item" + t,
									class: "diy-box"
								}, [
									X("div", zu, [X("span", Bu, "道具 #" + L(t + 1), 1), X("div", Vu, [
										e.rolled ? (J(), Y("span", Hu, "-" + L(e.cost) + " 点", 1)) : Xi("", !0),
										X("button", {
											disabled: !e.tier,
											class: "diy-roll-btn",
											onClick: (e) => ue("items", t)
										}, "评估代价 (Roll)", 8, Uu),
										X("button", {
											class: "btn-remove-diy",
											title: "删除",
											onClick: (e) => le("items", t)
										}, "×", 8, Wu)
									])]),
									G(X("input", {
										"onUpdate:modelValue": (t) => e.name = t,
										type: "text",
										class: "pm-input",
										placeholder: "道具名称 (如: K公司高浓度安瓿)",
										onInput: (t) => e.rolled = !1
									}, null, 40, Gu), [[Q, e.name]]),
									G(X("textarea", {
										"onUpdate:modelValue": (t) => e.desc = t,
										class: "pm-textarea",
										placeholder: "道具效果描述...",
										onInput: (t) => e.rolled = !1
									}, null, 40, Ku), [[Q, e.desc]]),
									G(X("select", {
										"onUpdate:modelValue": (t) => e.tier = t,
										class: "pm-select",
										onChange: (t) => e.rolled = !1
									}, [b[96] ||= X("option", { value: "" }, "-- 选择评级区间 --", -1), (J(), Y(q, null, K(oe, (e) => X("option", {
										key: e.label,
										value: e.label
									}, L(e.label), 9, Ju)), 64))], 40, qu), [[Bo, e.tier]])
								]))), 128)),
								X("button", {
									class: "btn-add-diy",
									onClick: b[23] ||= (e) => ce("items")
								}, "➕ 添加自定义道具")
							]),
							X("div", Yu, [
								b[99] ||= X("div", {
									class: "shop-title",
									style: {
										"font-size": "1.2em",
										border: "none",
										"margin-bottom": "5px",
										"margin-top": "20px",
										color: "var(--pm-dark-red)"
									}
								}, "自定义专属业障 (返还点数)", -1),
								(J(!0), Y(q, null, K(N.karmas, (e, t) => (J(), Y("div", {
									key: "karma" + t,
									class: "diy-box",
									style: {
										"border-color": "var(--pm-dark-red)",
										background: "rgba(139, 0, 0, 0.02)"
									}
								}, [
									X("div", Xu, [X("span", Zu, "业障 #" + L(t + 1), 1), X("div", Qu, [
										e.rolled ? (J(), Y("span", $u, "+" + L(e.refund) + " 点", 1)) : Xi("", !0),
										X("button", {
											disabled: !e.tier,
											class: "diy-roll-btn",
											style: { background: "var(--pm-dark-red)" },
											onClick: (e) => ue("karmas", t)
										}, "评估返还 (Roll)", 8, ed),
										X("button", {
											class: "btn-remove-diy",
											title: "删除",
											onClick: (e) => le("karmas", t)
										}, "×", 8, td)
									])]),
									G(X("input", {
										"onUpdate:modelValue": (t) => e.name = t,
										type: "text",
										class: "pm-input",
										placeholder: "业障名称 (如: 注定的扭曲)",
										onInput: (t) => e.rolled = !1
									}, null, 40, nd), [[Q, e.name]]),
									G(X("textarea", {
										"onUpdate:modelValue": (t) => e.desc = t,
										class: "pm-textarea",
										placeholder: "业障的负面效果与触发条件描述...",
										onInput: (t) => e.rolled = !1
									}, null, 40, rd), [[Q, e.desc]]),
									G(X("select", {
										"onUpdate:modelValue": (t) => e.tier = t,
										class: "pm-select",
										onChange: (t) => e.rolled = !1
									}, [b[98] ||= X("option", { value: "" }, "-- 选择痛苦评级 --", -1), (J(), Y(q, null, K(se, (e) => X("option", {
										key: e.label,
										value: e.label
									}, L(e.label), 9, ad)), 64))], 40, id), [[Bo, e.tier]])
								]))), 128)),
								X("button", {
									class: "btn-add-diy",
									style: {
										"border-color": "var(--pm-dark-red)",
										color: "var(--pm-dark-red)"
									},
									onClick: b[24] ||= (e) => ce("karmas")
								}, "➕ 添加自定义业障")
							])
						]),
						X("div", od, [
							b[102] ||= X("div", { class: "shop-title" }, "本局限定商品 (Roguelike 刷新池)", -1),
							b[103] ||= X("p", { style: {
								color: "#555",
								"font-size": "0.9em",
								"margin-bottom": "15px"
							} }, "如果你懒得自己写，可以直接从黑市商人这里购买现成的。", -1),
							b[104] ||= X("h4", { style: {
								color: "var(--pm-text)",
								"margin-bottom": "10px"
							} }, "特殊背景 / 特质", -1),
							X("div", sd, [(J(!0), Y(q, null, K(de.backgrounds, (e) => (J(), Y("div", {
								key: e.name,
								class: P([{ selected: De("backgrounds", e) }, "rl-card"]),
								onClick: (t) => Ee("backgrounds", e)
							}, [
								X("div", ld, L(e.type), 1),
								X("div", ud, L(e.name), 1),
								X("div", dd, L(e.desc), 1),
								X("div", fd, "-" + L(e.cost) + " 点", 1)
							], 10, cd))), 128))]),
							b[105] ||= X("h4", { style: {
								color: "var(--pm-text)",
								"margin-top": "25px",
								"margin-bottom": "10px"
							} }, "稀有遗物 / E.G.O", -1),
							X("div", pd, [(J(!0), Y(q, null, K(de.egos, (e) => (J(), Y("div", {
								key: e.name,
								class: P([{ selected: De("egos", e) }, "rl-card"]),
								onClick: (t) => Ee("egos", e)
							}, [
								X("div", hd, L(e.type), 1),
								X("div", gd, L(e.name), 1),
								X("div", _d, L(e.desc), 1),
								X("div", vd, "-" + L(e.cost) + " 点", 1)
							], 10, md))), 128))]),
							b[106] ||= X("h4", { style: {
								color: "var(--pm-dark-red)",
								"margin-top": "25px",
								"margin-bottom": "10px"
							} }, "专属业障 (必须至少选择一项，可返还点数)", -1),
							X("div", yd, [(J(!0), Y(q, null, K(de.karmas, (e) => (J(), Y("div", {
								key: e.name,
								class: P([{ selected: De("karmas", e) }, "rl-card"]),
								onClick: (t) => Ee("karmas", e)
							}, [
								X("div", xd, L(e.type), 1),
								X("div", Sd, L(e.name), 1),
								X("div", Cd, L(e.desc), 1),
								X("div", wd, "+" + L(e.refund) + " 点", 1)
							], 10, bd))), 128))])
						]),
						X("div", Td, [
							b[108] ||= X("div", { class: "shop-title" }, "同行伙伴 (Companion) - 消耗 2000 点", -1),
							X("label", Ed, [G(X("input", {
								"onUpdate:modelValue": b[25] ||= (e) => M.enabled = e,
								type: "checkbox",
								style: {
									width: "20px",
									height: "20px"
								}
							}, null, 512), [[Lo, M.enabled]]), b[107] ||= Z(" 携带一名自定义伙伴降临废土 ", -1)]),
							M.enabled ? (J(), Y("div", Dd, [G(X("input", {
								"onUpdate:modelValue": b[26] ||= (e) => M.name = e,
								type: "text",
								class: "pm-input",
								style: { margin: "0" },
								placeholder: "伙伴姓名 (如: 安吉拉)"
							}, null, 512), [[Q, M.name]]), G(X("textarea", {
								"onUpdate:modelValue": b[27] ||= (e) => M.desc = e,
								class: "pm-textarea",
								style: { margin: "0" },
								placeholder: "伙伴的身份、能力与性格设定..."
							}, null, 512), [[Q, M.desc]])])) : Xi("", !0)
						]),
						X("div", Od, [
							b[109] ||= X("div", { class: "shop-title" }, "完全自定义议约", -1),
							b[110] ||= X("p", { style: {
								color: "#555",
								"font-size": "0.9em"
							} }, [
								Z("如果你对上面的商品不满意，可以在此写下你疯狂的脑洞（例如：“我想扮演一个被W公司列车切碎后又被环指拼凑起来的缝合怪”）。"),
								X("br"),
								Z("注意：DM 会在游戏开始后为你进行点数估价，并强行缝合一个恶毒的专属业障。")
							], -1),
							X("div", kd, [G(X("textarea", {
								"onUpdate:modelValue": b[28] ||= (e) => fe.value = e,
								placeholder: "在此输入你的自定义设定..."
							}, null, 512), [[Q, fe.value]])])
						])
					]),
					X("div", Ad, [
						Te.value < 0 ? (J(), Y("div", jd, [...b[111] ||= [
							Z(" 【跑团娘的嘲弄】哎呀呀，点数透支了呢？没关系，你可以带着这身华丽的负债降临。", -1),
							X("br", null, null, -1),
							Z(" 只不过……开局负数骰子意味着你已经被都市的厄运标记。准备好在『心灵镜牢』里打一辈子黑工还债了吗，可怜的耗子？ ", -1)
						]])) : Xi("", !0),
						!Oe.value && !fe.value ? (J(), Y("p", Md, "必须至少选择一项【专属业障】（商店或DIY），或填写【自定义议约】。")) : Xi("", !0),
						X("button", {
							disabled: !Oe.value && !fe.value,
							class: "pm-btn-embark",
							onClick: ke
						}, "确认降临姿态", 8, Nd)
					])
				])) : Xi("", !0)])) : n.value === "settings" ? (J(), Y("div", Pd, [
					b[120] ||= X("div", { class: "settings-title" }, "契约与法则", -1),
					b[121] ||= X("div", { class: "settings-warning" }, "“深渊的边界由你划定。一旦铭刻，不可反悔。”", -1),
					X("div", Fd, [b[113] ||= Z("已选定降临姿态：", -1), X("span", Id, L(E.value), 1)]),
					X("div", Ld, [X("div", Rd, [
						b[114] ||= X("div", {
							class: "dm-title",
							style: {
								"font-size": "1.2em",
								"margin-bottom": "10px"
							}
						}, "心理锚点 (MBTI)", -1),
						b[115] ||= X("p", { style: {
							"font-size": "0.85em",
							color: "#666",
							"margin-bottom": "15px"
						} }, "决定你的理智恢复机制与卡门破防逻辑。", -1),
						X("div", zd, [X("button", {
							class: P([{ active: z.ei === "E" }, "mbti-btn"]),
							onClick: b[29] ||= (e) => z.ei = "E"
						}, "E (外向)", 2), X("button", {
							class: P([{ active: z.ei === "I" }, "mbti-btn"]),
							onClick: b[30] ||= (e) => z.ei = "I"
						}, "I (内向)", 2)]),
						X("div", Bd, [X("button", {
							class: P([{ active: z.sn === "S" }, "mbti-btn"]),
							onClick: b[31] ||= (e) => z.sn = "S"
						}, "S (感觉)", 2), X("button", {
							class: P([{ active: z.sn === "N" }, "mbti-btn"]),
							onClick: b[32] ||= (e) => z.sn = "N"
						}, "N (直觉)", 2)]),
						X("div", Vd, [X("button", {
							class: P([{ active: z.tf === "T" }, "mbti-btn"]),
							onClick: b[33] ||= (e) => z.tf = "T"
						}, "T (思考)", 2), X("button", {
							class: P([{ active: z.tf === "F" }, "mbti-btn"]),
							onClick: b[34] ||= (e) => z.tf = "F"
						}, "F (情感)", 2)]),
						X("div", Hd, [X("button", {
							class: P([{ active: z.jp === "J" }, "mbti-btn"]),
							onClick: b[35] ||= (e) => z.jp = "J"
						}, "J (判断)", 2), X("button", {
							class: P([{ active: z.jp === "P" }, "mbti-btn"]),
							onClick: b[36] ||= (e) => z.jp = "P"
						}, "P (知觉)", 2)]),
						X("div", Ud, L(Ae.value), 1)
					]), X("div", Wd, [
						b[116] ||= X("div", {
							class: "dm-title",
							style: {
								"font-size": "1.2em",
								"margin-bottom": "10px"
							}
						}, "世界难度选择", -1),
						b[117] ||= X("p", { style: {
							"font-size": "0.85em",
							color: "#666",
							"margin-bottom": "15px"
						} }, "决定废土对你的残酷程度。", -1),
						X("button", {
							class: P([{ active: je.value === "剧情 (Story)" }, "diff-btn"]),
							onClick: b[37] ||= (e) => je.value = "剧情 (Story)"
						}, "剧情 (Story) - 侧重体验，资源较多", 2),
						X("button", {
							class: P([{ active: je.value === "普通 (Normal)" }, "diff-btn"]),
							onClick: b[38] ||= (e) => je.value = "普通 (Normal)"
						}, "普通 (Normal) - 标准的废土生存", 2),
						X("button", {
							class: P([{ active: je.value === "硬核 (Hardcore)" }, "diff-btn"]),
							onClick: b[39] ||= (e) => je.value = "硬核 (Hardcore)"
						}, "硬核 (Hardcore) - 极易断肢，资源匮乏", 2),
						X("button", {
							class: P([{ active: je.value === "地狱 (Hell)" }, "diff-btn"]),
							onClick: b[40] ||= (e) => je.value = "地狱 (Hell)"
						}, "地狱 (Hell) - 机制杀频发，卡门时刻注视", 2)
					])]),
					X("div", Gd, [(J(!0), Y(q, null, K(T.sensitiveToggles, (e, t) => (J(), Y("div", {
						key: t,
						class: P(["toggle-btn", { active: e }]),
						onClick: (n) => T.sensitiveToggles[t] = !e
					}, L(String(t).replace(/_/g, " / ")), 11, Kd))), 128))]),
					X("div", qd, [
						b[118] ||= X("div", { class: "dm-title" }, "观测者化身设定", -1),
						b[119] ||= X("div", { class: "dm-desc" }, "“接下来，我的化身将与你同行，但她只会作为无情的DM存在。你希望她用什么态度来见证你的挣扎？”", -1),
						X("div", Jd, [
							X("button", {
								class: P([{ active: T.dmPersonality === "三无机娘，冷酷客观，毫无感情波动" }, "pm-preset-btn"]),
								onClick: b[41] ||= (e) => T.dmPersonality = "三无机娘，冷酷客观，毫无感情波动"
							}, "三无机娘", 2),
							X("button", {
								class: P([{ active: T.dmPersonality === "腹黑乐子人，喜欢看玩家挣扎，语气带有优雅的嘲讽" }, "pm-preset-btn"]),
								onClick: b[42] ||= (e) => T.dmPersonality = "腹黑乐子人，喜欢看玩家挣扎，语气带有优雅的嘲讽"
							}, "腹黑乐子人", 2),
							X("button", {
								class: P([{ active: T.dmPersonality === "温柔病娇，一边哭泣一边宣告你的断头，极度排外" }, "pm-preset-btn"]),
								onClick: b[43] ||= (e) => T.dmPersonality = "温柔病娇，一边哭泣一边宣告你的断头，极度排外"
							}, "温柔病娇", 2),
							X("button", {
								class: P([{ active: T.dmPersonality === "暴躁老姐，满口粗话，大骂着把你的内脏扯出来" }, "pm-preset-btn"]),
								onClick: b[44] ||= (e) => T.dmPersonality = "暴躁老姐，满口粗话，大骂着把你的内脏扯出来"
							}, "暴躁老姐", 2),
							X("button", {
								class: "pm-preset-btn custom-btn",
								onClick: te
							}, "✍️ 自定义(手动输入)")
						]),
						G(X("input", {
							ref_key: "dmInputRef",
							ref: ee,
							"onUpdate:modelValue": b[45] ||= (e) => T.dmPersonality = e,
							type: "text",
							class: "pm-input",
							placeholder: "或在此处写入你自定义的傲娇、病娇等设定..."
						}, null, 512), [[Q, T.dmPersonality]])
					]),
					X("button", {
						disabled: r.value,
						class: "pm-btn-embark",
						onClick: Ne
					}, L(r.value ? "引擎连接中..." : "踏上旅程"), 9, Yd)
				])) : Xi("", !0)]),
				_: 1
			})
		])) : Xi("", !0);
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
			t.id = "pm-global-styles", t.innerHTML = "\n        /* 隐藏原生标签 */\n        .mes_text initvar, .mes_text updatevariable, .mes_text variable_log,\n        .mes_text statusbar_data, .mes_text context_options, .mes_text context_summary {\n            display: none !important;\n        }\n        .mes_text narrative { display: block !important; }\n\n        /* =========================================\n           全局与羊皮纸基底 (废墟图书馆美学)\n           ========================================= */\n        :root {\n          --pm-gold: #d4af37;\n          --pm-dark-red: #8b0000;\n          --pm-black: #1a1105;\n          --pm-text: #2c241b;\n          --pm-bg-light: #ffffff;\n          --pm-bg-mid: #fcfaf5;\n          --pm-bg-dark: #f4ebd8;\n        }\n\n        .pm-master-container {\n          position: relative;\n          width: 100%;\n          min-height: 100vh;\n          border-radius: 12px;\n          border: 2px solid var(--pm-gold);\n          z-index: 10;\n          background: radial-gradient(circle at center, var(--pm-bg-light) 0%, var(--pm-bg-mid) 50%, var(--pm-bg-dark) 100%);\n          padding: 20px;\n          box-sizing: border-box;\n          color: var(--pm-text);\n          overflow-x: hidden;\n          box-shadow: inset 0 0 40px rgba(255, 255, 255, 1);\n          display: flex;\n          flex-direction: column;\n          align-items: center;\n          font-family: 'Noto Serif SC', 'Songti SC', serif;\n          margin-top: 15px;\n          margin-bottom: 15px;\n        }\n        .pm-master-container::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; border: 3px solid rgba(212, 175, 55, 0.8); border-radius: 12px; animation: pm-border-glow 4s infinite alternate ease-in-out; pointer-events: none; z-index: 2; }\n        .pm-master-container::after { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-radius: 12px; background-image: url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"noiseFilter\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23noiseFilter)\" opacity=\"0.05\"/></svg>'); pointer-events: none; z-index: 1; }\n        @keyframes pm-border-glow { 0% { box-shadow: inset 0 0 15px rgba(212, 175, 55, 0.1), 0 0 15px rgba(212, 175, 55, 0.2); border-color: rgba(212, 175, 55, 0.4); } 100% { box-shadow: inset 0 0 40px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.5); border-color: rgba(212, 175, 55, 1); } }\n\n        /* 状态栏主容器 */\n        @keyframes stb-pm-terminal-breathe { 0% { border-color: #222; } 50% { border-color: #444; } 100% { border-color: #222; } }\n        .stb-pm-wrapper { width: 100%; max-width: 100%; overflow-x: hidden; overflow-wrap: anywhere; box-sizing: border-box; background: #050505; background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px); background-size: 24px 24px; border: 1px solid #333; border-top: 4px solid #8a0303; border-bottom: 4px solid #d4af37; border-radius: 12px; font-family: 'Nunito', 'Quicksand', 'Segoe UI Rounded', 'Helvetica Rounded', Arial, sans-serif; color: #d0d0d0; padding: 16px; animation: stb-pm-terminal-breathe 8s infinite ease-in-out; position: relative; margin-top: 15px; margin-bottom: 10px; }\n        .stb-pm-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid rgba(212, 175, 55, 0.2); padding-bottom: 12px; margin-bottom: 12px; position: relative; }\n        .stb-pm-header::after { content: ''; position: absolute; bottom: -1px; left: 0; width: 30%; height: 2px; background: #d4af37; box-shadow: 0 0 10px #d4af37; border-radius: 2px; }\n        .stb-pm-location { font-family: 'Quicksand', 'Georgia', serif; font-size: clamp(16px, 4vw, 18px); font-weight: bold; color: #d4af37; letter-spacing: 1px; text-shadow: 0 0 12px rgba(212, 175, 55, 0.6); word-break: break-word; display: flex; align-items: center; gap: 8px; flex: 1; }\n        .stb-pm-location::before { content: '◆'; font-size: 12px; color: #8a0303; text-shadow: 0 0 6px #8a0303; }\n        .stb-pm-env-col { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; flex-shrink: 0; }\n        .stb-pm-tag { background: rgba(0, 0, 0, 0.8); border: 1px solid #444; padding: 4px 10px; border-radius: 12px; white-space: nowrap; font-size: 12px; box-shadow: inset 0 0 8px rgba(255, 255, 255, 0.05); letter-spacing: 0.5px; }\n        .stb-pm-tag-time { color: #aaa; border-color: #555; }\n        .stb-pm-tag-weather { color: #ff6b6b; border-color: #8a0303; text-shadow: 0 0 5px rgba(138, 3, 3, 0.8); }\n\n        /* BGM 播放器 */\n        .stb-pm-bgm-container { margin-bottom: 16px; }\n        .stb-pm-bgm-container details { background: linear-gradient(90deg, rgba(255, 255, 255, 0.03), rgba(0, 0, 0, 0.5)); border: 1px solid #333; border-left: 3px solid #81d4fa; border-radius: 8px; overflow: hidden; transition: all 0.3s ease; }\n        .stb-pm-bgm-container summary { padding: 12px 16px; font-size: 14px; color: #81d4fa; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; font-weight: bold; }\n        .stb-pm-bgm-container summary::-webkit-details-marker { display: none; }\n        .stb-pm-bgm-container summary:hover { background: rgba(129, 212, 250, 0.1); }\n        .stb-pm-bgm-arrow { transition: transform 0.3s ease; }\n        .stb-pm-bgm-container details[open] .stb-pm-bgm-arrow { transform: rotate(180deg); }\n        .stb-pm-bgm-content { padding: 12px; border-top: 1px solid #333; display: flex; justify-content: center; background: #000; overflow: hidden; }\n        .stb-pm-bgm-content > iframe, .stb-pm-bgm-content > audio { width: 100% !important; max-width: 330px; height: 86px; border-radius: 6px; outline: none; border: none; }\n\n        /* 按钮与徽章 */\n        @keyframes stb-btn-breathe-gold { 0% { box-shadow: 0 0 5px rgba(212, 175, 55, 0.2); } 50% { box-shadow: 0 0 15px rgba(212, 175, 55, 0.6); } 100% { box-shadow: 0 0 5px rgba(212, 175, 55, 0.2); } }\n        @keyframes stb-btn-breathe-blue { 0% { box-shadow: 0 0 5px rgba(129, 212, 250, 0.2); } 50% { box-shadow: 0 0 15px rgba(129, 212, 250, 0.6); } 100% { box-shadow: 0 0 5px rgba(129, 212, 250, 0.2); } }\n        .stb-pm-actions { display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap; }\n        .stb-pm-btn { flex: 1; min-width: 140px; height: 40px; display: flex; align-items: center; justify-content: center; text-decoration: none; font-size: 14px; font-weight: bold; letter-spacing: 1px; border-radius: 20px; transition: all 0.2s ease; cursor: pointer; touch-action: manipulation; }\n        .stb-pm-btn:active { transform: scale(0.96); }\n        .stb-pm-btn-guide { background: linear-gradient(180deg, rgba(212, 175, 55, 0.15), rgba(0, 0, 0, 0.8)); border: 1px solid #d4af37; color: #f4e7c1; animation: stb-btn-breathe-gold 3s infinite ease-in-out; }\n        .stb-pm-btn-mirror { background: linear-gradient(180deg, rgba(129, 212, 250, 0.15), rgba(0, 0, 0, 0.8)); border: 1px solid #81d4fa; color: #e1f5fe; animation: stb-btn-breathe-blue 3s infinite ease-in-out; }\n        .stb-pm-badges { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 16px; }\n        .stb-pm-badge { background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.5)); border: 1px solid #333; border-left: 3px solid #d4af37; padding: 8px 14px; border-radius: 8px; font-size: 14px; color: #e0e0e0; display: flex; align-items: center; gap: 8px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5); }\n        .stb-pm-badge strong { color: #d4af37; font-weight: bold; }\n        .stb-pm-badge-title { flex: 1 1 100%; border-left-color: #81d4fa; }\n        .stb-pm-badge-title strong { color: #81d4fa; }\n\n        /* 🚨 Tabs 切换 (修复黑块与高度塌陷) */\n        .stb-pm-tabs-container { display: flex; flex-wrap: wrap; gap: 4px; position: relative; width: 100%; }\n        .stb-pm-tab-label { display: contents; }\n        .stb-pm-tab-radio { display: none; }\n        .stb-tab-btn { order: 1; padding: 10px 16px; font-size: 14px; color: #777; background: linear-gradient(to bottom, #0a0a0a, #111); border: 1px solid #222; border-bottom: none; border-radius: 8px 8px 0 0; cursor: pointer; white-space: nowrap; transition: all 0.3s ease; position: relative; letter-spacing: 1px; user-select: none; }\n        .stb-pm-tab-content { order: 2; width: 100%; display: none; flex-direction: column; gap: 16px; max-height: 60vh; overflow-y: auto; padding-right: 8px; padding-top: 16px; border-top: 1px solid #222; scrollbar-width: thin; scrollbar-color: #555 #0a0a0a; -webkit-overflow-scrolling: touch; }\n        .stb-pm-tab-content::-webkit-scrollbar { width: 6px; }\n        .stb-pm-tab-content::-webkit-scrollbar-track { background: #0a0a0a; border-radius: 3px; }\n        .stb-pm-tab-content::-webkit-scrollbar-thumb { background: #555; border-radius: 3px; }\n        .stb-pm-tab-radio:checked ~ .stb-tab-btn { color: #fff; background: linear-gradient(to bottom, rgba(138, 3, 3, 0.25), #0a0a0a); border-color: #555; text-shadow: 0 0 6px rgba(255, 255, 255, 0.6); font-weight: bold; }\n        .stb-pm-tab-radio:checked ~ .stb-tab-btn::after { content: ''; position: absolute; bottom: -1px; left: 0; width: 100%; height: 3px; background: #d4af37; box-shadow: 0 -2px 12px #d4af37, 0 0 6px #fff; border-radius: 2px; z-index: 2; }\n        .stb-pm-tab-radio:checked ~ .stb-pm-tab-content { display: flex; }\n\n        /* 面板与进度条 */\n        .stb-pm-panel { background: rgba(15, 15, 18, 0.8); border: 1px solid #222; border-left: 4px solid #555; border-radius: 8px; padding: 16px; min-width: 0; box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8); transition: border-color 0.3s ease, box-shadow 0.3s ease; position: relative; }\n        .stb-pm-panel:hover { border-left-color: #d4af37; box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8), -3px 0 12px rgba(212, 175, 55, 0.25); }\n        .stb-pm-panel-title { font-size: 13px; color: #999; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px; border-bottom: 1px dashed rgba(255, 255, 255, 0.15); padding-bottom: 6px; display: flex; align-items: center; font-weight: bold; }\n        .stb-pm-panel-title::before { content: '■'; font-size: 10px; margin-right: 8px; color: #555; }\n        .stb-pm-bar-container { margin-bottom: 14px; }\n        .stb-pm-bar-header { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 6px; }\n        .stb-pm-bar-label { font-weight: bold; text-shadow: 0 0 5px currentColor; letter-spacing: 1px; }\n        .stb-pm-bar-value { font-family: 'Courier New', Courier, monospace; font-size: 14px; color: #ccc; }\n        .stb-pm-bar-track { width: 100%; height: 14px; background: #0a0a0a; border: 1px solid #333; border-radius: 7px; overflow: hidden; box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.9), 0 1px 0 rgba(255, 255, 255, 0.05); position: relative; }\n        .stb-pm-bar-fill { height: 100%; transition: width 0.5s ease; border-radius: 7px; }\n        .stb-pm-bar-hp { background: linear-gradient(90deg, #ff6b6b, #8a0303); box-shadow: 0 0 8px rgba(255, 107, 107, 0.6); }\n        .stb-pm-bar-mp { background: linear-gradient(90deg, #81d4fa, #0277bd); box-shadow: 0 0 8px rgba(129, 212, 250, 0.6); }\n        .stb-pm-bar-sp { background: linear-gradient(90deg, #81c784, #2e7d32); box-shadow: 0 0 8px rgba(129, 199, 132, 0.6); }\n        .stb-pm-bar-xp { background: linear-gradient(90deg, #fff59d, #fbc02d); box-shadow: 0 0 8px rgba(255, 245, 157, 0.6); }\n\n        /* 肢体状态 */\n        .stb-pm-limbs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }\n        @keyframes stb-critical-flash { 0% { border-color: #ff4444; box-shadow: 0 0 10px rgba(255, 68, 68, 0.7); background: rgba(255, 68, 68, 0.15); } 50% { border-color: #550000; box-shadow: none; background: rgba(255, 68, 68, 0.05); } 100% { border-color: #ff4444; box-shadow: 0 0 10px rgba(255, 68, 68, 0.7); background: rgba(255, 68, 68, 0.15); } }\n        .stb-pm-limb-card { background: linear-gradient(180deg, #1a1a1a, #0d0d0d); border: 1px solid #333; border-radius: 8px; padding: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; transition: transform 0.2s ease, border-color 0.2s ease; position: relative; overflow: hidden; }\n        .stb-pm-limb-card::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: #333; }\n        .stb-pm-limb-name { font-size: 12px; color: #888; margin-bottom: 6px; letter-spacing: 1px; text-transform: uppercase; }\n        .stb-pm-limb-stat { font-size: 14px; font-weight: bold; text-align: center; word-break: break-word; white-space: normal; }\n        .stb-pm-limb-card[data-status*='完好']::before { background: #555; }\n        .stb-pm-limb-card[data-status*='完好'] .stb-pm-limb-stat { color: #999; }\n        .stb-pm-limb-card[data-status*='轻度']::before { background: #aaa; }\n        .stb-pm-limb-card[data-status*='轻度'] .stb-pm-limb-stat { color: #ddd; text-shadow: 0 0 4px rgba(255, 255, 255, 0.3); }\n        .stb-pm-limb-card[data-status*='重伤'] { border-color: #ffb74d; }\n        .stb-pm-limb-card[data-status*='重伤']::before { background: #ffb74d; box-shadow: 0 0 6px #ffb74d; }\n        .stb-pm-limb-card[data-status*='重伤'] .stb-pm-limb-stat { color: #ffcc80; text-shadow: 0 0 6px rgba(255, 204, 128, 0.6); }\n        .stb-pm-limb-card[data-status*='残废'], .stb-pm-limb-card[data-status*='断裂'] { animation: stb-critical-flash 1s infinite; }\n        .stb-pm-limb-card[data-status*='残废']::before, .stb-pm-limb-card[data-status*='断裂']::before { background: #ff4444; }\n        .stb-pm-limb-card[data-status*='残废'] .stb-pm-limb-stat, .stb-pm-limb-card[data-status*='断裂'] .stb-pm-limb-stat { color: #ff6b6b; text-decoration: line-through; }\n        .stb-pm-limb-card[data-status*='义体'], .stb-pm-limb-card[data-status*='同化'], .stb-pm-limb-card[data-status*='再生'] { border-color: #d4af37; background: rgba(212, 175, 55, 0.05); }\n        .stb-pm-limb-card[data-status*='义体']::before, .stb-pm-limb-card[data-status*='同化']::before, .stb-pm-limb-card[data-status*='再生']::before { background: #d4af37; box-shadow: 0 0 6px #d4af37; }\n        .stb-pm-limb-card[data-status*='义体'] .stb-pm-limb-stat, .stb-pm-limb-card[data-status*='同化'] .stb-pm-limb-stat, .stb-pm-limb-card[data-status*='再生'] .stb-pm-limb-stat { color: #f4e7c1; text-shadow: 0 0 6px rgba(212, 175, 55, 0.5); }\n\n        /* 属性与折叠夹 */\n        .stb-pm-stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 16px; }\n        .stb-pm-stat-box { background: rgba(255, 255, 255, 0.02); border: 1px solid #333; border-radius: 6px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5); }\n        .stb-pm-stat-label { font-size: 13px; color: #888; text-transform: uppercase; font-weight: bold; }\n        .stb-pm-stat-value { font-size: 16px; font-weight: bold; color: #d4af37; font-family: monospace; text-shadow: 0 0 5px rgba(212, 175, 55, 0.4); }\n        .stb-pm-folder { background: rgba(255, 255, 255, 0.03); border: 1px solid #333; border-radius: 6px; margin-bottom: 10px; overflow: hidden; transition: all 0.3s ease; }\n        .stb-pm-folder summary { padding: 12px 14px; font-size: 14px; color: #eee; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; font-weight: bold; background: rgba(0, 0, 0, 0.4); }\n        .stb-pm-folder summary::-webkit-details-marker { display: none; }\n        .stb-pm-folder summary:hover { background: rgba(255, 255, 255, 0.05); }\n        .stb-pm-folder-arrow { transition: transform 0.3s ease; color: #888; font-size: 12px; }\n        .stb-pm-folder[open] .stb-pm-folder-arrow { transform: rotate(180deg); }\n        .stb-pm-folder-content { padding: 12px; border-top: 1px solid #333; }\n        .stb-pm-folder-actions { display: flex; justify-content: flex-end; padding: 8px 12px; background: rgba(0, 0, 0, 0.6); border-top: 1px dashed #444; }\n        .stb-pm-btn-small { background: #222; border: 1px solid #555; color: #ccc; padding: 4px 12px; border-radius: 4px; font-size: 12px; text-decoration: none; transition: all 0.2s; cursor: pointer; }\n        .stb-pm-btn-small:hover { background: #8a0303; border-color: #ff6b6b; color: #fff; }\n\n        /* 文本与传闻卡片 */\n        .stb-pm-text-block { font-size: 15px; color: #ccc; line-height: 1.6; word-wrap: break-word; white-space: normal; }\n        .stb-pm-rumor-card { background: linear-gradient(90deg, rgba(212, 175, 55, 0.08), rgba(0, 0, 0, 0.6)); border: 1px solid #222; border-left: 4px solid #d4af37; padding: 12px 16px; margin-bottom: 12px; border-radius: 4px 8px 8px 4px; transition: all 0.3s ease; position: relative; }\n        .stb-pm-rumor-card::after { content: ''; position: absolute; top: 0; right: 0; width: 30px; height: 100%; background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.9)); }\n        .stb-pm-rumor-card:hover { background: linear-gradient(90deg, rgba(212, 175, 55, 0.15), rgba(0, 0, 0, 0.6)); border-left-width: 6px; transform: translateX(4px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6); }\n        .stb-pm-rumor-title { color: #d4af37; font-size: 14px; margin-bottom: 8px; font-weight: bold; letter-spacing: 1.5px; }\n        .stb-pm-rumor-text { color: #ddd; font-size: 15px; line-height: 1.6; position: relative; z-index: 1; }\n        .stb-pm-terminal-data { font-family: 'Courier New', Courier, monospace; font-size: 13px; color: #81d4fa; white-space: pre-wrap; word-break: break-all; line-height: 1.5; }\n        .stb-pm-terminal-data-gold { color: #f4e7c1; }\n        .stb-pm-terminal-data-red { color: #ff6b6b; }\n        .stb-pm-info-row { display: flex; flex-direction: row; justify-content: space-between; margin-bottom: 8px; border-bottom: 1px dashed #333; padding-bottom: 4px; }\n        .stb-pm-info-label { font-size: 14px; color: #999; }\n        .stb-pm-info-value { font-size: 14px; font-weight: bold; color: #ccc; }\n\n        /* =========================================\n           车卡界面专属样式\n           ========================================= */\n        /* 🚨 渐入渐出动画 */\n        .fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease, transform 0.5s ease; }\n        .fade-enter-from { opacity: 0; transform: translateY(20px); }\n        .fade-leave-to { opacity: 0; transform: translateY(-20px); }\n\n        .page-check, .library-scene, .custom-char-page, .page-settings { width: 100%; max-width: 1000px; flex: 1; display: flex; flex-direction: column; align-items: center; position: relative; z-index: 10; }\n        .page-check { justify-content: center; }\n        .sys-title { font-size: clamp(2em, 5vw, 3.5em); font-weight: 900; color: var(--pm-black); letter-spacing: 10px; margin-bottom: 5px; text-shadow: 0 0 15px rgba(212, 175, 55, 0.6); text-align: center; }\n        .sys-subtitle { font-family: 'Brush Script MT', 'Great Vibes', cursive; font-size: clamp(1.2em, 3vw, 1.8em); color: var(--pm-dark-red); margin-bottom: 50px; letter-spacing: 3px; text-align: center; }\n        .sys-check-box { width: 100%; max-width: 500px; margin: 0 auto 50px; border-top: 2px solid var(--pm-gold); border-bottom: 2px solid var(--pm-gold); padding: 30px 0; }\n        .sys-row { display: flex; justify-content: space-between; margin: 15px 0; font-size: 1.2em; font-weight: bold; color: #333; }\n        .status-ok { font-family: monospace; color: var(--pm-dark-red); text-shadow: 0 0 10px rgba(139, 0, 0, 0.2); }\n        .status-warn { font-family: monospace; color: #d4af37; }\n        .status-loading { font-family: monospace; color: #aaa; animation: pulse 1.5s infinite; }\n        .sys-actions { display: flex; gap: 30px; width: 100%; max-width: 500px; justify-content: center; }\n        .sys-btn { flex: 1; padding: 15px 0; text-align: center; border: 1px solid var(--pm-text); background: transparent; color: var(--pm-text); cursor: pointer; font-family: inherit; font-size: 1.2em; font-weight: bold; letter-spacing: 4px; transition: all 0.3s; border-radius: 4px; }\n        .sys-btn:hover { background: var(--pm-text); color: var(--pm-bg-mid); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); }\n        .sys-btn-primary { border-color: var(--pm-dark-red); color: var(--pm-dark-red); }\n        .sys-btn-primary:hover:not(:disabled) { background: var(--pm-dark-red); color: white; box-shadow: 0 8px 20px rgba(139, 0, 0, 0.25); }\n        .sys-btn-primary:disabled { opacity: 0.5; border-color: #666; color: #666; cursor: not-allowed; background: transparent; box-shadow: none; }\n\n        .transition-note { position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-radius: 12px; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 10%; background: radial-gradient(circle at center, #ffffff 0%, #fcfaf5 50%, #f4ebd8 100%); z-index: 210; animation: noteSequence 5.5s forwards ease-in-out; }\n        .note-title { font-size: clamp(1.5em, 3vw, 2em); color: var(--pm-dark-red); margin-bottom: 30px; border-bottom: 2px solid var(--pm-gold); padding-bottom: 15px; letter-spacing: 3px; font-weight: bold; }\n        .note-content { font-size: clamp(1em, 2vw, 1.2em); line-height: 2; max-width: 800px; color: var(--pm-text); }\n        .note-content li { margin-bottom: 15px; list-style-type: square; }\n        .note-content li strong { color: var(--pm-dark-red); font-weight: 900; }\n\n        .library-scene { width: 100%; padding: 20px 0; box-sizing: border-box; position: relative; z-index: 200; }\n\n        /* 🚨 修复：BGM 播放器样式，绕过浏览器拦截 */\n        .bgm-player { position: absolute; top: 0px; left: 0px; width: 280px; opacity: 0; pointer-events: none; transition: opacity 0.4s; z-index: 220; }\n        .bgm-player.is-visible { opacity: 0.3; pointer-events: auto; }\n        .bgm-player.is-visible:hover { opacity: 1; }\n        .bgm-player audio, .bgm-player iframe { width: 100%; height: 40px; outline: none; border: none; }\n\n        .scene-text { font-size: clamp(1.1em, 2.5vw, 1.3em); line-height: 2.2; text-align: justify; margin-top: 60px; margin-bottom: 50px; max-width: 900px; margin-left: auto; margin-right: auto; text-indent: 2em; color: var(--pm-black); }\n        .scene-text p { margin-bottom: 20px; }\n        .highlight-red { color: var(--pm-dark-red); font-weight: 900; text-shadow: 0 0 5px rgba(139, 0, 0, 0.2); }\n        .highlight-gold { color: var(--pm-gold); font-weight: 900; text-shadow: 0 0 5px rgba(212, 175, 55, 0.3); }\n        .trauma-text { color: var(--pm-dark-red); font-weight: bold; font-style: italic; font-size: 0.9em; background: rgba(139, 0, 0, 0.05); padding: 8px 15px; border-left: 3px solid var(--pm-dark-red); border-radius: 4px; display: block; margin: 15px 0; text-indent: 0; }\n\n        /* 🚨 跑团娘立绘相框样式 */\n        .dm-portrait-box {\n            display: flex;\n            justify-content: center;\n            margin: 30px auto 50px auto;\n            width: 100%;\n        }\n        .dm-portrait-img {\n            max-width: 220px;\n            border: 4px solid var(--pm-gold);\n            border-radius: 8px;\n            box-shadow: 0 10px 25px rgba(0,0,0,0.3), inset 0 0 15px rgba(0,0,0,0.5);\n            background: radial-gradient(circle, #2c1810 0%, #1a1105 100%);\n            padding: 5px;\n            object-fit: cover;\n            transition: transform 0.3s ease, box-shadow 0.3s ease;\n        }\n        .dm-portrait-img:hover {\n            transform: scale(1.05);\n            box-shadow: 0 15px 35px rgba(212, 175, 55, 0.4), inset 0 0 20px rgba(0,0,0,0.6);\n        }\n\n        .dossier-container { max-width: 900px; width: 100%; display: flex; flex-direction: column; gap: 15px; margin: 0 auto 40px auto; }\n        .dossier-folder { background: rgba(255, 255, 255, 0.7); border: 1px solid var(--pm-gold); border-radius: 6px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05); overflow: hidden; transition: all 0.3s ease; }\n        .dossier-folder[open] { background: rgba(255, 255, 255, 0.95); box-shadow: 0 10px 25px rgba(139, 0, 0, 0.15); border-color: var(--pm-dark-red); }\n        .dossier-summary { padding: 15px 20px; display: flex; align-items: center; cursor: pointer; list-style: none; border-left: 4px solid var(--pm-gold); transition: all 0.3s; }\n        .dossier-summary::-webkit-details-marker { display: none; }\n        .dossier-summary:hover { background: rgba(212, 175, 55, 0.1); }\n        .dossier-folder[open] .dossier-summary { border-left-color: var(--pm-dark-red); border-bottom: 1px dashed rgba(139, 0, 0, 0.2); background: rgba(139, 0, 0, 0.05); }\n        .ds-type { font-family: monospace; color: #888; font-size: 0.9em; width: 80px; letter-spacing: 1px; }\n        .ds-name { font-size: 1.5em; font-weight: 900; color: var(--pm-dark-red); letter-spacing: 3px; flex: 1; }\n        .ds-desc { color: #555; font-style: italic; font-size: 0.95em; }\n        .dossier-content { padding: 30px; animation: slideDown 0.4s ease-out; }\n        .cp-quote { font-family: 'Georgia', serif; font-size: 1.1em; font-style: italic; color: #555; border-left: 4px solid var(--pm-gold); padding-left: 20px; margin-bottom: 30px; background: rgba(212, 175, 55, 0.05); padding: 15px 20px; }\n        .cp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 30px; }\n        .cp-box { border: 1px dashed #b89f7d; padding: 20px; background: rgba(255, 255, 255, 0.6); }\n        .cp-box-title { font-weight: 900; color: var(--pm-dark-red); margin-bottom: 10px; font-size: 1.1em; border-bottom: 1px solid rgba(139, 0, 0, 0.2); padding-bottom: 5px; letter-spacing: 1px; }\n        .cp-box-content { font-size: 1.05em; line-height: 1.8; color: #333; }\n        .cp-actions { display: flex; justify-content: center; margin-top: 20px; }\n        .cp-btn-confirm { padding: 15px 50px; font-size: 1.2em; font-weight: bold; cursor: pointer; border: 2px solid var(--pm-dark-red); background: var(--pm-dark-red); color: #fff; text-decoration: none; letter-spacing: 2px; transition: all 0.3s; border-radius: 4px; display: block; text-align: center; }\n        .cp-btn-confirm:hover { background: #5a0000; box-shadow: 0 5px 15px rgba(139, 0, 0, 0.3); transform: translateY(-2px); }\n        .dossier-custom { display: flex; align-items: center; padding: 15px 20px; background: var(--pm-black); border: 1px solid var(--pm-dark-red); border-left: 4px solid var(--pm-dark-red); border-radius: 6px; cursor: pointer; margin-top: 10px; transition: all 0.3s; text-decoration: none; }\n        .dossier-custom:hover { background: #2c1810; box-shadow: 0 5px 15px rgba(139, 0, 0, 0.3); transform: translateX(5px); }\n        .dossier-custom .ds-type { color: #aaa; }\n        .dossier-custom .ds-name { color: var(--pm-gold); }\n\n        .custom-char-page { width: 100%; display: flex; flex-direction: column; align-items: center; padding: 20px 0; position: relative; z-index: 200; }\n        .points-header { position: sticky; top: 0; width: 100%; background: rgba(26, 17, 5, 0.95); color: var(--pm-gold); padding: 15px 30px; border-radius: 8px; border: 1px solid var(--pm-gold); display: flex; justify-content: space-between; align-items: center; z-index: 300; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5); backdrop-filter: blur(5px); box-sizing: border-box; margin-bottom: 30px; }\n        .points-header h2 { margin: 0; font-size: 1.5em; letter-spacing: 2px; }\n        .points-display { font-size: 2em; font-weight: 900; font-family: monospace; text-shadow: 0 0 10px rgba(212, 175, 55, 0.5); transition: color 0.3s; }\n        .points-display.negative { color: #ff4444; text-shadow: 0 0 15px rgba(255, 0, 0, 0.8); animation: pulse-red 2s infinite; }\n        .preset-bar { width: 100%; background: rgba(255, 255, 255, 0.6); border: 1px dashed var(--pm-gold); padding: 15px; border-radius: 6px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }\n\n        /* 🚨 强制白底黑字输入框 */\n        .preset-select, .preset-input, .pm-input, .pm-textarea, .pm-select {\n            background-color: #ffffff !important;\n            color: #000000 !important;\n            border: 1px solid #b89f7d !important;\n            padding: 12px; border-radius: 4px; font-family: inherit; font-size: 1em; box-sizing: border-box; outline: none; transition: border-color 0.3s;\n        }\n        .preset-select::placeholder, .preset-input::placeholder, .pm-input::placeholder, .pm-textarea::placeholder, .pm-select::placeholder {\n            color: #888888 !important;\n        }\n        .preset-select, .preset-input { padding: 8px; }\n        .pm-input { width: 100%; margin-bottom: 15px; }\n        .pm-textarea { width: 100%; height: 80px; resize: vertical; }\n        .pm-input:focus, .pm-textarea:focus, .pm-select:focus, .preset-input:focus, .preset-select:focus {\n            border-color: var(--pm-dark-red) !important;\n            box-shadow: 0 0 8px rgba(139, 0, 0, 0.3) !important;\n            background-color: #ffffff !important;\n        }\n\n        .pm-btn-small {\n            padding: 8px 15px;\n            background: #ffffff;\n            color: var(--pm-dark-red);\n            border: 1px solid var(--pm-dark-red);\n            border-radius: 4px;\n            cursor: pointer;\n            font-weight: bold;\n            transition: all 0.2s;\n            font-family: inherit;\n        }\n        .pm-btn-small:hover {\n            background: var(--pm-dark-red);\n            color: #ffffff;\n        }\n\n        /* 🚨 玩家立绘自适应画框样式 */\n        .image-upload-row { display: flex; gap: 25px; align-items: stretch; margin-bottom: 25px; width: 100%; }\n        .player-portrait-box {\n            flex-shrink: 0;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n        }\n        .player-portrait-img, .player-portrait-placeholder {\n            max-width: 140px;\n            max-height: 180px;\n            width: auto;\n            height: auto;\n            border: 3px solid var(--pm-gold);\n            border-radius: 6px;\n            box-shadow: 0 8px 20px rgba(0,0,0,0.3), inset 0 0 10px rgba(0,0,0,0.5);\n            background: radial-gradient(circle, #2c1810 0%, #1a1105 100%);\n            padding: 4px;\n            object-fit: contain;\n            transition: transform 0.3s ease, box-shadow 0.3s ease;\n        }\n        .player-portrait-img:hover {\n            transform: scale(1.05);\n            box-shadow: 0 12px 25px rgba(212, 175, 55, 0.4), inset 0 0 15px rgba(0,0,0,0.6);\n        }\n        .player-portrait-placeholder {\n            width: 100px;\n            height: 120px;\n            color: #888;\n            font-size: 1em;\n            font-weight: bold;\n            letter-spacing: 2px;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n        }\n\n        .preset-btn { padding: 8px 15px; background: var(--pm-black); color: var(--pm-gold); border: 1px solid var(--pm-gold); border-radius: 4px; cursor: pointer; transition: all 0.2s; }\n        .preset-btn:hover { background: var(--pm-dark-red); color: #fff; }\n        .roll-screen { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 50vh; text-align: center; }\n        .roll-btn { width: 200px; height: 200px; border-radius: 50%; background: radial-gradient(circle, var(--pm-dark-red) 0%, var(--pm-black) 100%); border: 4px solid var(--pm-gold); color: var(--pm-gold); font-size: 2em; font-weight: 900; cursor: pointer; transition: all 0.2s; box-shadow: 0 0 30px rgba(139, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; flex-direction: column; }\n        .roll-btn:hover { transform: scale(1.05); box-shadow: 0 0 50px rgba(212, 175, 55, 0.6); }\n        .roll-btn:active { transform: scale(0.95); }\n        .roll-btn.rolling { animation: shake 0.5s infinite; pointer-events: none; filter: brightness(1.5); }\n        .shop-container { width: 100%; display: grid; grid-template-columns: 1fr; gap: 30px; }\n        .shop-section { background: rgba(255, 255, 255, 0.6); border: 1px solid var(--pm-gold); border-radius: 8px; padding: 25px; }\n        .shop-title { font-size: 1.5em; color: var(--pm-dark-red); border-bottom: 2px solid var(--pm-gold); padding-bottom: 10px; margin-bottom: 20px; font-weight: 900; letter-spacing: 2px; display: flex; justify-content: space-between; align-items: center; }\n        .stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; }\n        .stat-row { display: flex; justify-content: space-between; align-items: center; background: rgba(0, 0, 0, 0.05); padding: 10px 15px; border-radius: 4px; border-left: 3px solid var(--pm-gold); }\n        .stat-name { font-weight: bold; color: var(--pm-text); width: 100px; }\n        .stat-controls { display: flex; align-items: center; gap: 10px; }\n\n        .stat-btn { width: 30px; height: 30px; border-radius: 50%; border: 1px solid var(--pm-dark-red); background: transparent; color: var(--pm-dark-red); font-weight: bold; cursor: pointer; transition: all 0.2s; display: flex; justify-content: center; align-items: center; padding: 0; line-height: 1; }\n        .stat-btn:hover:not(:disabled) { background: var(--pm-dark-red); color: white; }\n        .stat-btn:disabled { border-color: #ccc; color: #ccc; cursor: not-allowed; }\n        .stat-val { font-family: monospace; font-size: 1.2em; font-weight: bold; width: 40px; text-align: center; }\n        .stat-cost { font-size: 0.8em; color: #888; width: 60px; text-align: right; }\n        .rl-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }\n        .rl-card { border: 1px solid #b89f7d; background: #fcfaf5; border-radius: 6px; padding: 15px; cursor: pointer; transition: all 0.3s; position: relative; overflow: hidden; }\n        .rl-card:hover { box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); transform: translateY(-2px); border-color: var(--pm-gold); }\n        .rl-card.selected { border-color: var(--pm-dark-red); background: rgba(139, 0, 0, 0.05); box-shadow: inset 0 0 0 2px var(--pm-dark-red); }\n        .rl-card.selected::after { content: '✓'; position: absolute; top: 10px; right: 15px; color: var(--pm-dark-red); font-size: 1.5em; font-weight: bold; }\n        .rl-type { font-size: 0.8em; color: #888; margin-bottom: 5px; font-family: monospace; }\n        .rl-name { font-size: 1.2em; font-weight: bold; color: var(--pm-black); margin-bottom: 10px; }\n        .rl-desc { font-size: 0.9em; color: #555; line-height: 1.5; margin-bottom: 15px; }\n        .rl-cost { font-weight: bold; color: var(--pm-dark-red); text-align: right; font-family: monospace; }\n        .rl-cost.refund { color: #2e7d32; }\n\n        .diy-list { display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px; }\n        .diy-box { background: rgba(0, 0, 0, 0.03); border: 1px dashed var(--pm-gold); padding: 15px; border-radius: 6px; position: relative; }\n        .diy-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }\n        .diy-title { font-weight: bold; color: var(--pm-dark-red); font-size: 1.1em; }\n        .diy-roll-btn { padding: 8px 15px; background: var(--pm-gold); color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; transition: all 0.2s; }\n        .diy-roll-btn:hover:not(:disabled) { background: var(--pm-dark-red); }\n        .diy-roll-btn:disabled { background: #ccc; cursor: not-allowed; }\n        .diy-cost-display { font-family: monospace; font-size: 1.2em; font-weight: bold; color: var(--pm-dark-red); }\n        .diy-cost-display.refund { color: #2e7d32; }\n        .btn-add-diy { width: 100%; padding: 10px; background: transparent; border: 1px dashed var(--pm-text); color: var(--pm-text); font-weight: bold; cursor: pointer; border-radius: 4px; transition: all 0.2s; }\n        .btn-add-diy:hover { background: rgba(0,0,0,0.05); border-color: var(--pm-dark-red); color: var(--pm-dark-red); }\n\n        .btn-remove-diy { background: transparent; border: none; color: #ff4444; cursor: pointer; font-size: 1.5em; font-weight: bold; display: flex; align-items: center; justify-content: center; padding: 0 5px; transition: transform 0.2s; line-height: 1; }\n        .btn-remove-diy:hover { transform: scale(1.2); }\n\n        .dm-warning { background: rgba(139, 0, 0, 0.05); border-left: 4px solid var(--pm-dark-red); padding: 15px; margin-bottom: 20px; font-size: 0.95em; color: #555; line-height: 1.6; }\n        .dm-warning strong { color: var(--pm-dark-red); }\n        .negative-warning { background: rgba(139, 0, 0, 0.1); border: 2px solid #ff4444; color: #8b0000; padding: 20px; border-radius: 8px; margin-top: 20px; font-weight: bold; text-align: center; animation: pulse-border 2s infinite; line-height: 1.6; }\n        .price-table-details { margin-bottom: 20px; border: 1px solid var(--pm-gold); border-radius: 6px; background: rgba(255, 255, 255, 0.8); }\n        .price-table-summary { padding: 12px 20px; font-weight: bold; color: var(--pm-dark-red); cursor: pointer; list-style: none; background: rgba(212, 175, 55, 0.1); }\n        .price-table-summary::-webkit-details-marker { display: none; }\n        .price-table-content { padding:15px 20px; font-size: 0.9em; color: #444; line-height: 1.8; border-top: 1px dashed var(--pm-gold); }\n        .price-table-content ul { margin: 0; padding-left: 20px; }\n        .price-table-content li { margin-bottom: 5px; }\n\n        .custom-idea-box { width: 100%; margin-top: 20px; }\n        .custom-idea-box textarea {\n            width: 100%; min-height: 150px; padding: 15px; border: 2px dashed var(--pm-gold); border-radius: 6px;\n            background-color: #ffffff !important;\n            color: #000000 !important;\n            font-family: inherit; font-size: 1.05em; resize: vertical; box-sizing: border-box; outline: none; transition: all 0.3s; line-height: 1.6;\n        }\n        .custom-idea-box textarea::placeholder {\n            color: #888888 !important;\n        }\n        .custom-idea-box textarea:focus { border-color: var(--pm-dark-red); border-style: solid; box-shadow: 0 0 10px rgba(139, 0, 0, 0.1); }\n\n        .page-settings { width: 100%; display: flex; flex-direction: column; align-items: center; padding: 40px 0; animation: slideDown 0.5s ease-out; }\n        .settings-title { font-size: 2.5em; font-weight: 900; color: var(--pm-dark-red); letter-spacing: 8px; margin-bottom: 10px; text-align: center; border-bottom: 2px solid var(--pm-gold); padding-bottom: 15px; width: 100%; max-width: 800px; }\n        .settings-warning { color: #555; font-style: italic; margin-bottom: 40px; letter-spacing: 2px; text-align: center; }\n        .toggles-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; width: 100%; max-width: 800px; margin-bottom: 50px; }\n        .toggle-btn { padding: 15px; border: 1px solid var(--pm-gold); background: rgba(255, 255, 255, 0.5); border-radius: 8px; text-align: center; cursor: pointer; font-weight: bold; color: #555; transition: all 0.3s; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); user-select: none; }\n        .toggle-btn.active { background: var(--pm-dark-red); color: #fff; border-color: #5a0000; box-shadow: 0 5px 15px rgba(139, 0, 0, 0.3); transform: translateY(-2px); }\n        .toggle-btn.active::after { content: ' [已开启]'; font-size: 0.8em; opacity: 0.8; }\n        .toggle-btn:not(.active)::after { content: ' [已关闭]'; font-size: 0.8em; opacity: 0.8; }\n        .dm-section { width: 100%; max-width: 800px; background: rgba(212, 175, 55, 0.05); border: 1px dashed var(--pm-gold); padding: 30px; border-radius: 8px; margin-bottom: 30px; box-sizing: border-box; }\n        .dm-title { font-size: 1.5em; color: var(--pm-black); font-weight: bold; margin-bottom: 15px; }\n        .dm-desc { color: #555; line-height: 1.8; margin-bottom: 20px; }\n        .dm-presets { display: flex; gap: 15px; margin-bottom: 20px; flex-wrap: wrap; align-items: center; }\n        .pm-preset-btn { padding: 10px 20px; border: 1px solid var(--pm-dark-red); background: transparent; color: var(--pm-dark-red); cursor: pointer; border-radius: 4px; transition: all 0.2s; font-family: inherit; font-size: 1em; }\n        .pm-preset-btn:hover, .pm-preset-btn.active { background: var(--pm-dark-red); color: white; }\n        .pm-preset-btn.custom-btn { border-style: dashed; font-weight: bold; }\n        .mbti-diff-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; width: 100%; max-width: 800px; margin-bottom: 50px; }\n        @media (max-width: 768px) { .mbti-diff-grid { grid-template-columns: 1fr; } }\n        .mbti-box { background: rgba(255, 255, 255, 0.6); border: 1px solid var(--pm-gold); padding: 20px; border-radius: 8px; }\n        .mbti-row { display: flex; justify-content: space-between; margin-bottom: 10px; background: rgba(0, 0, 0, 0.05); border-radius: 4px; overflow: hidden; }\n        .mbti-btn { flex: 1; padding: 10px; border: none; background: transparent; cursor: pointer; font-weight: bold; color: #555; transition: all 0.2s; }\n        .mbti-btn.active { background: var(--pm-dark-red); color: white; }\n        .mbti-result { text-align: center; font-size: 1.5em; font-weight: 900; color: var(--pm-dark-red); margin-top: 15px; letter-spacing: 2px; }\n        .diff-box { background: rgba(255, 255, 255, 0.6); border: 1px solid var(--pm-gold); padding: 20px; border-radius: 8px; display: flex; flex-direction: column; gap: 10px; }\n        .diff-btn { padding: 12px; border: 1px solid var(--pm-dark-red); background: transparent; color: var(--pm-dark-red); cursor: pointer; border-radius: 4px; font-weight: bold; transition: all 0.2s; text-align: left; }\n        .diff-btn:hover, .diff-btn.active { background: var(--pm-dark-red); color: white; }\n        .pm-btn-embark { padding: 20px 60px; font-size: 1.5em; font-weight: 900; background: var(--pm-black); color: var(--pm-gold); border: 2px solid var(--pm-gold); border-radius: 8px; cursor: pointer; letter-spacing: 8px; transition: all 0.4s; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3); text-align: center; display: inline-block; margin-top: 20px; }\n        .pm-btn-embark:hover:not(:disabled) { background: var(--pm-dark-red); color: #fff; border-color: #ff4444; box-shadow: 0 15px 30px rgba(139, 0, 0, 0.5); transform: translateY(-3px); }\n        .pm-btn-embark:disabled { opacity: 0.6; cursor: not-allowed; }\n\n        .modal-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-radius: 12px; background: rgba(0,0,0,0.8); z-index: 999999; display: flex; justify-content: center; align-items: center; padding: 20px; }\n        .modal-content { background: var(--pm-bg-light); border: 2px solid var(--pm-gold); border-radius: 8px; width: 100%; max-width: 800px; max-height: 90vh; display: flex; flex-direction: column; padding: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }\n        .modal-title { color: var(--pm-dark-red); font-size: 1.5em; font-weight: bold; margin-bottom: 15px; text-align: center; }\n\n        .modal-textarea {\n            flex: 1; width: 100%; min-height: 300px; padding: 15px; font-family: monospace; font-size: 14px; border: 1px solid #ccc; border-radius: 4px; resize: none; outline: none;\n            background-color: #ffffff !important;\n            color: #000000 !important;\n            margin-bottom: 15px;\n        }\n\n        .modal-btn { padding: 12px 30px; background: var(--pm-dark-red); color: white; border: none; border-radius: 4px; font-size: 1.2em; cursor: pointer; font-weight: bold; align-self: center; }\n        .modal-btn:hover { background: #5a0000; }\n      ", e.head.appendChild(t);
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
					a || (a = r.createElement("div"), a.id = n, a.style.cssText = "margin-top: 15px; width: 100%; position: relative; clear: both;", u.appendChild(a), t = Xo(Xd), t.mount(a), e.set(`setup_${i}`, t));
				}
				if (!c && !l) {
					let t = `pm-app-${i}`, n = r.getElementById(t);
					if (!n) {
						n = r.createElement("div"), n.className = "pm-status-bar-container", n.id = t, n.style.cssText = "margin-top: 15px; width: 100%; clear: both;", u.appendChild(n);
						let a = Xo(Tc, { mesId: i });
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
