(function($, Snap) {
    $(function() {
        var teams = [{
            name: 'Branding',
            attr: {
                id: 'branding-slice',
                stroke: '#ffffff',
                fill: '#E10A28',
                fillOpacity: 0.8,
                strokeWidth: 5
            }
        }, {
            name: 'Tech',
            attr: {
                id: 'tech-slice',
                stroke: '#ffffff',
                fill: '#E10A28',
                fillOpacity: 0.8,
                strokeWidth: 5
            }
        }, {
            name: 'Biz Dev',
            attr: {
                id: 'bizdev-slice',
                stroke: '#ffffff',
                fill: '#E10A28',
                fillOpacity: 0.8,
                strokeWidth: 5
            }
        }];

        var snap = Snap('#team-diagram');

        var epic = snap.image('assets/logos/epic.png', 250, 250, 100, 100);
        epic.attr({
            id: 'epic-logo'
        });
        var wildhacks = snap.image('assets/images/wildhacks.png', 165, 165, 70, 70);
        wildhacks.attr({
            id: 'wildhacks-logo'
        });
        wildhacks.click(function() {
            $('#team-description').replaceWith('<p id="team-description">WildHacks is an annual student-run intercollegiate hackathon that brings together 500+ student hackers and industry professionals for 36 hours of hacking, learning, and collaboration, sprinkled with inspiring talks and just-for-fun activities.</p>');
        });
        var hacknu = snap.image('assets/images/hacknu.png', 365, 365, 70, 70);
        hacknu.attr({
            id: 'hacknu-logo'
        });
        hacknu.click(function() {
            $('#team-description').replaceWith('<p id="team-description">HackNorthwestern, Women in Computing, and IEEE partner to bring you weekly hack nights every quarter. Join them every Wednesday from 7-10pm in the Garage – bring your laptop and we will take care of the food and awesome tutorials. Meet fellow hackers, work on cool projects, and pick up new skills. All backgrounds and experience levels are welcome!</p>');
        });
        var launch = snap.image('assets/images/launch.png', 165, 365, 70, 70);
        launch.attr({
            id: 'launch-logo'
        });
        launch.click(function() {
            $('#team-description').replaceWith('<p id="team-description">Launch teaches entrepreneurial thinking and applicable skills, using startups as learning vehicles. Launch mentors students from ideation to iteration to creation of the final product.</p>');
        });
        var sprout = snap.image('assets/images/sprout.png', 365, 165, 70, 70);
        sprout.attr({
            id: 'sprout-logo'
        });
        sprout.click(function() {
            $('#team-description').replaceWith('<p id="team-description">Sprout is a 3-day program that provides incoming Wildcats with the opportunity to discover their inner entrepreneur through specially designed activities and workshops, participants develop problem solving, teamwork, and brainstorming skills. Students will also have the opportunity to hear from and speak with real-world entrepreneurs from the Chicago venture start-up scene. Sprout empowers young innovative minds by teaching them the spirit of entrepreneurship and helping them take the first steps towards turning ideas into reality.</p>');
        });

        var sector = drawTeamChart(snap, {
            x: 300,
            y: 300
        }, 195, 260, teams);

        $('#tech-slice').click(function() {
            $('#team-description').replaceWith('<p id="team-description">Tech creates all digital platforms used by EPIC, such as this website, our blog, and our online application. The team additionally manages any back-end work, teaches members how to create software that is beautiful on the inside and out, and comes up with innovative projects that support EPIC’s mission.</p>');
        });
        $('#branding-slice').click(function() {
            $('#team-description').replaceWith('<p id="team-description">Branding is home to some of the best creative minds of EPIC – everything EPIC that you see about, from every carefully conceptualized logo to the look and feel of all content created by EPIC. This creative powerhouse  shapes EPIC’s brand into something approachable, empowering, and inspiring, to  everyone within the NU community and beyond.</p>');
        });
        $('#bizdev-slice').click(function() {
            $('#team-description').replaceWith('<p id="team-description">The Business Development team maintains and builds EPIC’s professional network, engaging with alums, companies, and entrepreneurs, as well as manage EPIC\'s finances. The team is in charge of programs such as alumni Starter Dinners and the Startup Career Fair, and also attends various events to build EPIC\'s network. Through external expansion, we are able to facilitate internal growth for the organization.</p>');
        });
    });

    function radiansToDegrees(rad) {
        return 360 * rad / (2 * Math.PI);
    }

    function drawTeamChart(snap, center, rIn, rOut, teams) {
        var delta = 2 * Math.PI / teams.length;
        teams.forEach(function(team, i) {
            var teamSlice = drawTeamSlice(snap, center, rIn, rOut, i * delta, delta, team);

            //function hoverIn() {
            //teamSlice.animate({
            //transform: 't' + 10*Math.cos(i*delta + delta/2) + ' ' + 10*Math.sin(i*delta + delta/2)
            //}, 500, mina.linear);
            //}
            //function hoverOut() {
            //teamSlice.animate({
            //transform: 't0 0'
            //}, 500, mina.linear);
            //}
            //$('#'+team.attr.id).hover(hoverIn, hoverOut);
        });
    }

    function drawTeamSlice(snap, center, rIn, rOut, theta, delta, team) {
        var slice = drawPieSlice(snap, center, rIn, rOut, theta, delta, team.attr);

        var rMid = (rIn + rOut) / 2;
        var startMid = {
            x: center.x + rMid * Math.cos(theta),
            y: center.y + rMid * Math.sin(theta)
        };
        var endMid = {
            x: center.x + rMid * Math.cos(theta + delta),
            y: center.y + rMid * Math.sin(theta + delta)
        };
        var textAnchor = {
            x: center.x + rMid * Math.cos(theta + delta / 2 + delta / 4),
            y: center.y + rMid * Math.sin(theta + delta / 2 + delta / 4)
        };

        var x = center.x + rMid * Math.cos(theta + delta / 2);
        var y = center.y + rMid * Math.sin(theta + delta / 2);

        var largeArc = delta > 180 ? 1 : 0;
        var textPath = 'M' + startMid.x + ' ' + startMid.y + ' A' + rMid + ' ' + rMid + ' ' + 0 + ' ' + 0 + ' ' + 1 + ' ' + endMid.x + ' ' + endMid.y;

        var label = snap.text(textAnchor.x, textAnchor.y, team.name);
        label.attr({
            'text-anchor': 'middle'
        });

        return snap.group(slice, label);
    }

    function drawPieSlice(snap, center, rIn, rOut, theta, delta, attr) {
        var startOut = {
            x: center.x + rOut * Math.cos(theta + delta / 4),
            y: center.y + rOut * Math.sin(theta + delta / 4)
        };
        var endOut = {
            x: center.x + rOut * Math.cos(theta + delta + delta / 4),
            y: center.y + rOut * Math.sin(theta + delta + delta / 4)
        };
        var startIn = {
            x: center.x + rIn * Math.cos(theta + delta + delta / 4),
            y: center.y + rIn * Math.sin(theta + delta + delta / 4)
        };
        var endIn = {
            x: center.x + rIn * Math.cos(theta + delta / 4),
            y: center.y + rIn * Math.sin(theta + delta / 4)
        };
        var largeArc = delta > 180 ? 1 : 0;
        var path = "M" + startOut.x + " " + startOut.y +
            "A" + rOut + " " + rOut + " 0 " +
            largeArc + " 1 " + endOut.x + " " + endOut.y +
            "L" + startIn.x + " " + startIn.y +
            "A" + rIn + " " + rIn + " 0 " +
            largeArc + " 0 " + endIn.x + " " + endIn.y +
            "L" + startOut.x + " " + startOut.y + "Z";

        path = snap.path(path);
        path.attr(attr);

        return path;
    }
})(jQuery, Snap);
