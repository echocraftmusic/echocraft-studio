/*
==========================================================
EC FRAMEWORK
PIPELINE ENGINE
Version 1.0
==========================================================
*/

class ECPipelineEngine {

    constructor() {

        this.stages = [

            "New Lead",
            "Discovery",
            "Production",
            "Review",
            "Completed"

        ];

    }

    getStages() {

        return this.stages;

    }

    move(projectId, stage) {

        if (!window.ecProjects) return false;

        if (!this.stages.includes(stage)) {

            return false;

        }

        const success = window.ecProjects.move(

            projectId,

            stage

        );

        if (!success) {

            return false;

        }

        const project = window.ecProjects.get(projectId);

        if (window.ecActivity) {

            window.ecActivity.add(

                "pipeline",

                "Pipeline Updated",

                `${project.name} moved to ${stage}`

            );

        }

        this.refresh();

        return true;

    }

    next(projectId) {

        const project = window.ecProjects.get(projectId);

        if (!project) return false;

        const index = this.stages.indexOf(project.stage);

        if (index === -1) return false;

        if (index >= this.stages.length - 1) {

            return false;

        }

        return this.move(

            projectId,

            this.stages[index + 1]

        );

    }

    previous(projectId) {

        const project = window.ecProjects.get(projectId);

        if (!project) return false;

        const index = this.stages.indexOf(project.stage);

        if (index <= 0) {

            return false;

        }

        return this.move(

            projectId,

            this.stages[index - 1]

        );

    }

    byStage(stage) {

        if (!window.ecProjects) return [];

        return window.ecProjects.byStage(stage);

    }

    counts() {

        const counts = {};

        this.stages.forEach(stage => {

            counts[stage] = this.byStage(stage).length;

        });

        return counts;

    }

    refresh() {

        if (window.ecRender) {

            window.ecRender.refresh();

        }

        if (window.ecDashboard) {

            window.ecDashboard.refresh();

        }

        if (window.ecWidgets) {

            window.ecWidgets.refresh();

        }

    }

}

/* ==========================================================
   GLOBAL INSTANCE
==========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    window.ecPipeline = new ECPipelineEngine();

});