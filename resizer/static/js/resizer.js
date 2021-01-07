(function() {

    let gate = $(window),
        item = $('#module'),
        bay = $('.panel'),
        snap = $('.handle'),
        inner = $('.axial'),
        lane = $('.route'),
        jot = lane.find('div'),
        mark = snap.outerHeight(),
        press = 'mousedown touchstart',
        yaw = 'mousemove.area touchmove.area',
        free = 'mouseup touchend',
        hike = 'mouseleave touchcancel',
        ken = [{},{},{}], urge = [{},{},{}],
        craft, room, ambit, duct, ere,
        influx, ward, put, zap;

    pulseMuzzle();
    assayField();

    gate.on('load', scopeData).resize($.restrain(100, checkPlot)).on(hike, function(e) {

        !(e.type === 'mouseleave' && e.relatedTarget) && lotRelease();
    });

    snap.addClass('drag').on(press, function(e) {

        let above = !$(this).index('.handle'), dab = urge[0];
        tagPoints(this, e, dab);
        let unit = above ? 0 : mark, space = room+unit, last = dab.start;

        gate.one(free, lotRelease).on(yaw, function(e) {

            hubTrace(e, dab);
        })
            .on(yaw, $.restrain(30, function() {

                let target = Math.max(unit, Math.min(dab.aim, space)),
                    up = dab.now < last, extent = space-target;
                last = dab.now;

                if (above) {
                    bay.eq(0).height(target);
                    if (ken[1].range || up) bay.eq(1).height(extent-ken[2].range);
                    else bay.eq(2).height(extent);
                }
                else {
                    bay.eq(2).height(extent);
                    if (ken[1].range || !up) bay.eq(1).height(target-mark-ken[0].range);
                    else bay.eq(0).height(target-mark);
                }

                if (ere) driftStrip();
                scopeData();
            }));

        e.preventDefault();
    });

    function checkPlot() {

        if (!craft[0]) item.height(gate.height());

        room = item.height()-2*mark;
        ambit = bay.width();

        bay.each(function(i) {
            $(this).height(room*ken[i].quota);
        });

        if (ere) driftStrip();
        scopeData();
    }

    function tagPoints(mean, act, key) {

        let tap = act.originalEvent.touches;
        key.start = tap ? tap[0].pageY : act.pageY;
        key.onset = $(mean).position().top;
    }

    function hubTrace(task, gob) {

        let rub = task.originalEvent.touches;
        gob.now = rub ? rub[0].pageY : task.pageY;
        gob.aim = gob.onset+gob.now-gob.start;
    }

    function lotRelease() {

        gate.off(yaw);
        lane.off(hike);
        influx = ward = false;
        clearTimeout(put);
        clearInterval(zap);
    }

    function driftStrip() {

        inner.each(function(i) {

            duct = this.getBoundingClientRect().width-$('.hint').eq(i).width();

            if (duct || ere) $(this).width(ambit+duct);
        });
    }

    function scopeData() {

        bay.each(function(i) {

            let own = ken[i],
                summit = $(this).height();
            own.range = summit;
            own.quota = summit/room;
            if (!duct && !ere) return;
            let core = inner.eq(i),
                zest = jot.eq(i);
            own.peak = core[0].scrollHeight;
            own.edge = own.peak-summit;
            own.tier = summit/own.peak;
            own.lug = Math.max(22, summit*own.tier);
            own.stub = summit-own.lug;

            if (this.clientHeight === own.peak || summit < 35) zest.addClass('latent');
            else {
                zest.removeClass('latent').outerHeight(own.lug);
                core.scroll();
            }
        });
    }

    function glideRail(route) {

        lane.on(press, function(e) {

            if (e.target !== e.currentTarget) return;

            let entry = $(this), base = entry.index(`.${route}`),
                nook = ken[base], crux = urge[2], orbit = nook.range;
            tagPoints(jot.eq(base), e, crux);

            entry.one(hike, lotRelease);

            gate.one(free, lotRelease).on(yaw, function(e) {

                hubTrace(e, crux);
                if (Math.abs(crux.now-crux.start) > 5) lotRelease();
            });

            let spot = crux.start-entry.offset().top,
                alter = Math.min(35, 0.7*nook.lug),
                zone = orbit < 35 ? orbit/2 : alter,
                rise = spot < crux.onset || spot <= zone,
                mesh = Math.min(nook.stub, spot),
                goal = mesh/nook.stub*nook.edge,
                fit = inner.eq(base).scrollTop();
            put = setTimeout(cycleJump, 350);
            fastSkip();

            function cycleJump() {

                zap = setInterval(fastSkip, 100);
                influx = true;
            }

            function fastSkip() {

                let venue = jot.eq(base).position().top,
                    tie = Math.round(mesh) === Math.round(venue);

                if (rise) {
                    fit -= 0.9*orbit;
                    if (influx && spot > alter) {
                        fit = Math.max(goal, fit);
                        if (spot > venue) {
                            lotRelease();
                            return;
                        }
                    }
                }
                else {
                    fit += 0.9*orbit;
                    if (influx) fit = Math.min(goal, fit);
                }

                fit = Math.ceil(Math.max(0, Math.min(fit, nook.edge)));
                if (influx && !fit || tie && spot > alter) lotRelease();
                inner.eq(base).scrollTop(fit);
            }

            e.preventDefault();
        });

        jot.on(press, function(e) {

            let apt = $(this), peg = apt.index(`.${route} div`),
                cue = ken[peg], note = urge[1];
            tagPoints(this, e, note);
            ward = true;

            gate.one(free, lotRelease).on(yaw, function(e) {

                hubTrace(e, note);
            })
                .on(yaw, $.restrain(30, function() {

                    let intent = Math.max(0, Math.min(note.aim, cue.stub));
                    apt.css('top', intent);
                    inner.eq(peg).scrollTop(intent*cue.edge/cue.stub);
                }));

            e.preventDefault();
        });

        inner.each(function(nod) {

            $(this).scroll($.restrain(30, function() {

                if (ward || ken[nod].range < 35) return;

                let move = inner.eq(nod).scrollTop(), bit = ken[nod];
                let place
                if (bit.lug !== 22) {
                    place = move*bit.tier;
                }
                else place = move/bit.edge*bit.stub;

                jot.eq(nod).css('top', place);
            }));
        });
    }

    function assayField() {

        if (!craft[0]) item.height(gate.height());

        room = item.height()-2*mark;
        ambit = bay.width();

        if (!craft[1]) bay.height(room/3);

        inner.append('<div class="hint"></div>');
        driftStrip();
        scopeData();
        inner.removeClass('spill');

        if (duct) {
            ere = true;
            lane.show();
            $('.bulk').addClass('way');
            glideRail('route');
        }
    }

    function pulseMuzzle() {

        $.restrain = function(delay, callback) {

            let executed = 0, debounce,
                throttle = function() {

                    let elapsed = Math.min(delay, Date.now()-executed),
                        remain = delay-elapsed;
                    debounce && clearTimeout(debounce);
                    elapsed === delay && runIt();
                    if (remain) debounce = setTimeout(runIt, remain);

                    function runIt() {
                        executed = Date.now();
                        callback.apply(this, arguments);
                    }
                }
            return throttle;
        }

        craft = (function() {

            let tip = $(document.head);
            tip.css({width: 'calc(2 * 1px)', height: '1vh'});
            let mass = [!!tip.height(), tip.width()];
            tip.removeAttr('style');
            return mass;
        })();
    }
})();